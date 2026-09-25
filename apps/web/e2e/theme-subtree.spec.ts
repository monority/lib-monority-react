import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

/**
 * Phase 2a — H1 / T4. Un sous-arbre `data-theme` themed n'hérite pas du thème
 * de son ancêtre : chaque panneau résout ses propres jetons. Les valeurs
 * calculées de bg-canvas, text-primary et accent correspondent exactement à
 * `packages/tokens/dist/resolved.json`.
 */

const resolvedPath = fileURLToPath(
    new URL('../../../packages/tokens/dist/resolved.json', import.meta.url),
)
const resolved = JSON.parse(readFileSync(resolvedPath, 'utf8'))

const themes = ['light', 'dark', 'oled', 'high-contrast'] as const
const opposite: Record<(typeof themes)[number], string> = {
    light: 'dark',
    dark: 'light',
    oled: 'light',
    'high-contrast': 'dark',
}

const hexToRgb = (hex: string): string => {
    const raw = hex.replace('#', '')
    const value = raw.length === 3 ? [...raw].map((char) => char + char).join('') : raw
    const channels = [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16))
    return `rgb(${channels.join(', ')})`
}

const declarationsFor = (theme: string, token: string): Record<string, string> => ({
    'background-color': `var(${token})`,
    color: 'var(--mr-text-primary)',
    borderColor: 'var(--mr-accent)',
})

test.describe('phase 2a — thèmes sur sous-arbre', () => {
    for (const theme of themes) {
        test(`${theme} dans ${opposite[theme]} — studio compact`, async ({ page }) => {
            await page.goto('/docs')
            await page.waitForSelector('.docs-content')

            const expected = resolved.values[`${theme}.compact.studio`]
            const result = await page.evaluate(
                ({ hostTheme, panelTheme, vars }) => {
                    document.documentElement.dataset.theme = hostTheme
                    const host = document.createElement('section')
                    host.dataset.theme = hostTheme
                    const panel = document.createElement('div')
                    panel.dataset.theme = panelTheme
                    panel.dataset.brand = 'studio'
                    panel.dataset.density = 'compact'
                    const probe = document.createElement('div')
                    Object.assign(probe.style, vars)
                    probe.style.borderRadius = 'var(--mr-radius-control)'
                    probe.style.font = 'var(--mr-type-body)'
                    panel.append(probe)
                    host.append(panel)
                    document.body.append(host)
                    const style = getComputedStyle(probe)
                    const canvas = document.createElement('canvas')
                    canvas.width = 1
                    canvas.height = 1
                    const context = canvas.getContext('2d', { willReadFrequently: true })
                    if (!context) throw new Error('Canvas 2D indisponible')
                    const toRgb = (color: string): string => {
                        context.clearRect(0, 0, 1, 1)
                        context.fillStyle = color
                        context.fillRect(0, 0, 1, 1)
                        const [red, green, blue] = context.getImageData(0, 0, 1, 1).data
                        return `rgb(${red}, ${green}, ${blue})`
                    }
                    const result = {
                        background: toRgb(style.backgroundColor),
                        color: toRgb(style.color),
                        border: toRgb(style.borderColor),
                        controlSize: style.getPropertyValue('--mr-control-size-md').trim(),
                        brandHue: style.getPropertyValue('--mr-brand-hue').trim(),
                        radiusControl: style.borderRadius,
                        fontFamily: style.fontFamily,
                        accent: style.getPropertyValue('--mr-accent').trim(),
                    }
                    host.remove()
                    return result
                },
                {
                    hostTheme: opposite[theme],
                    panelTheme: theme,
                    vars: declarationsFor(theme, '--mr-bg-canvas'),
                },
            )

            expect(result.background).toBe(hexToRgb(expected['--mr-bg-canvas']))
            expect(result.color).toBe(hexToRgb(expected['--mr-text-primary']))
            expect(result.border).toBe(hexToRgb(expected['--mr-accent']))
            expect(result.controlSize).toBe(expected['--mr-control-size-md'])
            expect(result.brandHue).toBe('85')
            expect(result.radiusControl).toBe(expected['--mr-radius-control'])
            expect(result.fontFamily).toMatch(/^Inter/)
            expect(result.accent).toMatch(/(?:^|\s)85(?:\)|$)/)
        })
    }

    test('data-brand seul applique studio aux rayons et à la typographie', async ({ page }) => {
        await page.goto('/docs')
        const result = await page.evaluate(() => {
            document.documentElement.dataset.theme = 'dark'
            const scope = document.createElement('div')
            scope.dataset.brand = 'studio'
            const probe = document.createElement('div')
            probe.style.borderRadius = 'var(--mr-radius-control)'
            probe.style.font = 'var(--mr-type-body)'
            scope.append(probe)
            document.body.append(scope)
            const style = getComputedStyle(probe)
            const values = {
                radius: style.borderRadius,
                fontFamily: style.fontFamily,
            }
            scope.remove()
            return values
        })

        expect(result.radius).toBe('3px')
        expect(result.fontFamily).toMatch(/^Inter/)
    })
})
