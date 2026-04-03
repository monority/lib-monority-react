import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { usePlaygroundMetrics } from './usePlaygroundMetrics'

const { getPlaygroundMetrics } = vi.hoisted(() => ({
    getPlaygroundMetrics: vi.fn(),
}))

vi.mock('../services/playgroundService', () => ({
    getPlaygroundMetrics,
}))

describe('usePlaygroundMetrics', () => {
    beforeEach(() => {
        getPlaygroundMetrics.mockReset()
    })

    it('retourne les donnees en cas de succes', async () => {
        getPlaygroundMetrics.mockResolvedValue([{ id: 'metric-1', label: 'Readiness' }])

        const { result } = renderHook(() => usePlaygroundMetrics())

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })

        expect(result.current.data).toEqual([{ id: 'metric-1', label: 'Readiness' }])
        expect(result.current.error).toBeNull()
        expect(result.current.errorMessage).toBeNull()
    })

    it('conserve l objet erreur et expose son message', async () => {
        getPlaygroundMetrics.mockRejectedValue(new Error('API down'))

        const { result } = renderHook(() => usePlaygroundMetrics())

        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })

        expect(result.current.error).toBeInstanceOf(Error)
        expect(result.current.errorMessage).toBe('API down')
    })
})
