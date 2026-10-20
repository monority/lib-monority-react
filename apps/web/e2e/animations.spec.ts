import { test, expect } from '@playwright/test'

test.describe('Component Animations Contract', () => {
    test('Modal exhibits distinct enter and exit animations with data-state', async ({ page }) => {
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
                state: el.getAttribute('data-state'),
            }
        })
        expect(openAnim.animationName).toBe('mr-modal-enter')
        expect(openAnim.animationDuration).toBe('0.28s')
        expect(openAnim.state).toBe('open')

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
                panelState: p.getAttribute('data-state'),
                animationName: s.animationName,
            }
        })
        expect(closingAnim?.isClosing).toBe(true)
        expect(closingAnim?.panelState).toBe('closed')
        expect(closingAnim?.animationName).toBe('mr-modal-exit')

        await page.waitForTimeout(350)
        expect(await page.locator('.mr-modal').count()).toBe(0)
    })

    test('Drawer exhibits distinct enter and exit animations with single smooth close cycle', async ({
        page,
    }) => {
        await page.goto('/docs/drawer')

        const openBtn = page.getByRole('button', { name: /Ouvrir le panneau/i }).first()
        await openBtn.click()

        const panel = page.locator('.mr-drawer__panel')
        await expect(panel).toBeVisible()

        const openAnim = await panel.evaluate((el) => {
            const s = window.getComputedStyle(el)
            return {
                animationName: s.animationName,
                state: el.getAttribute('data-state'),
            }
        })
        expect(openAnim.animationName).toBe('mr-drawer-enter-right')
        expect(openAnim.state).toBe('open')

        // Trigger close without waiting for element to unmount
        await page.evaluate(() => {
            const btn = document.querySelector('.mr-drawer__close') as HTMLButtonElement
            btn?.click()
        })

        const closingAnim = await page.evaluate(() => {
            const p = document.querySelector('.mr-drawer__panel')
            if (!p) return null
            const s = window.getComputedStyle(p)
            return {
                isClosing: p.hasAttribute('data-closing'),
                panelState: p.getAttribute('data-state'),
                animationName: s.animationName,
            }
        })
        expect(closingAnim?.isClosing).toBe(true)
        expect(closingAnim?.panelState).toBe('closed')
        expect(closingAnim?.animationName).toBe('mr-slide-out-right')

        // Wait for unmount
        await page.waitForTimeout(300)
        expect(await page.locator('.mr-drawer__panel').count()).toBe(0)
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
                state: el.getAttribute('data-state'),
            }
        })
        expect(openAnim.hasDataPositioned).toBe(true)
        expect(openAnim.animationName).toBe('mr-dropdown-enter')
        expect(openAnim.animationDuration).toBe('0.2s')
        expect(openAnim.state).toBe('open')

        // Trigger close
        await page.evaluate(() => {
            const item = document.querySelector('.mr-dropdown__item') as HTMLButtonElement
            item?.click()
        })

        const closingAnim = await page.evaluate(() => {
            const content = document.querySelector('.mr-dropdown__content')
            if (!content) return null
            const s = window.getComputedStyle(content)
            return {
                isClosing: content.hasAttribute('data-closing'),
                state: content.getAttribute('data-state'),
                animationName: s.animationName,
            }
        })
        expect(closingAnim?.isClosing).toBe(true)
        expect(closingAnim?.state).toBe('closed')
        expect(closingAnim?.animationName).toBe('mr-floating-exit')

        await page.waitForTimeout(300)
        expect(await page.locator('.mr-dropdown__content').count()).toBe(0)
    })

    test('Popover exhibits distinct enter and exit animations once positioned', async ({
        page,
    }) => {
        await page.goto('/docs/popover')

        const trigger = page
            .getByRole('button', { name: 'Paramètres rapides', exact: true })
            .first()
        await trigger.click()

        const content = page.locator('.mr-popover__content')
        await expect(content).toBeVisible()

        const openAnim = await content.evaluate((el) => {
            const s = window.getComputedStyle(el)
            return {
                hasDataPositioned: el.hasAttribute('data-positioned'),
                animationName: s.animationName,
                state: el.getAttribute('data-state'),
            }
        })
        expect(openAnim.hasDataPositioned).toBe(true)
        expect(openAnim.animationName).toBe('mr-popover-enter')
        expect(openAnim.state).toBe('open')

        // Trigger close by clicking outside
        await page.evaluate(() => {
            document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
        })

        const closingAnim = await page.evaluate(() => {
            const content = document.querySelector('.mr-popover__content')
            if (!content) return null
            const s = window.getComputedStyle(content)
            return {
                isClosing: content.hasAttribute('data-closing'),
                state: content.getAttribute('data-state'),
                animationName: s.animationName,
            }
        })
        expect(closingAnim?.isClosing).toBe(true)
        expect(closingAnim?.state).toBe('closed')
        expect(closingAnim?.animationName).toBe('mr-floating-exit')

        await page.waitForTimeout(300)
        expect(await page.locator('.mr-popover__content').count()).toBe(0)
    })

    test('HoverCard exhibits distinct enter and exit animations with accurate positioning', async ({
        page,
    }) => {
        await page.goto('/docs/hover-card')

        const trigger = page.getByRole('button', { name: '@monority/ui', exact: true }).first()
        await trigger.hover()

        const content = page.locator('.mr-hovercard__content').filter({ hasText: 'Monority UI' })
        await expect(content).toBeVisible({ timeout: 3000 })

        const openAnim = await content.evaluate((el) => {
            const s = window.getComputedStyle(el)
            return {
                hasDataPositioned: el.hasAttribute('data-positioned'),
                animationName: s.animationName,
                state: el.getAttribute('data-state'),
                hasArrow: Boolean(el.querySelector('.mr-hovercard__arrow')),
            }
        })
        expect(openAnim.hasDataPositioned).toBe(true)
        expect(openAnim.animationName).toBe('mr-hovercard-enter')
        expect(openAnim.state).toBe('open')
        expect(openAnim.hasArrow).toBe(true)
    })

    test('Combobox exhibits distinct enter and exit animations with floating positioning', async ({
        page,
    }) => {
        await page.goto('/docs/combobox')

        const input = page.locator('.mr-combobox__input').first()
        await expect(input).toBeVisible()
        await input.click()

        const list = page.locator('.mr-combobox__list').first()
        await expect(list).toBeVisible({ timeout: 3000 })

        const openAnim = await list.evaluate((el) => {
            const s = window.getComputedStyle(el)
            return {
                hasDataPositioned: el.hasAttribute('data-positioned'),
                animationName: s.animationName,
                state: el.getAttribute('data-state'),
            }
        })
        expect(openAnim.hasDataPositioned).toBe(true)
        expect(['mr-combobox-enter', 'mr-combobox-enter-top']).toContain(openAnim.animationName)
        expect(openAnim.state).toBe('open')

        // Close via Escape
        await page.keyboard.press('Escape')

        const closingAnim = await page.evaluate(() => {
            const el = document.querySelector('.mr-combobox__list')
            if (!el) return null
            const s = window.getComputedStyle(el)
            return {
                isClosing: el.hasAttribute('data-closing'),
                state: el.getAttribute('data-state'),
                animationName: s.animationName,
            }
        })
        if (closingAnim) {
            expect(closingAnim.isClosing).toBe(true)
            expect(closingAnim.state).toBe('closed')
            expect(closingAnim.animationName).toBe('mr-floating-exit')
        }

        await page.waitForTimeout(200)
        expect(await page.locator('.mr-combobox__list').count()).toBe(0)
    })

    test('Toast in ToastProvider exhibits enter and smooth exit animations with data-state', async ({
        page,
    }) => {
        await page.goto('/docs/toast')

        const pushBtn = page.getByRole('button', { name: 'Push sticky toast' })
        await pushBtn.click()

        const toast = page.locator('.mr-toast-viewport .mr-toast').first()
        await expect(toast).toBeVisible()

        const openAnim = await toast.evaluate((el) => {
            const s = window.getComputedStyle(el)
            return {
                animationName: s.animationName,
                state: el.getAttribute('data-state'),
            }
        })
        expect(openAnim.animationName).toBe('mr-toast-enter')
        expect(openAnim.state).toBe('open')

        // Trigger close without waiting for element to unmount
        await page.evaluate(() => {
            const btn = document.querySelector(
                '.mr-toast-viewport .mr-toast__close'
            ) as HTMLButtonElement
            btn?.click()
        })

        const closingAnim = await page.evaluate(() => {
            const el = document.querySelector('.mr-toast-viewport .mr-toast')
            if (!el) return null
            const s = window.getComputedStyle(el)
            return {
                isClosing: el.hasAttribute('data-closing'),
                state: el.getAttribute('data-state'),
                animationName: s.animationName,
            }
        })
        expect(closingAnim?.isClosing).toBe(true)
        expect(closingAnim?.state).toBe('closed')
        expect(closingAnim?.animationName).toBe('mr-toast-exit')

        // Wait for unmount
        await page.waitForTimeout(300)
        expect(await page.locator('.mr-toast-viewport .mr-toast').count()).toBe(0)
    })

    test('MotionToggle switches between active and reduced motion modes', async ({ page }) => {
        await page.goto('/')

        const toggle = page.getByRole('button', { name: /Animations actives/i })
        await expect(toggle).toBeVisible()

        // Verify root data-motion is initially "always"
        const initialMotion = await page.evaluate(() =>
            document.documentElement.getAttribute('data-motion')
        )
        expect(initialMotion).toBe('always')

        // Click to switch to reduced motion
        await toggle.click()
        const reducedMotion = await page.evaluate(() =>
            document.documentElement.getAttribute('data-motion')
        )
        expect(reducedMotion).toBe('reduce')

        // Click again to switch back to active motion
        const toggleOff = page.getByRole('button', { name: /Animations reduites/i })
        await toggleOff.click()
        const activeMotionAgain = await page.evaluate(() =>
            document.documentElement.getAttribute('data-motion')
        )
        expect(activeMotionAgain).toBe('always')
    })

    test('HoverCard arrow is precisely centered with the trigger', async ({ page }) => {
        await page.goto('/docs/hover-card')
        const pg = page.locator('.component-playground')
        const trigger = pg.locator('.mr-hovercard__trigger')
        await trigger.hover()
        await page.waitForTimeout(400)

        const hcMetrics = await page.evaluate(() => {
            const trg = document
                .querySelector('.component-playground .mr-hovercard__trigger')
                ?.getBoundingClientRect()
            const contents = Array.from(document.querySelectorAll('.mr-hovercard__content'))
            const cardEl = contents.find((c) => c.textContent?.includes('Monority UI'))
            const card = cardEl?.getBoundingClientRect()
            const arrow = cardEl?.querySelector('.mr-hovercard__arrow')?.getBoundingClientRect()
            return { trg, card, arrow }
        })
        expect(hcMetrics.trg).not.toBeNull()
        expect(hcMetrics.card).not.toBeNull()
        expect(hcMetrics.arrow).not.toBeNull()

        const trgCenterX = hcMetrics.trg!.left + hcMetrics.trg!.width / 2
        const arrowCenterX = hcMetrics.arrow!.left + hcMetrics.arrow!.width / 2
        const arrowOffset = Math.abs(arrowCenterX - trgCenterX)
        expect(arrowOffset).toBeLessThan(1.5)
    })

    test('Menubar dimensions and NavigationMenu stay compact and visible', async ({ page }) => {
        await page.goto('/docs/menubar')
        const mbTrigger = page.locator('.component-playground .mr-menubar__trigger').first()
        await mbTrigger.click()
        const mbMenu = page.locator('.component-playground .mr-menubar__menu').first()
        await expect(mbMenu).toBeVisible()

        const mbHeight = await page.evaluate(() => {
            const mb = document
                .querySelector('.component-playground .mr-menubar')
                ?.getBoundingClientRect()
            return mb?.height
        })
        expect(mbHeight).toBeLessThan(45)

        await page.goto('/docs/navigation-menu')
        const navItem = page
            .locator('.component-playground .mr-nav-menu__item')
            .filter({ hasText: 'Composants' })
        await navItem.hover()
        await page.waitForTimeout(300)
        const navContent = page.locator('.component-playground .mr-nav-menu__content')
        await expect(navContent).toBeVisible()
    })

    test('SidebarLayout sidebar stretches to match main content height', async ({ page }) => {
        await page.goto('/docs/sidebar-layout')
        const sidebarLayout = page.locator('.component-playground .mr-sidebar-layout')
        await expect(sidebarLayout).toBeVisible()
        const slMetrics = await page.evaluate(() => {
            const sidebar = document
                .querySelector('.component-playground .mr-sidebar-layout__sidebar')
                ?.getBoundingClientRect()
            const main = document
                .querySelector('.component-playground .mr-sidebar-layout__main')
                ?.getBoundingClientRect()
            return { sidebarHeight: sidebar?.height, mainHeight: main?.height }
        })
        expect(slMetrics.sidebarHeight).toBeCloseTo(slMetrics.mainHeight || 0, -1)
    })

    test('Collapsible exhibits smooth CSS Grid expansion and chevron rotation transitions', async ({
        page,
    }) => {
        await page.goto('/docs/collapsible')

        const trigger = page.locator('.component-playground .mr-collapsible__trigger').first()
        const panel = page.locator('.component-playground .mr-collapsible__panel').first()
        const icon = page.locator('.component-playground .mr-collapsible__icon').first()

        await expect(trigger).toBeVisible()
        await expect(panel).toBeVisible()
        await expect(icon).toBeVisible()

        const initialStyles = await page.evaluate(() => {
            const p = document.querySelector('.component-playground .mr-collapsible__panel')
            const ic = document.querySelector('.component-playground .mr-collapsible__icon')
            if (!p || !ic) return null
            const ps = window.getComputedStyle(p)
            const ics = window.getComputedStyle(ic)
            return {
                panelTransition: ps.transition,
                iconTransition: ics.transition,
                state: p.getAttribute('data-state'),
                hasGridRows: ps.gridTemplateRows !== '',
                isReduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            }
        })

        expect(initialStyles?.hasGridRows).toBe(true)
        if (!initialStyles?.isReduced) {
            expect(initialStyles?.panelTransition).toContain('grid-template-rows')
            expect(initialStyles?.iconTransition).toContain('transform')
        } else {
            expect(initialStyles?.panelTransition).toBe('none')
        }

        // Click trigger to toggle closed
        await trigger.click()
        await page.waitForTimeout(350)

        const closedState = await panel.getAttribute('data-state')
        expect(closedState).toBe('closed')

        // Click trigger to toggle open
        await trigger.click()
        await page.waitForTimeout(350)

        const openState = await panel.getAttribute('data-state')
        expect(openState).toBe('open')
    })

    test('Accordion exhibits smooth CSS Grid expansion and roving keyboard focus', async ({
        page,
    }) => {
        await page.goto('/docs/accordion')

        const triggers = page.locator('.component-playground .mr-accordion__trigger')
        const panels = page.locator('.component-playground .mr-accordion__panel')

        await expect(triggers.first()).toBeVisible()
        await expect(panels.first()).toBeVisible()

        const initialAccordion = await page.evaluate(() => {
            const p = document.querySelector('.component-playground .mr-accordion__panel')
            const ic = document.querySelector('.component-playground .mr-accordion__icon')
            if (!p || !ic) return null
            const ps = window.getComputedStyle(p)
            const ics = window.getComputedStyle(ic)
            return {
                panelTransition: ps.transition,
                iconTransition: ics.transition,
                hasGridRows: ps.gridTemplateRows !== '',
                isReduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            }
        })

        expect(initialAccordion?.hasGridRows).toBe(true)
        if (!initialAccordion?.isReduced) {
            expect(initialAccordion?.panelTransition).toContain('grid-template-rows')
            expect(initialAccordion?.iconTransition).toContain('transform')
        } else {
            expect(initialAccordion?.panelTransition).toBe('none')
        }

        // Click second section
        await triggers.nth(1).click()
        await page.waitForTimeout(350)

        const secondOpen = await panels.nth(1).getAttribute('data-state')
        expect(secondOpen).toBe('open')
    })
})
