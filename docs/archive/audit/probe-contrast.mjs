/** Sonde X2 : calcule des candidats de paires et compare aux minimums du tableau 5.5. */
import { loadSources } from './lib/tokens-lib.mjs'
import { buildMaps, comboValue } from './lib/resolve.mjs'
import { contrast } from './lib/tokens-lib.mjs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const pkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sources = loadSources(path.join(pkgDir, 'src'))
const maps = buildMaps(sources)

const val = (tok, theme, brand = 'monority') => comboValue(tok, theme, 'comfortable', brand, maps)
const ratio = (fg, bg, theme, brand) => contrast(val(fg, theme, brand), val(bg, theme, brand))
const minOver = (fg, bgs, theme, brand = 'monority') =>
    Math.min(...bgs.map((b) => ratio(fg, b, theme, brand)))

const SIX = [
    '--mr-bg-canvas',
    '--mr-bg-surface',
    '--mr-bg-raised',
    '--mr-bg-sunken',
    '--mr-bg-hover',
    '--mr-bg-overlay',
]

// statuts : candidats d'ensembles de fonds
for (const theme of ['light', 'dark', 'oled', 'high-contrast']) {
    console.log(`--- ${theme} ---`)
    for (const [tone, sub] of [
        ['success', '--mr-success-subtle'],
        ['warning', '--mr-warning-subtle'],
        ['danger', '--mr-danger-subtle'],
        ['info', '--mr-info-subtle'],
    ]) {
        const fg = `--mr-${tone}-text`
        const six = Math.min(minOver(fg, SIX, theme), ratio(fg, sub, theme))
        const eight = Math.min(minOver(fg, [...SIX, '--mr-bg-active', sub], theme))
        console.log(`${tone}: six+subtle=${six.toFixed(2)} eight=${eight.toFixed(2)}`)
    }
    console.log(
        'focus/canvas:',
        ratio('--mr-focus-color', '--mr-bg-canvas', theme).toFixed(2),
        'focus/min6:',
        minOver('--mr-focus-color', SIX, theme).toFixed(2)
    )
    for (const bg of [
        '--mr-bg-hover',
        '--mr-bg-sunken',
        '--mr-bg-canvas',
        '--mr-border-control',
        '--mr-bg-active',
    ]) {
        console.log(`switch thumb vs ${bg}:`, ratio('--mr-switch-thumb-off', bg, theme).toFixed(2))
    }
}
