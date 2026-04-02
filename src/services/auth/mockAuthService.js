import { fakeHttpClient } from '@/services/http/fakeHttpClient'

const mockSession = {
    user: {
        id: 'user-1',
        name: 'Alice Martin',
        email: 'alice@model.app',
        role: 'Admin',
    },
    workspace: {
        id: 'workspace-1',
        name: 'Model Workspace',
        plan: 'Pro',
    },
}

export async function fetchMockSession({ signal } = {}) {
    return fakeHttpClient({
        data: mockSession,
        delay: 180,
        signal,
    })
}

export async function signOutMockSession({ signal } = {}) {
    return fakeHttpClient({
        data: { success: true },
        delay: 140,
        signal,
    })
}
