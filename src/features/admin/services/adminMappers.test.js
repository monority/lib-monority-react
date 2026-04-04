import { describe, expect, it } from 'vitest'
import { mapAdminOverviewResponse } from './adminMappers'

describe('mapAdminOverviewResponse', () => {
    it('mappe une reponse complete', () => {
        const data = {
            header: { title: 'Admin' },
            filters: [{ label: 'Actifs' }],
            table: { columns: [{ key: 'name' }], rows: [{ name: 'Alice' }] },
            sidebar: { summary: ['Info 1'], actions: ['Action 1'] },
        }

        expect(mapAdminOverviewResponse(data)).toEqual({
            headerContent: { title: 'Admin' },
            filters: [{ label: 'Actifs' }],
            columns: [{ key: 'name' }],
            rows: [{ name: 'Alice' }],
            sidebarData: { summary: ['Info 1'], actions: ['Action 1'] },
        })
    })

    it('applique des listes vides par defaut pour les champs absents', () => {
        expect(mapAdminOverviewResponse({})).toEqual({
            headerContent: undefined,
            filters: [],
            columns: [],
            rows: [],
            sidebarData: { summary: [], actions: [] },
        })
    })

    it('gere table null gracieusement', () => {
        const result = mapAdminOverviewResponse({ table: null })

        expect(result.columns).toEqual([])
        expect(result.rows).toEqual([])
    })
})
