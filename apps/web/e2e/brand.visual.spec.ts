import { expect, test } from '@playwright/test'

// Couverture de marque : le rebranding (radius-scale, accent, polices) doit etre
// visible. Isolee de components.visual.spec.ts qui varie les themes.
const components = ['button', 'icon-button', 'copy-button', 'button-link', 'spinner'] as const
const brands = ['monority', 'studio'] as const
const densities = ['comfortable', 'compact'] as const

test.describe('brand visual harness', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) !== 1440, 'desktop visual baseline only')

  for (const component of components) {
    for (const brand of brands) {
      for (const density of densities) {
        test(`${component} — ${brand} — ${density}`, async ({ page }) => {
          await page.goto(`/harness/${component}?theme=light&brand=${brand}&density=${density}`)
          const harness = page.getByTestId('harness-page')
          await expect(harness).toBeVisible()
          await expect(harness).toHaveScreenshot(`${component}--${brand}--${density}.png`, {
            animations: 'disabled',
            caret: 'hide',
          })
        })
      }
    }
  }
})
