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
    await page.goto('/docs/button')
    const button = page.locator('.mr-btn[data-size="md"]').first()

    await expect(button).toHaveCSS('padding-top', '0px')
    await expect(button).toHaveCSS('padding-bottom', '0px')
    await expect(button).toHaveCSS('padding-left', '16px')
    await expect(button).toHaveCSS('padding-right', '16px')
})

test('accordion fermé n’occupe que la hauteur de son trigger', async ({ page }) => {
    await page.goto('/docs/accordion')
    const closedItem = page.locator('.mr-accordion__item:not([data-open])').first()
    await expect(closedItem).toBeVisible()

    const trigger = closedItem.locator('.mr-accordion__trigger')
    const panel = closedItem.locator('.mr-accordion__panel')

    const itemBox = await closedItem.boundingBox()
    const triggerBox = await trigger.boundingBox()
    const panelBox = await panel.boundingBox()

    expect(itemBox).not.toBeNull()
    expect(triggerBox).not.toBeNull()
    expect(panelBox).not.toBeNull()

    // Hauteur de l'item fermé strictement égale à celle du trigger (tolérance 1px pour bords subpixel)
    expect(Math.abs(itemBox!.height - triggerBox!.height)).toBeLessThanOrEqual(1)
    // Le panel replié a une hauteur nulle
    expect(panelBox!.height).toBe(0)
})

test('menubar élève son z-index à 60 à l’ouverture d’un menu', async ({ page }) => {
    await page.goto('/docs/menubar')
    const menubar = page.locator('.mr-menubar').first()
    await expect(menubar).toHaveCSS('z-index', '10')

    const firstTrigger = menubar.locator('.mr-menubar__trigger').first()
    await firstTrigger.click()

    await expect(menubar).toHaveAttribute('data-open', 'true')
    await expect(menubar).toHaveCSS('z-index', '60')
})

test('navigation-menu élève son z-index à 60 lorsqu’un élément est actif', async ({ page }) => {
    await page.goto('/docs/navigation-menu')
    const navMenu = page
        .locator('.mr-nav-menu')
        .filter({ has: page.locator('.mr-nav-menu__trigger') })
        .first()
    await expect(navMenu).toBeVisible()
    await expect(navMenu).toHaveCSS('z-index', '10')

    const trigger = navMenu.locator('.mr-nav-menu__trigger').first()
    await trigger.hover()

    await expect(navMenu).toHaveAttribute('data-open', 'true')
    await expect(navMenu).toHaveCSS('z-index', '60')
})

test('progress strié et animé applique le dégradé linéaire et l’animation mr-progress-stripes', async ({
    page,
}) => {
    await page.goto('/docs/progress')
    const stripedProgress = page.locator('.mr-progress[data-striped][data-animated]').first()
    await expect(stripedProgress).toBeVisible()

    const bar = stripedProgress.locator('.mr-progress__bar')
    const style = await bar.evaluate((element) => {
        const computed = getComputedStyle(element)
        return {
            backgroundImage: computed.backgroundImage,
            animationName: computed.animationName,
        }
    })

    expect(style.backgroundImage).toContain('linear-gradient')
    expect(style.animationName).toBe('mr-progress-stripes')
})
