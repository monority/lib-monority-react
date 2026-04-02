import { apiClient } from '@/services/http/apiClient'
import { playgroundMetricsData } from '../content/playground-metrics'

export async function getPlaygroundMetrics({ signal } = {}) {
    return apiClient.request({
        data: playgroundMetricsData,
        signal,
        errorMessage: 'Impossible de charger les metriques du playground.',
    })
}
