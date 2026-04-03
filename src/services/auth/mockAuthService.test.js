import { describe, expect, it, vi } from 'vitest'
import { fetchMockSession, signOutMockSession } from '@/services/auth/mockAuthService'
import { ApiError } from '@/services/http/ApiError'

describe('mockAuthService', () => {
    it('retourne la session de demonstration', async () => {
        await expect(fetchMockSession()).resolves.toMatchObject({
            user: {
                id: 'user-1',
                email: 'alice@model.app',
            },
            workspace: {
                id: 'workspace-1',
                plan: 'Pro',
            },
        })
    })

    it('normalise la session meme si des champs sont absents', async () => {
        vi.resetModules()

        vi.doMock('@/services/http/apiClient', () => ({
            apiClient: {
                request: vi.fn().mockResolvedValue({
                    user: { id: 'user-2' },
                    workspace: {},
                }),
            },
        }))

        const { fetchMockSession: fetchIncompleteSession } = await import('@/services/auth/mockAuthService')

        await expect(fetchIncompleteSession()).resolves.toEqual({
            user: {
                id: 'user-2',
                name: 'Unknown user',
                email: '',
                role: 'Member',
            },
            workspace: {
                id: '',
                name: 'Unknown workspace',
                plan: 'Free',
            },
        })
    })

    it('retourne un acquittement lors de la deconnexion', async () => {
        await expect(signOutMockSession()).resolves.toEqual({ success: true })
    })

    it('normalise les erreurs inattendues en ApiError', async () => {
        vi.resetModules()

        vi.doMock('@/services/http/apiClient', () => ({
            apiClient: {
                request: vi.fn().mockRejectedValue(new Error('network down')),
            },
        }))

        const { fetchMockSession: fetchFailingSession } = await import('@/services/auth/mockAuthService')

        await expect(fetchFailingSession()).rejects.toMatchObject({
            name: 'Error',
            message: 'network down',
        })
    })

    it('propage les annulations sans les transformer', async () => {
        const controller = new AbortController()
        controller.abort()

        await expect(fetchMockSession({ signal: controller.signal })).rejects.toMatchObject({
            name: 'AbortError',
        })
    })
})
