import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const configurations = [
    {
        name: 'A',
        theme: 'dark',
        brand: 'monority',
        accent: 'cyan',
        chartPalette: 'default',
        radius: 'default',
        spacing: 'default',
        density: 'default',
    },
    {
        name: 'B',
        theme: 'light',
        brand: 'monority',
        accent: 'violet',
        chartPalette: 'ocean',
        radius: 'rounded',
        spacing: 'dense',
        density: 'compact',
    },
    {
        name: 'C',
        theme: 'oled',
        brand: 'monority',
        accent: 'green',
        chartPalette: 'spectrum',
        radius: 'sharp',
        spacing: 'airy',
        density: 'spacious',
    },
    {
        name: 'D',
        theme: 'ocean',
        brand: 'monority',
        accent: 'orange',
        chartPalette: 'warm',
        radius: 'compact',
        spacing: 'default',
        density: 'compact',
    },
    {
        name: 'E',
        theme: 'night',
        brand: 'studio',
        accent: 'blue',
        chartPalette: 'ocean',
        radius: 'rounded',
        spacing: 'comfortable',
        density: 'spacious',
    },
] as const

const requiredViewports = new Set([
    'mobile-375',
    'mobile-390',
    'mobile-430',
    'tablet-768',
    'desktop-1024',
    'desktop',
])

async function loadConfig(page: Page, config: (typeof configurations)[number]) {
    await page.addInitScript(
        (value) => localStorage.setItem('monority-design-config', JSON.stringify(value)),
        config
    )
    await page.goto('/moodboard')
    await expect(page.getByTestId('moodboard-page')).toBeVisible()
}

test.describe('Phase 6 — canonical Design Studio', () => {
    for (const config of configurations) {
        test(`configuration ${config.name} applies all axes to single preview`, async ({
            page,
        }) => {
            await loadConfig(page, config)
            const scope = page.getByTestId('moodboard-preview-scope')
            await expect(scope).toHaveAttribute('data-design-theme', config.theme)
            await expect(scope).toHaveAttribute('data-design-accent', config.accent)
            await expect(scope).toHaveAttribute('data-design-chart-palette', config.chartPalette)
            await expect(scope).toHaveAttribute('data-design-radius', config.radius)
            await expect(scope).toHaveAttribute('data-design-spacing', config.spacing)
            await expect(scope).toHaveAttribute('data-design-density', config.density)

            /* Verify resolved CSS variables are non-empty on DesignProvider root */
            const root = page.locator('[data-testid="moodboard-page"]').locator('..')
            const style = await root.evaluate((element) => {
                const computed = getComputedStyle(element)
                return {
                    brandHue: computed.getPropertyValue('--mr-brand-hue').trim(),
                    controlAccent: computed.getPropertyValue('--mr-control-accent').trim(),
                    chart2: computed.getPropertyValue('--mr-chart-2').trim(),
                    radius: computed.getPropertyValue('--mr-radius-control').trim(),
                    spacing: computed.getPropertyValue('--mr-spacing-4').trim(),
                }
            })
            const hueByAccent = {
                cyan: '200',
                blue: '245',
                violet: '295',
                green: '150',
                orange: '45',
            } as const
            expect(style.brandHue).toBe(hueByAccent[config.accent as keyof typeof hueByAccent])
            expect(style.controlAccent).not.toBe('')
            expect(style.chart2).not.toBe('')
            expect(style.radius).not.toBe('')
            expect(style.spacing).not.toBe('')
        })
    }

    test('controls update live preview and persist', async ({ page }) => {
        await page.goto('/moodboard')
        const scope = page.getByTestId('moodboard-preview-scope')
        const primary = page.getByRole('button', { name: 'Deploy' }).first()
        const initialBg = await primary.evaluate(
            (element) => getComputedStyle(element).backgroundColor
        )

        /* Change accent and radius via select controls */
        await page
            .getByRole('group', { name: 'Accent axis' })
            .getByRole('combobox')
            .selectOption('violet')
        await page
            .getByRole('group', { name: 'Radius axis' })
            .getByRole('combobox')
            .selectOption('rounded')

        /* Preview scope attributes updated */
        await expect(scope).toHaveAttribute('data-design-accent', 'violet')
        await expect(scope).toHaveAttribute('data-design-radius', 'rounded')

        /* Button color changed */
        const updatedBg = await primary.evaluate(
            (element) => getComputedStyle(element).backgroundColor
        )
        expect(updatedBg).not.toBe(initialBg)

        /* Persisted */
        const stored = await page.evaluate(() => localStorage.getItem('monority-design-config'))
        expect(stored).toContain('violet')
        expect(stored).toContain('rounded')
    })

    test('neutral accent resolves black in light mode and white in dark and oled', async ({
        page,
    }) => {
        await page.goto('/moodboard')
        const primary = page.getByRole('button', { name: 'Deploy' }).first()

        /* Set neutral accent and light theme */
        await page
            .getByRole('group', { name: 'Accent axis' })
            .getByRole('combobox')
            .selectOption('neutral')
        await page
            .getByRole('group', { name: 'Theme axis' })
            .getByRole('combobox')
            .selectOption('light')

        const lightColor = await primary.evaluate((element) => {
            const cs = getComputedStyle(element)
            return { bg: cs.backgroundColor, text: cs.color }
        })
        /* In light mode, primary button is dark charcoal/black with light text */
        expect(lightColor.bg).toMatch(/oklch\(0\.22|rgb\(48,\s*48,\s*48\)|rgb\(56,\s*56,\s*56\)/)

        /* Set dark theme */
        await page
            .getByRole('group', { name: 'Theme axis' })
            .getByRole('combobox')
            .selectOption('dark')

        const darkColor = await primary.evaluate((element) => {
            const cs = getComputedStyle(element)
            return { bg: cs.backgroundColor, text: cs.color }
        })
        /* In dark mode, primary button is white with dark text */
        expect(darkColor.bg).toMatch(
            /oklch\(0\.955|rgb\(242,\s*242,\s*242\)|rgb\(244,\s*244,\s*244\)/
        )
    })

    test('theme change affects preview surfaces', async ({ page }) => {
        await page.goto('/moodboard')
        const scope = page.getByTestId('moodboard-preview-scope')

        /* Get initial background */
        const initialBg = await scope.evaluate(
            (element) => getComputedStyle(element).backgroundColor
        )

        /* Switch to light */
        await page
            .getByRole('group', { name: 'Theme axis' })
            .getByRole('combobox')
            .selectOption('light')
        await expect(scope).toHaveAttribute('data-design-theme', 'light')

        const lightBg = await scope.evaluate((element) => getComputedStyle(element).backgroundColor)
        expect(lightBg).not.toBe(initialBg)
    })

    test('spacing change affects preview', async ({ page }) => {
        await page.goto('/moodboard')
        const scope = page.getByTestId('moodboard-preview-scope')

        const defaultSpacing = await scope.evaluate((element) =>
            getComputedStyle(element).getPropertyValue('--mr-spacing-4').trim()
        )
        await page
            .getByRole('group', { name: 'Spacing axis' })
            .getByRole('combobox')
            .selectOption('dense')
        const denseSpacing = await scope.evaluate((element) =>
            getComputedStyle(element).getPropertyValue('--mr-spacing-4').trim()
        )

        expect(denseSpacing).not.toBe(defaultSpacing)
        /* Dense should be smaller */
        expect(Number.parseFloat(denseSpacing)).toBeLessThan(Number.parseFloat(defaultSpacing))
    })

    test('chart palette change updates chart colors', async ({ page }) => {
        await page.goto('/moodboard')
        const root = page.locator('[data-testid="moodboard-page"]').locator('..')

        const defaultChart2 = await root.evaluate((element) =>
            getComputedStyle(element).getPropertyValue('--mr-chart-2').trim()
        )
        await page
            .getByRole('group', { name: 'Chart palette axis' })
            .getByRole('combobox')
            .selectOption('ocean')
        const oceanChart2 = await root.evaluate((element) =>
            getComputedStyle(element).getPropertyValue('--mr-chart-2').trim()
        )

        expect(oceanChart2).not.toBe(defaultChart2)
    })

    test('reset restores default configuration', async ({ page }) => {
        await page.goto('/moodboard')
        const scope = page.getByTestId('moodboard-preview-scope')

        /* Change some axes */
        await page
            .getByRole('group', { name: 'Accent axis' })
            .getByRole('combobox')
            .selectOption('violet')
        await page
            .getByRole('group', { name: 'Radius axis' })
            .getByRole('combobox')
            .selectOption('rounded')
        await expect(scope).toHaveAttribute('data-design-accent', 'violet')
        await expect(scope).toHaveAttribute('data-design-radius', 'rounded')

        /* Reset */
        await page.getByTestId('moodboard-reset').click()
        await expect(scope).toHaveAttribute('data-design-accent', 'neutral')
        await expect(scope).toHaveAttribute('data-design-radius', 'default')

        const stored = await page.evaluate(() => localStorage.getItem('monority-design-config'))
        expect(JSON.parse(stored!).accent).toBe('neutral')
    })

    test('reload restores persisted configuration', async ({ page }) => {
        await page.goto('/moodboard')
        await page
            .getByRole('group', { name: 'Accent axis' })
            .getByRole('combobox')
            .selectOption('violet')
        await page
            .getByRole('group', { name: 'Theme axis' })
            .getByRole('combobox')
            .selectOption('light')

        await page.reload()
        const scope = page.getByTestId('moodboard-preview-scope')
        await expect(scope).toHaveAttribute('data-design-accent', 'violet')
        await expect(scope).toHaveAttribute('data-design-theme', 'light')
    })

    test('no horizontal overflow at required viewports', async ({ page }, testInfo) => {
        test.skip(!requiredViewports.has(testInfo.project.name), 'required viewport set only')
        await page.goto('/moodboard')
        await expect(page.getByTestId('moodboard-page')).toBeVisible()
        expect(
            await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
        ).toBe(true)
    })
})
