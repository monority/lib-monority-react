import { describe, expect, it, vi } from 'vitest'
import { getDashboardOverview } from './dashboardService'

describe('dashboardService', () => {
    it('retourne le dashboard de demonstration mappe pour l UI', async () => {
        await expect(getDashboardOverview()).resolves.toMatchObject({
            topbarContent: expect.objectContaining({
                brand: 'Model Workspace',
            }),
            headerContent: expect.objectContaining({
                title: 'Vue d ensemble produit',
            }),
            metrics: expect.arrayContaining([
                expect.objectContaining({ label: 'MRR' }),
            ]),
            tableColumns: expect.arrayContaining([
                expect.objectContaining({ key: 'customer' }),
            ]),
            sidebarData: expect.objectContaining({
                tasks: expect.arrayContaining(['Verifier les tickets enterprise ouverts']),
            }),
        })
    })

    it('mappe une reponse dashboard partielle avec des fallbacks de collection', async () => {
        vi.resetModules()

        vi.doMock('@/services/http/apiClient', () => ({
            apiClient: {
                request: vi.fn().mockResolvedValue({
                    topbar: { brand: 'Workspace', navItems: [] },
                    header: { title: 'Overview' },
                    sidebar: {},
                }),
            },
        }))

        const { getDashboardOverview: getMappedOverview } = await import('./dashboardService')

        await expect(getMappedOverview()).resolves.toEqual({
            topbarContent: { brand: 'Workspace', navItems: [] },
            headerContent: { title: 'Overview' },
            metrics: [],
            alert: null,
            tableColumns: [],
            tableRows: [],
            sidebarData: {
                highlights: [],
                tasks: [],
            },
        })
    })
})
