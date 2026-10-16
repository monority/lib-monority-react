import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Accessibility & Keyboard E2E audits', () => {
    test('audits WCAG 2.1 AA on Button playground and documentation', async ({
        page,
    }, testInfo) => {
        // Run axe audit on desktop project to avoid redundant viewport runs
        test.skip(testInfo.project.name !== 'desktop', 'desktop accessibility scan only')

        await page.goto('/docs/button')
        const playground = page.locator('.component-playground').first()
        await expect(playground).toBeVisible()

        const results = await new AxeBuilder({ page }).include('.component-playground').analyze()

        for (const v of results.violations) {
            console.warn(`a11y violation: ${v.id} - ${v.description} (${v.nodes.length} nodes)`)
            for (const node of v.nodes.slice(0, 3)) {
                console.warn(`  target: ${node.target.join(' ')} html: ${node.html.slice(0, 100)}`)
            }
        }

        expect(results.violations).toEqual([])
    })

    test('audits WCAG 2.1 AA on Combobox playground and interactive dropdown', async ({
        page,
    }, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'desktop accessibility scan only')

        await page.goto('/docs/combobox')
        const playground = page.locator('.component-playground').first()
        await expect(playground).toBeVisible()

        const results = await new AxeBuilder({ page }).include('.component-playground').analyze()

        for (const v of results.violations) {
            console.warn(`a11y violation: ${v.id} - ${v.description}`)
        }

        expect(results.violations).toEqual([])
    })

    test('audits WCAG 2.1 AA on CommandPalette playground', async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'desktop accessibility scan only')

        await page.goto('/docs/command-palette')
        const playground = page.locator('.component-playground').first()
        await expect(playground).toBeVisible()

        const results = await new AxeBuilder({ page }).include('.component-playground').analyze()

        for (const v of results.violations) {
            console.warn(`a11y violation: ${v.id} - ${v.description}`)
        }

        expect(results.violations).toEqual([])
    })

    test('audits WCAG 2.1 AA on FileUpload playground', async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'desktop accessibility scan only')

        await page.goto('/docs/file-upload')
        const playground = page.locator('.component-playground').first()
        await expect(playground).toBeVisible()

        const results = await new AxeBuilder({ page }).include('.component-playground').analyze()

        for (const v of results.violations) {
            console.warn(`a11y violation: ${v.id} - ${v.description}`)
        }

        expect(results.violations).toEqual([])
    })

    test('audits WCAG 2.1 AA on Modal playground and dialog', async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'desktop accessibility scan only')

        await page.goto('/docs/modal')
        const playground = page.locator('.component-playground').first()
        await expect(playground).toBeVisible()

        const results = await new AxeBuilder({ page }).include('.component-playground').analyze()
        expect(results.violations).toEqual([])
    })

    test('audits WCAG 2.1 AA on AlertDialog playground', async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'desktop accessibility scan only')

        await page.goto('/docs/alert-dialog')
        const playground = page.locator('.component-playground').first()
        await expect(playground).toBeVisible()

        const results = await new AxeBuilder({ page }).include('.component-playground').analyze()
        expect(results.violations).toEqual([])
    })

    test('audits WCAG 2.1 AA on DropdownMenu playground', async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'desktop accessibility scan only')

        await page.goto('/docs/dropdown-menu')
        const playground = page.locator('.component-playground').first()
        await expect(playground).toBeVisible()

        const results = await new AxeBuilder({ page }).include('.component-playground').analyze()
        expect(results.violations).toEqual([])
    })

    test('audits WCAG 2.1 AA on Tabs playground', async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'desktop accessibility scan only')

        await page.goto('/docs/tabs')
        const playground = page.locator('.component-playground').first()
        await expect(playground).toBeVisible()

        const results = await new AxeBuilder({ page }).include('.component-playground').analyze()
        expect(results.violations).toEqual([])
    })

    test('audits WCAG 2.1 AA on SegmentedControl playground', async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'desktop accessibility scan only')

        await page.goto('/docs/segmented-control')
        const playground = page.locator('.component-playground').first()
        await expect(playground).toBeVisible()

        const results = await new AxeBuilder({ page }).include('.component-playground').analyze()
        expect(results.violations).toEqual([])
    })

    test('audits WCAG 2.1 AA on Select playground', async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'desktop accessibility scan only')

        await page.goto('/docs/select')
        const playground = page.locator('.component-playground').first()
        await expect(playground).toBeVisible()

        const results = await new AxeBuilder({ page }).include('.component-playground').analyze()
        expect(results.violations).toEqual([])
    })

    test('audits WCAG 2.1 AA on Switch playground', async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'desktop accessibility scan only')

        await page.goto('/docs/switch')
        const playground = page.locator('.component-playground').first()
        await expect(playground).toBeVisible()

        const results = await new AxeBuilder({ page }).include('.component-playground').analyze()
        expect(results.violations).toEqual([])
    })

    test('combobox opens with ArrowDown and closes with Escape', async ({ page }) => {
        await page.goto('/docs/combobox')
        const input = page.locator('.component-playground .mr-combobox__input').first()
        await expect(input).toBeVisible()

        await input.focus()
        await page.keyboard.press('ArrowDown')

        const list = page.locator('.mr-combobox__list').first()
        await expect(list).toBeVisible()

        await page.keyboard.press('Escape')
        await expect(list).toBeHidden()
    })

    test('command palette opens and closes with Escape', async ({ page }) => {
        await page.goto('/docs/command-palette')
        const trigger = page
            .locator('.component-playground button:has-text("Ouvrir la palette")')
            .first()
        await expect(trigger).toBeVisible()

        await trigger.click()
        const palette = page.locator('.mr-command-palette[data-open]').first()
        await expect(palette).toBeVisible()

        await page.keyboard.press('Escape')
        await expect(palette).toBeHidden()
    })

    test('button playground controls update component and live snippet', async ({ page }) => {
        await page.goto('/docs/button')
        const playground = page.locator('.component-playground').first()
        await expect(playground).toBeVisible()

        const targetButton = playground.locator('.component-playground__canvas button').first()
        await expect(targetButton).toHaveAttribute('data-size', 'md')

        // Change size to lg
        const sizeSelect = playground.locator('select#_r_0_-size, select[id*="-size"]').first()
        await sizeSelect.selectOption('lg')
        await expect(targetButton).toHaveAttribute('data-size', 'lg')

        // Code viewer updates
        const codeBlock = playground.locator('.code-viewer__body pre')
        await expect(codeBlock).toContainText('size="lg"')
    })
})
