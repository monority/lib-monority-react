import { describe, expect, it, vi } from 'vitest'
import { ApiError } from './ApiError'
import { createApiClient } from './createApiClient'

describe('createApiClient', () => {
    it('retourne les donnees quand le transport reussit', async () => {
        const transport = vi.fn().mockResolvedValue({ id: 1, name: 'Alice' })
        const client = createApiClient({ transport })

        await expect(client.request()).resolves.toEqual({ id: 1, name: 'Alice' })
    })

    it('passe la config au transport', async () => {
        const transport = vi.fn().mockResolvedValue({})
        const client = createApiClient({ transport })

        await client.request({ url: '/api/users', method: 'GET' })

        expect(transport).toHaveBeenCalledWith({ url: '/api/users', method: 'GET' })
    })

    it('normalise l erreur en ApiError quand le transport echoue', async () => {
        const transport = vi.fn().mockRejectedValue(new Error('Network error'))
        const client = createApiClient({ transport, defaultErrorMessage: 'Erreur reseau' })

        await expect(client.request()).rejects.toBeInstanceOf(ApiError)
    })

    it('utilise le errorMessage de la config si present', async () => {
        const transport = vi.fn().mockRejectedValue(new Error('timeout'))
        const client = createApiClient({ transport, defaultErrorMessage: 'Defaut' })

        let caught
        try {
            await client.request({ errorMessage: 'Message specifique' })
        } catch (error) {
            caught = error
        }

        expect(caught).toBeInstanceOf(ApiError)
        expect(caught.message).toBe('Message specifique')
    })

    it('relaie une ApiError existante sans la reenvelopper', async () => {
        const original = new ApiError('Deja une ApiError', { code: 'not_found', status: 404 })
        const transport = vi.fn().mockRejectedValue(original)
        const client = createApiClient({ transport })

        let caught
        try {
            await client.request()
        } catch (error) {
            caught = error
        }

        expect(caught).toBe(original)
        expect(caught.status).toBe(404)
    })
})
