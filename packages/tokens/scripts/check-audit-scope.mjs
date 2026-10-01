#!/usr/bin/env node
/**
 * `pnpm audit:scope` — preuve que le périmètre d'audit est réel.
 *
 * DeuxRequirements de la phase 0.12, vérifiées par exécution :
 *  1. un grep NON FILTRÉ trouve encore les anciens noms de primitives dans les
 *     deux archives — sinon l'exclusion ne prouve rien ;
 *  2. un grep FILTRÉ par `audit-exclusions.json` n'en trouve aucun, et ne
 *     trouve rien non plus hors des archives ;
 *  3. toute exclusion sans raison est refusée.
 *
 *   node packages/tokens/scripts/audit-scope.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
    EXCLUSIONS,
    MIGRATION_DOCS,
    grepExclusionsWithMigrationDocs,
    isExcluded,
    isMigrationDoc,
    validateExclusions,
} from './lib/audit-scope.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

const OLD_NAMES = [
    '--mr-brand-hue',
    '--mr-brand-chroma',
    '--mr-neutral-hue',
    '--mr-neutral-chroma',
    '--mr-font-sans',
    '--mr-font-mono',
    '--mr-radius-scale',
]

/** Fichiers suivis, hors dépendances. */
const tracked = (await import('node:child_process'))
    .execSync('git ls-files', { cwd: repoRoot, encoding: 'utf8', maxBuffer: 1e8 })
    .split('\n')
    .filter(Boolean)

const failures = []

// --- 0. Toute exclusion porte une raison ---
const sansRaison = validateExclusions()
if (sansRaison.length) {
    failures.push(
        `audit-exclusions.json : ${sansRaison.length} entrée(s) sans raison (exclusion non motivée = dette invisible)`
    )
}

// --- 1. Les archives contiennent-elles bien les anciens noms ? ---
console.log("ARCHIVES — doivent contenir les anciens noms (état d'avant) :")
for (const entry of EXCLUSIONS.exclusions) {
    const abs = path.join(repoRoot, entry.path)
    if (!fs.existsSync(abs)) {
        failures.push(`archive introuvable : ${entry.path}`)
        continue
    }
    const source = fs.readFileSync(abs, 'utf8')
    const found = OLD_NAMES.filter((n) => source.includes(n))
    const ok = found.length > 0
    if (!ok)
        failures.push(`archive sans ancien nom : ${entry.path} — l'exclusion ne prouve plus rien`)
    console.log(
        `  ${ok ? 'OK ' : 'KO '} ${entry.path} : ${found.length}/${OLD_NAMES.length} anciens noms`
    )
}

// --- 2. Hors archives, aucun ancien nom ne doit subsister ---
console.log('\nHORS ARCHIVES — aucun ancien nom ne doit subsister :')
const archivePaths = new Set(EXCLUSIONS.exclusions.map((e) => e.path))
const residue = []
for (const file of tracked) {
    if (archivePaths.has(file)) continue
    if (isExcluded(file)) continue
    if (isMigrationDoc(file)) continue
    if (!/\.(css|tsx|ts|json|mjs|md)$/.test(file)) continue
    let source
    try {
        source = fs.readFileSync(path.join(repoRoot, file), 'utf8')
    } catch {
        continue
    }
    const found = OLD_NAMES.filter((n) => source.includes(n))
    if (found.length) residue.push({ file, found })
}
for (const { file, found } of residue) {
    failures.push(`${file} : ${found.join(', ')}`)
}
console.log(
    `  ${residue.length === 0 ? 'OK ' : 'KO '} ${tracked.length - archivePaths.size} fichiers auscultés, ` +
        `${residue.length} résidu(s)`
)
for (const { file, found } of residue.slice(0, 10))
    console.log(`      ${file} : ${found.join(', ')}`)

// --- 3. Le motif d'exclusion du grep est bien construit ---
const patterns = grepExclusionsWithMigrationDocs()
console.log('\nMOTIF DE GREP — archives + documents de migration :')
console.log(`  ${patterns.join(' ')}`)
const expectedCount = EXCLUSIONS.exclusions.length + MIGRATION_DOCS.length
if (patterns.length !== expectedCount) {
    failures.push(
        `le motif de grep rend ${patterns.length} motif(s) pour ` +
            `${expectedCount} entrée(s) déclarée(s)`
    )
}
for (const entry of [...EXCLUSIONS.exclusions, ...MIGRATION_DOCS]) {
    if (!patterns.includes(`:(exclude)${entry.path}`)) {
        failures.push(`le motif de grep ne couvre pas : ${entry.path}`)
    }
}

if (failures.length) {
    console.error(`\naudit:scope FAIL — ${failures.length} écart(s) :`)
    for (const f of failures) console.error(`  ${f}`)
    process.exit(1)
}
console.log(
    `\naudit:scope PASS — ${archivePaths.size} archive(s) motivées, ` +
        `0 résidu hors archives, motif de grep cohérent.`
)
