#!/usr/bin/env node
/**
 * Phase 2a — X2. Contraste en CI, calculé depuis les sources DTCG avec
 * colorjs.io (valeurs oklch non arrondies, jamais le rendu hex 8 bits).
 *
 * Composition (78 paires × 6 thèmes × 2 marques = 936) :
 *   textes (primary, secondary, tertiary, disabled)      4 × 6 = 24
 *   accent-text (six fonds dont accent-subtle)                6
 *   anneau de focus                                           6
 *   bordure de contrôle (surface, raised, sunken, hover)       4
 *   texte sur accent (3 états)                                 3
 *   texte sur danger-solid                                     1
 *   statuts : {ton}-text sur 6 fonds + {ton}-subtle        4 × 7 = 28
 *   texte principal sur {ton}-subtle                       4 × 1 = 4
 *   tooltip                                                    1
 *   pouce de switch / piste off                                1
 *                                                          total 78
 *
 * Un écart au seuil AA (ou HC pour high-contrast) est un échec. Les minimums
 * du tableau 5.5 sont comparés avec une tolérance de 0.10 (le tableau est
 * mesuré, pas recalculé) ; le calculé ne descend jamais sous le tableau.
 *
 *   node packages/tokens/scripts/check-contrasts.mjs
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { contrast, loadSources } from './lib/tokens-lib.mjs'
import { buildMaps, comboOklch } from './lib/resolve.mjs'

const pkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const maps = buildMaps(loadSources(path.join(pkgDir, 'src')))
const col = (tok, theme, brand = 'monority') => comboOklch(tok, theme, 'comfortable', brand, maps)

const SIX = ['--mr-bg-canvas', '--mr-bg-surface', '--mr-bg-raised', '--mr-bg-sunken', '--mr-bg-hover', '--mr-bg-overlay']
const FOUR = ['--mr-bg-surface', '--mr-bg-raised', '--mr-bg-sunken', '--mr-bg-hover']
const ACCENT_SIX = ['--mr-bg-canvas', '--mr-bg-surface', '--mr-bg-raised', '--mr-bg-sunken', '--mr-bg-hover', '--mr-accent-subtle']
const TONES = ['success', 'warning', 'danger', 'info']
const THEMES = ['light', 'dark', 'oled', 'ocean', 'night', 'high-contrast']
const TABLE_THEMES = ['light', 'dark', 'oled', 'high-contrast']
const BRANDS = ['monority', 'studio']

// [clé tableau 5.5, fg, fonds, seuil AA, seuil high-contrast]
const PAIRS = [
    ['primary', '--mr-text-primary', SIX, 7, 7],
    ['secondary', '--mr-text-secondary', SIX, 4.5, 7],
    ['tertiary', '--mr-text-tertiary', SIX, 4.5, 7],
    ['disabled', '--mr-text-disabled', SIX, 3, 4.5],
    ['accent', '--mr-accent-text', ACCENT_SIX, 4.5, 7],
    ['focus', '--mr-focus-color', SIX, 3, 4.5],
    ['border', '--mr-border-control', FOUR, 3, 7],
    ['onaccent', '--mr-on-accent', ['--mr-accent', '--mr-accent-hover', '--mr-accent-active'], 4.5, 7],
    ['ondanger', '--mr-on-danger-solid', ['--mr-danger-solid'], 4.5, 7],
    ...TONES.flatMap((tone) => [
        [tone, `--mr-${tone}-text`, [...SIX, `--mr-${tone}-subtle`], 4.5, 7],
        [`primary-${tone}`, '--mr-text-primary', [`--mr-${tone}-subtle`], 7, 7],
    ]),
    ['tooltip', '--mr-tooltip-text', ['--mr-tooltip-bg'], 7, 7],
    ['switch', '--mr-switch-thumb-off', ['--mr-border-control'], 3, 3],
]

// Minimums du tableau 5.5 : [light, dark, oled, high-contrast, studio]
const TABLE = {
    primary: [14.72, 12.1, 14.82, 16.77, 12.13],
    secondary: [6.59, 7.29, 8.93, 11.06, 6.6],
    tertiary: [4.88, 5.11, 6.25, 8.8, 4.89],
    disabled: [3.09, 3.18, 3.9, 4.87, 3.1],
    accent: [5.14, 8.02, 9.46, 7.81, 5.36],
    focus: [3.97, 8.13, 9.95, 10.84, 4.15],
    border: [3.15, 3.12, 3.1, 11.06, 3.09],
    onaccent: [5.29, 9.41, 9.41, 8.81, 5.53],
    ondanger: [5.58, 7.43, 7.43, 9.19, 5.58],
    success: [5.5, 7.68, 9.16, 7.15, 5.49],
    warning: [5.29, 8.22, 9.74, 7.71, 5.29],
    danger: [5.16, 5.96, 7.3, 7.49, 5.15],
    info: [5.16, 6.79, 8.24, 7.59, 5.16],
    tooltip: [14.63, 14.72, 14.72, 20.57, 14.66],
    switch: [3.7, 3.88, 4.78, 13.57, 3.71],
}

const TOLERANCE = 0.1
const failures = []
let pairCount = 0
const mins = {}
for (const [key, fg, bgs, aa, hc] of PAIRS) {
    mins[key] = {}
    for (const theme of THEMES) {
        for (const brand of BRANDS) {
            const threshold = theme === 'high-contrast' ? hc : aa
            for (const bg of bgs) {
                pairCount++
                const ratio = contrast(col(fg, theme, brand), col(bg, theme, brand))
                const cell = `${theme}.${brand}`
                if (brand === 'monority') {
                    mins[key][theme] = Math.min(mins[key][theme] ?? Infinity, ratio)
                }
                if (ratio + 1e-9 < threshold) {
                    failures.push(`${key} ${cell} sur ${bg} : ${ratio.toFixed(2)} < seuil ${threshold}`)
                }
            }
        }
    }
}

for (const [key, expected] of Object.entries(TABLE)) {
    TABLE_THEMES.forEach((theme, i) => {
        const computed = mins[key][theme]
        if (computed + TOLERANCE < expected[i]) {
            failures.push(`tableau 5.5 ${key}/${theme} : calculé ${computed.toFixed(2)} < ${expected[i]}`)
        }
    })
    const studio = Math.min(
        ...TABLE_THEMES.flatMap((theme) =>
            PAIRS.filter(([k]) => k === key || k === `primary-${key}`).flatMap(([, fg, bgs]) =>
                bgs.map((bg) => contrast(col(fg, theme, 'studio'), col(bg, theme, 'studio'))),
            ),
        ),
    )
    if (studio + TOLERANCE < expected[4]) {
        failures.push(`tableau 5.5 ${key}/studio : calculé ${studio.toFixed(2)} < ${expected[4]}`)
    }
}

if (failures.length) {
    console.error(`X2 FAIL — ${failures.length} écart(s) sur ${pairCount} paires :`)
    for (const f of failures.slice(0, 30)) console.error('  ' + f)
    process.exit(1)
}
console.log(`X2 PASS — ${pairCount} paires, 0 échec (AA/HC + minimums 5.5 respectés)`)
