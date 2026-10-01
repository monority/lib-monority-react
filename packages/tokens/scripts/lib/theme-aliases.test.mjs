/**
 * Tests du registre d'alias de rendu (D23).
 *
 * Un alias est un sélecteur CSS qui rend un thème existant. Trois fautes
 * possibles, chacune couverte ici : un alias qui pointe dans le vide, un alias
 * qui masque un vrai fichier de thème, et un alias qui perd son statut d'alias
 * en redevenant un thème.
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { ALIASES, aliasesOf, aliasMap, discoverThemes, selectorFor } from './themes.mjs'

// Ce fichier vit dans packages/tokens/scripts/lib/ : quatre niveaux remontent
// à la racine du dépôt.
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')
const uiConstants = path.join(repoRoot, 'packages/ui/src/lib/constants.ts')

test('le registre déclare exactement les alias attendus', () => {
    assert.deepEqual(aliasMap(), { dim: 'dark' })
})

test('chaque alias pointe vers un thème qui existe sur disque', () => {
    const disk = discoverThemes()
    for (const [alias, target] of Object.entries(ALIASES)) {
        assert.ok(
            disk.includes(target),
            `l'alias « ${alias} » pointe vers « ${target} », absent de src/themes/.`
        )
    }
})

test('NÉGATIF : un alias dont la cible est absente est détecté', () => {
    const disk = discoverThemes()
    const cassé = { dim: 'nuit-noire' }
    const orphans = Object.entries(cassé).filter(([, target]) => !disk.includes(target))
    assert.equal(orphans.length, 1, 'le garde-fou doit voir passer un alias orphelin')
})

test('aucun alias ne peut masquer un fichier de thème', () => {
    const disk = discoverThemes()
    for (const alias of Object.keys(ALIASES)) {
        assert.equal(
            disk.includes(alias),
            false,
            `« ${alias} » est à la fois un alias et un fichier de thème : le build l'ignorerait`
        )
    }
})

test('NÉGATIF : un alias qui masque un fichier de thème est détecté', () => {
    const disk = discoverThemes()
    const collision = Object.keys(ALIASES).some((a) => disk.includes(a))
    assert.equal(collision, false, 'forme fautive testée : alias slate + fichier slate.json')
})

test('les alias de la constante UI correspondent au registre', () => {
    const source = fs.readFileSync(uiConstants, 'utf8')
    const block = source.match(/export const ThemeName\s*=\s*\{([\s\S]*?)\}\s*as const/)
    assert.ok(block, 'constants.ts ne déclare plus ThemeName')

    const values = [...block[1].matchAll(/:\s*'([a-z-]+)'/g)].map((m) => m[1])
    const disk = discoverThemes()
    const themes = values.filter((v) => disk.includes(v))
    const preferences = values.filter((v) => v === 'system')
    const aliasNames = values.filter((v) => !disk.includes(v) && v !== 'system')

    assert.deepEqual(
        themes.sort(),
        [...disk].sort(),
        'ThemeName doit porter exactement les thèmes du disque'
    )
    assert.deepEqual(preferences, ['system'], '`system` est une préférence, pas un alias')
    assert.deepEqual(
        aliasNames.sort(),
        Object.keys(ALIASES).sort(),
        'les alias de packages/ui ne correspondent pas à theme-aliases.json'
    )
})

test('un alias produit un sélecteur groupé avec sa cible, jamais un bloc autonome', () => {
    const selector = selectorFor('dark', { withRoot: false })
    assert.equal(
        selector,
        '[data-theme="dark"],\n[data-theme="dim"]',
        "l'alias doit être groupé sur la même règle que sa cible"
    )
})

test('NÉGATIF : un alias isolé dans son propre bloc est détecté', () => {
    const cssPath = path.join(repoRoot, 'packages/styles/src/tokens/generated/tokens.css')
    if (!fs.existsSync(cssPath)) return
    const css = fs.readFileSync(cssPath, 'utf8')

    // Un alias est légitime groupé avec sa cible. Il ne doit jamais être le
    // PREMIER sélecteur d'un groupe : ce serait un bloc autonome, qui émet les
    // mêmes déclarations deux fois et ferait croire à une égalité avec la cible.
    const groupes = [...css.matchAll(/([^{}]+)\{/g)].map((m) =>
        m[1]
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
    )
    const autonomes = groupes.filter(
        (g) =>
            g.length === 1 &&
            Object.hasOwn(ALIASES, g[0].replace(/^\[data-theme="/, '').replace(/"\]$/, ''))
    )
    assert.deepEqual(
        autonomes,
        [],
        `bloc autonome pour un alias dans le CSS généré : ${autonomes.map((g) => g[0]).join(', ')}`
    )
})

test('chaque alias est groupé avec sa cible, jamais premier d un bloc', () => {
    const cssPath = path.join(repoRoot, 'packages/styles/src/tokens/generated/tokens.css')
    if (!fs.existsSync(cssPath)) return
    const css = fs.readFileSync(cssPath, 'utf8')
    const groupes = [...css.matchAll(/([^{}]+)\{/g)].map((m) =>
        m[1]
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
    )
    for (const [alias, cible] of Object.entries(ALIASES)) {
        const selecteur = `[data-theme="${alias}"]`
        const dans = groupes.filter((g) => g.includes(selecteur))
        assert.ok(dans.length > 0, `l'alias « ${alias} » n'est émis par aucun sélecteur`)
        for (const g of dans) {
            const cibleSel = `[data-theme="${cible}"]`
            assert.ok(
                g.includes(cibleSel),
                `« ${alias} » est émis sans sa cible « ${cible} » dans : ${g.join(', ')}`
            )
        }
    }
})

test('le thème par défaut garde :root, les alias ne le contaminent pas', () => {
    assert.equal(selectorFor('light', { withRoot: true }), ':root,\n[data-theme="light"]')
    assert.equal(aliasesOf('light').length, 0)
})

test('NÉGATIF : un alias rattaché au mauvais thème est détecté', () => {
    assert.deepEqual(aliasesOf('dark'), ['dim'], '`dim` doit être rattaché à `dark`')
    assert.deepEqual(aliasesOf('light'), [])
    assert.deepEqual(aliasesOf('slate'), [])
})
