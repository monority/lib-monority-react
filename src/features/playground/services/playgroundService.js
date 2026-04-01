import { fakeHttpClient } from '@/services/http/fakeHttpClient'
import { playgroundMetricsData } from '../content/playground-metrics'

export async function getPlaygroundMetrics() {
    return fakeHttpClient({
        data: playgroundMetricsData,
    })
}
