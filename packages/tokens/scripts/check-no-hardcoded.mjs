#!/usr/bin/env node
/**
 * Phase 2a — T3. Aucun hex ni teinte en dur pour l'accent et les neutres
 * dans le CSS généré : chaque couleur d'accent / neutre référence
 * `var(--mr-brand-hue)` ou `var(--mr-neutral-hue)`. Seules les couleurs de
 * statut et `danger-solid` ont des teintes fixes (5.1).
 *
 *   node packages/tokens/scripts/check-no-hardcoded.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const css = fs.readFileSync(
    path.join(repoRoot, 'packages/styles/src/tokens/generated/tokens.css'),
    'utf8',
)
const failures = []

if (/#[0-9a-fA-F]{3,8}\b/.test(css.replace(/\/\*[\s\S]*?\*\//g, ''))) {
    failures.push('hexadécimal trouvé dans tokens.css')
}

const decls = new Map()
for (const m of css.matchAll(/(--mr-[\w-]+)\s*:\s*([^;{}]+);/g)) {
    decls.set(m[1], m[2].trim())
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
])
for (const [name, value] of decls) {
    if (!value.includes('oklch(')) continue
    const short = name.replace(/^--mr-/, '')
    if (allowedFixed.has(short)) continue
    if (!value.includes('var(--mr-brand-hue)') && !value.includes('var(--mr-neutral-hue)')) {
        // `none`, `color-mix` sans teinte, ombres noires pures : cas autorisés
        if (/oklch\(0 0 0/.test(value)) continue
        failures.push(`${name} : teinte sans référence de marque → ${value}`)
    }
}

if (failures.length) {
    console.error(`T3 FAIL — ${failures.length} écart(s) :`)
    for (const f of failures.slice(0, 20)) console.error('  ' + f)
    process.exit(1)
}
console.log(`T3 PASS — 0 hex, accent et neutres par variables de marque (${decls.size} déclarations)`)
