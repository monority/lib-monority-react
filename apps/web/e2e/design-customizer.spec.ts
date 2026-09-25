import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const configurations = [
  { name: 'A', theme: 'dark', brand: 'monority', accent: 'cyan', componentColor: 'cyan', chartPalette: 'default', radius: 'default', spacing: 'default', density: 'default' },
  { name: 'B', theme: 'light', brand: 'monority', accent: 'violet', componentColor: 'blue', chartPalette: 'ocean', radius: 'rounded', spacing: 'dense', density: 'compact' },
  { name: 'C', theme: 'oled', brand: 'monority', accent: 'green', componentColor: 'neutral', chartPalette: 'spectrum', radius: 'sharp', spacing: 'airy', density: 'spacious' },
  { name: 'D', theme: 'ocean', brand: 'monority', accent: 'orange', componentColor: 'cyan', chartPalette: 'warm', radius: 'compact', spacing: 'default', density: 'compact' },
  { name: 'E', theme: 'night', brand: 'studio', accent: 'blue', componentColor: 'violet', chartPalette: 'ocean', radius: 'rounded', spacing: 'comfortable', density: 'spacious' },
] as const

const requiredViewports = new Set(['mobile-375', 'mobile-390', 'mobile-430', 'tablet-768', 'desktop-1024', 'desktop'])

async function loadConfig(page: Page, config: (typeof configurations)[number]) {
  await page.addInitScript((value) => localStorage.setItem('monority-design-config', JSON.stringify(value)), config)
  await page.goto('/moodboard')
  await expect(page.getByTestId('moodboard-page')).toBeVisible()
}

test.describe('Phase 5 — composable customizer', () => {
  for (const config of configurations) {
    test(`configuration ${config.name} combines independent axes`, async ({ page }) => {
      await loadConfig(page, config)
      const root = page.locator('[data-design-provider]')
      await expect(root).toHaveAttribute('data-design-theme', config.theme)
      await expect(root).toHaveAttribute('data-design-accent', config.accent)
      await expect(root).toHaveAttribute('data-design-component-color', config.componentColor)
      await expect(root).toHaveAttribute('data-design-chart-palette', config.chartPalette)
      await expect(root).toHaveAttribute('data-design-radius', config.radius)
      await expect(root).toHaveAttribute('data-design-spacing', config.spacing)
      await expect(root).toHaveAttribute('data-design-density', config.density)
      const style = await root.evaluate((element) => {
        const computed = getComputedStyle(element)
        return {
          brandHue: computed.getPropertyValue('--mr-brand-hue').trim(),
          controlAccent: computed.getPropertyValue('--mr-control-accent').trim(),
          chart1: computed.getPropertyValue('--mr-chart-1').trim(),
          radius: computed.getPropertyValue('--mr-radius-control').trim(),
          spacing: computed.getPropertyValue('--mr-spacing-4').trim(),
        }
      })
      const hueByAccent = { cyan: '200', blue: '245', violet: '295', green: '150', orange: '45' } as const
      expect(style.brandHue).toBe(hueByAccent[config.accent as keyof typeof hueByAccent])
      expect(style.controlAccent).not.toBe('')
      expect(style.chart1).not.toBe('')
      expect(style.radius).not.toBe('')
      expect(style.spacing).not.toBe('')
    })
  }

  test('customizer controls update the live preview and persist configuration', async ({ page }) => {
    await page.goto('/moodboard')
    const root = page.locator('[data-design-provider]')
    const primary = page.getByRole('button', { name: 'Deploy' }).first()
    const initialPrimaryBackground = await primary.evaluate((element) => getComputedStyle(element).backgroundColor)
    await page.getByRole('group', { name: 'Accent axis' }).getByRole('button', { name: 'Violet' }).click()
    await page.getByRole('group', { name: 'Radius axis' }).getByRole('button', { name: 'Rounded' }).click()
    await page.getByRole('group', { name: 'Component color axis' }).getByRole('button', { name: 'Blue' }).click()
    await expect(root).toHaveAttribute('data-design-accent', 'violet')
    await expect(root).toHaveAttribute('data-design-radius', 'rounded')
    await expect(root).toHaveAttribute('data-design-component-color', 'blue')
    const stored = await page.evaluate(() => localStorage.getItem('monority-design-config'))
    expect(stored).toContain('violet')
    expect(stored).toContain('rounded')
    const updatedPrimaryBackground = await primary.evaluate((element) => getComputedStyle(element).backgroundColor)
    expect(updatedPrimaryBackground).not.toBe(initialPrimaryBackground)
  })

  test('customizer remains usable without horizontal overflow at required viewports', async ({ page }, testInfo) => {
    test.skip(!requiredViewports.has(testInfo.project.name), 'required viewport set only')
    await page.goto('/moodboard')
    await expect(page.getByTestId('moodboard-page')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)
  })
})
