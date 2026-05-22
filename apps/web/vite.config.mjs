import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const webDir = path.dirname(fileURLToPath(import.meta.url))
const webSrc = path.resolve(webDir, './src')
const monorepoRoot = path.resolve(webDir, '../..')
const uiSrc = path.resolve(monorepoRoot, 'packages/ui/src')
const exts = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json', '.css']
const isFile = (p) => { try { return fs.statSync(p).isFile() } catch { return false } }

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'monority-path-aliases',
      enforce: 'pre',
      resolveId(source) {
        if (!source.startsWith('@/')) return null
        const relative = source.slice(2)

        // Try web src first, then UI package src as fallback
        const webPath = path.resolve(webSrc, relative)
        if (isFile(webPath)) return webPath

        for (const ext of exts) {
          const candidate = webPath + ext
          if (isFile(candidate)) return candidate
          const tsFromJs = webPath.replace(/\.js$/, ext)
          if (tsFromJs !== webPath && isFile(tsFromJs)) return tsFromJs
        }

        const uiPath = path.resolve(uiSrc, relative)
        if (isFile(uiPath)) return uiPath

        for (const ext of exts) {
          const candidate = uiPath + ext
          if (isFile(candidate)) return candidate
          const tsFromJs = uiPath.replace(/\.js$/, ext)
          if (tsFromJs !== uiPath && isFile(tsFromJs)) return tsFromJs
        }

        return null
      },
    },
  ],
  resolve: {
    conditions: ['development'],
  },
  optimizeDeps: {
    exclude: ['@monority/ui'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
