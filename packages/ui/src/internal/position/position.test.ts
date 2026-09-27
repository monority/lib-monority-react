import { describe, expect, it, vi } from 'vitest'
import { computePosition, positionOverlay, type PositionPlacement } from './position'

const anchor = { top: 100, right: 300, bottom: 140, left: 200, width: 100, height: 40 }
const floating = { width: 80, height: 30 }
const viewport = { width: 1000, height: 800 }

describe('position overlays', () => {
    it('expose les 12 placements', () => {
        const result = computePosition(anchor, floating, viewport, { placement: 'top-end' })
        expect(result.placement).toBe('top-end')
        expect(result.x).toBe(220)
        expect(result.y).toBe(66)
    })

    it.each<[PositionPlacement, number, number]>([
        ['top', 210, 66],
        ['top-start', 200, 66],
        ['top-end', 220, 66],
        ['bottom', 210, 144],
        ['bottom-start', 200, 144],
        ['bottom-end', 220, 144],
        ['left', 116, 105],
        ['left-start', 116, 100],
        ['left-end', 116, 110],
        ['right', 304, 105],
        ['right-start', 304, 100],
        ['right-end', 304, 110],
    ])('calcule %s', (placement, x, y) => {
        expect(computePosition(anchor, floating, viewport, { placement })).toMatchObject({ x, y })
    })

    it('retourne le placement opposé puis décale dans la fenêtre', () => {
        const edgeAnchor = { top: 2, right: 100, bottom: 42, left: 0, width: 100, height: 40 }
        const result = computePosition(edgeAnchor, floating, viewport, {
            placement: 'top',
            viewportPadding: 8,
        })
        expect(result.placement).toBe('bottom')
        expect(result.y).toBeGreaterThanOrEqual(8)
    })

    it('met à jour au scroll et au resize, une fois par image', () => {
        const listeners = new Map<string, EventListener>()
        const frames: FrameRequestCallback[] = []
        vi.stubGlobal(
            'addEventListener',
            vi.fn((type: string, listener: EventListener) => listeners.set(type, listener))
        )
        vi.stubGlobal('removeEventListener', vi.fn())
        vi.stubGlobal(
            'requestAnimationFrame',
            vi.fn((callback: FrameRequestCallback) => {
                frames.push(callback)
                return frames.length
            })
        )
        vi.stubGlobal('cancelAnimationFrame', vi.fn())
        const floatingElement = document.createElement('div')
        vi.spyOn(floatingElement, 'getBoundingClientRect').mockReturnValue({
            ...floating,
            top: 0,
            left: 0,
            right: floating.width,
            bottom: floating.height,
            x: 0,
            y: 0,
            toJSON: () => ({}),
        })
        const update = positionOverlay(floatingElement, anchor, { placement: 'bottom' })

        expect(listeners.has('scroll')).toBe(true)
        expect(listeners.has('resize')).toBe(true)
        listeners.get('scroll')?.(new Event('scroll'))
        listeners.get('scroll')?.(new Event('scroll'))
        expect(frames).toHaveLength(1)
        expect(floatingElement.style.position).toBe('fixed')
        expect(floatingElement.style.left).toBe('210px')
        expect(floatingElement.style.top).toBe('144px')

        update()
        vi.unstubAllGlobals()
    })
})
