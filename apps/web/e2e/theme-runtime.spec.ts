import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

async function blockHydration(page: Page) {
    await page.route('**/*.js', (route) => route.abort())
}

test.describe('Phase 2b — bootstrap du thème', () => {
    test('H2: le thème stocké est appliqué avant toute hydratation', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('model-theme', 'dark'))
        await blockHydration(page)

        await page.goto('/docs', { waitUntil: 'domcontentloaded' })

        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
        const { background, expectedCanvas } = await page.locator('body').evaluate((element) => {
            const probe = document.createElement('div')
            probe.style.backgroundColor = 'var(--mr-bg-canvas)'
            element.appendChild(probe)
            const expected = getComputedStyle(probe).backgroundColor
            const color = getComputedStyle(element).backgroundColor
            probe.remove()
            return { background: color, expectedCanvas: expected }
        })
        expect(background).toBe(expectedCanvas)
    })

    test('H3: system + prefers-contrast: more applique high-contrast avant hydratation', async ({
        page,
    }) => {
        await page.emulateMedia({ contrast: 'more', colorScheme: 'light' })
        await page.addInitScript(() => localStorage.setItem('model-theme', 'system'))
        await blockHydration(page)

        await page.goto('/docs', { waitUntil: 'domcontentloaded' })

        await expect(page.locator('html')).toHaveAttribute('data-theme', 'high-contrast')
        await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'system')
    })

    for (const theme of ['slate', 'ocean', 'night'] as const) {
        test(`${theme} est disponible avant hydratation`, async ({ page }) => {
            await page.addInitScript(
                (storedTheme) => localStorage.setItem('model-theme', storedTheme),
                theme
            )
            await blockHydration(page)
            await page.goto('/docs', { waitUntil: 'domcontentloaded' })
            await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
        })
    }

    test('dark est le thème par défaut sans choix stocké', async ({ page }) => {
        await blockHydration(page)
        await page.goto('/docs', { waitUntil: 'domcontentloaded' })
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    })

    test('migre dim vers dark et réécrit le stockage avant hydratation', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('model-theme', 'dim'))
        await blockHydration(page)

        await page.goto('/docs', { waitUntil: 'domcontentloaded' })

        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
        expect(await page.evaluate(() => localStorage.getItem('model-theme'))).toBe('dark')
    })

    test('injecte getThemeScript dans head', async ({ page }) => {
        await blockHydration(page)
        await page.goto('/docs', { waitUntil: 'domcontentloaded' })

        const script = await page.locator('head script:not([src])').textContent()
        expect(script).toContain('model-theme')
        expect(new Blob([script ?? '']).size).toBeLessThan(1024)
    })
})
