import { expect, test } from '@playwright/test'

const components = ['button', 'icon-button', 'copy-button', 'button-link', 'spinner'] as const
const themes = ['light', 'dark', 'oled', 'ocean', 'night', 'high-contrast'] as const
const densities = ['comfortable', 'compact'] as const

test.describe('component visual harness', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) !== 1440, 'desktop visual baseline only')

  for (const component of components) {
    for (const theme of themes) {
      for (const density of densities) {
        test(`${component} — ${theme} — ${density}`, async ({ page }) => {
          await page.goto(`/harness/${component}?theme=${theme}&density=${density}`)
          const harness = page.getByTestId('harness-page')
          await expect(harness).toBeVisible()
          await expect(harness).toHaveScreenshot(`${component}--${theme}--${density}.png`, {
            animations: 'disabled',
            caret: 'hide',
          })
        })
      }
    }
  }
})
