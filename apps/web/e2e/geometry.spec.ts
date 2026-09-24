import { type Page, expect, test } from '@playwright/test'

const themes = ['light', 'dark', 'oled'] as const

type Rect = {
    top: number
    right: number
    bottom: number
    left: number
}

function intersects(first: Rect, second: Rect) {
    return (
        first.left < second.right &&
        first.right > second.left &&
        first.top < second.bottom &&
        first.bottom > second.top
    )
}

async function setTheme(page: Page, theme: (typeof themes)[number]) {
    await page.evaluate((nextTheme) => {
        document.documentElement.dataset.theme = nextTheme
        const root = document.querySelector('.monority-theme-root')
        if (root instanceof HTMLElement) root.dataset.theme = nextTheme
    }, theme)
    await page.waitForTimeout(50)
}

async function sampleStateAnimation(page: Page, state: 'loading' | 'error') {
    return page.evaluate(
        (nextState) =>
            new Promise<number[]>((resolve) => {
                const observer = new MutationObserver(() => {
                    const elements = document.querySelectorAll(
                        `.mr-async-state-notice[data-state="${nextState}"]`
                    )
                    const element = elements[elements.length - 1]
                    const animation = element?.getAnimations()[0]
                    if (!animation) return
                    observer.disconnect()
                    void animation.ready.then(async () => {
                        const samples = [Number(animation.currentTime ?? 0)]
                        for (let index = 0; index < 3; index += 1) {
                            await new Promise<void>((frame) => requestAnimationFrame(() => frame()))
                            samples.push(Number(animation.currentTime ?? 0))
                        }
                        resolve(samples)
                    })
                })
                observer.observe(document.body, { childList: true, subtree: true })
                window.setTimeout(() => {
                    observer.disconnect()
                    resolve([])
                }, 2000)
            }),
        state
    )
}

test('card geometry stays measurable and distinct across themes', async ({ page }) => {
    const width = page.viewportSize()?.width ?? 0
    await page.goto('/docs/card')
    const card = page.locator('.mr-card').first()
    await expect(card).toBeVisible()
    const metrics = await card.evaluate((element) => {
        const rect = element.getBoundingClientRect()
        const style = getComputedStyle(element)
        const title = element.querySelector<HTMLElement>('.mr-card__title')
        const header = element.querySelector<HTMLElement>('.mr-card__header')
        const description = element.querySelector<HTMLElement>('.mr-card__description')
        const footer = element.querySelector<HTMLElement>('.mr-card__footer')
        const titleStyle = title ? getComputedStyle(title) : null
        const descriptionStyle = description ? getComputedStyle(description) : null
        return {
            width: rect.width,
            height: rect.height,
            paddingTop: Number.parseFloat(style.paddingTop),
            paddingRight: Number.parseFloat(style.paddingRight),
            gap: style.gap,
            radius: style.borderRadius,
            borderWidth: Number.parseFloat(style.borderTopWidth),
            shadow: style.boxShadow,
            titleFontSize: titleStyle ? Number.parseFloat(titleStyle.fontSize) : 0,
            titleLineHeight: titleStyle?.lineHeight ?? '',
            descriptionLineHeight: descriptionStyle?.lineHeight ?? '',
            headerGap:
                header && description
                    ? description.getBoundingClientRect().top -
                      header.getBoundingClientRect().bottom
                    : 0,
            footerGap:
                description && footer
                    ? footer.getBoundingClientRect().top -
                      description.getBoundingClientRect().bottom
                    : 0,
            overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
        }
    })
    console.log(`CARD ${width} ${JSON.stringify(metrics)}`)
    expect(metrics.width).toBeGreaterThan(0)
    expect(metrics.height).toBeGreaterThan(0)
    expect(metrics.paddingTop).toBeGreaterThan(0)
    expect(metrics.paddingRight).toBeGreaterThan(0)
    expect(metrics.borderWidth).toBeGreaterThan(0)
    expect(metrics.radius).not.toBe('0px')
    expect(metrics.shadow).not.toBe('none')
    expect(metrics.titleFontSize).toBeGreaterThan(0)
    expect(metrics.titleLineHeight).not.toBe('')
    expect(metrics.descriptionLineHeight).not.toBe('')
    expect(metrics.headerGap).toBeGreaterThanOrEqual(0)
    expect(metrics.footerGap).toBeGreaterThanOrEqual(0)
    expect(metrics.overflow).toBe(true)

    const surfaces: string[] = []
    for (const theme of themes) {
        await setTheme(page, theme)
        const surface = await card.evaluate((element) => {
            const style = getComputedStyle(element)
            return {
                background: style.backgroundColor,
                border: style.borderTopColor,
                radius: style.borderRadius,
            }
        })
        surfaces.push(surface.background)
        expect(surface.background).not.toBe('rgba(0, 0, 0, 0)')
        expect(surface.border).not.toBe('rgba(0, 0, 0, 0)')
        expect(surface.radius).not.toBe('0px')
    }
    expect(new Set(surfaces).size).toBe(3)
})

test('Step32 form surfaces remain aligned, focusable, and overflow-free', async ({ page }) => {
    const width = page.viewportSize()?.width ?? 0
    await page.goto('/docs/select')
    const select = page.getByTestId('select-basic')
    const selectWrapper = page.locator('.mr-select-wrapper').filter({ has: select })
    await select.selectOption('long')
    const selectMetrics = await selectWrapper.evaluate((element) => {
        const control = element.querySelector('select') as HTMLSelectElement
        const controlStyle = getComputedStyle(control)
        const chevron = getComputedStyle(element, '::after')
        return {
            value: control.value,
            paddingEnd: Number.parseFloat(controlStyle.paddingRight),
            chevronWidth: Number.parseFloat(chevron.width),
            chevronInset: Number.parseFloat(chevron.right),
            overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
        }
    })
    expect(selectMetrics.value).toBe('long')
    expect(selectMetrics.chevronWidth).toBeGreaterThan(0)
    expect(selectMetrics.paddingEnd).toBeGreaterThanOrEqual(
        selectMetrics.chevronWidth + selectMetrics.chevronInset
    )
    expect(selectMetrics.overflow).toBe(true)
    await select.focus()
    await expect(select).toBeFocused()
    expect(
        await select.evaluate((element) =>
            Number.parseFloat(getComputedStyle(element).outlineWidth)
        )
    ).toBeGreaterThan(0)

    await page.goto('/docs/file-upload')
    const uploadField = page.locator('.mr-field[data-has-error="true"]').first()
    const uploadButton = uploadField.locator('button.mr-file-trigger')
    await expect(uploadButton).toBeVisible()
    expect(await uploadButton.getAttribute('aria-invalid')).toBe('true')
    expect(await uploadButton.getAttribute('aria-describedby')).toContain('upload-error-error')
    expect(await uploadField.locator('input[type="file"]').getAttribute('name')).toBe('attachments')
    await uploadButton.focus()
    await page.keyboard.press('Shift+Tab')
    await page.keyboard.press('Tab')
    await expect(uploadButton).toBeFocused()
    const uploadFocus = await uploadButton.evaluate((element) => ({
        outlineWidth: Number.parseFloat(getComputedStyle(element).outlineWidth),
        dropZoneShadow: getComputedStyle(element.closest('.mr-drop-zone')!).boxShadow,
    }))
    expect(uploadFocus.outlineWidth).toBeGreaterThan(0)
    expect(uploadFocus.dropZoneShadow).not.toBe('none')

    const uploadInput = uploadField.locator('input[type="file"]')
    await uploadInput.evaluate((node) => {
        const input = node as HTMLInputElement
        const form = document.createElement('form')
        form.dataset.testid = 'file-upload-form'
        input.before(form)
        form.appendChild(input)
    })
    await uploadInput.setInputFiles({
        name: 'browser-file.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('browser upload'),
    })
    const uploadForm = page.getByTestId('file-upload-form')
    expect(
        await uploadForm.evaluate((node) => {
            const form = node as HTMLFormElement
            return Array.from(new FormData(form).getAll('attachments'))
                .filter((value): value is File => value instanceof File && value.name !== '')
                .map((file) => file.name)
        })
    ).toEqual(['browser-file.txt'])
    await page.getByRole('button', { name: 'Remove browser-file.txt' }).click()
    await expect
        .poll(() => uploadInput.evaluate((node) => (node as HTMLInputElement).files?.length ?? 0))
        .toBe(0)
    expect(
        await uploadForm.evaluate((node) => {
            const form = node as HTMLFormElement
            return Array.from(new FormData(form).getAll('attachments'))
                .filter((value): value is File => value instanceof File && value.name !== '')
                .map((file) => file.name)
        })
    ).toEqual([])

    await page.goto('/docs/radio-group')
    const radioGroup = page.getByTestId('radio-described')
    const describedRadio = radioGroup
        .locator('.mr-radio')
        .filter({ hasText: 'Only when someone mentions you' })
    for (const size of ['sm', 'md', 'lg'] as const) {
        await radioGroup.evaluate(
            (element, nextSize) => element.setAttribute('data-size', nextSize),
            size
        )
        const alignment = await describedRadio.evaluate((element) => {
            const control = element.querySelector('.mr-radio__control')?.getBoundingClientRect()
            const body = element.querySelector('.mr-radio__body')?.getBoundingClientRect()
            const radio = element.getBoundingClientRect()
            return {
                delta:
                    control && body
                        ? Math.abs(control.top + control.height / 2 - (body.top + body.height / 2))
                        : Number.POSITIVE_INFINITY,
                bodyRight: body?.right ?? Number.POSITIVE_INFINITY,
                radioRight: radio.right,
                overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
            }
        })
        expect(alignment.delta).toBeLessThanOrEqual(1)
        expect(alignment.bodyRight).toBeLessThanOrEqual(alignment.radioRight + 1)
        expect(alignment.overflow).toBe(true)
    }

    await page.goto('/docs/form-section')
    const formSection = page.locator('.mr-form-section').first()
    const sectionMetrics = await formSection.evaluate((element) => {
        const header = element.querySelector('.mr-form-section__header')?.getBoundingClientRect()
        const body = element.querySelector('.mr-form-section__body')?.getBoundingClientRect()
        const footer = element.querySelector('.mr-form-section__footer')?.getBoundingClientRect()
        const style = getComputedStyle(element)
        return {
            headerBottom: header?.bottom ?? Number.POSITIVE_INFINITY,
            bodyTop: body?.top ?? Number.NEGATIVE_INFINITY,
            bodyBottom: body?.bottom ?? Number.NEGATIVE_INFINITY,
            footerTop: footer?.top ?? Number.NEGATIVE_INFINITY,
            padding: style.padding,
            radius: style.borderRadius,
            overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
        }
    })
    expect(sectionMetrics.headerBottom).toBeLessThanOrEqual(sectionMetrics.bodyTop + 1)
    expect(sectionMetrics.bodyBottom).toBeLessThanOrEqual(sectionMetrics.footerTop + 1)
    expect(sectionMetrics.padding).not.toBe('0px')
    expect(sectionMetrics.radius).not.toBe('0px')
    expect(sectionMetrics.overflow).toBe(true)

    await page.goto('/docs/textarea')
    const textarea = page.getByTestId('textarea-basic')
    await textarea.evaluate((element) => {
        element.style.height = '180px'
    })
    await textarea.fill('First line\nSecond line')
    const textareaMetrics = await textarea.evaluate((element) => {
        const style = getComputedStyle(element)
        return {
            height: element.getBoundingClientRect().height,
            minHeight: Number.parseFloat(style.minHeight),
            lineHeight: Number.parseFloat(style.lineHeight),
            resize: style.resize,
            inlineHeight: element.style.height,
            overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
        }
    })
    console.log(`TEXTAREA ${width} ${JSON.stringify(textareaMetrics)}`)
    expect(textareaMetrics.height).toBeGreaterThanOrEqual(180)
    expect(textareaMetrics.minHeight).toBeGreaterThan(0)
    expect(textareaMetrics.lineHeight).toBeGreaterThan(0)
    expect(textareaMetrics.resize).toBe('vertical')
    expect(textareaMetrics.inlineHeight).toBe('180px')
    expect(textareaMetrics.overflow).toBe(true)

    const disabledTextarea = page.locator('.mr-textarea--disabled').first()
    await expect(disabledTextarea).toBeVisible()
    expect(await disabledTextarea.evaluate((element) => getComputedStyle(element).resize)).toBe(
        'none'
    )

    const themedSurfaces = [
        { route: '/docs/select', selector: '.mr-select' },
        { route: '/docs/file-upload', selector: '.mr-file-upload__action' },
        { route: '/docs/radio-group', selector: '.mr-radio__control' },
        { route: '/docs/form-section', selector: '.mr-form-section' },
        { route: '/docs/textarea', selector: '.mr-textarea' },
    ]
    for (const theme of themes) {
        for (const surface of themedSurfaces) {
            await setTheme(page, theme)
            await page.goto(surface.route)
            const element = page.locator(surface.selector).first()
            await expect(element).toBeVisible()
            const metrics = await element.evaluate((node) => {
                const style = getComputedStyle(node)
                return {
                    color: style.color,
                    background: style.backgroundColor,
                    border: style.borderTopColor,
                    overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
                }
            })
            expect(metrics.color).not.toBe('rgba(0, 0, 0, 0)')
            expect(metrics.background).not.toBe('rgba(0, 0, 0, 0)')
            expect(metrics.border).not.toBe('rgba(0, 0, 0, 0)')
            expect(metrics.overflow).toBe(true)
        }
    }
})

test('Step32 preview, StatCard, and PreCode remain readable across themes', async ({ page }) => {
    const width = page.viewportSize()?.width ?? 0
    await page.goto('/docs/banner')
    const previewLabel = page.locator('.docs-preview-label').first()
    const codeTitle = page.locator('.docs-code-header > span').first()
    const longFilename =
        'workspace-account-organization-settings-with-a-deliberately-long-production-filename.tsx'
    await previewLabel.evaluate((element, text) => {
        element.textContent = text
    }, longFilename)
    await codeTitle.evaluate((element, text) => {
        element.textContent = text
    }, longFilename)
    const previewMetrics = await page
        .locator('.docs-preview-card')
        .first()
        .evaluate((element) => {
            const label = element.querySelector('.docs-preview-label') as HTMLElement
            const content = element.querySelector('.docs-preview-content') as HTMLElement
            const title = element.querySelector('.docs-code-header > span') as HTMLElement
            const action = element.querySelector('.docs-code-header .docs-copy-btn') as HTMLElement
            const labelRect = label.getBoundingClientRect()
            const contentRect = content.getBoundingClientRect()
            const titleRect = title.getBoundingClientRect()
            const actionRect = action.getBoundingClientRect()
            const titleStyle = getComputedStyle(title)
            return {
                labelBottom: labelRect.bottom,
                contentTop: contentRect.top,
                titleRight: titleRect.right,
                actionLeft: actionRect.left,
                titleFits: title.scrollWidth <= title.clientWidth + 1,
                textOverflow: titleStyle.textOverflow,
                whiteSpace: titleStyle.whiteSpace,
                overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
            }
        })
    console.log(`PREVIEW ${width} ${JSON.stringify(previewMetrics)}`)
    expect(previewMetrics.labelBottom).toBeLessThanOrEqual(previewMetrics.contentTop + 1)
    expect(previewMetrics.titleRight).toBeLessThanOrEqual(previewMetrics.actionLeft + 1)
    expect(previewMetrics.titleFits).toBe(true)
    expect(previewMetrics.textOverflow).not.toBe('ellipsis')
    expect(previewMetrics.whiteSpace).toBe('normal')
    expect(previewMetrics.overflow).toBe(true)

    await page.goto('/docs/stat-card')
    const statCard = page.getByTestId('stat-card-long-title')
    const statRects = await statCard.evaluate((element) => {
        const card = element.getBoundingClientRect()
        const trend = element.querySelector('.mr-stat-card__trend')!.getBoundingClientRect()
        const label = element.querySelector('.mr-stat-card__label')!.getBoundingClientRect()
        const icon = element.querySelector('.mr-stat-card__icon')!.getBoundingClientRect()
        return { card, trend, label, icon }
    })
    expect(intersects(statRects.trend, statRects.label)).toBe(false)
    expect(intersects(statRects.trend, statRects.icon)).toBe(false)
    expect(statRects.trend.right).toBeLessThanOrEqual(statRects.card.right + 1)
    expect(statRects.trend.top).toBeGreaterThanOrEqual(statRects.card.top)

    await page.goto('/docs/pre-code')
    const scrollPre = page.getByTestId('pre-code-scroll')
    const scrollMetrics = await scrollPre.evaluate((element) => ({
        scrollable: element.scrollWidth > element.clientWidth,
        pageOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
    }))
    expect(scrollMetrics.scrollable).toBe(true)
    expect(scrollMetrics.pageOverflow).toBe(true)
    await scrollPre.evaluate((element) => {
        element.scrollLeft = element.scrollWidth
    })
    expect(await scrollPre.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0)
    const wrapPre = page.locator('.mr-pre-code--wrap').first()
    expect(
        await wrapPre.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)
    ).toBe(true)

    for (const theme of themes) {
        await setTheme(page, theme)
        const codeMetrics = await page
            .locator('.docs-code-pre')
            .first()
            .evaluate((element) => {
                const code = element.querySelector('code') as HTMLElement
                const token = (element.querySelector('.hljs-string') as HTMLElement | null) ?? code
                const foreground = getComputedStyle(token).color
                const background = getComputedStyle(element).backgroundColor
                const canvas = document.createElement('canvas')
                canvas.width = 1
                canvas.height = 1
                const context = canvas.getContext('2d')!
                const sample = (color: string) => {
                    context.clearRect(0, 0, 1, 1)
                    context.fillStyle = color
                    context.fillRect(0, 0, 1, 1)
                    return context.getImageData(0, 0, 1, 1).data
                }
                const backgroundColor = sample(background)
                context.clearRect(0, 0, 1, 1)
                context.fillStyle = background
                context.fillRect(0, 0, 1, 1)
                context.fillStyle = foreground
                context.fillRect(0, 0, 1, 1)
                const foregroundColor = context.getImageData(0, 0, 1, 1).data
                const luminance = (color: Uint8ClampedArray) => {
                    const channels = [color[0], color[1], color[2]].map((channel) => {
                        const value = channel! / 255
                        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
                    })
                    return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722
                }
                const backgroundLuminance = luminance(backgroundColor)
                const foregroundLuminance = luminance(foregroundColor)
                const ratio =
                    (Math.max(backgroundLuminance, foregroundLuminance) + 0.05) /
                    (Math.min(backgroundLuminance, foregroundLuminance) + 0.05)
                return {
                    ratio,
                    foreground,
                    background,
                    codePadding: Number.parseFloat(getComputedStyle(code).paddingLeft),
                }
            })
        console.log(`CODE THEME ${theme} ${JSON.stringify(codeMetrics)}`)
        expect(codeMetrics.ratio).toBeGreaterThanOrEqual(4.5)
        expect(codeMetrics.codePadding).toBe(0)

        await page.goto('/docs/stat-card')
        const trendContrast = await page
            .locator('.mr-stat-card__trend[data-trend-tone="danger"]')
            .first()
            .evaluate((element) => {
                const card = element.closest('.mr-stat-card') as HTMLElement
                const foreground = getComputedStyle(element).color
                const background = getComputedStyle(element).backgroundColor
                const cardBackground = getComputedStyle(card).backgroundColor
                const canvas = document.createElement('canvas')
                canvas.width = 1
                canvas.height = 1
                const context = canvas.getContext('2d')!
                context.fillStyle = cardBackground
                context.fillRect(0, 0, 1, 1)
                context.fillStyle = background
                context.fillRect(0, 0, 1, 1)
                const composited = context.getImageData(0, 0, 1, 1).data
                context.clearRect(0, 0, 1, 1)
                context.fillStyle = cardBackground
                context.fillRect(0, 0, 1, 1)
                context.fillStyle = background
                context.fillRect(0, 0, 1, 1)
                context.fillStyle = foreground
                context.fillRect(0, 0, 1, 1)
                const foregroundColor = context.getImageData(0, 0, 1, 1).data
                const luminance = (color: Uint8ClampedArray) => {
                    const channels = [color[0], color[1], color[2]].map((channel) => {
                        const value = channel! / 255
                        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
                    })
                    return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722
                }
                const backgroundLuminance = luminance(composited)
                const foregroundLuminance = luminance(foregroundColor)
                return {
                    ratio:
                        (Math.max(backgroundLuminance, foregroundLuminance) + 0.05) /
                        (Math.min(backgroundLuminance, foregroundLuminance) + 0.05),
                    foreground,
                }
            })
        expect(trendContrast.ratio).toBeGreaterThanOrEqual(4.5)
        await page.goto('/docs/pre-code')
    }
})

test('Step32 date range blocks end dates on or before start', async ({ page }) => {
    await page.goto('/docs/date-range-picker')
    const triggers = page.locator('.mr-datepicker__trigger')
    await triggers.nth(0).click()
    const startDay = page
        .locator('.mr-datepicker__day[data-current-month="true"]:not([data-disabled="true"])')
        .nth(5)
    const startText = (await startDay.textContent())?.trim()
    await startDay.click()
    await expect.poll(() => triggers.nth(0).inputValue()).not.toBe('')
    await triggers.nth(1).click()
    const sameDay = page.getByRole('gridcell', { name: startText ?? '', exact: true })
    await expect(sameDay).toBeDisabled()
    const laterDay = page.getByRole('gridcell', {
        name: String(Number(startText) + 1),
        exact: true,
    })
    await expect(laterDay).toBeEnabled()
    await laterDay.click()
    await expect.poll(() => triggers.nth(1).inputValue()).not.toBe('')
    const endValue = await triggers.nth(1).inputValue()

    await triggers.nth(1).click()
    const focusedEndDay = page.locator('.mr-datepicker__day:focus')
    await expect(focusedEndDay).toBeVisible()
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('Enter')
    expect(await triggers.nth(1).inputValue()).toBe(endValue)
})

test('Step32 motion advances visibly and stops under reduced motion', async ({ page }) => {
    const reduced = await page.evaluate(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    await page.goto('/docs/progress')
    const progress = page.locator('.mr-progress').filter({ hasText: 'Packaging release' }).first()
    const readProgress = async () =>
        progress.evaluate((element) => {
            const value = element.querySelector('.mr-progress__value')?.textContent ?? ''
            const bar =
                element.querySelector('.mr-progress__bar')?.getBoundingClientRect().width ?? 0
            const transition = getComputedStyle(
                element.querySelector('.mr-progress__bar')!
            ).transitionDuration
            return { value, bar, transition }
        })
    if (reduced) {
        const metrics = await readProgress()
        expect(metrics.value).toBe('100%')
        expect(metrics.bar).toBeGreaterThan(0)
        expect(Number.parseFloat(metrics.transition)).toBeLessThanOrEqual(0.001)
    } else {
        const readings: string[] = []
        for (let index = 0; index < 6; index += 1) {
            await page.waitForTimeout(220)
            const metrics = await readProgress()
            readings.push(`${metrics.value}:${metrics.bar}`)
        }
        expect(new Set(readings).size).toBeGreaterThanOrEqual(3)
    }
    for (const theme of themes) {
        await setTheme(page, theme)
        const themed = await readProgress()
        expect(themed.value).not.toBe('')
        expect(themed.bar).toBeGreaterThan(0)
    }

    await page.goto('/docs/spinner')
    for (const size of ['sm', 'md', 'lg'] as const) {
        const ring = page.locator(`.mr-spinner[data-size="${size}"] .mr-spinner__ring`).first()
        await expect(ring).toBeVisible()
        const initial = await ring.evaluate((element) => ({
            transform: getComputedStyle(element).transform,
            animation: getComputedStyle(element).animationName,
        }))
        await page.waitForTimeout(180)
        const final = await ring.evaluate((element) => getComputedStyle(element).transform)
        if (reduced) {
            expect(initial.animation).toBe('none')
            expect(final).toBe(initial.transform)
        } else {
            expect(initial.animation).not.toBe('none')
            expect(final).not.toBe(initial.transform)
        }
    }
    for (const theme of themes) {
        await setTheme(page, theme)
        const ring = page.locator('.mr-spinner__ring').first()
        expect(await ring.evaluate((element) => getComputedStyle(element).color)).not.toBe(
            'rgba(0, 0, 0, 0)'
        )
    }

    await page.goto('/docs/skeleton')
    const skeleton = page.locator('.mr-skeleton').first()
    await expect(skeleton).toBeVisible()
    const skeletonInitial = await skeleton.evaluate((element) => {
        const style = getComputedStyle(element)
        return {
            animation: style.animationName,
            position: style.backgroundPosition,
        }
    })
    await page.waitForTimeout(180)
    const skeletonFinal = await skeleton.evaluate((element) => ({
        animation: getComputedStyle(element).animationName,
        position: getComputedStyle(element).backgroundPosition,
    }))
    if (reduced) {
        expect(skeletonInitial.animation).toBe('none')
        expect(skeletonFinal.position).toBe(skeletonInitial.position)
    } else {
        expect(skeletonInitial.animation).not.toBe('none')
        expect(skeletonFinal.position).not.toBe(skeletonInitial.position)
    }

    await page.goto('/docs/async-state-notice')
    const loadingTimes = reduced ? null : sampleStateAnimation(page, 'loading')
    await page.getByRole('button', { name: 'Load', exact: true }).click()
    const loadingNotice = page.locator('.mr-async-state-notice[data-state="loading"]').last()
    await expect(loadingNotice).toBeVisible()
    if (reduced) {
        expect(
            await loadingNotice.evaluate((element) => getComputedStyle(element).animationName)
        ).toBe('none')
    } else {
        const times = await loadingTimes!
        expect(times.length).toBeGreaterThanOrEqual(2)
        expect(times.at(-1)!).toBeGreaterThan(times[0]!)
    }

    const errorTimes = reduced ? null : sampleStateAnimation(page, 'error')
    await page.getByRole('button', { name: 'Error', exact: true }).click()
    const errorNotice = page.locator('.mr-async-state-notice[data-state="error"]').last()
    await expect(errorNotice).toBeVisible()
    if (reduced) {
        expect(
            await errorNotice.evaluate((element) => getComputedStyle(element).animationName)
        ).toBe('none')
    } else {
        const times = await errorTimes!
        expect(times.length).toBeGreaterThanOrEqual(2)
        expect(times.at(-1)!).toBeGreaterThan(times[0]!)
    }
    for (const theme of themes) {
        await setTheme(page, theme)
        expect(await errorNotice.evaluate((element) => getComputedStyle(element).color)).not.toBe(
            'rgba(0, 0, 0, 0)'
        )
    }

    await page.goto('/docs/infinite-scroll')
    const viewport = page.getByTestId('infinite-scroll-viewport')
    const initialItems = await viewport.locator('.docs-infinite-scroll-item').count()
    const loaderAnimations = await viewport.evaluate(
        (element) =>
            new Promise<string[]>((resolve) => {
                const animations = new Set<string>()
                const observer = new MutationObserver(() => {
                    const loader = element.querySelector('.mr-infinite-scroll__loader')
                    if (loader) animations.add(getComputedStyle(loader, '::before').animationName)
                    if (animations.size > 0) {
                        observer.disconnect()
                        resolve([...animations])
                    }
                })
                observer.observe(element, { childList: true, subtree: true })
                element.scrollTop = element.scrollHeight
                window.setTimeout(() => {
                    observer.disconnect()
                    resolve([...animations])
                }, 2500)
            })
    )
    await expect.poll(() => viewport.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
    expect(loaderAnimations).toContain(reduced ? 'none' : 'mr-infinite-spin')
    await expect
        .poll(async () => viewport.locator('.docs-infinite-scroll-item').count(), { timeout: 3500 })
        .toBeGreaterThan(initialItems)
    expect(
        await viewport.evaluate(
            (element) =>
                element.scrollHeight > element.clientHeight &&
                document.documentElement.scrollWidth <= window.innerWidth + 1
        )
    ).toBe(true)
    for (const theme of themes) {
        await setTheme(page, theme)
        expect(
            await viewport
                .locator('.docs-infinite-scroll-item')
                .first()
                .evaluate((element) => getComputedStyle(element).color)
        ).not.toBe('rgba(0, 0, 0, 0)')
    }

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/docs/spinner')
    for (const ring of await page.locator('.mr-spinner__ring').all()) {
        expect(await ring.evaluate((element) => getComputedStyle(element).animationName)).toBe(
            'none'
        )
    }
    await page.goto('/docs/progress')
    const reducedProgress = page
        .locator('.mr-progress')
        .filter({ hasText: 'Packaging release' })
        .first()
    await expect(reducedProgress).toHaveAttribute('data-value', '100')
    await expect
        .poll(async () => reducedProgress.locator('.mr-progress__value').textContent())
        .toBe('100%')
    await page.goto('/docs/async-state-notice')
    await page.getByRole('button', { name: 'Load', exact: true }).click()
    const reducedNotice = page.locator('.mr-async-state-notice[data-state="loading"]').last()
    await expect(reducedNotice).toBeVisible()
    expect(await reducedNotice.evaluate((element) => getComputedStyle(element).animationName)).toBe(
        'none'
    )
    await page.goto('/docs/infinite-scroll')
    const reducedViewport = page.getByTestId('infinite-scroll-viewport')
    const reducedLoaderAnimations = await reducedViewport.evaluate(
        (element) =>
            new Promise<string[]>((resolve) => {
                const animations = new Set<string>()
                const observer = new MutationObserver(() => {
                    const loader = element.querySelector('.mr-infinite-scroll__loader')
                    if (loader) animations.add(getComputedStyle(loader, '::before').animationName)
                    if (animations.size > 0) {
                        observer.disconnect()
                        resolve([...animations])
                    }
                })
                observer.observe(element, { childList: true, subtree: true })
                element.scrollTop = element.scrollHeight
                window.setTimeout(() => {
                    observer.disconnect()
                    resolve([...animations])
                }, 2500)
            })
    )
    expect(reducedLoaderAnimations).toContain('none')
})

test('Step33 select, alignment, Card, and Carousel geometry stays coherent', async ({ page }) => {
    const width = page.viewportSize()?.width ?? 0
    await page.goto('/docs/select')
    const select = page.getByTestId('select-basic')
    const selectMetrics = await select.evaluate((element) => {
        const wrapper = element.parentElement as HTMLElement
        const selectStyle = getComputedStyle(element)
        const chevronStyle = getComputedStyle(wrapper, '::after')
        return {
            tagName: element.tagName,
            chevronWidth: Number.parseFloat(chevronStyle.width),
            chevronHeight: Number.parseFloat(chevronStyle.height),
            paddingEnd: Number.parseFloat(selectStyle.paddingInlineEnd),
            fontFamily: selectStyle.fontFamily,
            fontSize: selectStyle.fontSize,
            overflow: element.scrollWidth <= element.clientWidth,
        }
    })
    expect(selectMetrics.tagName).toBe('SELECT')
    expect(selectMetrics.chevronWidth).toBeCloseTo(15, 0)
    expect(selectMetrics.chevronHeight).toBeCloseTo(15, 0)
    expect(selectMetrics.paddingEnd).toBeGreaterThanOrEqual(selectMetrics.chevronWidth + 6)
    expect(selectMetrics.overflow).toBe(true)

    const sizeMetrics = await page.locator('.mr-select-wrapper').evaluateAll((wrappers) =>
        wrappers.map((wrapper) => {
            const chevronStyle = getComputedStyle(wrapper, '::after')
            return {
                size: wrapper.getAttribute('data-size'),
                width: Number.parseFloat(chevronStyle.width),
            }
        })
    )
    for (const metric of sizeMetrics.filter(({ size }) => size !== null)) {
        const expected = metric.size === 'lg' ? 18 : metric.size === 'sm' ? 14 : 15
        expect(metric.width).toBeCloseTo(expected, 0)
    }

    await page.goto('/docs/input')
    const inputFont = await page
        .locator('input.mr-input')
        .first()
        .evaluate((element) => {
            const style = getComputedStyle(element)
            return { fontFamily: style.fontFamily, fontSize: style.fontSize }
        })
    expect(selectMetrics.fontFamily).toBe(inputFont.fontFamily)
    expect(selectMetrics.fontSize).toBe(inputFont.fontSize)

    await page.goto('/docs/switch')
    for (const id of ['switch-compact', 'switch-medium', 'switch-large']) {
        const input = page.getByTestId(id)
        const alignment = await input.evaluate((element) => {
            const control = element.closest('.mr-switch') as HTMLElement
            const row = control?.parentElement as HTMLElement
            const content = row?.querySelector('.mr-switch__content') as HTMLElement
            const controlRect = control.getBoundingClientRect()
            const contentRect = content?.getBoundingClientRect()
            return {
                delta: contentRect
                    ? Math.abs(
                          controlRect.top +
                              controlRect.height / 2 -
                              (contentRect.top + contentRect.height / 2)
                      )
                    : Number.POSITIVE_INFINITY,
                controlTop: getComputedStyle(control).top,
                transform: getComputedStyle(control).transform,
            }
        })
        expect(alignment.delta).toBeLessThanOrEqual(1.5)
        expect(alignment.controlTop).toBe('auto')
        expect(alignment.transform).toBe('none')
    }

    await page.goto('/docs/radio-group')
    const radioAlignment = await page
        .getByTestId('radio-described')
        .locator('.mr-radio')
        .filter({ hasText: 'Only when someone mentions you' })
        .evaluate((element) => {
            const control = element.querySelector('.mr-radio__control') as HTMLElement
            const body = element.querySelector('.mr-radio__body') as HTMLElement
            const controlRect = control.getBoundingClientRect()
            const bodyRect = body.getBoundingClientRect()
            return {
                delta: Math.abs(
                    controlRect.top + controlRect.height / 2 - (bodyRect.top + bodyRect.height / 2)
                ),
                top: getComputedStyle(control).top,
            }
        })
    expect(radioAlignment.delta).toBeLessThanOrEqual(1.5)
    expect(['auto', '0px']).toContain(radioAlignment.top)

    await page.goto('/docs/carousel')
    const carousel = page.locator('.mr-carousel').first()
    await carousel
        .locator('.mr-carousel__slide')
        .nth(1)
        .evaluate((element) => {
            element.style.minBlockSize = '10rem'
        })
    const carouselMetrics = await carousel.evaluate((element) => {
        const viewport = element.querySelector('.mr-carousel__viewport') as HTMLElement
        const arrow = element.querySelector('.mr-carousel__arrow') as HTMLElement
        const viewportRect = viewport.getBoundingClientRect()
        const arrowRect = arrow.getBoundingClientRect()
        const style = getComputedStyle(arrow)
        return {
            delta: Math.abs(
                arrowRect.top + arrowRect.height / 2 - (viewportRect.top + viewportRect.height / 2)
            ),
            background: style.backgroundColor,
            borderWidth: Number.parseFloat(style.borderTopWidth),
            width: arrowRect.width,
            height: arrowRect.height,
        }
    })
    expect(carouselMetrics.delta).toBeLessThanOrEqual(1.5)
    expect(carouselMetrics.background).toBe('rgba(0, 0, 0, 0)')
    expect(carouselMetrics.borderWidth).toBe(0)
    expect(carouselMetrics.width).toBeGreaterThanOrEqual(32)
    expect(carouselMetrics.height).toBeGreaterThanOrEqual(32)

    await page.goto('/docs/card')
    const card = page.locator('.mr-card').first()
    const cardMetrics = await card.evaluate((element) => {
        const style = getComputedStyle(element)
        return {
            background: style.backgroundColor,
            border: style.borderTopColor,
            radius: Number.parseFloat(style.borderTopLeftRadius),
            shadow: style.boxShadow,
        }
    })
    expect(cardMetrics.background).not.toBe('rgba(0, 0, 0, 0)')
    expect(cardMetrics.border).not.toBe('rgba(0, 0, 0, 0)')
    expect(cardMetrics.radius).toBeGreaterThan(0)
    expect(cardMetrics.shadow).not.toBe('none')

    for (const theme of themes) {
        await setTheme(page, theme)
        const themed = await card.evaluate((element) => {
            const style = getComputedStyle(element)
            return { background: style.backgroundColor, color: style.color }
        })
        expect(themed.background).not.toBe('rgba(0, 0, 0, 0)')
        expect(themed.color).not.toBe('rgba(0, 0, 0, 0)')
    }

    console.log(
        `STEP33 ${width} ${JSON.stringify({ selectMetrics, carouselMetrics, cardMetrics })}`
    )
})

test('Step34 moodboard presents one system across three themes', async ({ page }) => {
    const width = page.viewportSize()?.width ?? 0
    await page.goto('/moodboard')
    await expect(page.getByTestId('moodboard-page')).toBeVisible()
    const panels = page.locator('[data-testid^="moodboard-panel-"]')
    await expect(panels).toHaveCount(3)
    await expect(page.getByTestId('moodboard-theme-grid')).toBeVisible()
    await expect(page.getByTestId('moodboard-light-tokens')).toBeVisible()
    await expect(page.getByTestId('moodboard-dark-tokens')).toBeVisible()
    await expect(page.getByTestId('moodboard-oled-tokens')).toBeVisible()

    const panelMetrics: string[] = []
    for (const theme of ['light', 'dark', 'oled'] as const) {
        const panel = page.getByTestId(`moodboard-panel-${theme}`)
        const metrics = await panel.evaluate((element) => {
            const style = getComputedStyle(element)
            const card = element.querySelector('.moodboard-card')
            const cardStyle = card ? getComputedStyle(card) : null
            return {
                canvas: style.backgroundColor,
                surface: cardStyle?.backgroundColor ?? '',
                cards: element.querySelectorAll('.moodboard-card').length,
                controls: element.querySelectorAll(
                    '.mr-input-base, .mr-btn, .mr-checkbox, .mr-toggle'
                ).length,
                overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
                backgroundImage: style.backgroundImage,
            }
        })
        expect(metrics.cards).toBe(5)
        expect(metrics.controls).toBeGreaterThan(10)
        expect(metrics.overflow).toBe(true)
        expect(metrics.backgroundImage).toBe('none')
        expect(metrics.surface).not.toBe('rgba(0, 0, 0, 0)')
        panelMetrics.push(`${theme}:${metrics.canvas}:${metrics.surface}`)
    }
    expect(new Set(panelMetrics).size).toBe(3)

    const primary = page
        .getByTestId('moodboard-panel-light')
        .getByRole('button', { name: 'Deploy' })
    await primary.focus()
    expect(
        await primary.evaluate((element) =>
            Number.parseFloat(getComputedStyle(element).outlineWidth)
        )
    ).toBeGreaterThan(0)
    console.log(`MOODBOARD ${width} ${JSON.stringify(panelMetrics)}`)
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
