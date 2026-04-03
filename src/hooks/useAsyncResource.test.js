import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useAsyncResource } from './useAsyncResource'

describe('useAsyncResource', () => {
    it('charge une ressource et expose l etat de succes', async () => {
        const loader = vi.fn().mockResolvedValue({ id: 'resource-1' })

        const { result } = renderHook(() => useAsyncResource(loader))

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })

        expect(loader).toHaveBeenCalledTimes(1)
        expect(result.current.data).toEqual({ id: 'resource-1' })
        expect(result.current.error).toBeNull()
    })

    it('conserve une erreur non abort et expose son message', async () => {
        const loader = vi.fn().mockRejectedValue(new Error('Request failed'))

        const { result } = renderHook(() => useAsyncResource(loader))

        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })

        expect(result.current.errorMessage).toBe('Request failed')
    })

    it('ignore les annulations de requete', async () => {
        const loader = vi.fn().mockRejectedValue(new DOMException('Request aborted', 'AbortError'))

        const { result } = renderHook(() => useAsyncResource(loader))

        await waitFor(() => {
            expect(loader).toHaveBeenCalledTimes(1)
        })

        expect(result.current.isError).toBe(false)
        expect(result.current.error).toBeNull()
    })
})
