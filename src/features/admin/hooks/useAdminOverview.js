import { useAsyncResource } from '@/hooks/useAsyncResource'
import { getAdminOverview } from '../services/adminService'

export function useAdminOverview() {
    return useAsyncResource(getAdminOverview)
}
