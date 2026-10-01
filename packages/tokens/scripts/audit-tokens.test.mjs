/**
 * Tests de l'audit du graphe de tokens (étape 0.9).
 *
 * Un audit de cycles qui ne détecte pas un cycle ne protège rien : chaque
 * détection a donc sa fixture. Le graphe est injecté, aucun accès disque.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildGraph, findCycles, findLevelViolations, levelOf } from './audit-tokens.mjs'

/** Graphe depuis une description `{ token: [refs] }`. */
const graphOf = (spec) => new Map(Object.entries(spec))

// --- Niveaux ---

test('un primitif et un token global sont reconnus', () => {
    assert.equal(levelOf('--mr-ref-brand-hue'), 'primitif')
    assert.equal(levelOf('--mr-ref-radius-scale'), 'primitif')
    assert.equal(levelOf('--mr-bg-canvas'), 'global')
    assert.equal(levelOf('--mr-spacing-4'), 'global')
})

// --- Cycles ---

test('POSITIF : un graphe sans cycle ne signale rien', () => {
    const graph = graphOf({
        '--mr-ref-brand-hue': [],
        '--mr-accent': ['--mr-ref-brand-hue'],
        '--mr-accent-hover': ['--mr-accent'],
    })
    assert.deepEqual(findCycles(graph), [])
})

test('NÉGATIF : un cycle direct est détecté', () => {
    const graph = graphOf({ '--mr-a': ['--mr-a'], '--mr-b': [] })
    const cycles = findCycles(graph)
    assert.equal(cycles.length, 1)
    assert.deepEqual(cycles[0], ['--mr-a', '--mr-a'])
})

test('NÉGATIF : un cycle indirect de deux nœuds est détecté', () => {
    const graph = graphOf({
        '--mr-a': ['--mr-b'],
        '--mr-b': ['--mr-a'],
        '--mr-c': [],
    })
    const cycles = findCycles(graph)
    assert.equal(cycles.length, 1, `cycles détectés : ${JSON.stringify(cycles)}`)
    assert.ok(cycles[0].includes('--mr-a') && cycles[0].includes('--mr-b'))
})

test('NÉGATIF : un cycle de trois nœuds est détecté', () => {
    const graph = graphOf({
        '--mr-a': ['--mr-b'],
        '--mr-b': ['--mr-c'],
        '--mr-c': ['--mr-a'],
    })
    assert.equal(findCycles(graph).length, 1)
})

test("un cycle rapporté deux fois par des parcours différents n'est compté qu'une fois", () => {
    const graph = graphOf({
        '--mr-a': ['--mr-b'],
        '--mr-b': ['--mr-a'],
        '--mr-c': ['--mr-a'],
        '--mr-d': ['--mr-b'],
    })
    assert.equal(findCycles(graph).length, 1, 'même cycle, deux entrées : une seule fois')
})

test('une référence vers un token externe ne crée pas de cycle', () => {
    const graph = graphOf({ '--mr-a': ['--mr-token-inexistant'] })
    assert.deepEqual(findCycles(graph), [], 'un token absent du graphe ne crée pas de cycle')
})

test('le graphe est construit depuis les var() des valeurs', () => {
    const leaves = new Map([
        ['--mr-a', { file: 'core.json', value: 'var(--mr-b) var(--mr-c)', scope: 'root' }],
        ['--mr-b', { file: 'core.json', value: '4px', scope: 'root' }],
    ])
    const graph = buildGraph(leaves)
    assert.deepEqual(graph.get('--mr-a'), ['--mr-b', '--mr-c'])
    assert.deepEqual(graph.get('--mr-b'), [])
})

// --- Violations de niveau ---

test('POSITIF : un token global qui référence un primitif est autorisé', () => {
    const graph = graphOf({ '--mr-accent': ['--mr-ref-brand-hue'] })
    assert.deepEqual(findLevelViolations(graph), [])
})

test('POSITIF : un token global qui référence un autre global est autorisé', () => {
    const graph = graphOf({ '--mr-accent-hover': ['--mr-accent'] })
    assert.deepEqual(findLevelViolations(graph), [])
})

test('NÉGATIF : un primitif qui référence un autre primitif est signalé', () => {
    const graph = graphOf({
        '--mr-ref-brand-hue': ['--mr-ref-brand-chroma'],
        '--mr-ref-brand-chroma': [],
    })
    const violations = findLevelViolations(graph)
    assert.equal(violations.length, 1, 'ROADMAP §4.1 : un primitif ne référence rien')
    assert.equal(violations[0].kind, 'primitif-vers-primitif')
    assert.equal(violations[0].from, '--mr-ref-brand-hue')
    assert.equal(violations[0].to, '--mr-ref-brand-chroma')
})

test("NÉGATIF : une référence externe n'est pas une violation", () => {
    const graph = graphOf({ '--mr-a': ['--mr-hors-graphe'] })
    assert.deepEqual(findLevelViolations(graph), [])
})
