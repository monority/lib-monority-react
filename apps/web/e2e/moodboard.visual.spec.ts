import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const targetProjects = new Set(['mobile-375', 'mobile-390', 'mobile-430', 'tablet-768', 'desktop-1024', 'desktop'])

test.describe('Phase 6 — moodboard visual', () => {
  test('renders canonical Design Studio and audits accessibility', async ({ page }, testInfo) => {
    test.skip(!targetProjects.has(testInfo.project.name), 'required viewport set only')
    await page.goto('/moodboard')
    await expect(page.getByTestId('moodboard-page')).toBeVisible()

    const scope = page.getByTestId('moodboard-preview-scope')
    await expect(scope).toBeVisible()

    const scan = await new AxeBuilder({ page }).include('[data-testid="moodboard-preview"]').analyze()
    for (const v of scan.violations) {
      console.warn(`a11y: ${v.id} — ${v.description} (${v.nodes.length} node(s))`)
      for (const node of v.nodes.slice(0, 3)) {
        console.warn(`  ↳ ${node.html.substring(0, 120)}`)
      }
    }
    expect(scan.violations.length).toBe(0)

    await expect(page.getByTestId('moodboard-page')).toHaveScreenshot(`moodboard--default--${testInfo.project.name}.png`, {
      animations: 'disabled',
      caret: 'hide',
    })
  })
})
