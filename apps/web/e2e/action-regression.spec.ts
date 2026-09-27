import { expect, test } from '@playwright/test'

test('spinner reste animé en mouvement réduit et utilise la durée spin', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/docs/spinner')

    const ring = page.locator('.mr-spinner[data-size="md"] .mr-spinner__ring').first()
    const style = await ring.evaluate((element) => {
        const computed = getComputedStyle(element)
        return {
            animationName: computed.animationName,
            animationDuration: computed.animationDuration,
            animationIterationCount: computed.animationIterationCount,
        }
    })

    expect(style.animationName).toBe('mr-spin')
    expect(style.animationDuration).toBe('1.6s')
    expect(style.animationIterationCount).toBe('infinite')
})

test('button conserve le padding horizontal et supprime le padding vertical', async ({ page }) => {
    await page.goto('/harness/button?theme=light&density=comfortable')
    const button = page.locator('[data-testid="harness-page"] button').nth(1)

    await expect(button).toHaveCSS('padding-top', '0px')
    await expect(button).toHaveCSS('padding-bottom', '0px')
    await expect(button).toHaveCSS('padding-left', '16px')
    await expect(button).toHaveCSS('padding-right', '16px')
})
