import { apiClient } from '@/services/http/apiClient'
import { authApi } from '@/services/auth/authApi'
import { mapSessionResponse } from '@/services/auth/authMappers'
import { mockSession } from '@/services/auth/mockSession'

export async function fetchMockSession({ signal } = {}) {
    const session = await apiClient.request({
        ...authApi.session,
        data: mockSession,
        delay: 180,
        signal,
    })

    return mapSessionResponse(session)
}

export async function signOutMockSession({ signal } = {}) {
    return apiClient.request({
        ...authApi.signOut,
        data: { success: true },
        delay: 140,
        signal,
    })
}
