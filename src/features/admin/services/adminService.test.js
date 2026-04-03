import { describe, expect, it, vi } from 'vitest'
import { getAdminOverview } from './adminService'

describe('adminService', () => {
    it('retourne les donnees admin mappees pour l UI', async () => {
        await expect(getAdminOverview()).resolves.toMatchObject({
            headerContent: expect.objectContaining({
                title: 'Gestion des utilisateurs et des acces',
            }),
            filters: expect.arrayContaining([
                expect.objectContaining({ label: 'Actifs' }),
            ]),
            columns: expect.arrayContaining([
                expect.objectContaining({ key: 'name' }),
            ]),
            rows: expect.arrayContaining([
                expect.objectContaining({ name: 'Alice Martin' }),
            ]),
            sidebarData: expect.objectContaining({
                actions: expect.arrayContaining(['Verifier les roles admin trop larges']),
            }),
        })
    })

    it('mappe une reponse admin partielle avec des listes vides par defaut', async () => {
        vi.resetModules()

        vi.doMock('@/services/http/apiClient', () => ({
            apiClient: {
                request: vi.fn().mockResolvedValue({
                    header: { title: 'Admin area' },
                    filters: null,
                    table: {},
                }),
            },
        }))

        const { getAdminOverview: getMappedOverview } = await import('./adminService')

        await expect(getMappedOverview()).resolves.toEqual({
            headerContent: { title: 'Admin area' },
            filters: [],
            columns: [],
            rows: [],
            sidebarData: {
                summary: [],
                actions: [],
            },
        })
    })
})
