/**
 * Tests des règles Stylelint (ROADMAP §3.3 : « chaque affirmation est prouvée »).
 *
 * Chaque règle est testée isolément : la fixture `.nok.css` DOIT produire des
 * violations, la fixture `.ok.css` n'en doit produire aucune. Une règle qui
 * cesse de détecter casse ici ; une règle qui détecte trop casse aussi.
 */
import assert from 'node:assert/strict'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import stylelint from 'stylelint'
import config from '../../stylelint.config.mjs'
import { rules } from './rules.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const fixture = (name) => path.join(here, 'fixtures', name)

/** Une règle prise telle quelle dans la config du dépôt : rien à recopier. */
const only = (name) => ({ [name]: config.rules[name] })

/** Lint une fixture avec un seul jeu de règles. */
async function lint(file, ruleSet) {
    const { results } = await stylelint.lint({
        files: [fixture(file)],
        config: { plugins: rules, rules: ruleSet },
    })
    const r = results[0]
    assert.deepEqual(r.invalidOptionWarnings ?? [], [], `option invalide pour ${file}`)
    return (r?.warnings ?? []).map((w) => ({ rule: w.rule, text: w.text }))
}

const RULES = {
    'mr/no-hard-value': { fixture: 'hard-value', rules: only('mr/no-hard-value') },
    'mr/no-global-selector': { fixture: 'global-selector', rules: only('mr/no-global-selector') },
    'property-disallowed-list': {
        fixture: 'physical-properties',
        rules: only('property-disallowed-list'),
    },
    'custom-property-pattern': {
        fixture: 'token-pattern',
        rules: only('custom-property-pattern'),
    },
}

for (const [rule, { fixture: base, rules: ruleSet }] of Object.entries(RULES)) {
    test(`NÉGATIF : ${rule} détecte la fixture fautive`, async () => {
        const warnings = await lint(`${base}.nok.css`, ruleSet)
        assert.ok(
            warnings.some((w) => w.rule === rule),
            `${rule} n'a rien détecté dans ${base}.nok.css — la règle est inerte`
        )
    })

    test(`POSITIF : ${rule} n'accuse pas la fixture conforme`, async () => {
        const warnings = await lint(`${base}.ok.css`, ruleSet)
        assert.deepEqual(
            warnings.filter((w) => w.rule === rule),
            [],
            `${rule} a produit des faux positifs sur ${base}.ok.css : ${JSON.stringify(warnings)}`
        )
    })
}

test('mr/no-hard-value tolère la liste fermée de ROADMAP §5.1', async () => {
    const warnings = await lint('hard-value.ok.css', RULES['mr/no-hard-value'].rules)
    assert.deepEqual(warnings, [], `faux positifs : ${JSON.stringify(warnings)}`)
})

test('mr/no-hard-value autorise une variable custom (elle porte la valeur brute)', async () => {
    const { results } = await stylelint.lint({
        code: ':root { --mr-shadow-card: 0 1px 3px rgb(0 0 0 / 0.2); }',
        config: { plugins: rules, rules: only('mr/no-hard-value') },
    })
    assert.deepEqual(
        results[0].warnings,
        [],
        `faux positifs : ${JSON.stringify(results[0].warnings)}`
    )
})

test('les règles maison sont bien enregistrées sous leur nom', () => {
    for (const name of ['mr/no-hard-value', 'mr/no-global-selector']) {
        assert.ok(
            rules.some((r) => r.ruleName === name),
            `règle ${name} absente du plugin`
        )
    }
})
