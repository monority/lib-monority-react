import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const sitemapRoutes = ['/', '/dashboard', '/admin', '/playground', '/showcase', '/docs']

function sitemapPlugin(siteUrl) {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '')

  return {
    name: 'app-sitemap',
    generateBundle() {
      const entries = sitemapRoutes
        .map((route) => `  <url><loc>${normalizedSiteUrl}${route === '/' ? '/' : route}</loc></url>`)
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, '')
  const siteUrl = env.VITE_SITE_URL || 'http://localhost:5173'

  return {
    plugins: [react(), sitemapPlugin(siteUrl)],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, './src'),
      },
    },
  }
})
