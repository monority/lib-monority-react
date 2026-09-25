/**
 * Phase 2a — formats personnalisés Style Dictionary v4 + build programmé.
 * Les émetteurs lisent les JSON DTCG de `src/` (ordre des fichiers conservé).
 */
import { cssName, declOf, eachLeaf } from './lib/tokens-lib.mjs'

const HEADER = '/* GENERE — ne pas modifier. Source : packages/tokens/src/*.json (DTCG). */'

function block(selector, entries) {
    return `${selector} {\n${entries.map(([n, v]) => `  ${n}: ${v};`).join('\n')}\n}`
}

function collect(sources) {
    const root = []
    const rootBrand = []
    const themes = { 'theme-light': [], 'theme-dark': [], 'theme-oled': [], 'theme-ocean': [], 'theme-night': [], 'theme-high-contrast': [] }
    const compact = []
    const media640 = []
    const reduced = []
    const studio = []
    const push = (file, segs, leaf) => {
        const { scope, name } = cssName(segs)
        const cssProp = name === '--mr-color-scheme' ? 'color-scheme' : name
        const target =
            scope === 'root' && leaf.$extensions?.['com.monority.scope'] === 'root-brand'
                ? rootBrand
                : scope === 'root'
                ? root
                : scope.startsWith('theme-')
                  ? themes[scope]
                  : scope === 'density-compact'
                    ? compact
                    : scope === 'media-max640'
                      ? media640
                      : scope === 'motion-reduced'
                        ? reduced
                        : studio
        target.push([cssProp, declOf(leaf), file])
    }
    for (const f of ['primitives.json', 'core.json', 'components.json']) {
        eachLeaf(sources[f], (segs, leaf) => push(f, segs, leaf))
    }
    for (const f of [
        'themes/light.json',
        'themes/dark.json',
        'themes/oled.json',
        'themes/ocean.json',
        'themes/night.json',
        'themes/high-contrast.json',
    ]) {
        eachLeaf(sources[f], (segs, leaf) => push(f, segs, leaf))
    }
    eachLeaf(sources['density.json'], (segs, leaf) => push('density.json', segs, leaf))
    eachLeaf(sources['brand-studio.json'], (segs, leaf) => push('brand-studio.json', segs, leaf))
    return { root, rootBrand, themes, compact, media640, reduced, studio }
}

const stripFile = (entries) => entries.map(([n, v]) => [n, v])

export function emitTokensCss(sources) {
    const { root, rootBrand, themes, compact, media640, reduced, studio } = collect(sources)
    const parts = [
        HEADER,
        '',
        block(':root', stripFile(root)),
        '',
        block(':root,\n[data-theme],\n[data-brand]', stripFile(rootBrand)),
        '',
        block(':root,\n[data-theme="light"]', stripFile(themes['theme-light'])),
        '',
        block('[data-theme="dark"],\n[data-theme="dim"]', stripFile(themes['theme-dark'])),
        '',
        '@media (prefers-color-scheme: dark) {',
        indent(block(':root:not([data-theme])', stripFile(themes['theme-dark']))),
        '}',
        '',
        block('[data-theme="oled"]', stripFile(themes['theme-oled'])),
        '',
        block('[data-theme="ocean"]', stripFile(themes['theme-ocean'])),
        '',
        block('[data-theme="night"]', stripFile(themes['theme-night'])),
        '',
        block('[data-theme="high-contrast"]', stripFile(themes['theme-high-contrast'])),
        '',
        block('[data-brand="studio"]', stripFile(studio)),
        '',
        block('[data-density="compact"]', stripFile(compact)),
        '',
        '@media (max-width: 640px) {',
        indent(block(':root', stripFile(media640))),
        '}',
        '',
        '@media (prefers-reduced-motion: reduce) {',
        indent(block(':root', stripFile(reduced))),
        '}',
        '',
    ]
    return parts.join('\n')
}

const indent = (s) => s.split('\n').map((l) => '  ' + l).join('\n')

export function emitDeprecatedCss(sources) {
    const groups = new Map() // selector -> [[name, value]]
    eachLeaf(sources['deprecated.json'], (segs, leaf) => {
        const raw = segs.slice(1).join('-')
        const name = '--mr-' + raw.split('~')[0]
        const sel = leaf.$extensions?.['com.monority.deprecated']?.selector ?? ':root, [data-theme]'
        if (!groups.has(sel)) groups.set(sel, [])
        groups.get(sel).push([name, leaf.$value])
    })
    const parts = [HEADER, '']
    for (const [sel, entries] of groups) {
        parts.push(block(sel, entries), '')
    }
    return parts.join('\n')
}

export function emitDts(sources) {
    const names = new Set()
    for (const f of [
        'primitives.json',
        'core.json',
        'components.json',
        'themes/light.json',
        'themes/dark.json',
        'themes/oled.json',
        'themes/ocean.json',
        'themes/night.json',
        'themes/high-contrast.json',
        'density.json',
        'brand-studio.json',
    ]) {
        eachLeaf(sources[f], (segs) => {
            const { name } = cssName(segs)
            if (name.startsWith('--mr-')) names.add(name)
        })
    }
    const sorted = [...names].sort()
    return (
        `${HEADER}\n` +
        `/** Noms de tokens du système (référence v4). Total : ${sorted.length}. */\n` +
        `export type TokenName =\n${sorted.map((n) => `    | '${n}'`).join('\n')};\n`
    )
}
