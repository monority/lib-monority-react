import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { usePresence } from './use-presence'

describe('usePresence', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.restoreAllMocks()
        vi.useRealTimers()
    })

    it('initialise correctement lorsque open est false', () => {
        const { result } = renderHook(() => usePresence(false))
        expect(result.current.isMounted).toBe(false)
        expect(result.current.isClosing).toBe(false)
        expect(result.current.presenceProps['data-state']).toBe('closed')
        expect(result.current.presenceProps['data-closing']).toBeUndefined()
    })

    it('initialise correctement lorsque open est true', () => {
        const { result } = renderHook(() => usePresence(true))
        expect(result.current.isMounted).toBe(true)
        expect(result.current.isClosing).toBe(false)
        expect(result.current.presenceProps['data-state']).toBe('open')
        expect(result.current.presenceProps['data-closing']).toBeUndefined()
    })

    it('reste monte pendant le delai de fermeture et se demonte a terme', () => {
        const { result, rerender } = renderHook(
            ({ open }) => usePresence(open, { durationMs: 150 }),
            {
                initialProps: { open: true },
            }
        )

        expect(result.current.isMounted).toBe(true)
        expect(result.current.isClosing).toBe(false)

        // Fermeture
        rerender({ open: false })

        // Directement apres la demande de fermeture, isMounted reste true et isClosing devient true
        expect(result.current.isMounted).toBe(true)
        expect(result.current.isClosing).toBe(true)
        expect(result.current.presenceProps['data-state']).toBe('closed')
        expect(result.current.presenceProps['data-closing']).toBe('')

        // Avancement partiel du temps (100ms sur 150ms)
        act(() => {
            vi.advanceTimersByTime(100)
        })
        expect(result.current.isMounted).toBe(true)
        expect(result.current.isClosing).toBe(true)

        // Fin de l'animation de sortie (reste 50ms)
        act(() => {
            vi.advanceTimersByTime(50)
        })
        expect(result.current.isMounted).toBe(false)
        expect(result.current.isClosing).toBe(false)
        expect(result.current.presenceProps['data-closing']).toBeUndefined()
    })

    it('annule la fermeture si open repasse a true pendant la transition de sortie', () => {
        const { result, rerender } = renderHook(
            ({ open }) => usePresence(open, { durationMs: 200 }),
            {
                initialProps: { open: true },
            }
        )

        rerender({ open: false })
        expect(result.current.isClosing).toBe(true)

        // Avancement a 100ms
        act(() => {
            vi.advanceTimersByTime(100)
        })

        // Re-ouverture immediate
        rerender({ open: true })
        expect(result.current.isMounted).toBe(true)
        expect(result.current.isClosing).toBe(false)
        expect(result.current.presenceProps['data-state']).toBe('open')
        expect(result.current.presenceProps['data-closing']).toBeUndefined()

        // Avancer encore de 200ms : le composant doit rester monte
        act(() => {
            vi.advanceTimersByTime(200)
        })
        expect(result.current.isMounted).toBe(true)
        expect(result.current.isClosing).toBe(false)
    })

    it('demonte instantanement si durationMs est 0', () => {
        const { result, rerender } = renderHook(
            ({ open }) => usePresence(open, { durationMs: 0 }),
            {
                initialProps: { open: true },
            }
        )

        rerender({ open: false })
        expect(result.current.isMounted).toBe(false)
        expect(result.current.isClosing).toBe(false)
    })

    it('demonte instantanement sous prefers-reduced-motion: reduce', () => {
        vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
            matches: query.includes('prefers-reduced-motion: reduce'),
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }))

        const { result, rerender } = renderHook(
            ({ open }) => usePresence(open, { durationMs: 200 }),
            {
                initialProps: { open: true },
            }
        )

        rerender({ open: false })
        expect(result.current.isMounted).toBe(false)
        expect(result.current.isClosing).toBe(false)
    })
})
