/**
 * Phase 2a — build programmé (Style Dictionary v4 + formats personnalisés).
 * Enregistre les formats mr/* puis construit les plateformes CSS, d.ts, JSON.
 *
 *   pnpm --filter @monority/tokens build
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import StyleDictionary from 'style-dictionary'
import baseConfig from '../sd.config.js'
import { emitDeprecatedCss, emitDts, emitTokensCss } from './sd-formats.mjs'
import { loadSources } from './lib/tokens-lib.mjs'
import { buildResolved } from './lib/resolve.mjs'

const pkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const stylesGenerated = path.resolve(pkgDir, '..', 'styles', 'src', 'tokens', 'generated')
const distDir = path.join(pkgDir, 'dist')
const srcDir = path.join(pkgDir, 'src')

const sources = loadSources(srcDir)
const resolved = buildResolved(sources)

const sd = new StyleDictionary({
    log: baseConfig.log,
    source: baseConfig.source.map((g) => path.join(pkgDir, g)),
    platforms: {
        css: {
            buildPath: stylesGenerated + path.sep,
            files: [
                { destination: 'tokens.css', format: 'mr/css-tokens' },
                { destination: 'deprecated.css', format: 'mr/css-deprecated' },
            ],
        },
        meta: {
            buildPath: distDir + path.sep,
            files: [
                { destination: 'tokens.d.ts', format: 'mr/dts' },
                { destination: 'resolved.json', format: 'mr/resolved' },
            ],
        },
    },
})

sd.registerFormat({
    name: 'mr/css-tokens',
    format: () => emitTokensCss(sources),
})
sd.registerFormat({
    name: 'mr/css-deprecated',
    format: () => emitDeprecatedCss(sources),
})
sd.registerFormat({
    name: 'mr/dts',
    format: () => emitDts(sources),
})
sd.registerFormat({
    name: 'mr/resolved',
    format: () => JSON.stringify({ meta: { combos: resolved.combos, count: resolved.names.length }, values: resolved.values }, null, 2) + '\n',
})

fs.mkdirSync(stylesGenerated, { recursive: true })
fs.mkdirSync(distDir, { recursive: true })
await sd.buildAllPlatforms()
console.log(`tokens.css + deprecated.css → ${stylesGenerated}`)
console.log(`tokens.d.ts + resolved.json → ${distDir} (${resolved.names.length} tokens, ${resolved.combos.length} combos)`)
