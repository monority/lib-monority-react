/**
 * Étape 11a — tests de l'audit des références de tokens.
 *
 * Le contrôle étant en MODE RAPPORT, ce qu'il faut prouver n'est pas son code
 * de sortie mais sa CAPACITÉ À CONSTATER. Chaque test échoue si la détection
 * disparaît : un contrôle qui ne détecte plus rien doit casser en CI.
 */
import assert from 'node:assert/strict'
import test from 'node:test'
import {
    audit,
    declaredNames,
    isTestFile,
    localDeclarations,
    references,
} from './check-token-refs.mjs'

const TOKENS_CSS = `
:root {
  --mr-bg-canvas: oklch(1 0 0);
  --mr-text-primary: oklch(0 0 0);
  --mr-spacing-4: 1rem;
  --mr-token-orphelin: 1rem;
}
`
const DEPRECATED_CSS = `
:root {
  --mr-opacity-50: 0.5;
}
`

/** Fabrique un lecteur de fichiers sur mesure. */
const reader = (files) => (rel) => files[rel.split('\\').join('/')] ?? ''

test('references : distingue var() avec repli et var() sans repli', () => {
    const source = `
        a { color: var(--mr-a); }
        b { color: var(--mr-b, red); }
        c { color: var( --mr-c , var(--mr-d)); }
    `
    assert.deepEqual(references(source), [
        { name: '--mr-a', fallback: false, index: source.indexOf('--mr-a') },
        { name: '--mr-b', fallback: true, index: source.indexOf('--mr-b') },
        { name: '--mr-c', fallback: true, index: source.indexOf('--mr-c') },
        { name: '--mr-d', fallback: false, index: source.indexOf('--mr-d') },
    ])
})

test('declaredNames et localDeclarations isolent les déclarations', () => {
    assert.deepEqual(
        [...declaredNames(':root { --mr-a: 1px; --mr-b: 2px; }')],
        ['--mr-a', '--mr-b']
    )
    // `var(--mr-a)` n'est pas une déclaration, même suivi de deux-points plus loin.
    assert.deepEqual([...localDeclarations('.x { --mr-c: 1px; color: var(--mr-a); }')], ['--mr-c'])
})

test("un fichier de test est exclu, un exemple ne l'est pas", () => {
    assert.equal(isTestFile('apps/web/src/features/docs/geometry-contract.test.ts'), true)
    assert.equal(isTestFile('a/b/thing.spec.tsx'), true)
    assert.equal(
        isTestFile('apps/web/src/features/docs/components/badge/Badge.examples.tsx'),
        false
    )
    assert.equal(isTestFile('packages/styles/src/recipes/badge.recipe.css'), false)
})

test('NÉGATIF : var(--mr-inexistant) sans repli est classé intrusion', () => {
    const result = audit({
        files: ['a.css'],
        readFile: reader({
            'packages/styles/src/tokens/generated/tokens.css': TOKENS_CSS,
            'packages/styles/src/tokens/generated/deprecated.css': DEPRECATED_CSS,
            'a.css': '.x { color: var(--mr-inexistant); }',
        }),
    })
    assert.equal(result.intrusions.length, 1)
    assert.equal(result.intrusions[0].name, '--mr-inexistant')
    assert.equal(result.intrusions[0].file, 'a.css')
    assert.equal(result.overrides.length, 0)
})

test('NÉGATIF : var() sur un nom inconnu AVEC repli est classé override, pas intrusion', () => {
    const result = audit({
        files: ['a.css'],
        readFile: reader({
            'packages/styles/src/tokens/generated/tokens.css': TOKENS_CSS,
            'packages/styles/src/tokens/generated/deprecated.css': DEPRECATED_CSS,
            'a.css': '.x { color: var(--mr-inexistant, var(--mr-bg-canvas)); }',
        }),
    })
    assert.equal(result.intrusions.length, 0)
    assert.equal(result.overrides.length, 1)
    assert.equal(result.overrides[0].name, '--mr-inexistant')
})

test('NÉGATIF : une variable déclarée localement compte comme définie', () => {
    const result = audit({
        files: ['a.css'],
        readFile: reader({
            'packages/styles/src/tokens/generated/tokens.css': TOKENS_CSS,
            'packages/styles/src/tokens/generated/deprecated.css': DEPRECATED_CSS,
            'a.css': '.x { --mr-local: 1px; width: var(--mr-local); }',
        }),
    })
    assert.equal(result.intrusions.length, 0)
    assert.equal(result.overrides.length, 0)
    assert.equal(result.orphans.includes('--mr-local'), false)
})

test('NÉGATIF : un token déprécié encore utilisé est signalé', () => {
    const result = audit({
        files: ['a.css'],
        readFile: reader({
            'packages/styles/src/tokens/generated/tokens.css': TOKENS_CSS,
            'packages/styles/src/tokens/generated/deprecated.css': DEPRECATED_CSS,
            'a.css': '.x { opacity: var(--mr-opacity-50); }',
        }),
    })
    assert.equal(result.deprecatedUses.length, 1)
    assert.equal(result.deprecatedUses[0].name, '--mr-opacity-50')
})

test('NÉGATIF : un token global jamais référencé est classé orphelin', () => {
    const result = audit({
        files: ['a.css'],
        readFile: reader({
            'packages/styles/src/tokens/generated/tokens.css': TOKENS_CSS,
            'packages/styles/src/tokens/generated/deprecated.css': DEPRECATED_CSS,
            'a.css': '.x { color: var(--mr-bg-canvas); }',
        }),
    })
    assert.deepEqual(result.orphans, ['--mr-spacing-4', '--mr-text-primary', '--mr-token-orphelin'])
})

test('la ligne du défaut est correcte', () => {
    const result = audit({
        files: ['a.css'],
        readFile: reader({
            'packages/styles/src/tokens/generated/tokens.css': TOKENS_CSS,
            'packages/styles/src/tokens/generated/deprecated.css': DEPRECATED_CSS,
            'a.css': '.a { color: red; }\n.b { color: var(--mr-inexistant); }',
        }),
    })
    assert.equal(result.intrusions[0].line, 2)
})

test("NÉGATIF : une assertion sur du texte n'est pas une consommation de token", () => {
    const result = audit({
        files: ['a.test.ts'],
        readFile: reader({
            'packages/styles/src/tokens/generated/tokens.css': TOKENS_CSS,
            'packages/styles/src/tokens/generated/deprecated.css': DEPRECATED_CSS,
            'a.test.ts': `expect(card).not.toContain('var(--mr-card-min-height')`,
        }),
    })
    assert.equal(result.counts.files, 0, 'le fichier de test doit être exclu')
    assert.deepEqual(result.intrusions, [])
})

test('un style inline réel reste compté comme consommation', () => {
    const result = audit({
        files: ['a.examples.tsx'],
        readFile: reader({
            'packages/styles/src/tokens/generated/tokens.css': TOKENS_CSS,
            'packages/styles/src/tokens/generated/deprecated.css': DEPRECATED_CSS,
            'a.examples.tsx': `style={{ color: 'var(--mr-inexistant)' }}`,
        }),
    })
    assert.equal(result.intrusions.length, 1)
})

test('dépôt réel : aucune intrusion sans repli dans le CSS livré', () => {
    const result = audit()
    assert.deepEqual(
        result.intrusions.map((i) => `${i.file}:${i.line} ${i.name}`),
        [],
        `intrusions détectées : ${JSON.stringify(result.intrusions, null, 2)}`
    )
})
