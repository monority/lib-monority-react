import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useDashboardOverview } from './useDashboardOverview'

const { getDashboardOverview } = vi.hoisted(() => ({
    getDashboardOverview: vi.fn(),
}))

vi.mock('../services/dashboardService', () => ({
    getDashboardOverview,
}))

describe('useDashboardOverview', () => {
    beforeEach(() => {
        getDashboardOverview.mockReset()
    })

    it('retourne les donnees du dashboard en cas de succes', async () => {
        getDashboardOverview.mockResolvedValue({
            topbarContent: { brand: 'Workspace' },
            headerContent: { title: 'Overview' },
            metrics: [],
            alert: null,
            tableColumns: [],
            tableRows: [],
            sidebarData: { highlights: [], tasks: [] },
        })

        const { result } = renderHook(() => useDashboardOverview())

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })

        expect(result.current.data).toMatchObject({
            topbarContent: { brand: 'Workspace' },
            headerContent: { title: 'Overview' },
        })
        expect(result.current.errorMessage).toBeNull()
    })

    it('expose le message d erreur si le chargement echoue', async () => {
        getDashboardOverview.mockRejectedValue(new Error('Dashboard unavailable'))

        const { result } = renderHook(() => useDashboardOverview())

        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })

        expect(result.current.errorMessage).toBe('Dashboard unavailable')
    })
})
