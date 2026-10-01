/**
 * Tests de la normalisation du nom de token pour T3 (D21).
 *
 * Les cas limites sont testés AVANT que T3 ne s'appuie dessus : c'est la
 * fonction qui décide si une teinte fixe est autorisée, une erreur ici ouvre
 * ou ferme le contrôle à tort.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { shortName } from './short-name.mjs'

const THEMES = ['dark', 'high-contrast', 'light', 'night', 'ocean', 'oled', 'slate']

test('un token sans thème est rendu tel quel', () => {
    assert.equal(shortName('--mr-success-text', THEMES), '--mr-success-text')
    assert.equal(shortName('--mr-bg-canvas', THEMES), '--mr-bg-canvas')
})

test('le préfixe du thème est retiré', () => {
    assert.equal(shortName('--mr-theme-slate-success-text', THEMES), 'success-text')
    assert.equal(shortName('--mr-theme-light-bg-canvas', THEMES), 'bg-canvas')
    assert.equal(shortName('--mr-theme-dark-accent-hover', THEMES), 'accent-hover')
})

test('CAS LIMITE : un nom de thème composé est retiré en entier', () => {
    // `high-contrast` doit être retiré comme un bloc, pas seulement `high`.
    assert.equal(shortName('--mr-theme-high-contrast-warning-text', THEMES), 'warning-text')
    assert.equal(shortName('--mr-theme-high-contrast-bg-sunken', THEMES), 'bg-sunken')
})

test('CAS LIMITE : un token sans préfixe reste intact même si son nom contient un thème', () => {
    // `--mr-slate-thing` n'est pas préfixé par un thème : rien à retirer.
    assert.equal(shortName('--mr-slate-thing', THEMES), '--mr-slate-thing')
    // Un nom de token qui contient "slate" plus loin n'est pas touché.
    assert.equal(shortName('--mr-bg-slate-tint', THEMES), '--mr-bg-slate-tint')
})

test('CAS LIMITE : un préfixe partiel ne suffit pas', () => {
    // Le préfixe exige le tiret final : `--mr-theme-slateX-` ne matche pas.
    assert.equal(
        shortName('--mr-theme-slateX-success-text', THEMES),
        '--mr-theme-slateX-success-text'
    )
    // Un thème qui est le préfixe d'un autre ne doit pas voler son nom.
    assert.equal(shortName('--mr-theme-slight-foo', THEMES), '--mr-theme-slight-foo')
})

test('CAS LIMITE : la liste de thèmes est ordonnée du plus long au plus court', () => {
    // Sans tri, `high-contrast` pourrait être testé après un thème plus court
    // et laisser un préfixe partiel.
    const long = [...THEMES].sort((a, b) => b.length - a.length)
    assert.equal(shortName('--mr-theme-high-contrast-info-border', long), 'info-border')
})

test('aucun segment final n est utilisé : les tons restent distinguables', () => {
    // C'est la raison pour laquelle on ne compare pas le dernier segment.
    const last = (n) => n.split('-').pop()
    assert.equal(last('success-text'), last('danger-text'))
    assert.equal(last('warning-text'), last('info-text'))
    // Le préfixe exact, lui, distingue bien les quatre tons.
    assert.equal(shortName('--mr-theme-slate-success-text', THEMES), 'success-text')
    assert.equal(shortName('--mr-theme-slate-danger-text', THEMES), 'danger-text')
    assert.equal(shortName('--mr-theme-slate-warning-text', THEMES), 'warning-text')
    assert.equal(shortName('--mr-theme-slate-info-text', THEMES), 'info-text')
})
