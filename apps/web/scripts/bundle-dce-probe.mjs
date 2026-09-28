#!/usr/bin/env node
/**
 * Bundle le paquet publié de `@monority/ui` comme le ferait une application
 * consommatrice, afin de vérifier que le code de développement (avertissements
 * de dépréciation) est bien éliminé en production.
 *
 * `define` remplace `process.env.NODE_ENV`, puis rollup élimine les branches
 * mortes. Le script tourne dans un process Node ordinaire : l'environnement
 * jsdom des tests fausse les `TextEncoder`/`Uint8Array` attendus par esbuild.
 *
 * Usage : node scripts/bundle-dce-probe.mjs <production|development>
 * Sortie : une ligne JSON { mode, bytes, deprecated, template, nodeEnv }
 */
import { resolve } from 'node:path'
import { build } from 'vite'

const mode = process.argv[2]
if (mode !== 'production' && mode !== 'development') {
    console.error('Usage: node scripts/bundle-dce-probe.mjs <production|development>')
    process.exit(2)
}

const repoRoot = resolve(process.cwd(), '../..')
const entry = resolve(repoRoot, 'packages/ui/dist/index.js')

const result = await build({
    configFile: false,
    logLevel: 'silent',
    root: repoRoot,
    define: { 'process.env.NODE_ENV': JSON.stringify(mode) },
    build: {
        write: false,
        minify: 'esbuild',
        lib: { entry, formats: ['es'], fileName: 'probe' },
        rollupOptions: {
            external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
        },
    },
})

const outputs = Array.isArray(result) ? result : [result]
const code = outputs
    .flatMap((output) => ('output' in output ? output.output : []))
    .filter((chunk) => chunk.type === 'chunk')
    .map((chunk) => chunk.code)
    .join('\n')

const count = (pattern) => (code.match(pattern) ?? []).length

console.log(
    JSON.stringify({
        mode,
        bytes: code.length,
        deprecated: count(/is deprecated/g),
        template: count(/deprecated:/g),
        nodeEnv: count(/NODE_ENV/g),
    })
)
