/* eslint-disable react-refresh/only-export-components -- runs once at build time, never hot reloaded */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.tsx'

export { PAGE_PATHS, headHtml, pageHead } from './seo.ts'
export { SITE_URL } from './site.ts'

/** Draws one page to HTML at build time, the same way the browser would */
export const render = (url: string) =>
  renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
