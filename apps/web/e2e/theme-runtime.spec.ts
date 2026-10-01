import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const resolved = JSON.parse(
    readFileSync(
        fileURLToPath(new URL('../../../packages/tokens/dist/resolved.json', import.meta.url)),
        'utf8'
    )
)

const hexToRgb = (hex: string): string => {
    const raw = hex.replace('#', '')
    const value = raw.length === 3 ? [...raw].map((char) => char + char).join('') : raw
    const channels = [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16))
    return `rgb(${channels.join(', ')})`
}

async function blockHydration(page: Page) {
    await page.route('**/*.js', (route) => route.abort())
}

test.describe('Phase 2b — bootstrap du thème', () => {
    test('H2: le thème stocké est appliqué avant toute hydratation', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('model-theme', 'dark'))
        await blockHydration(page)

        await page.goto('/docs', { waitUntil: 'domcontentloaded' })

        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
        const background = await page.locator('body').evaluate((element) => {
            const color = getComputedStyle(element).backgroundColor
            const canvas = document.createElement('canvas')
            canvas.width = 1
            canvas.height = 1
            const context = canvas.getContext('2d', { willReadFrequently: true })
            if (!context) return color
            context.fillStyle = color
            context.fillRect(0, 0, 1, 1)
            const [red, green, blue] = context.getImageData(0, 0, 1, 1).data
            return `rgb(${red}, ${green}, ${blue})`
        })
        expect(background).toBe(
            hexToRgb(resolved.values['dark.comfortable.monority']['--mr-bg-canvas'])
        )
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

    // mr-theme-subset: les 7 themes du disque sont couverts, mais pas dans ce
    // seul test. dark l est par defaut et par le test de stockage (L26, L74),
    // light et high-contrast par le test prefers-contrast (L52-L58). Cette
    // boucle couvre les 4 restants.
    for (const theme of ['slate', 'ocean', 'night', 'oled'] as const) {
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
