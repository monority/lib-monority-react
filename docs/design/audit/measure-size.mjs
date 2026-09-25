#!/usr/bin/env node
/**
 * Phase 0 bis (refonte) — entry point weight.
 *
 * Measures min + gzip size of every entry in packages/ui/dist.
 * Run after `pnpm build`:
 *
 *   pnpm build && node docs/design/audit/measure-size.mjs
 *
 * "min" = esbuild minify (loader js, format esm, target es2020).
 * "gzip" = zlib gzip level 9 of the minified output.
 */
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const require = createRequire(path.join(repoRoot, 'package.json'))

function loadEsbuild() {
    try {
        return require('esbuild')
    } catch {
        const pnpmDir = path.join(repoRoot, 'node_modules/.pnpm')
        const entry = fs.readdirSync(pnpmDir).find((d) => d.startsWith('esbuild@'))
        if (!entry) throw new Error('esbuild not found')
        return require(path.join(pnpmDir, entry, 'node_modules/esbuild'))
    }
}

const esbuild = loadEsbuild()
const dist = path.join(repoRoot, 'packages/ui/dist')
const entries = fs.readdirSync(dist).filter((f) => f.endsWith('.js')).sort()

const rows = []
for (const file of entries) {
    const source = fs.readFileSync(path.join(dist, file), 'utf8')
    const { code } = await esbuild.transform(source, {
        loader: 'js',
        minify: true,
        format: 'esm',
        target: 'es2020',
    })
    const min = Buffer.byteLength(code, 'utf8')
    const gzip = zlib.gzipSync(code, { level: 9 }).length
    rows.push({ file, min, gzip })
}

const pad = (s, n) => String(s).padEnd(n)
const padL = (s, n) => String(s).padStart(n)
console.log(`${pad('entry', 28)}${padL('min B', 10)}${padL('gzip B', 10)}`)
for (const r of rows) console.log(`${pad(r.file, 28)}${padL(r.min, 10)}${padL(r.gzip, 10)}`)
console.log(`entries: ${rows.length}`)
console.log(
    `index.js: min ${rows.find((r) => r.file === 'index.js').min} B / gzip ${rows.find((r) => r.file === 'index.js').gzip} B`,
)
