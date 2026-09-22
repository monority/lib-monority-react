import { expect, test } from '@playwright/test'

const DIALOG = '[role="dialog"][aria-label="Documentation navigation"]'
const BURGER = '.docs-mobile-bar__toggle'
const DESKTOP_SIDEBAR = '.docs-sidebar--desktop'
const MOBILE_BAR = '.docs-mobile-bar'

test.describe('docs responsive navigation', () => {
    test('shows content first with navigation on demand', async ({ page, viewport }) => {
        const width = viewport?.width ?? 1440
        const isMobile = width <= 720

        await page.goto('/docs')
        await expect(page.locator('.docs-layout')).toBeVisible()
        await expect(page.locator('.docs-content h1').first()).toBeVisible()

        // No horizontal overflow in the resting state.
        expect(
            await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
        ).toBe(true)

        if (!isMobile) {
            await expect(page.locator(DESKTOP_SIDEBAR)).toBeVisible()
            await expect(page.locator(MOBILE_BAR)).toBeHidden()
            await expect(page.locator(BURGER)).toBeHidden()
            await page.goto('/docs/toast')
            await expect(page.locator('.docs-content h1').first()).toHaveText('Toast')
            return
        }

        await expect(page.locator(DESKTOP_SIDEBAR)).toBeHidden()
        await expect(page.locator(MOBILE_BAR)).toBeVisible()
        const burger = page.locator(BURGER)
        await expect(burger).toBeVisible()
        await expect(page.locator(DIALOG)).toHaveCount(0)
        await expect(burger).toHaveAttribute('aria-expanded', 'false')

        // Open via burger.
        await burger.click()
        await expect(page.locator(DIALOG)).toBeVisible()
        await expect(burger).toHaveAttribute('aria-expanded', 'true')
        await expect(page.locator('.docs-mobile-nav__backdrop')).toBeVisible()
        await expect(page.locator('.docs-mobile-nav__panel')).toBeVisible()
        expect(
            await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
        ).toBe(true)

        // Scroll is locked while open and restored after close.
        expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden')
        await page.keyboard.press('Escape')
        await expect(page.locator(DIALOG)).toHaveCount(0)
        await expect(burger).toBeFocused()
        expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')

        // Real navigation from the drawer closes it synchronously.
        await burger.click()
        await expect(page.locator(DIALOG)).toBeVisible()
        await page.locator('.docs-mobile-nav__panel a.docs-nav-link[href="/docs/toast"]').click()
        await expect(page).toHaveURL(/\/docs\/toast$/)
        await expect(page.locator(DIALOG)).toHaveCount(0)
        await expect(page.locator('.docs-content h1').first()).toHaveText('Toast', {
            timeout: 10000,
        })

        // Drawer stays functional after navigation.
        await burger.click()
        await expect(page.locator(DIALOG)).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(page.locator(DIALOG)).toHaveCount(0)
    })

    test('neutralizes drawer motion when reduced motion is preferred', async ({ page }, testInfo) => {
        test.skip(
            testInfo.project.name !== 'mobile-reduced-motion',
            'only the reduced-motion project asserts here',
        )
        await page.goto('/docs')
        await page.locator(BURGER).click()
        await expect(page.locator(DIALOG)).toBeVisible()
        for (const selector of ['.docs-mobile-nav__panel', '.docs-mobile-nav__backdrop']) {
            const animation = await page.evaluate((sel) => {
                const el = document.querySelector(sel)
                if (!el) return 'missing'
                const cs = getComputedStyle(el)
                return `${cs.animationName}/${cs.animationDuration}`
            }, selector)
            expect(animation).toMatch(/none|0s/)
        }
    })
})
