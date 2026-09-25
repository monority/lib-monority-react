import { expect, test } from '@playwright/test'
import { buildCriteriaReport } from '../src/test/spec-criteria'

const syntheticSpec = `# Harness
## Critères de vérification
1. Le banc expose le composant.
`

test('button#1 le banc expose le composant', async ({ page }) => {
  await page.goto('/harness/button?theme=light&density=comfortable')
  await expect(page.getByTestId('harness-page')).toBeVisible()
})

test('criteria utility detects complete and missing coverage', () => {
  const report = buildCriteriaReport('button', syntheticSpec, "test('button#1 coverage', () => {})")
  expect(report).toEqual({ component: 'button', total: 1, covered: ['1'], missing: [] })
})
