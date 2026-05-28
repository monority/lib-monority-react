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
const isDir = (p) => { try { return fs.statSync(p).isDirectory() } catch { return false } }

function tryResolve(basePath) {
  if (isFile(basePath)) return basePath
  for (const ext of exts) {
    const candidate = basePath + ext
    if (isFile(candidate)) return candidate
    const tsFromJs = basePath.replace(/\.js$/, ext)
    if (tsFromJs !== basePath && isFile(tsFromJs)) return tsFromJs
  }
  if (isDir(basePath)) {
    for (const ext of exts) {
      const indexFile = path.join(basePath, 'index' + ext)
      if (isFile(indexFile)) return indexFile
    }
  }
  return null
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'monority-path-aliases',
      enforce: 'pre',
      resolveId(source) {
        if (!source.startsWith('@/')) return null
        const relative = source.slice(2)
        return tryResolve(path.resolve(webSrc, relative)) || tryResolve(path.resolve(uiSrc, relative)) || null
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
