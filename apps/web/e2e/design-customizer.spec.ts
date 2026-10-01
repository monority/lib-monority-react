import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const configurations = [
    {
        name: 'A',
        theme: 'dark',
        brand: 'monority',
        accent: 'cyan',
        componentColor: 'theme',
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
        componentColor: 'neutral',
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
        componentColor: 'soft',
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
        componentColor: 'inverse',
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
        componentColor: 'theme',
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
            await expect(scope).toHaveAttribute(
                'data-design-component-color',
                config.componentColor
            )
            await expect(scope).toHaveAttribute('data-design-chart-palette', config.chartPalette)
            await expect(scope).toHaveAttribute('data-design-radius', config.radius)
            await expect(scope).toHaveAttribute('data-design-spacing', config.spacing)
            await expect(scope).toHaveAttribute('data-design-density', config.density)

            /* Verify resolved CSS variables are non-empty on DesignProvider root */
            const root = page.locator('[data-testid="moodboard-page"]').locator('..')
            const style = await root.evaluate((element) => {
                const computed = getComputedStyle(element)
                return {
                    brandHue: computed.getPropertyValue('--mr-ref-brand-hue').trim(),
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

        /* Change accent, radius, component color */
        await page
            .getByRole('group', { name: 'Accent axis' })
            .getByRole('button', { name: 'Violet' })
            .click()
        await page
            .getByRole('group', { name: 'Radius axis' })
            .getByRole('button', { name: 'Rounded' })
            .click()
        await page
            .getByRole('group', { name: 'Component color axis' })
            .getByRole('button', { name: 'Neutral' })
            .click()

        /* Preview scope attributes updated */
        await expect(scope).toHaveAttribute('data-design-accent', 'violet')
        await expect(scope).toHaveAttribute('data-design-radius', 'rounded')
        await expect(scope).toHaveAttribute('data-design-component-color', 'neutral')

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

    test('accent axis and component color axis never paint the same surface', async ({ page }) => {
        await page.goto('/moodboard')
        /* Must run after goto: addStyleTag does not survive a navigation, and a
           running background-color transition would be read as a third colour. */
        await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important}' })
        const primary = page.getByRole('button', { name: 'Deploy' }).first()
        const accentGroup = page.getByRole('group', { name: 'Accent axis' })
        const componentGroup = page.getByRole('group', { name: 'Component color axis' })

        /* Resolve --mr-accent to a real rgb()/oklch() value to compare against. */
        const resolveAccent = () =>
            page.evaluate(() => {
                const scope = document.querySelector('[data-testid="moodboard-preview-scope"]')!
                const probe = document.createElement('div')
                probe.style.background = 'var(--mr-accent)'
                scope.appendChild(probe)
                const value = getComputedStyle(probe).backgroundColor
                probe.remove()
                return value
            })

        for (const role of ['Theme', 'Neutral', 'Soft', 'Inverse'] as const) {
            await componentGroup.getByRole('button', { name: role, exact: true }).click()
            for (const accent of ['Cyan', 'Blue', 'Violet', 'Green', 'Rose'] as const) {
                await accentGroup.getByRole('button', { name: accent, exact: true }).click()
                const fill = await primary.evaluate(
                    (element) => getComputedStyle(element).backgroundColor
                )
                const accentColor = await resolveAccent()
                if (role === 'Theme') {
                    expect(fill, `role=${role} accent=${accent}`).toBe(accentColor)
                } else {
                    expect(
                        fill,
                        `role=${role} accent=${accent} must differ from the accent`
                    ).not.toBe(accentColor)
                }
            }
        }
    })

    test('accent axis stays visible when the component role is hue free', async ({ page }) => {
        await page.goto('/moodboard')
        await page
            .getByRole('group', { name: 'Component color axis' })
            .getByRole('button', { name: 'Neutral', exact: true })
            .click()
        /* --mr-accent-text consumer that is not a selected table row
           (a pressed row is painted with --mr-text-primary instead). */
        const activeNavLink = page.locator('.moodboard-compact-nav a.is-active')
        const accentGroup = page.getByRole('group', { name: 'Accent axis' })

        await accentGroup.getByRole('button', { name: 'Cyan', exact: true }).click()
        const cyan = await activeNavLink.evaluate((element) => getComputedStyle(element).color)
        await accentGroup.getByRole('button', { name: 'Rose', exact: true }).click()
        const rose = await activeNavLink.evaluate((element) => getComputedStyle(element).color)

        expect(cyan).not.toBe(rose)
    })

    test('le Design Studio ne repeint pas le chrome de l application', async ({ page }) => {
        await page.goto('/showcase')
        await page.getByLabel('Accent').selectOption({ label: 'Amber' })
        await page.getByLabel('Accent').press('Tab')

        const readRoot = () =>
            page.evaluate(() => {
                const cs = getComputedStyle(document.documentElement)
                return {
                    accent: document.documentElement.dataset.brandAccent ?? null,
                    hue: cs.getPropertyValue('--mr-ref-brand-hue').trim(),
                    theme: document.documentElement.dataset.theme,
                }
            })

        const before = await readRoot()
        expect(before.accent).toBe('amber')

        await page.goto('/moodboard')
        await page
            .getByRole('group', { name: 'Accent axis' })
            .getByRole('button', { name: 'Violet' })
            .click()
        await page
            .getByRole('group', { name: 'Theme axis' })
            .getByRole('button', { name: 'Ocean' })
            .click()

        /* The studio scopes its own axes to its preview. */
        await expect(page.getByTestId('moodboard-preview-scope')).toHaveAttribute(
            'data-design-accent',
            'violet'
        )
        await expect(page.getByTestId('moodboard-preview-scope')).toHaveAttribute(
            'data-design-theme',
            'ocean'
        )

        await page.goto('/showcase')
        const after = await readRoot()
        expect(after).toEqual(before)
    })

    test('theme change affects preview surfaces', async ({ page }) => {
        await page.goto('/moodboard')
        const scope = page.getByTestId('moodboard-preview-scope')
        const canvas = page.locator('.moodboard-preview-scope')

        /* Get initial background */
        const initialBg = await canvas.evaluate(
            (element) => getComputedStyle(element).backgroundColor
        )

        /* Switch to light */
        await page
            .getByRole('group', { name: 'Theme axis' })
            .getByRole('button', { name: 'Light' })
            .click()
        await expect(scope).toHaveAttribute('data-design-theme', 'light')

        const lightBg = await canvas.evaluate(
            (element) => getComputedStyle(element).backgroundColor
        )
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
            .getByRole('button', { name: 'Dense' })
            .click()
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
            .getByRole('button', { name: 'Ocean' })
            .click()
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
            .getByRole('button', { name: 'Violet' })
            .click()
        await page
            .getByRole('group', { name: 'Radius axis' })
            .getByRole('button', { name: 'Rounded' })
            .click()
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
            .getByRole('button', { name: 'Violet' })
            .click()
        await page
            .getByRole('group', { name: 'Theme axis' })
            .getByRole('button', { name: 'Light' })
            .click()

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

    test('keyboard navigation works in customizer', async ({ page }) => {
        await page.goto('/moodboard')
        const accentGroup = page.getByRole('group', { name: 'Accent axis' })

        /* Tab into accent group */
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')

        /* Arrow keys should move focus within ToggleGroup */
        const cyanButton = accentGroup.getByRole('button', { name: 'Cyan' })
        await expect(cyanButton).toBeVisible()
    })
})
