import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import App from './App.tsx'
import ScrollToTop from './components/Layout/ScrollToTop.tsx'
import './index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
      {/* Counts page views only: no cookies, nothing personal */}
      <Analytics />
    </BrowserRouter>
  </StrictMode>
)

// Built pages arrive already drawn (see scripts/prerender.ts), so React takes
// over the page as it is; the dev server sends an empty one to draw from scratch
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
