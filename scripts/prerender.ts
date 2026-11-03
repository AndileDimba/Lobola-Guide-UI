import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { Plugin } from 'vite'

// Where `vite build --ssr src/entry-server.tsx` puts the server entry
export const SERVER_OUT_DIR = 'dist-ssr'

interface ServerEntry {
  render: (url: string) => string
  pageHead: (url: string) => unknown
  headHtml: (head: unknown) => string
  PAGE_PATHS: string[]
  SITE_URL: string
}

// "/" is index.html, "/faq" is faq.html, "/guide/zulu/x" is guide/zulu/x.html.
// Vercel's cleanUrls and the service worker both find a page this way.
const fileFor = (path: string) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`)

// Any address with no page; it only needs to match no route
const NOT_FOUND_PATH = '/404'

/**
 * Writes every page out as its own HTML file at build time, already drawn,
 * with its own head, so search engines and link previews see the content
 * without running scripts. Also writes the sitemap from the same page list.
 *
 * It runs once the browser build is written and before the service worker is
 * made, so the service worker keeps every page for offline use.
 */
export const prerender = (): Plugin => {
  let root = ''
  let outDir = ''
  let ssr = false

  return {
    name: 'lobola-prerender',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
      ssr = !!config.build.ssr
    },
    async writeBundle() {
      if (ssr) return
      const serverEntry = resolve(root, SERVER_OUT_DIR, 'entry-server.js')
      const server: ServerEntry = await import(pathToFileURL(serverEntry).href)
      const template = await readFile(join(outDir, 'index.html'), 'utf8')

      const page = (path: string) => {
        if (!template.includes('<!--page-head-->') || !template.includes('<div id="root"></div>')) {
          throw new Error('index.html is missing <!--page-head--> or an empty <div id="root">')
        }
        return template
          .replace('<!--page-head-->', server.headHtml(server.pageHead(path)))
          .replace('<div id="root"></div>', `<div id="root">${server.render(path)}</div>`)
      }

      for (const path of server.PAGE_PATHS) {
        const file = join(outDir, fileFor(path))
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, page(path))
      }
      // Vercel sends this, with a 404 status, for any address with no file
      await writeFile(join(outDir, '404.html'), page(NOT_FOUND_PATH))

      const urls = server.PAGE_PATHS.map(
        (path) => `  <url><loc>${server.SITE_URL}${path}</loc></url>`,
      )
      await writeFile(
        join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
      )

      // The server entry is only needed to draw the pages
      await rm(resolve(root, SERVER_OUT_DIR), { recursive: true, force: true })
      this.info?.(`prerendered ${server.PAGE_PATHS.length} pages, 404.html and sitemap.xml`)
    },
  }
}
