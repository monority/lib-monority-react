import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const themes = ['dark', 'light', 'oled', 'ocean', 'night'] as const
const targetProjects = new Set(['mobile-375', 'mobile-390', 'mobile-430', 'tablet-768', 'desktop-1024', 'desktop'])

test.describe('Phase 4 — moodboard themes', () => {
  test('renders and audits every atmosphere at the required viewports', async ({ page }, testInfo) => {
    test.skip(!targetProjects.has(testInfo.project.name), 'required viewport set only')
    await page.goto('/moodboard')
    await expect(page.getByTestId('moodboard-page')).toBeVisible()

    for (const theme of themes) {
      const panel = page.locator(`[data-testid="moodboard-panel-${theme}"]`)
      await expect(panel).toBeVisible()
      const scan = await new AxeBuilder({ page }).include(`[data-testid="moodboard-panel-${theme}"]`).analyze()
      expect(scan.violations, `${theme} accessibility violations`).toEqual([])
      await expect(panel).toHaveScreenshot(`moodboard--${theme}--${testInfo.project.name}.png`, {
        animations: 'disabled',
        caret: 'hide',
      })
    }
  })
})
