import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppProviders } from '@/app/providers/AppProviders'
import { useAuth } from './useAuth'

function wrapper({ children }) {
    return <AppProviders>{children}</AppProviders>
}

describe('useAuth', () => {
    it('retourne le contexte auth depuis AppProviders', () => {
        const { result } = renderHook(() => useAuth(), { wrapper })

        expect(result.current).toBeDefined()
        expect(result.current).toHaveProperty('status')
    })

    it('lance une erreur si utilise hors contexte', () => {
        expect(() => {
            renderHook(() => useAuth())
        }).toThrow('useAuth must be used inside AuthProvider')
    })
})
