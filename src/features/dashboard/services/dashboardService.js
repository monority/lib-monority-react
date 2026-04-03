import { apiClient } from '@/services/http/apiClient'
import { dashboardApi } from './dashboardApi'
import { dashboardOverviewData } from './dashboardData'
import { mapDashboardOverviewResponse } from './dashboardMappers'

export async function getDashboardOverview({ signal } = {}) {
    const overview = await apiClient.request({
        ...dashboardApi.overview,
        data: dashboardOverviewData,
        delay: 220,
        signal,
    })

    return mapDashboardOverviewResponse(overview)
}
