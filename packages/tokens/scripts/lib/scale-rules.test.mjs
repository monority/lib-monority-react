/**
 * Tests de la vérification des échelles (D15).
 *
 * Les plafonds sont lus dans `categories.json`. Chaque test injecte sa propre
 * famille : la détection est prouvée sans dépendre de l'état réel du système,
 * qui ne contient encore que les 7 primitives.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { SCALE_BY_FAMILY, checkCap, checkScale, decompose } from './scale-rules.mjs'

/** Familles de test, injectées : l'audit ne dépend pas du dépôt. */
const TEST = new Map([
    ['spacing', { family: 'spacing', stepType: 'numerique', steps: ['0', '1', '2', '4'], cap: 4 }],
    ['icon-size', { family: 'icon-size', stepType: 'nomme', steps: ['sm', 'md', 'lg'], cap: 3 }],
    [
        'spinner',
        {
            family: 'spinner',
            stepType: 'nomme',
            steps: ['sm', 'md', 'lg'],
            cap: 3,
            roles: ['size', 'ring'],
        },
    ],
    [
        'shadow',
        {
            family: 'shadow',
            stepType: 'nomme',
            steps: ['xs', 'sm'],
            cap: 2,
            roles: ['raised', 'focus'],
        },
    ],
    [
        'opacity',
        { family: 'opacity', stepType: 'role-seul', steps: [], cap: 0, roles: ['disabled'] },
    ],
])

// --- Décomposition ---

test('une famille à plusieurs segments est reconnue avant sa version courte', () => {
    const parts = decompose('--mr-icon-size-md', TEST)
    assert.equal(parts.family, 'icon-size', 'icon ne doit pas absorber « icon-size-md »')
    assert.equal(parts.step, 'md')
})

test('un rôle déclaré est le premier segment, pas le pas', () => {
    const parts = decompose('--mr-spinner-ring-md', TEST)
    assert.equal(parts.family, 'spinner')
    assert.equal(parts.role, 'ring')
    assert.equal(parts.step, 'md')
})

test('un token à rôle seul est décomposé sans pas', () => {
    const parts = decompose('--mr-opacity-disabled', TEST)
    assert.equal(parts.family, 'opacity')
    assert.equal(parts.role, 'disabled')
    assert.equal(parts.step, null)
})

test('une famille sans échelle déclarée est hors périmètre', () => {
    assert.equal(decompose('--mr-bg-canvas', TEST), null)
})

// --- Pas hors liste ---

test('POSITIF : un pas déclaré est accepté', () => {
    assert.equal(checkScale('--mr-spacing-4', TEST), null)
    assert.equal(checkScale('--mr-icon-size-lg', TEST), null)
})

test('NÉGATIF : un pas hors liste est refusé', () => {
    const reason = checkScale('--mr-spacing-99', TEST)
    assert.match(reason, /pas « 99 » hors liste/)
    assert.match(reason, /attendu : 0, 1, 2, 4/)
})

test('NÉGATIF : un pas nommé sur une famille numérique est refusé', () => {
    assert.match(checkScale('--mr-spacing-md', TEST), /hors liste/)
})

test('NÉGATIF : un pas numérique sur une famille nommée est refusé', () => {
    assert.match(checkScale('--mr-icon-size-14', TEST), /hors liste/)
})

test('NÉGATIF : bold est refusé sur font-weight, conformément à language.md §5.9', () => {
    const reason = checkScale('--mr-font-weight-bold', SCALE_BY_FAMILY)
    assert.match(reason, /hors liste pour la famille « font-weight »/)
    assert.match(reason, /regular, medium, semibold/)
})

// --- Rôle seul ---

test('POSITIF : un rôle seul est accepté (arbitrage du 2026-10-01)', () => {
    assert.equal(checkScale('--mr-opacity-disabled', TEST), null)
})

test('NÉGATIF : un pas sur une famille à rôle seul est refusé', () => {
    assert.match(checkScale('--mr-opacity-50', TEST), /est à rôle seul/)
})

// --- Rôle sans pas ---

test('POSITIF : un rôle sans pas est accepté', () => {
    assert.equal(checkScale('--mr-shadow-raised', TEST), null)
    assert.equal(checkScale('--mr-spinner-size', TEST), null)
})

// --- Noms sans pas ni rôle ---

test('NÉGATIF : un nom sans pas est refusé si la famille en a plusieurs', () => {
    assert.match(checkScale('--mr-icon-size', TEST), /n'en porte aucun/)
})

// --- Plafond ---

test('POSITIF : une famille sous son plafond est valide', () => {
    assert.equal(checkCap('spacing', TEST), null)
    assert.equal(checkCap('spinner', TEST), null)
})

test('NÉGATIF : un dépassement de plafond est détecté sur la déclaration', () => {
    const over = new Map([
        ['gap', { family: 'gap', stepType: 'nomme', steps: ['sm', 'md', 'lg', 'xl'], cap: 3 }],
    ])
    assert.match(checkCap('gap', over), /4 pas pour un plafond de 3/)
})

test('NÉGATIF : des pas en double sont détectés', () => {
    const dup = new Map([
        ['dup', { family: 'dup', stepType: 'nomme', steps: ['sm', 'md', 'sm'], cap: 3 }],
    ])
    assert.match(checkCap('dup', dup), /pas en double/)
})

test('NÉGATIF : une famille rôle-seul qui déclare des pas est refusée', () => {
    const bad = new Map([
        ['solo', { family: 'solo', stepType: 'role-seul', steps: ['sm'], cap: 0 }],
    ])
    assert.match(checkCap('solo', bad), /à rôle seul mais déclare 1 pas/)
})

// --- Cohérence du dépôt ---

test('les familles déclarées dans categories.json sont valides', () => {
    for (const family of SCALE_BY_FAMILY.keys()) {
        assert.equal(checkCap(family), null, `plafond incohérent pour « ${family} »`)
    }
})
