import { useAsyncResource } from '@/hooks/useAsyncResource'
import { getDashboardOverview } from '../services/dashboardService'

export function useDashboardOverview() {
    return useAsyncResource(getDashboardOverview)
}
