import { describe, expect, it } from 'vitest'
import { buildCriteriaReport, extractSpecCriteria } from './spec-criteria'

const spec = `# Button
## Critères de vérification
1. Button md : block-size = 40px.
2. Focus visible.
3. Loading conserve la largeur.
## Interdits
9. Ce nombre ne compte pas.
`

const tests = `
test('button#1 dimensions', () => {})
test('button#3 loading', () => {})
`

describe('executable spec criteria', () => {
  it('extrait uniquement les critères de vérification', () => {
    expect(extractSpecCriteria(spec).map((item) => item.id)).toEqual(['1', '2', '3'])
  })

  it('rapporte les critères sans test', () => {
    const report = buildCriteriaReport('button', spec, tests)
    expect(report.total).toBe(3)
    expect(report.covered).toEqual(['1', '3'])
    expect(report.missing).toEqual(['2'])
  })

  it('ignore les titres de test sans identifiant composant', () => {
    const report = buildCriteriaReport('button', spec, "test('dimensions', () => {})")
    expect(report.missing).toEqual(['1', '2', '3'])
  })
})
