import { apiClient } from '@/services/http/apiClient'
import { adminApi } from './adminApi'
import { adminOverviewData } from './adminData'
import { mapAdminOverviewResponse } from './adminMappers'

export async function getAdminOverview({ signal } = {}) {
    const overview = await apiClient.request({
        ...adminApi.overview,
        data: adminOverviewData,
        delay: 220,
        signal,
    })

    return mapAdminOverviewResponse(overview)
}
