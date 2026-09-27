import { expect, test } from '@playwright/test'

test('position overlay utilise le token, le scroll et le resize une fois par image', async ({
    page,
}) => {
    await page.addInitScript(() => {
        const original = window.requestAnimationFrame.bind(window)
        let positionFrames = 0
        Object.defineProperty(window, '__positionFrameCount', { get: () => positionFrames })
        window.requestAnimationFrame = (callback: FrameRequestCallback) =>
            original((timestamp) => {
                positionFrames += 1
                callback(timestamp)
            })
    })
    await page.goto('/harness/__position?theme=light&density=comfortable')

    const overlay = page.getByTestId('position-overlay')
    await expect(overlay).toBeVisible()

    const geometry = await page.evaluate(() => {
        const anchor = document
            .querySelector('[data-testid="position-anchor"]')!
            .getBoundingClientRect()
        const overlay = document.querySelector('[data-testid="position-overlay"]') as HTMLElement
        return {
            anchorRight: anchor.right,
            anchorBottom: anchor.bottom,
            anchorCenter: anchor.left + anchor.width / 2,
            left: Number.parseFloat(overlay.style.left),
            top: Number.parseFloat(overlay.style.top),
            width: overlay.getBoundingClientRect().width,
        }
    })
    expect(geometry.left).toBeCloseTo(geometry.anchorCenter - geometry.width / 2, 2)
    expect(geometry.top).toBeCloseTo(geometry.anchorBottom + 4, 2)
    expect(geometry.width).toBe(96)

    const frameDelta = await page.evaluate(async () => {
        const counter = window as unknown as { __positionFrameCount: number }
        const before = counter.__positionFrameCount
        window.dispatchEvent(new Event('scroll'))
        window.dispatchEvent(new Event('scroll'))
        window.dispatchEvent(new Event('resize'))
        await new Promise<void>((resolve) => window.setTimeout(resolve, 50))
        return counter.__positionFrameCount - before
    })
    expect(frameDelta).toBe(1)
})
