import { apiClient } from '@/services/http/apiClient'
import { playgroundApi } from './playgroundApi'
import { playgroundMetricsData } from './playgroundMetricsData'
import { mapPlaygroundMetricsResponse } from './playgroundMappers'

export async function getPlaygroundMetrics({ signal } = {}) {
    const metrics = await apiClient.request({
        ...playgroundApi.metrics,
        data: playgroundMetricsData,
        signal,
    })

    return mapPlaygroundMetricsResponse(metrics)
}
