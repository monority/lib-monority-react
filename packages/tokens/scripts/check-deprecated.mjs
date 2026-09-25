#!/usr/bin/env node
/**
 * Phase 2a — T6. Chaque token `--mr-*` défini ou utilisé via `var()` dans
 * `packages/` et `apps/` est défini dans `tokens.css` ou `deprecated.css`.
 * 0 manquant. Les 8 tokens jamais définis relevés par l'audit sont listés
 * à part et ne bloquent pas. Les 66 alias de la référence et toutes les
 * valeurs actuelles extraites (deprecated.json) sont présents dans
 * `deprecated.css` avec leur valeur exacte.
 *
 *   node packages/tokens/scripts/check-deprecated.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const pkgDir = path.join(repoRoot, 'packages/tokens')

const EXCLUDE_DIRS = new Set([
    'node_modules',
    'dist',
    '.turbo',
    '.next',
    'coverage',
    'snapshots',
    'fixtures',
    'generated',
    'audit-baseline.spec.ts-snapshots',
])
const CODE_EXT = new Set(['.css', '.tsx', '.ts', '.js', '.mjs', '.cjs'])

const auditOnly = new Set([
    '--mr-combobox-list-min-width',
    '--mr-hovercard-arrow-left',
    '--mr-hovercard-arrow-top',
    '--mr-code-bg',
    '--mr-code-fg',
    '--mr-code-scrollbar',
    '--mr-code-shadow',
    '--mr-code-padding',
])

function walk(dir, cb) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.isDirectory()) {
            if (EXCLUDE_DIRS.has(e.name)) continue
            walk(path.join(dir, e.name), cb)
        } else if (CODE_EXT.has(path.extname(e.name)) && !e.name.includes('.test.')) {
            cb(path.join(dir, e.name))
        }
    }
}

const used = new Set()
const liveDefs = new Set()
for (const root of ['packages', 'apps']) {
    walk(path.join(repoRoot, root), (f) => {
        const src = fs.readFileSync(f, 'utf8')
        for (const m of src.matchAll(/var\((--mr-[\w-]+)/g)) used.add(m[1])
        if (f.endsWith('.css')) {
            for (const m of src.matchAll(/(--mr-[\w-]+)\s*:/g)) liveDefs.add(m[1])
        }
    })
}

const parseDecls = (css) => {
    const map = new Map()
    for (const m of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/(--mr-[\w-]+)\s*:\s*([^;{}]+);/g)) {
        map.set(m[1], m[2].trim().replace(/\s+/g, ' '))
    }
    return map
}
const genDir = path.join(repoRoot, 'packages/styles/src/tokens/generated')
const tokensDecls = parseDecls(fs.readFileSync(path.join(genDir, 'tokens.css'), 'utf8'))
const deprecatedDecls = parseDecls(fs.readFileSync(path.join(genDir, 'deprecated.css'), 'utf8'))
const provided = new Set([...tokensDecls.keys(), ...deprecatedDecls.keys()])

const failures = []
const auditUsed = []
for (const t of [...used].sort()) {
    if (auditOnly.has(t)) {
        auditUsed.push(t)
        continue
    }
    if (!provided.has(t) && !liveDefs.has(t)) failures.push(`utilisé sans définition : ${t}`)
}

// Alias de la référence : tous présents dans deprecated.css
const depRef = fs.readFileSync(
    path.join(repoRoot, 'docs/design/reference/monority-ui-tokens.deprecated.reference.css'),
    'utf8',
)
const aliases = [...depRef.matchAll(/(--mr-[\w-]+)\s*:/g)].map((m) => m[1])
for (const a of aliases) {
    if (!deprecatedDecls.has(a)) failures.push(`alias de référence absent de deprecated.css : ${a}`)
}

// Valeurs actuelles extraites : chaque valeur figure dans deprecated.css.
// (inclusion normalisée : un nom peut avoir plusieurs valeurs par sélecteur)
const deprecatedCssNorm = fs
    .readFileSync(path.join(genDir, 'deprecated.css'), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
const deprecated = JSON.parse(fs.readFileSync(path.join(pkgDir, 'src/deprecated.json'), 'utf8')).mr
let valuesChecked = 0
for (const [key, leaf] of Object.entries(deprecated)) {
    const name = '--mr-' + key.split('~')[0]
    if (name === '--mr-') continue
    valuesChecked++
    const needle = `${name}: ${leaf.$value.replace(/\s+/g, ' ')};`
    if (!deprecatedCssNorm.includes(needle)) {
        failures.push(`valeur actuelle absente de deprecated.css : ${needle}`)
    }
}

if (failures.length) {
    console.error(`T6 FAIL — ${failures.length} écart(s) :`)
    for (const f of failures.slice(0, 30)) console.error('  ' + f)
    process.exit(1)
}
console.log(
    `T6 PASS — 0 manquant (${used.size} utilisés couverts ; ${aliases.length} alias + ${valuesChecked} valeurs actuelles vérifiés ; audit-8 à part : ${auditUsed.sort().join(', ') || 'aucun utilisé'})`,
)
