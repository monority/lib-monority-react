/**
 * Tests du registre de skips (PLAN.md 0.8).
 *
 * Chaque garde a sa fixture `.ok` et sa fixture `.nok`. Une garde qui cesse de
 * rejeter est un danger : elle laisserait passer un skip silencieux.
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { completedPhases, invalidEntries, skipCount, staleEntries } from './check-test-skips.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const fixture = (name) =>
    JSON.parse(fs.readFileSync(path.join(here, 'fixtures', 'test-skips', name), 'utf8'))
const raw = (name) => fs.readFileSync(path.join(here, 'fixtures', 'test-skips', name), 'utf8')

// --- Garde d) : raison et phase ---

test('POSITIF : un registre complet est accepté', () => {
    assert.deepEqual(invalidEntries(fixture('registry.ok.json')), [])
})

test('NÉGATIF d) : une entrée sans raison est refusée', () => {
    const bad = invalidEntries(fixture('registry.no-reason.json'))
    assert.equal(bad.length, 1)
    assert.match(bad[0].why, /raison absente/)
})

test('NÉGATIF d) : une entrée sans phase est refusée', () => {
    const bad = invalidEntries(fixture('registry.no-phase.json'))
    assert.equal(bad.length, 1)
    assert.match(bad[0].why, /blockedBy absent ou vide/)
})

test('NÉGATIF d) : une phase hors vocabulaire est refusée', () => {
    const bad = invalidEntries(fixture('registry.bad-phase.json'))
    assert.equal(bad.length, 1)
    assert.match(bad[0].why, /phase inconnue « 12 »/)
})

test('NÉGATIF d) : un doublon dans blockedBy est refusé', () => {
    const bad = invalidEntries(fixture('registry.dup-phase.json'))
    assert.equal(bad.length, 1)
    assert.match(bad[0].why, /doublon/)
})

// --- Garde c) : phases terminées ---

test('les phases cochées de PLAN.md sont lues', () => {
    const done = completedPhases(raw('plan.completed.md'))
    assert.deepEqual([...done].sort(), ['11a', '11b1'])
    assert.equal(done.has('11b2'), false, 'une phase non cochée n’est pas terminée')
})

test('POSITIF c) : un skip dont toutes les phases sont finies doit être signalé', () => {
    const done = completedPhases(raw('plan.completed.md'))
    const stale = staleEntries(fixture('registry.stale.json'), done)
    assert.equal(stale.length, 1, 'la garde doit exiger le retrait du skip')
    assert.match(stale[0], /est terminé/)
})

test('POSITIF c) : un skip encore bloqué par une phase en cours reste valide', () => {
    const done = completedPhases(raw('plan.completed.md'))
    assert.deepEqual(staleEntries(fixture('registry.ok.json'), done), [])
})

test('NÉGATIF c) : une listeVIDE de phases terminées ne déclencherait rien', () => {
    // Une phase terminée mais absente de PLAN.md n'est pas détectée : c'est
    // documenté, PLAN.md est la seule source de l'état d'avancement.
    const stale = staleEntries(fixture('registry.stale.json'), new Set())
    assert.deepEqual(stale, [])
})

// --- Compteur ---

test('le compteur compte les tests, pas les fichiers', () => {
    assert.equal(skipCount(fixture('registry.ok.json')), 1)
    const deux = {
        skippedTests: [
            { file: 'a.test.ts', tests: ['x', 'y'] },
            { file: 'b.test.ts', tests: ['z'] },
        ],
    }
    assert.equal(skipCount(deux), 3)
})

// --- Registre réel ---

test('le registre réel est valide et compte 4 tests', () => {
    const real = JSON.parse(fs.readFileSync(path.resolve(here, '../test-skips.json'), 'utf8'))
    assert.deepEqual(invalidEntries(real), [])
    assert.equal(skipCount(real), 4, 'les 4 tests bloqués doivent être déclarés')
})

test('chaque phase du registre réel appartient au vocabulaire de PLAN.md §7', () => {
    const real = JSON.parse(fs.readFileSync(path.resolve(here, '../test-skips.json'), 'utf8'))
    const phases = new Set()
    for (const e of real.skippedTests) for (const p of e.blockedBy) phases.add(p)
    assert.deepEqual([...phases].sort(), ['11b2', '11b4', '11c'])
})
