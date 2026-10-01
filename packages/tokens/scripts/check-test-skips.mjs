#!/usr/bin/env node
/**
 * `pnpm check:test-skips` — le registre des tests neutralisés (PLAN.md 0.8).
 *
 * Un skip non déclaré est un skip silencieux : l'interdit le protocole. Ce
 * contrôle rend le verrou vérifiable au lieu d'être une convention.
 *
 * Quatre gardes, chacune testée en négatif (fixture `.nok`) et en positif
 * (fixture `.ok`) dans `test-skips.test.mjs` :
 *
 *   a) un skip actif sans `packages/tokens/rebuild.json` → échec
 *   b) un skip absent du registre → échec
 *   c) toutes les phases `blockedBy` cochées dans PLAN.md, skip encore présent → échec
 *   d) une entrée de registre sans raison ou sans phase → échec
 *
 * Plus : le compteur de skips entre dans le cliquet, à la baisse seulement.
 *
 *   node packages/tokens/scripts/check-test-skips.mjs
 *   node packages/tokens/scripts/check-test-skips.mjs --update
 */
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const pkgDir = path.join(repoRoot, 'packages/tokens')
const LOCK = path.join(pkgDir, 'rebuild.json')
const REGISTRY = path.join(pkgDir, 'test-skips.json')
const BASELINE = path.join(repoRoot, 'audit-baseline.json')
const PLAN = path.join(repoRoot, 'PLAN.md')

const PHASE_RE = /^11b[1-5]$|^11c\+?$|^11z$/

const failures = []
const readJson = (abs) => JSON.parse(fs.readFileSync(abs, 'utf8'))

/** Garde a) : un skip actif exige le verrou. */
export const isRebuildLocked = () => {
    if (!fs.existsSync(LOCK)) return false
    try {
        return readJson(LOCK).active === true
    } catch {
        return false
    }
}

/** Garde d) : chaque entrée porte une raison et au moins une phase connue. */
export function invalidEntries(registry) {
    const bad = []
    for (const entry of registry.skippedTests ?? []) {
        if (!entry.file) bad.push({ entry, why: 'chemin absent' })
        if (!entry.reason || !entry.reason.trim())
            bad.push({ entry, why: `raison absente : ${entry.file}` })
        const phases = entry.blockedBy ?? []
        if (!Array.isArray(phases) || phases.length === 0)
            bad.push({ entry, why: `blockedBy absent ou vide : ${entry.file}` })
        for (const p of phases) {
            if (!PHASE_RE.test(p))
                bad.push({ entry, why: `phase inconnue « ${p} » : ${entry.file}` })
        }
        // La liste doit être ordonnée et sans doublon.
        if (new Set(phases).size !== phases.length)
            bad.push({ entry, why: `blockedBy contient un doublon : ${entry.file}` })
        if (!entry.tests || entry.tests.length === 0)
            bad.push({ entry, why: `aucun test listé : ${entry.file}` })
    }
    return bad
}

/** Étapes cochées de PLAN.md, sous forme d'identifiants `11b1`, `11z`… */
export function completedPhases(planSource) {
    const done = new Set()
    // Deux formes coexistent dans PLAN.md, les deux doivent être lues :
    //   `- [x] **11b2** Titre…`        (phase 0.x)
    //   `    - [x] 11b2. Titre…`      (étapes 11bN, listées avec un point)
    // On ancre sur le début de ligne : une mention de « 11b1 » dans une note
    // ne doit pas passer pour un état d'avancement.
    const bold = /^\s*-\s\[([ xX])\]\s\*\*(11[a-z0-9+]*)\*\*\s*\.?/gm
    const dotted = /^\s*-\s\[([ xX])\]\s(11[a-z0-9+]+)\.\s/gm
    for (const re of [bold, dotted]) {
        for (const m of planSource.matchAll(re)) {
            if (m[1].toLowerCase() === 'x') done.add(m[2])
        }
    }
    return done
}

/** Garde c) : un skip dont toutes les phases sont finies doit avoir disparu. */
export function staleEntries(registry, done) {
    const stale = []
    for (const entry of registry.skippedTests ?? []) {
        const phases = entry.blockedBy ?? []
        if (phases.length > 0 && phases.every((p) => done.has(p))) {
            stale.push(
                `${entry.file} : blockedBy [${phases.join(', ')}] est terminé, retirer le skip`
            )
        }
    }
    return stale
}

/** Nombre de tests listés au registre. */
export const skipCount = (registry) =>
    (registry.skippedTests ?? []).reduce((a, e) => a + (e.tests?.length ?? 0), 0)

// --- Exécution ---
const registry = readJson(REGISTRY)
const plan = fs.readFileSync(PLAN, 'utf8')
const locked = isRebuildLocked()

// Garde d)
for (const { entry, why } of invalidEntries(registry)) failures.push(why)

// Garde c)
const done = completedPhases(plan)
for (const line of staleEntries(registry, done)) failures.push(line)

// Garde a) : un skip actif sans verrou est interdit. Sans verrou, le registre
// doit être vide — sinon quelqu'un a figé des tests après la fin du chantier.
if (!locked) {
    const count = skipCount(registry)
    if (count > 0) {
        failures.push(
            `rebuild.json absent ou inactif alors que ${count} test(s) sont listés au registre. ` +
                'Soit le chantier est fini et les skips doivent être retirés, ' +
                'soit le verrou a été supprimé par accident.'
        )
    }
}

/**
 * Marqueurs de skip. `itRebuild` est le skip CONDITIONNEL de la reconstruction
 * (PLAN.md 0.8) : `itRebuild` vaut `it.skip` quand le verrou est actif, `it`
 * quand il est levé. Un `it.skip` en dur n'est pas accepté : il survivrait à la
 * suppression du verrou et ne prouverait plus rien.
 */
const SKIP_MARKER = /\b(?:it|test|describe)\.skip\b|skip:\s*true|\b(?:itRebuild|testRebuild)\s*\(/
/** Noms des helpers de skip conditionnel, pour les distinguer d'un skip en dur. */
const CONDITIONAL_HELPERS = /\b(?:itRebuild|testRebuild)\s*\(/
/** Fichiers de test : versionnés par git, plus ceux présents sur disque. */
export function testFiles(repoRoot) {
    const tracked = require('node:child_process')
        .execSync('git ls-files', { cwd: repoRoot, encoding: 'utf8', maxBuffer: 1e8 })
        .split('\n')
        .filter(Boolean)
    // Un fichier non suivi passe aussi par vitest : l'ignorer laisserait un
    // skip non déclaré invisible.
    const untracked = require('node:child_process')
        .execSync('git ls-files --others --exclude-standard', {
            cwd: repoRoot,
            encoding: 'utf8',
            maxBuffer: 1e8,
        })
        .split('\n')
        .filter(Boolean)
    return [...new Set([...tracked, ...untracked])].filter((f) => /\.(test|spec)\.[tj]sx?$/.test(f))
}

const declared = new Set()
for (const e of registry.skippedTests ?? []) {
    for (const t of e.tests ?? []) declared.add(`${e.file}::${t}`)
}

const found = []
/** Skips conditionnels au verrou : réactivés automatiquement à la levée. */
const conditionalKeys = new Set()
/** Skips en dur : un `it.skip` survit au verrou et ne prouve plus rien. */
const hardSkips = []
for (const file of testFiles(repoRoot)) {
    const abs = path.join(repoRoot, file)
    let source
    try {
        source = fs.readFileSync(abs, 'utf8')
    } catch {
        continue
    }
    if (!SKIP_MARKER.test(source)) continue
    let describe = ''
    // On retire les commentaires avant l'analyse : une explication de skip
    // mentionne `it(` et fausserait l'appariement avec le registre.
    const lines = source.split('\n').map((l) => l.replace(/\/\/.*$/, ''))
    for (let i = 0; i < lines.length; i++) {
        const d = lines[i].match(/describe\(['"]([^'"]+)['"]/)
        if (d) describe = d[1]
        // `\.\w+` tolère `.skip`, `.each`, `.concurrent` sans les énumérer.
        const t = lines[i].match(/\b(?:it|test|itRebuild|testRebuild)(?:\.\w+)?\(['"]([^'"]+)['"]/)
        if (!t) continue
        const conditional = CONDITIONAL_HELPERS.test(lines[i])
        const hardSkip = /\b(?:it|test|describe)\.skip\s*\(/.test(lines[i])
        const optionSkip = (lines[i + 1] ?? '').includes('skip: true')
        if (!conditional && !hardSkip && !optionSkip) continue
        const key = `${file}::${describe} > ${t[1]}`
        found.push(key)
        if (conditional) conditionalKeys.add(key)
        if (hardSkip || optionSkip) hardSkips.push(`${file} : ${key}`)
    }
}
for (const key of found) {
    if (!declared.has(key)) {
        failures.push(`skip non déclaré au registre : ${key}`)
    }
}
for (const key of declared) {
    if (!found.includes(key)) {
        failures.push(
            `registre obsolète : ${key} est déclaré skippé mais ne l'est plus dans le code`
        )
    }
}
// Un skip en dur n'est pas réactivé à la levée du verrou : on le refuse.
for (const line of hardSkips) {
    failures.push(
        `skip en dur : ${line} — utiliser duringRebuild(it) pour que le verrou conditionne le skip`
    )
}

// --- Cliquet ---
const count = skipCount(registry)
const baseline = fs.existsSync(BASELINE) ? readJson(BASELINE) : {}
const previous = baseline['test-skips']?.count
if (process.argv.includes('--update')) {
    baseline['test-skips'] = { count, files: (registry.skippedTests ?? []).length }
    fs.writeFileSync(BASELINE, JSON.stringify(baseline, null, 4) + '\n')
}

console.log(
    `Verrou de reconstruction : ${locked ? 'ACTIF (packages/tokens/rebuild.json)' : 'ABSENT'}`
)
console.log(`Registre : ${count} test(s) dans ${(registry.skippedTests ?? []).length} fichier(s)`)
console.log(`Skips actifs dans le code : ${found.length}`)
console.log(`  dont conditionnels au verrou : ${conditionalKeys.size}`)
if (hardSkips.length) console.log(`  dont skips en dur (refusés) : ${hardSkips.length}`)
console.log(`Phases terminées (PLAN.md) : ${[...done].join(', ') || 'aucune'}`)

if (failures.length) {
    console.error(`\ntest-skips FAIL — ${failures.length} écart(s) :`)
    for (const f of failures) console.error(`  ${f}`)
    process.exit(1)
}

if (previous !== undefined && count > previous) {
    console.error(
        `\ntest-skips RÉGRESSION — le compteur de skips augmente : ${previous} → ${count}. ` +
            'Un skip se justifie et ne se supprime pas silencieusement.'
    )
    process.exit(1)
}
if (previous !== undefined && count < previous) {
    console.log(`  amélioration : ${previous} → ${count} skip(s) réactivé(s)`)
}

console.log(`\ntest-skips PASS — ${count} skip(s) justifié(s), aucun skip silencieux.`)
