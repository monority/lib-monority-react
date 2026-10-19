import { test, expect } from '@playwright/test'

test.describe('Component Animations Contract', () => {
    test('Modal exhibits distinct enter and exit animations', async ({ page }) => {
        await page.goto('/docs/modal')

        const openBtn = page.getByRole('button', { name: 'Ouvrir la modale' })
        await openBtn.click()

        const panel = page.locator('.mr-modal__panel')
        await expect(panel).toBeVisible()

        const openAnim = await panel.evaluate((el) => {
            const s = window.getComputedStyle(el)
            return {
                animationName: s.animationName,
                animationDuration: s.animationDuration,
            }
        })
        expect(openAnim.animationName).toBe('mr-modal-enter')
        expect(openAnim.animationDuration).toBe('0.2s')

        // Trigger close without waiting for element to disappear
        await page.evaluate(() => {
            const btn = document.querySelector('.mr-modal__close') as HTMLButtonElement
            btn?.click()
        })

        const closingAnim = await page.evaluate(() => {
            const modal = document.querySelector('.mr-modal')
            const p = document.querySelector('.mr-modal__panel')
            if (!modal || !p) return null
            const s = window.getComputedStyle(p)
            return {
                isClosing: modal.hasAttribute('data-closing'),
                animationName: s.animationName,
            }
        })
        expect(closingAnim?.isClosing).toBe(true)
        expect(closingAnim?.animationName).toBe('mr-modal-exit')

        await page.waitForTimeout(300)
        expect(await page.locator('.mr-modal').count()).toBe(0)
    })

    test('DropdownMenu exhibits distinct enter and exit animations once positioned', async ({
        page,
    }) => {
        await page.goto('/docs/dropdown-menu')

        const trigger = page.getByRole('button', { name: 'Actions', exact: true }).first()
        await trigger.click()

        const content = page.locator('.mr-dropdown__content')
        await expect(content).toBeVisible()

        const openAnim = await content.evaluate((el) => {
            const s = window.getComputedStyle(el)
            return {
                hasDataPositioned: el.hasAttribute('data-positioned'),
                animationName: s.animationName,
                animationDuration: s.animationDuration,
            }
        })
        expect(openAnim.hasDataPositioned).toBe(true)
        expect(openAnim.animationName).toBe('mr-dropdown-enter')
        expect(openAnim.animationDuration).toBe('0.15s')

        const item = page.locator('.mr-dropdown__item').first()
        await item.click()

        await page.waitForTimeout(250)
        expect(await page.locator('.mr-dropdown__content').count()).toBe(0)
    })
})
