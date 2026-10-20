import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useFloatingPosition } from './use-floating-position'

describe('useFloatingPosition', () => {
    beforeEach(() => {
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            cb(0)
            return 1
        })
        vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
        Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true })
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    function createMockElement(rect: {
        top: number
        left: number
        width: number
        height: number
    }): HTMLElement {
        const el = document.createElement('div')
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            ...rect,
            bottom: rect.top + rect.height,
            right: rect.left + rect.width,
            x: rect.left,
            y: rect.top,
            toJSON: () => {},
        })
        Object.defineProperty(el, 'offsetWidth', { value: rect.width, configurable: true })
        Object.defineProperty(el, 'offsetHeight', { value: rect.height, configurable: true })
        return el
    }

    it('positions below trigger by default (side=bottom, align=center)', () => {
        const trigger = createMockElement({ top: 100, left: 100, width: 80, height: 40 })
        const content = createMockElement({ top: 0, left: 0, width: 200, height: 120 })

        const triggerRef = { current: trigger }
        const contentRef = { current: content }

        const { result } = renderHook(() =>
            useFloatingPosition(triggerRef, contentRef, {
                side: 'bottom',
                align: 'center',
                sideOffset: 8,
            })
        )

        expect(result.current.positioned).toBe(true)
        expect(result.current.actualSide).toBe('bottom')
        // top = trigger.bottom (140) + offset (8) = 148
        expect(result.current.position.top).toBe(148)
        // center = trigger.left (100) + trigger.width/2 (40) - content.width/2 (100) = 40
        expect(result.current.position.left).toBe(40)
    })

    it('flips to top if bottom cannot fit in viewport', () => {
        // Trigger positioned near bottom of 768px viewport
        const trigger = createMockElement({ top: 700, left: 100, width: 80, height: 40 })
        const content = createMockElement({ top: 0, left: 0, width: 200, height: 120 })

        const triggerRef = { current: trigger }
        const contentRef = { current: content }

        const { result } = renderHook(() =>
            useFloatingPosition(triggerRef, contentRef, {
                side: 'bottom',
                align: 'start',
                sideOffset: 8,
            })
        )

        expect(result.current.actualSide).toBe('top')
        // top = trigger.top (700) - content.height (120) - offset (8) = 572
        expect(result.current.position.top).toBe(572)
    })

    it('clamps to viewport bounds on the horizontal axis', () => {
        // Trigger positioned at edge (left = 2)
        const trigger = createMockElement({ top: 100, left: 2, width: 20, height: 20 })
        const content = createMockElement({ top: 0, left: 0, width: 300, height: 100 })

        const triggerRef = { current: trigger }
        const contentRef = { current: content }

        const { result } = renderHook(() =>
            useFloatingPosition(triggerRef, contentRef, {
                side: 'bottom',
                align: 'center',
                viewportPadding: 8,
            })
        )

        // left would be 2 + 10 - 150 = -138, but clamped to padding (8)
        expect(result.current.position.left).toBe(8)
    })

    it('calculates arrow coordinates properly when arrow=true', () => {
        const trigger = createMockElement({ top: 100, left: 100, width: 80, height: 40 })
        const content = createMockElement({ top: 0, left: 0, width: 200, height: 120 })

        const triggerRef = { current: trigger }
        const contentRef = { current: content }

        const { result } = renderHook(() =>
            useFloatingPosition(triggerRef, contentRef, {
                side: 'bottom',
                align: 'center',
                arrow: true,
                arrowPadding: 12,
            })
        )

        // trigger center is 100 + 40 = 140. content left is 40.
        // arrowLeft = 140 - 40 = 100.
        expect(result.current.arrowPosition.left).toBe(100)
    })

    it('matches trigger width when matchWidth=true', () => {
        const trigger = createMockElement({ top: 100, left: 100, width: 280, height: 40 })
        const content = createMockElement({ top: 0, left: 0, width: 200, height: 120 })

        const triggerRef = { current: trigger }
        const contentRef = { current: content }

        const { result } = renderHook(() =>
            useFloatingPosition(triggerRef, contentRef, {
                side: 'bottom',
                align: 'start',
                matchWidth: true,
            })
        )

        expect(result.current.position.width).toBe(280)
        expect(result.current.position.left).toBe(100)
    })
})
