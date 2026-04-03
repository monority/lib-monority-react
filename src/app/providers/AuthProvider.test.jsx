import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthProvider } from './AuthProvider'
import { useAuth } from '@/hooks/useAuth'

const { fetchMockSession, signOutMockSession } = vi.hoisted(() => ({
    fetchMockSession: vi.fn(),
    signOutMockSession: vi.fn(),
}))

vi.mock('@/services/auth/mockAuthService', () => ({
    fetchMockSession,
    signOutMockSession,
}))

function AuthProbe() {
    const { status, errorMessage, workspace } = useAuth()

    return (
        <div>
            <span>{status}</span>
            <span>{errorMessage ?? 'no-error'}</span>
            <span>{workspace?.name ?? 'no-workspace'}</span>
        </div>
    )
}

describe('AuthProvider', () => {
    beforeEach(() => {
        fetchMockSession.mockReset()
        signOutMockSession.mockReset()
    })

    it('expose la session en cas de succes', async () => {
        fetchMockSession.mockResolvedValue({
            user: { id: 'user-1', name: 'Alice' },
            workspace: { id: 'workspace-1', name: 'Model Workspace' },
        })

        render(
            <AuthProvider>
                <AuthProbe />
            </AuthProvider>,
        )

        await waitFor(() => {
            expect(screen.getByText('authenticated')).toBeInTheDocument()
        })

        expect(screen.getByText('no-error')).toBeInTheDocument()
        expect(screen.getByText('Model Workspace')).toBeInTheDocument()
    })

    it('expose le message d erreur si le chargement echoue', async () => {
        fetchMockSession.mockRejectedValue(new Error('Session unavailable'))

        render(
            <AuthProvider>
                <AuthProbe />
            </AuthProvider>,
        )

        await waitFor(() => {
            expect(screen.getByText('anonymous')).toBeInTheDocument()
        })

        expect(screen.getByText('Session unavailable')).toBeInTheDocument()
        expect(screen.getByText('no-workspace')).toBeInTheDocument()
    })
})
