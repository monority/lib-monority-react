#!/usr/bin/env node
/**
 * Grille phases 1a / 1b — S3 (version tête de phase 1b).
 * Vérifie que chaque token `--mr-*` cité dans docs/design/components/*.md
 * respecte la règle de tête de phase 1b :
 * - hors section « Écarts avec l'existant » : seuls les tokens définis dans
 *   l'un des deux fichiers de référence sont acceptés ;
 * - dans « Écarts », hors colonne « Actuel » : référence + 8 tokens d'audit
 *   (inexistants par conception, cités comme à supprimer/remplacer) ;
 * - colonne « Actuel » des tableaux « Écarts » uniquement : référence +
 *   audit + tokens d'état actuel (définis dans `packages/styles/src`,
 *   cités comme état à migrer, jamais comme cible).
 *
 *   node docs/design/audit/check-s3.mjs
 *
 * Exclusion : préfixes génériques (mentions en joker se terminant par « - »,
 * ex. `--mr-spacing-`) cités comme famille plutôt que token concret.
 * Sortie : "S3 PASS — 0 token inconnu" ou liste (code 1).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const read = (p) => fs.readFileSync(path.join(repoRoot, p), 'utf8')

const reference = read('docs/design/reference/monority-ui-tokens.reference.css')
const deprecated = read('docs/design/reference/monority-ui-tokens.deprecated.reference.css')
const known = new Set(
    [...(reference + deprecated).matchAll(/(--mr-[\w-]+)\s*:/g)].map((m) => m[1]),
)

// Tokens encore définis dans le dépôt (état actuel avant refonte).
const legacy = new Set()
const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) walk(full)
        else if (entry.name.endsWith('.css')) {
            for (const m of fs.readFileSync(full, 'utf8').matchAll(/(--mr-[\w-]+)\s*:/g)) {
                legacy.add(m[1])
            }
        }
    }
}
walk(path.join(repoRoot, 'packages/styles/src'))
for (const t of known) legacy.delete(t)

// Tokens audit : inexistants par conception, cités uniquement en « Écarts ».
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

const tokensOf = (text) =>
    [...text.matchAll(/--mr-[\w-]+-?/g)].map((m) => m[0]).filter((t) => !t.endsWith('-'))

const dir = path.join(repoRoot, 'docs/design/components')
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')) : []
const failures = []
let legacyCited = new Set()

for (const file of files) {
    const src = fs.readFileSync(path.join(dir, file), 'utf8')
    const ecartsIdx = src.indexOf("## Écarts avec l'existant")
    const critIdx = src.indexOf('## Critères de vérification', ecartsIdx)
    if (ecartsIdx < 0 || critIdx < 0) {
        failures.push(`${file} : section « Écarts avec l'existant » introuvable`)
        continue
    }
    const outside = src.slice(0, ecartsIdx) + src.slice(critIdx)
    const ecarts = src.slice(ecartsIdx, critIdx)

    // Colonne « Actuel » = première cellule de chaque ligne de tableau
    // (hors ligne d'en-tête et séparateur).
    const rows = ecarts.split('\n').filter((l) => l.trim().startsWith('|')).slice(2)
    const actuelText = rows.map((r) => (r.split('|')[1] ?? '')).join('\n')
    const actuelTokens = new Set(tokensOf(actuelText))
    const ecartsTokens = tokensOf(ecarts)

    for (const token of new Set(tokensOf(outside))) {
        if (known.has(token)) continue
        failures.push(`${file} : ${token} hors « Écarts », absent des deux fichiers de référence`)
    }
    for (const token of new Set(ecartsTokens)) {
        if (known.has(token)) continue
        if (actuelTokens.has(token)) {
            if (auditOnly.has(token) || legacy.has(token)) {
                if (legacy.has(token)) legacyCited.add(token)
                continue
            }
            failures.push(`${file} : ${token} en colonne « Actuel », ni référence ni état actuel`)
        } else if (auditOnly.has(token)) {
            continue
        } else {
            failures.push(`${file} : ${token} en « Écarts » hors colonne « Actuel », absent des références`)
        }
    }
}

if (files.length === 0) {
    console.error('S3 FAIL — aucun fichier de spec dans docs/design/components/')
    process.exit(1)
}
if (failures.length) {
    console.error(`S3 FAIL — ${failures.length} écart(s) :`)
    for (const f of failures) console.error('  ' + f)
    process.exit(1)
}
console.log(
    `S3 PASS — ${files.length} specs, 0 token inconnu (${legacyCited.size} tokens d'état actuel cités en colonne « Actuel » : ${[...legacyCited].sort().join(', ') || 'aucun'})`,
)
