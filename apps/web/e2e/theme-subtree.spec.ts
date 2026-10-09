import { expect, test } from '@playwright/test'

/**
 * Phase 2a — Isolation et resolution des themes sur sous-arbre.
 * Un sous-arbre portant [data-theme] n'herite pas du theme de son ancetre :
 * chaque panneau resout ses propres jetons sémantiques.
 */

const themes = ['light', 'dark', 'oled', 'ocean', 'night', 'slate', 'high-contrast'] as const
const opposite: Record<(typeof themes)[number], string> = {
    light: 'dark',
    dark: 'light',
    oled: 'light',
    ocean: 'light',
    night: 'dark',
    slate: 'light',
    'high-contrast': 'dark',
}

test.describe('phase 2a — thèmes sur sous-arbre', () => {
    for (const theme of themes) {
        test(`${theme} dans ${opposite[theme]} — isolation sous-arbre`, async ({ page }) => {
            await page.goto('/docs')
            await page.waitForSelector('.docs-content')

            const result = await page.evaluate(
                ({ hostTheme, panelTheme }) => {
                    document.documentElement.dataset.theme = hostTheme
                    const host = document.createElement('section')
                    host.dataset.theme = hostTheme

                    const hostProbe = document.createElement('div')
                    hostProbe.style.backgroundColor = 'var(--mr-bg-canvas)'
                    hostProbe.style.color = 'var(--mr-text-primary)'
                    host.append(hostProbe)

                    const panel = document.createElement('div')
                    panel.dataset.theme = panelTheme

                    const panelProbe = document.createElement('div')
                    panelProbe.style.backgroundColor = 'var(--mr-bg-canvas)'
                    panelProbe.style.color = 'var(--mr-text-primary)'
                    panelProbe.style.borderColor = 'var(--mr-accent-solid)'
                    panel.append(panelProbe)

                    const refRoot = document.createElement('div')
                    refRoot.dataset.theme = panelTheme
                    const refProbe = document.createElement('div')
                    refProbe.style.backgroundColor = 'var(--mr-bg-canvas)'
                    refProbe.style.color = 'var(--mr-text-primary)'
                    refProbe.style.borderColor = 'var(--mr-accent-solid)'
                    refRoot.append(refProbe)

                    host.append(panel)
                    document.body.append(host)
                    document.body.append(refRoot)

                    const panelStyle = getComputedStyle(panelProbe)
                    const hostStyle = getComputedStyle(hostProbe)
                    const refStyle = getComputedStyle(refProbe)

                    const comparison = {
                        panelBg: panelStyle.backgroundColor,
                        panelColor: panelStyle.color,
                        hostBg: hostStyle.backgroundColor,
                        hostColor: hostStyle.color,
                        refBg: refStyle.backgroundColor,
                        refColor: refStyle.color,
                    }

                    host.remove()
                    refRoot.remove()
                    return comparison
                },
                {
                    hostTheme: opposite[theme],
                    panelTheme: theme,
                }
            )

            expect(result.panelBg).toBe(result.refBg)
            expect(result.panelColor).toBe(result.refColor)
            expect(result.panelBg).not.toBe(result.hostBg)
            expect(result.panelColor).not.toBe(result.hostColor)
        })
    }

    test('data-brand sur sous-arbre réévalue les tokens d accent par cascade', async ({ page }) => {
        await page.goto('/docs')
        const result = await page.evaluate(() => {
            document.documentElement.dataset.theme = 'dark'
            const host = document.createElement('div')
            const hostProbe = document.createElement('div')
            hostProbe.style.backgroundColor = 'var(--mr-accent-solid)'
            host.append(hostProbe)

            const brandScope = document.createElement('div')
            brandScope.dataset.brand = 'custom'
            brandScope.style.setProperty('--mr-ref-brand-hue', '150')
            brandScope.style.setProperty('--mr-ref-brand-chroma', '0.15')
            const brandProbe = document.createElement('div')
            brandProbe.style.backgroundColor = 'var(--mr-accent-solid)'
            brandScope.append(brandProbe)

            host.append(brandScope)
            document.body.append(host)

            const hostAccent = getComputedStyle(hostProbe).backgroundColor
            const brandAccent = getComputedStyle(brandProbe).backgroundColor

            host.remove()
            return { hostAccent, brandAccent }
        })

        expect(result.hostAccent).not.toBe(result.brandAccent)
    })
})
