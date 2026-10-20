import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { usePresence } from './use-presence'

describe('usePresence', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        document.documentElement.removeAttribute('data-motion')
    })

    afterEach(() => {
        vi.restoreAllMocks()
        vi.useRealTimers()
        document.documentElement.removeAttribute('data-motion')
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

    it('reste monte pendant le delai de garde de fermeture et se demonte au terme', () => {
        const { result, rerender } = renderHook(
            ({ open }) => usePresence(open, { durationMs: 200 }),
            {
                initialProps: { open: true },
            }
        )

        expect(result.current.isMounted).toBe(true)
        expect(result.current.isClosing).toBe(false)

        // Demande de fermeture
        rerender({ open: false })

        expect(result.current.isMounted).toBe(true)
        expect(result.current.isClosing).toBe(true)
        expect(result.current.presenceProps['data-state']).toBe('closed')
        expect(result.current.presenceProps['data-closing']).toBe('')

        // Avancement partiel du temps (100ms sur 200ms)
        act(() => {
            vi.advanceTimersByTime(100)
        })
        expect(result.current.isMounted).toBe(true)
        expect(result.current.isClosing).toBe(true)

        // Fin du delai de garde (100ms de plus)
        act(() => {
            vi.advanceTimersByTime(100)
        })
        expect(result.current.isMounted).toBe(false)
        expect(result.current.isClosing).toBe(false)
        expect(result.current.presenceProps['data-closing']).toBeUndefined()
    })

    it('se demonte instantanement des la reception de levenement animationend', () => {
        const { result, rerender } = renderHook(
            ({ open }) => usePresence(open, { durationMs: 500 }),
            {
                initialProps: { open: true },
            }
        )

        // Attachement d'un element DOM simule via la ref
        const element = document.createElement('div')
        act(() => {
            result.current.ref(element)
        })

        // Demande de fermeture
        rerender({ open: false })
        expect(result.current.isMounted).toBe(true)
        expect(result.current.isClosing).toBe(true)

        // Emission de l'evenement natif animationend par le navigateur
        act(() => {
            const event = new Event('animationend', { bubbles: true })
            Object.defineProperty(event, 'target', { value: element })
            element.dispatchEvent(event)
        })

        // Demontage immediat sans attendre les 500ms du timeout
        expect(result.current.isMounted).toBe(false)
        expect(result.current.isClosing).toBe(false)
    })

    it('ignore les evenements animationcancel et animationend de type enter', () => {
        const { result, rerender } = renderHook(
            ({ open }) => usePresence(open, { durationMs: 500 }),
            {
                initialProps: { open: true },
            }
        )

        const element = document.createElement('div')
        act(() => {
            result.current.ref(element)
        })

        rerender({ open: false })
        expect(result.current.isClosing).toBe(true)

        // Emission d'un animationcancel (par exemple quand l'animation d'entree est interrompue)
        act(() => {
            const cancelEvent = new Event('animationcancel', { bubbles: true })
            element.dispatchEvent(cancelEvent)
        })
        expect(result.current.isClosing).toBe(true)
        expect(result.current.isMounted).toBe(true)

        // Emission d'un animationend venant d'une animation d'entree
        act(() => {
            const enterEvent = new Event('animationend', { bubbles: true })
            Object.defineProperty(enterEvent, 'animationName', { value: 'mr-dropdown-enter' })
            Object.defineProperty(enterEvent, 'target', { value: element })
            element.dispatchEvent(enterEvent)
        })
        expect(result.current.isClosing).toBe(true)
        expect(result.current.isMounted).toBe(true)

        // Emission d'un animationend de sortie reel
        act(() => {
            const exitEvent = new Event('animationend', { bubbles: true })
            Object.defineProperty(exitEvent, 'animationName', { value: 'mr-floating-exit' })
            Object.defineProperty(exitEvent, 'target', { value: element })
            element.dispatchEvent(exitEvent)
        })
        expect(result.current.isMounted).toBe(false)
        expect(result.current.isClosing).toBe(false)
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

    it('demonte instantanement sous prefers-reduced-motion par defaut', () => {
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

    it('force le delai de sortie meme sous prefers-reduced-motion si data-motion=always est actif', () => {
        document.documentElement.setAttribute('data-motion', 'always')

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
        // Doit rester monte pour la phase animee grace au debrayage data-motion="always"
        expect(result.current.isMounted).toBe(true)
        expect(result.current.isClosing).toBe(true)

        act(() => {
            vi.advanceTimersByTime(200)
        })
        expect(result.current.isMounted).toBe(false)
    })

    it('appelle le callback onExitComplete des que la fermeture est achevee', () => {
        const onExitComplete = vi.fn()
        const { result, rerender } = renderHook(
            ({ open }) => usePresence(open, { durationMs: 200, onExitComplete }),
            {
                initialProps: { open: true },
            }
        )

        expect(onExitComplete).not.toHaveBeenCalled()

        rerender({ open: false })
        expect(result.current.isMounted).toBe(true)
        expect(result.current.isClosing).toBe(true)
        expect(onExitComplete).not.toHaveBeenCalled()

        act(() => {
            vi.advanceTimersByTime(200)
        })

        expect(result.current.isMounted).toBe(false)
        expect(result.current.isClosing).toBe(false)
        expect(onExitComplete).toHaveBeenCalledTimes(1)
    })
})
