import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAdminOverview } from './useAdminOverview'

const { getAdminOverview } = vi.hoisted(() => ({
    getAdminOverview: vi.fn(),
}))

vi.mock('../services/adminService', () => ({
    getAdminOverview,
}))

describe('useAdminOverview', () => {
    beforeEach(() => {
        getAdminOverview.mockReset()
    })

    it('retourne les donnees admin en cas de succes', async () => {
        getAdminOverview.mockResolvedValue({
            headerContent: { title: 'Admin area' },
            filters: [],
            columns: [],
            rows: [],
            sidebarData: { summary: [], actions: [] },
        })

        const { result } = renderHook(() => useAdminOverview())

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })

        expect(result.current.data).toMatchObject({
            headerContent: { title: 'Admin area' },
        })
        expect(result.current.errorMessage).toBeNull()
    })

    it('expose le message d erreur si le chargement echoue', async () => {
        getAdminOverview.mockRejectedValue(new Error('Admin unavailable'))

        const { result } = renderHook(() => useAdminOverview())

        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })

        expect(result.current.errorMessage).toBe('Admin unavailable')
    })
})
