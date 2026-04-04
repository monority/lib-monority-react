import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppProviders } from '@/app/providers/AppProviders'
import { useToast } from './useToast'

function wrapper({ children }) {
    return <AppProviders>{children}</AppProviders>
}

describe('useToast', () => {
    it('expose pushToast et dismissToast', () => {
        const { result } = renderHook(() => useToast(), { wrapper })

        expect(result.current).toHaveProperty('pushToast')
        expect(result.current).toHaveProperty('dismissToast')
        expect(typeof result.current.pushToast).toBe('function')
        expect(typeof result.current.dismissToast).toBe('function')
    })

    it('pushToast retourne un id de toast', () => {
        const { result } = renderHook(() => useToast(), { wrapper })

        let id
        act(() => {
            id = result.current.pushToast({ title: 'Succès', tone: 'success' })
        })

        expect(id).toMatch(/^toast-/)
    })

    it('lance une erreur si utilise hors contexte', () => {
        expect(() => {
            renderHook(() => useToast())
        }).toThrow('useToast must be used inside ToastProvider')
    })
})
