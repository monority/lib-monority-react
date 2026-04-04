import { describe, expect, it } from 'vitest'
import { ApiError } from './ApiError'

describe('ApiError', () => {
    it('est une instance de Error', () => {
        const error = new ApiError('Quelque chose a mal tourne')

        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(ApiError)
    })

    it('a le name ApiError', () => {
        const error = new ApiError('message')

        expect(error.name).toBe('ApiError')
    })

    it('expose le message fourni', () => {
        const error = new ApiError('Ressource introuvable')

        expect(error.message).toBe('Ressource introuvable')
    })

    it('applique les valeurs par defaut pour code, status et details', () => {
        const error = new ApiError('Erreur')

        expect(error.code).toBe('unknown_error')
        expect(error.status).toBe(500)
        expect(error.details).toBeNull()
    })

    it('accepte des options personnalisees', () => {
        const error = new ApiError('Non autorise', {
            code: 'unauthorized',
            status: 401,
            details: { reason: 'token expired' },
        })

        expect(error.code).toBe('unauthorized')
        expect(error.status).toBe(401)
        expect(error.details).toEqual({ reason: 'token expired' })
    })
})
