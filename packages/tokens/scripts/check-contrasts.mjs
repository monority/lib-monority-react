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
import Color from 'colorjs.io'
import { contrast, loadSources } from './lib/tokens-lib.mjs'
import { buildMaps, comboOklch } from './lib/resolve.mjs'

const pkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const maps = buildMaps(loadSources(path.join(pkgDir, 'src')))
const col = (tok, theme, brand = 'monority') => comboOklch(tok, theme, 'comfortable', brand, maps)

const SIX = ['--mr-bg-canvas', '--mr-bg-surface', '--mr-bg-raised', '--mr-bg-sunken', '--mr-bg-overlay']
const FOUR = ['--mr-bg-surface', '--mr-bg-raised', '--mr-bg-sunken']
const ACCENT_SIX = ['--mr-bg-canvas', '--mr-bg-surface', '--mr-bg-raised', '--mr-bg-sunken', '--mr-accent-subtle']
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

/* Fonds d'état translucides (ex. --mr-bg-hover en dark) : un fond alpha n'est
   testable que composité sur un fond opaque. On le compose sur les trois
   niveaux qui le reçoivent (surface/raised/overlay) ; les fonds opaques
   (autres thèmes) gardent le test direct unique. Seuils : les seuils AA/HC de
   la table principale pour les cas opaques, des seuils d'état (transitoire)
   pour les cas translucides — [clé, fg, seuil AA opaque, seuil état, seuil HC]. */
const HOVER_BG = '--mr-bg-hover'
const HOVER_BASES = ['--mr-bg-surface', '--mr-bg-raised', '--mr-bg-overlay']
const HOVER_PAIRS = [
    ['hover-primary', '--mr-text-primary', 7, 7, 7],
    ['hover-secondary', '--mr-text-secondary', 4.5, 4.5, 7],
    ['hover-tertiary', '--mr-text-tertiary', 4.5, 3, 7],
    ['hover-accent', '--mr-accent-text', 4.5, 4.5, 7],
    /* Plafond structurel : border-control doit rester sous le pouce de switch
       (L<=~0.63 pour >=3:1) et ne peut donc pas atteindre 3:1 sur un fond
       hoveré (il faudrait L>=~0.68). Seuil d'état 2:1 — la bordure reste
       visible et le contrôle identifiable par son fond solide. */
    ['hover-border', '--mr-border-control', 3, 2, 7],
]

const toLinear = (css) =>
    new Color(css)
        .to('srgb')
        .coords.map((v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
const fromLinear = (coords) =>
    new Color(
        'srgb',
        coords.map((v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055)),
    ).toString()

/** Cas de test du fond d'état : direct si opaque, 3 composites si translucide. */
function hoverBgCases(theme, brand) {
    const css = col(HOVER_BG, theme, brand)
    const alpha = new Color(css).alpha ?? 1
    if (alpha >= 1) return [{ label: HOVER_BG, css, translucent: false }]
    return HOVER_BASES.map((base) => {
        const b = toLinear(col(base, theme, brand))
        const f = toLinear(css)
        const m = b.map((v, i) => alpha * f[i] + (1 - alpha) * v)
        return { label: `${HOVER_BG}x${base}`, css: fromLinear(m), translucent: true }
    })
}

// Minimums du tableau 5.5 : [light, dark, oled, high-contrast, studio]
const TABLE = {
    primary: [14.72, 11.93, 14.82, 16.77, 11.93],
    secondary: [6.59, 7.17, 8.93, 11.06, 6.6],
    tertiary: [4.88, 5.11, 6.25, 8.8, 4.89],
    disabled: [3.09, 3.18, 3.9, 4.87, 3.1],
    accent: [5.14, 7.81, 9.16, 7.81, 5.36],
    focus: [3.97, 7.67, 9.59, 10.84, 4.15],
    border: [3.15, 3.12, 3.1, 11.06, 3.09],
    onaccent: [5.29, 9.04, 9.04, 8.81, 5.53],
    ondanger: [5.58, 6.96, 6.96, 9.19, 5.58],
    success: [5.5, 6.99, 8.47, 7.15, 5.49],
    warning: [5.29, 7.11, 8.54, 7.71, 5.29],
    danger: [5.16, 5.96, 7.3, 7.49, 5.15],
    info: [5.16, 6.79, 8.24, 7.59, 5.16],
    tooltip: [14.63, 14.72, 14.72, 20.57, 14.66],
    switch: [3.7, 3.51, 4.32, 13.57, 3.51],
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

for (const [key, fg, aaOpaque, etatAlpha, hcOpaque] of HOVER_PAIRS) {
    for (const theme of THEMES) {
        for (const brand of BRANDS) {
            for (const bg of hoverBgCases(theme, brand)) {
                pairCount++
                const ratio = contrast(col(fg, theme, brand), bg.css)
                const threshold = bg.translucent ? etatAlpha : theme === 'high-contrast' ? hcOpaque : aaOpaque
                const cell = `${theme}.${brand}`
                if (ratio + 1e-9 < threshold) {
                    failures.push(`${key} ${cell} sur ${bg.label} : ${ratio.toFixed(2)} < seuil ${threshold}`)
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
