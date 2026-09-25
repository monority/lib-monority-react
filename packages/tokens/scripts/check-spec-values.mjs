#!/usr/bin/env node
/**
 * Phase 2a — S11. Chaque valeur des colonnes « Valeur comfortable » et
 * « Valeur compact » des tableaux « Dimensions » de docs/design/components/*.md
 * est comparée à resolved.json. 0 écart : un écart se corrige dans la spec,
 * jamais dans les tokens.
 *
 * Comparaison (le token résolu donne la vérité) :
 * - dimension `<n>px` : le premier nombre en px de la cellule doit être `<n>px` ;
 *   une paire « <n>px / <m>px » est acceptée (n = token, m = interligne associé) ;
 * - style typographique (raccourci `font`) : taille et interligne extraits du
 *   raccourci (rem → px) comparés aux deux premiers nombres de la cellule ;
 * - jetons de couleur dans une ligne de dimensions (largeur de bordure) :
 *   non comparables → ignorés et comptés à part ;
 * - rayons, ombres multiples, formules et pourcentages : ignorés.
 *
 *   node packages/tokens/scripts/check-spec-values.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const resolved = JSON.parse(
    fs.readFileSync(path.join(repoRoot, 'packages/tokens/dist/resolved.json'), 'utf8'),
)
const COMFORTABLE = 'light.comfortable.monority'
const COMPACT = 'light.compact.monority'

const px = (value) => {
    const rem = value.match(/^([\d.]+)rem$/)
    if (rem) return `${Math.round(parseFloat(rem[1]) * 16 * 1000) / 1000}px`
    const pxm = value.match(/^([\d.]+)px$/)
    if (pxm) return `${Number(pxm[1])}px`
    return null
}

/** Tailles attendues depuis une cellule de spec : [1er px, 2e px?]. */
const cellNumbers = (cell) => [...cell.matchAll(/(\d+(?:\.\d+)?)px/g)].map((m) => `${Number(m[1])}px`)

/** Valeurs attendues depuis le token résolu : null si non comparable. */
function tokenNumbers(value) {
    if (value.startsWith('#')) return { kind: 'couleur' }
    if (value === 'none') return null
    const font = value.match(
        /^(?:\d+\s+)?([\d.]+)(rem|px)\/([\d.]+)(rem|px)\s+/,
    )
    if (font) {
        return { kind: 'police', numbers: [px(`${font[1]}${font[2]}`), px(`${font[3]}${font[4]}`)] }
    }
    const single = px(value)
    if (single) return { kind: 'dimension', numbers: [single] }
    const multi = value.match(/\d+(?:\.\d+)?px|\d+(?:\.\d+)?rem/g)
    if (multi) return null // ombres multiples, formules : non comparables
    return null
}

const dir = path.join(repoRoot, 'docs/design/components')
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

const failures = []
let compared = 0
let ignoredColor = 0
let ignoredOther = 0

for (const file of files) {
    const src = fs.readFileSync(path.join(dir, file), 'utf8')
    const start = src.indexOf('## Dimensions')
    const end = src.indexOf('## États')
    if (start < 0 || end < 0) continue
    const rows = src
        .slice(start, end)
        .split('\n')
        .filter((l) => l.trim().startsWith('|'))
        .slice(2)

    for (const row of rows) {
        const cells = row.split('|').map((c) => c.trim())
        const [, , , tokenCell = '', comfortable = '', compact = ''] = cells
        const tokens = [...tokenCell.matchAll(/(--mr-[\w-]+)/g)].map((m) => m[1])
        // Raccourcis multi-tokens (« -sm/md/lg », « a / b ») et familles
        // (« --mr-spacing- ») : non comparables à un token unique.
        if (
            tokens.length !== 1 ||
            tokenCell.includes('/') ||
            tokens[0].endsWith('-') ||
            tokenCell.toLowerCase().startsWith('composite')
        ) {
            ignoredOther++
            continue
        }
        const token = tokens[0]
        for (const [cell, combo, label] of [
            [comfortable, COMFORTABLE, 'comfortable'],
            [compact, COMPACT, 'compact'],
        ]) {
            const expected = cellNumbers(cell)
            if (expected.length === 0) {
                ignoredOther++
                continue
            }
            const value = resolved.values[combo]?.[token]
            if (!value) {
                failures.push(`${file} : ${token} absent de resolved.json`)
                continue
            }
            const info = tokenNumbers(value)
            if (!info) {
                ignoredOther++
                continue
            }
            if (info.kind === 'couleur') {
                ignoredColor++
                continue
            }
            compared++
            const actual = expected.slice(0, info.numbers.length)
            if (actual.join('/') !== info.numbers.join('/')) {
                failures.push(
                    `${file} ${label} : ${token} → spec « ${actual.join(' / ')} », tokens « ${info.numbers.join(' / ')} »`,
                )
            }
        }
    }
}

if (failures.length) {
    console.error(`S11 FAIL — ${failures.length} écart(s) (${compared} valeurs comparées) :`)
    for (const f of failures.slice(0, 40)) console.error('  ' + f)
    process.exit(1)
}
console.log(
    `S11 PASS — ${compared} valeurs de specs identiques aux tokens résolus ` +
        `(${ignoredColor} largeurs de bordure sur jeton de couleur, ${ignoredOther} cellules non comparables)`,
)
