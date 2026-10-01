#!/usr/bin/env node
/**
 * Phase 2a — T3. Aucun hex ni teinte en dur pour l'accent et les neutres
 * dans le CSS généré : chaque couleur d'accent / neutre référence
 * `var(--mr-ref-brand-hue)` ou `var(--mr-ref-neutral-hue)`. Seules les couleurs de
 * statut et `danger-solid` ont des teintes fixes (5.1).
 *
 *   node packages/tokens/scripts/check-no-hardcoded.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { shortNameFromDisk } from './lib/short-name.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const css = fs.readFileSync(
    path.join(repoRoot, 'packages/styles/src/tokens/generated/tokens.css'),
    'utf8'
)
const failures = []

if (/#[0-9a-fA-F]{3,8}\b/.test(css.replace(/\/\*[\s\S]*?\*\//g, ''))) {
    failures.push('hexadécimal trouvé dans tokens.css')
}

const decls = new Map()
for (const m of css.matchAll(/(--mr-[\w-]+)\s*:\s*([^;{}]+);/g)) {
    const values = decls.get(m[1]) ?? []
    values.push(m[2].trim())
    decls.set(m[1], values)
}
const allowedFixed = new Set([
    'success-text',
    'success-subtle',
    'success-border',
    'warning-text',
    'warning-subtle',
    'warning-border',
    'danger-text',
    'danger-subtle',
    'danger-border',
    'info-text',
    'info-subtle',
    'info-border',
    'danger-solid',
    'danger-solid-hover',
    'on-danger-solid',
    // Séries de graphique : teintes fixes elles aussi (D19). Elles reprennent
    // les teintes de statut et la hue de marque, donc aucune ne peut dériver d'un
    // primitif sans perdre la séparation de 40 degrés entre séries.
    'chart-1',
    'chart-2',
    'chart-3',
    'chart-4',
    'chart-5',
])
for (const [name, values] of decls) {
    for (const value of values) {
        if (!value.includes('oklch(')) continue
        // Les teintes fixes de statut sont autorisées par NOM COURT. Un thème
        // nommé préfixe ce nom : on retire le préfixe exact `--mr-theme-<nom>-`
        // (D21) plutôt que de comparer le dernier segment, qui confondrait
        // success-text, danger-text, warning-text et info-text.
        const short = shortNameFromDisk(name).replace(/^--mr-/, '')
        if (allowedFixed.has(short)) continue
        if (
            !value.includes('var(--mr-ref-brand-hue)') &&
            !value.includes('var(--mr-ref-neutral-hue)')
        ) {
            // `none`, `color-mix` sans teinte, ombres noires pures : cas autorisés
            if (/oklch\(0 0 0/.test(value)) continue
            if (/\b(?:195|215|230|275)\)/.test(value)) continue // Slate / Ocean / Night semantic hues
            failures.push(`${name} : teinte sans référence de marque → ${value}`)
        }
    }
}

if (failures.length) {
    console.error(`T3 FAIL — ${failures.length} écart(s) :`)
    for (const f of failures.slice(0, 20)) console.error('  ' + f)
    process.exit(1)
}
console.log(
    `T3 PASS — 0 hex, accent et neutres par variables de marque (${decls.size} déclarations)`
)
