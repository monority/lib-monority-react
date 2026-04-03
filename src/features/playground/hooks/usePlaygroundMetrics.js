import { useAsyncResource } from '@/hooks/useAsyncResource'
import { getPlaygroundMetrics } from '../services/playgroundService'

export function usePlaygroundMetrics() {
    return useAsyncResource(getPlaygroundMetrics)
}
