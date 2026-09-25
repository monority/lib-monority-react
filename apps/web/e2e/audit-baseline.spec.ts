import { expect, test } from '@playwright/test'
import { docsComponentRegistry } from '../src/docs/components/registry'

/**
 * Phase 0 bis (refonte) audit baselines.
 *
 * Captures a reference screenshot of every registered component docs page,
 * for every existing theme, before any refonte change lands.
 *
 * Opt-in: normal `test:e2e` runs skip this file unless AUDIT_BASELINE=1.
 *
 * Run:
 *   AUDIT_BASELINE=1 pnpm exec playwright test audit-baseline --project=desktop --update-snapshots
 */

const themes = ['light', 'dim', 'dark', 'oled', 'high-contrast'] as const
const enabled = process.env.AUDIT_BASELINE === '1'

test.describe('audit-baseline phase 0 bis', () => {
    test.skip(!enabled, 'Set AUDIT_BASELINE=1 to capture audit baselines')
    test.setTimeout(120_000)

    for (const item of docsComponentRegistry) {
        for (const theme of themes) {
            test(`${item.slug} — ${theme}`, async ({ page }) => {
                // Freeze JS-driven demo loops (rAF / intervals) so two
                // consecutive screenshots are stable; CSS animations are
                // already frozen by `animations: 'disabled'`.
                await page.addInitScript(() => {
                    window.requestAnimationFrame = () => 0
                    window.cancelAnimationFrame = () => undefined
                    window.setInterval = (() => 0) as unknown as typeof window.setInterval
                })
                await page.goto(item.path)
                await page.waitForSelector('.docs-content')
                await page.evaluate((nextTheme) => {
                    document.documentElement.dataset.theme = nextTheme
                    const root = document.querySelector('.monority-theme-root')
                    if (root instanceof HTMLElement) {
                        root.dataset.theme = nextTheme
                        root.style.colorScheme = nextTheme === 'light' ? 'light' : 'dark'
                    }
                }, theme)
                await page.evaluate(() => document.fonts.ready)
                await page.waitForTimeout(150)
                await expect(page.locator('.docs-content')).toHaveScreenshot(
                    `${item.slug}--${theme}.png`,
                    {
                        animations: 'disabled',
                        caret: 'hide',
                        // Sub-pixel rasterisation noise (rounded corners,
                        // glyph AA): a handful of pixels must not fail the
                        // audit capture.
                        maxDiffPixels: 64,
                        maxDiffPixelRatio: 0.0005,
                    },
                )
            })
        }
    }
})
