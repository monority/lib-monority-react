import assert from 'node:assert/strict'
import { test } from 'node:test'
import { checkRecipeSource } from './check-recipe.mjs'

const compliant = `@layer recipes {
  .mr-control { color: var(--mr-text-primary); min-height: var(--mr-control-size-md); transition: color var(--mr-duration-fast) var(--mr-ease-standard); }
  @media (hover: hover) and (pointer: fine) { .mr-control:hover { color: var(--mr-accent-text); } }
  @media (forced-colors: active) { .mr-control { outline-color: Highlight; } }
}`

test('accepte une recette conforme', () => {
  assert.deepEqual(checkRecipeSource(compliant, { interactive: true }), [])
})

test('signale fichier, ligne et règle', () => {
  const source = `.mr-control { color: #fff; min-height: 40px; transition: all 1s; box-shadow: 0 2px 4px #000; --x: 1; }\n.mr-control--active:hover { opacity: .5; }`
  const violations = checkRecipeSource(source, { interactive: true, overlay: false })
  const rules = new Set(violations.map((item) => item.rule))
  assert.ok(rules.has('T2'))
  assert.ok(rules.has('D3'))
  assert.ok(rules.has('D5'))
  assert.ok(rules.has('D7'))
  assert.ok(rules.has('D7-hover'))
  assert.ok(rules.has('forced-colors'))
  assert.ok(violations.every((item) => item.line > 0))
})

test('refuse les alias dépréciés', () => {
  const violations = checkRecipeSource('.mr-control { color: var(--mr-fg-muted); }', {
    interactive: false,
    deprecatedTokens: new Set(['--mr-fg-muted']),
  })
  assert.equal(violations[0]?.rule, 'deprecated-token')
})
