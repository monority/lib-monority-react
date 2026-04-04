import { describe, expect, it } from 'vitest'
import { mapDashboardOverviewResponse } from './dashboardMappers'

describe('mapDashboardOverviewResponse', () => {
    it('mappe une reponse complete', () => {
        const data = {
            topbar: { title: 'Dashboard' },
            header: { subtitle: 'Vue generale' },
            metrics: [{ label: 'Utilisateurs', value: 42 }],
            alert: { message: 'Maintenance prevue' },
            table: { columns: [{ key: 'user' }], rows: [{ user: 'Alice' }] },
            sidebar: { highlights: ['KPI 1'], tasks: ['Tache A'] },
        }

        expect(mapDashboardOverviewResponse(data)).toEqual({
            topbarContent: { title: 'Dashboard' },
            headerContent: { subtitle: 'Vue generale' },
            metrics: [{ label: 'Utilisateurs', value: 42 }],
            alert: { message: 'Maintenance prevue' },
            tableColumns: [{ key: 'user' }],
            tableRows: [{ user: 'Alice' }],
            sidebarData: { highlights: ['KPI 1'], tasks: ['Tache A'] },
        })
    })

    it('applique des valeurs par defaut sur les champs absents', () => {
        expect(mapDashboardOverviewResponse({})).toEqual({
            topbarContent: undefined,
            headerContent: undefined,
            metrics: [],
            alert: null,
            tableColumns: [],
            tableRows: [],
            sidebarData: { highlights: [], tasks: [] },
        })
    })

    it('preserve null pour alert si absent', () => {
        const result = mapDashboardOverviewResponse({ alert: undefined })

        expect(result.alert).toBeNull()
    })
})
