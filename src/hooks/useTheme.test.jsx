import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppProviders } from '@/app/providers/AppProviders'
import { useTheme } from './useTheme'

function wrapper({ children }) {
    return <AppProviders>{children}</AppProviders>
}

describe('useTheme', () => {
    beforeEach(() => {
        window.localStorage.clear()
        window.matchMedia = vi.fn().mockImplementation(() => ({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }))
    })

    it('expose le theme et resolvedTheme', () => {
        const { result } = renderHook(() => useTheme(), { wrapper })

        expect(result.current).toHaveProperty('theme')
        expect(result.current).toHaveProperty('resolvedTheme')
        expect(result.current).toHaveProperty('isDark')
    })

    it('toggleTheme bascule vers dark', () => {
        const { result } = renderHook(() => useTheme(), { wrapper })

        act(() => {
            result.current.toggleTheme()
        })

        expect(result.current.isDark).toBe(true)
    })

    it('setTheme permet de choisir un theme explicite', () => {
        const { result } = renderHook(() => useTheme(), { wrapper })

        act(() => {
            result.current.setTheme('dark')
        })

        expect(result.current.resolvedTheme).toBe('dark')
    })

    it('lance une erreur si utilise hors contexte', () => {
        expect(() => {
            renderHook(() => useTheme())
        }).toThrow('useTheme must be used inside ThemeProvider')
    })
})
