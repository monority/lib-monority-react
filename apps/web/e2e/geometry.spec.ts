import { expect, test } from '@playwright/test'

const viewports = [1440, 1024, 768, 430, 390, 375]

test('card geometry stays measurable across responsive widths and themes', async ({ page }) => {
    for (const width of viewports) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto('/docs/card')
        const card = page.locator('.mr-card').first()
        await expect(card).toBeVisible()
        const metrics = await card.evaluate((element) => {
            const rect = element.getBoundingClientRect()
            const style = getComputedStyle(element)
            return {
                width: rect.width,
                height: rect.height,
                padding: style.padding,
                gap: style.gap,
                radius: style.borderRadius,
                shadow: style.boxShadow,
                overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
            }
        })
        console.log(`CARD ${width} ${JSON.stringify(metrics)}`)
        expect(metrics.width).toBeGreaterThan(0)
        expect(metrics.height).toBeGreaterThan(0)
        expect(metrics.overflow).toBe(true)
    }

    for (const theme of ['light', 'dark', 'oled']) {
        await page.setViewportSize({ width: 1440, height: 900 })
        await page.goto('/docs/card')
        await expect(page.locator('.mr-card').first()).toBeVisible()
        await page.evaluate((nextTheme) => {
            document.documentElement.dataset.theme = nextTheme
            const root = document.querySelector('.monority-theme-root')
            if (root instanceof HTMLElement) root.dataset.theme = nextTheme
        }, theme)
        await page.waitForTimeout(250)
        const surface = await page
            .locator('.mr-card')
            .first()
            .evaluate((element) => {
                const style = getComputedStyle(element)
                return { background: style.backgroundColor, radius: style.borderRadius }
            })
        console.log(`CARD THEME ${theme} ${JSON.stringify(surface)}`)
        expect(surface.radius).not.toBe('')
    }
})

test('Step32 surfaces and motion remain usable at target widths', async ({ page }) => {
    for (const width of [1440, 1024, 768, 430, 390, 375]) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto('/docs/select')
        const select = page.locator('.mr-select').first()
        await expect(select).toBeVisible()
        const selectMetrics = await select.evaluate((element) => {
            const style = getComputedStyle(element)
            return {
                paddingEnd: Number.parseFloat(style.paddingRight),
                backgroundImage: style.backgroundImage,
                overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
            }
        })
        expect(selectMetrics.paddingEnd).toBeGreaterThan(20)
        expect(selectMetrics.backgroundImage).toContain('data:image/svg+xml')
        expect(selectMetrics.overflow).toBe(true)

        await page.goto('/docs/file-upload')
        const action = page.locator('.mr-file-upload__action, .mr-file-upload__default-action').first()
        await expect(action).toBeVisible()
        const actionMetrics = await action.evaluate((element) => {
            const rect = element.getBoundingClientRect()
            const style = getComputedStyle(element)
            return {
                height: rect.height,
                borderWidth: style.borderWidth,
                radius: style.borderRadius,
                overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
            }
        })
        expect(actionMetrics.height).toBeGreaterThanOrEqual(32)
        expect(actionMetrics.borderWidth).not.toBe('0px')
        expect(actionMetrics.radius).not.toBe('0px')
        expect(actionMetrics.overflow).toBe(true)

        await page.goto('/docs/radio-group')
        const describedRadio = page.locator('.mr-radio').filter({ hasText: 'Only when someone mentions you' }).first()
        await expect(describedRadio).toBeVisible()
        const radioAlignment = await describedRadio.evaluate((element) => {
            const control = element.querySelector('.mr-radio__control')?.getBoundingClientRect()
            const body = element.querySelector('.mr-radio__body')?.getBoundingClientRect()
            return {
                delta: control && body ? Math.abs((control.top + control.height / 2) - (body.top + body.height / 2)) : Number.POSITIVE_INFINITY,
            }
        })
        expect(radioAlignment.delta).toBeLessThanOrEqual(2)
    }

    await page.setViewportSize({ width: 390, height: 900 })
    await page.goto('/docs/card')
    const codeHeader = page.locator('.docs-code-header').first()
    const headerRects = await codeHeader.evaluate((element) => {
        const children = Array.from(element.children).map((child) => child.getBoundingClientRect())
        return {
            title: children[0]!,
            action: children[1]!,
            overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
        }
    })
    expect(headerRects.title.right).toBeLessThanOrEqual(headerRects.action.left + 1)
    expect(headerRects.overflow).toBe(true)

    await page.goto('/docs/stat-card')
    const statCard = page.locator('.mr-stat-card').filter({ hasText: 'Net revenue' }).first()
    const trend = statCard.locator('.mr-stat-card__trend')
    const label = statCard.locator('.mr-stat-card__label')
    const statRects = await statCard.evaluate((element) => {
        const card = element.getBoundingClientRect()
        const trendRect = element.querySelector('.mr-stat-card__trend')?.getBoundingClientRect()
        const labelRect = element.querySelector('.mr-stat-card__label')?.getBoundingClientRect()
        return { card, trend: trendRect, label: labelRect }
    })
    expect(statRects.trend?.top).toBeLessThanOrEqual((statRects.label?.bottom ?? 0) + 1)
    expect(statRects.trend?.right).toBeLessThanOrEqual(statRects.card.right + 1)
    expect(statRects.trend?.left).toBeGreaterThanOrEqual((statRects.label?.right ?? 0) - 1)
    await expect(trend).toBeVisible()
    await expect(label).toBeVisible()

    for (const theme of ['light', 'dark', 'oled']) {
        await page.goto('/docs/file-upload')
        await page.evaluate((nextTheme) => {
            document.documentElement.dataset.theme = nextTheme
            const root = document.querySelector('.monority-theme-root')
            if (root instanceof HTMLElement) root.dataset.theme = nextTheme
        }, theme)
        const themedAction = page.locator('.mr-file-upload__action, .mr-file-upload__default-action').first()
        await expect(themedAction).toBeVisible()
        const themedSurface = await themedAction.evaluate((element) => ({
            color: getComputedStyle(element).color,
            border: getComputedStyle(element).borderColor,
        }))
        expect(themedSurface.color).not.toBe('')
        expect(themedSurface.border).not.toBe('rgba(0, 0, 0, 0)')
    }
})

test('Step32 date range blocks end dates on or before start', async ({ page }) => {
    await page.goto('/docs/date-range-picker')
    const triggers = page.locator('.mr-datepicker__trigger')
    await triggers.nth(0).click()
    const startDay = page.locator('.mr-datepicker__day[data-current-month="true"]:not([data-disabled="true"])').nth(10)
    const startText = (await startDay.textContent())?.trim()
    await startDay.click()
    await triggers.nth(1).click()
    const sameDay = page.getByRole('gridcell', { name: startText ?? '', exact: true })
    await expect(sameDay).toHaveAttribute('data-disabled', 'true')
    const laterDay = page.getByRole('gridcell', { name: String(Number(startText) + 1), exact: true })
    await expect(laterDay).not.toHaveAttribute('data-disabled', 'true')
})

test('Step32 interactive motion changes over time and respects reduced motion', async ({ page }) => {
    await page.goto('/docs/progress')
    const progress = page.locator('.mr-progress').filter({ hasText: 'Packaging release' }).first()
    await expect(progress).toBeVisible()
    const initialProgress = await progress.getAttribute('data-value')
    const prefersReducedMotion = await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    if (prefersReducedMotion) {
        expect(initialProgress).toBe('100')
    } else {
        await expect.poll(async () => progress.getAttribute('data-value'), { timeout: 2500 }).not.toBe(initialProgress)
    }

    await page.goto('/docs/spinner')
    const ring = page.locator('.mr-spinner__ring').first()
    await expect(ring).toBeVisible()
    const initialTransform = await ring.evaluate((element) => getComputedStyle(element).transform)
    if (prefersReducedMotion) {
        expect(initialTransform).toBe('none')
    } else {
        await expect
            .poll(async () => ring.evaluate((element) => getComputedStyle(element).transform), { timeout: 1200 })
            .not.toBe(initialTransform)
    }

    await page.goto('/docs/async-state-notice')
    await page.getByRole('button', { name: 'Load', exact: true }).click()
    const loadingNotice = page.locator('.mr-async-state-notice[data-state="loading"]').last()
    await expect(loadingNotice).toBeVisible()
    expect(await loadingNotice.evaluate((element) => getComputedStyle(element).animationName)).not.toBe('none')
    await page.getByRole('button', { name: 'Error', exact: true }).click()
    const errorNotice = page.locator('.mr-async-state-notice[data-state="error"]').last()
    await expect(errorNotice).toBeVisible()
    expect(await errorNotice.evaluate((element) => getComputedStyle(element).animationName)).not.toBe('none')

    await page.goto('/docs/infinite-scroll')
    const viewport = page.getByTestId('infinite-scroll-viewport')
    const initialItems = await viewport.locator('.docs-infinite-scroll-item').count()
    await expect.poll(async () => viewport.locator('.docs-infinite-scroll-item').count(), { timeout: 3500 }).toBeGreaterThan(initialItems)
    const scrollMetrics = await viewport.evaluate((element) => ({
        scrollable: element.scrollHeight > element.clientHeight,
        pageOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
    }))
    expect(scrollMetrics.scrollable).toBe(true)
    expect(scrollMetrics.pageOverflow).toBe(true)

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/docs/spinner')
    const reducedRing = page.locator('.mr-spinner__ring').first()
    expect(await reducedRing.evaluate((element) => getComputedStyle(element).animationName)).toBe('none')
    await page.goto('/docs/progress')
    const reducedProgress = page.locator('.mr-progress').filter({ hasText: 'Packaging release' }).first()
    await expect.poll(async () => reducedProgress.getAttribute('data-value'), { timeout: 1000 }).toBe('100')
})

test('control families expose the shared density ladder', async ({ page }) => {
    const sizes = ['sm', 'md', 'lg'] as const
    const expectedHeights = { sm: 32, md: 40, lg: 48 } as const
    const expectedFontSizes = { sm: 12, md: 14, lg: 16 } as const
    const families = [
        { route: '/docs/button', selector: (size: string) => `.mr-btn[data-size='${size}']` },
        { route: '/docs/input', selector: (size: string) => `.mr-input[data-size='${size}']` },
        {
            route: '/docs/input',
            selector: (size: string) => `.mr-number-input[data-size='${size}']`,
        },
        {
            route: '/docs/input',
            selector: (size: string) => `.mr-password-input[data-size='${size}']`,
        },
        { route: '/docs/select', selector: (size: string) => `.mr-select[data-size='${size}']` },
        {
            route: '/docs/combobox',
            selector: (size: string) => `.mr-combobox[data-size='${size}'] .mr-combobox__input`,
        },
        {
            route: '/docs/date-picker',
            selector: (size: string) =>
                `.mr-datepicker[data-size='${size}'] .mr-datepicker__trigger`,
        },
        { route: '/docs/toggle', selector: (size: string) => `.mr-toggle[data-size='${size}']` },
    ]

    for (const family of families) {
        await page.setViewportSize({ width: 1440, height: 900 })
        await page.goto(family.route)
        for (const size of sizes) {
            const control = page.locator(family.selector(size)).first()
            await expect(control).toBeVisible()
            const metrics = await control.evaluate((element) => {
                const rect = element.getBoundingClientRect()
                const style = getComputedStyle(element)
                const wrapper = element.parentElement
                const auxiliary = wrapper?.querySelector<HTMLElement>(
                    '.mr-number-input__actions, .mr-password-input__toggle'
                )
                return {
                    width: rect.width,
                    height: rect.height,
                    padding: style.padding,
                    radius: style.borderRadius,
                    fontSize: Number.parseFloat(style.fontSize),
                    lineHeight: style.lineHeight,
                    auxiliaryWidth: auxiliary?.getBoundingClientRect().width,
                    overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
                }
            })
            console.log(`CONTROL ${family.route} ${size} ${JSON.stringify(metrics)}`)
            expect(Math.abs(metrics.height - expectedHeights[size])).toBeLessThanOrEqual(1)
            expect(metrics.fontSize).toBe(expectedFontSizes[size])
            expect(metrics.overflow).toBe(true)
            if (
                family.selector('sm').includes('number-input') ||
                family.selector('sm').includes('password-input')
            ) {
                expect(metrics.auxiliaryWidth).toBe(expectedHeights[size])
            }
        }
    }
})
