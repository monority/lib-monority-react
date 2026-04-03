import { describe, expect, it } from 'vitest'
import { ApiError } from '@/services/http/ApiError'
import { getErrorMessage, isAbortError, normalizeApiError } from '@/services/http/httpErrorUtils'

describe('httpErrorUtils', () => {
    it('reconnait une annulation de requete', () => {
        const abortError = new DOMException('Request aborted', 'AbortError')

        expect(isAbortError(abortError)).toBe(true)
        expect(isAbortError(new Error('boom'))).toBe(false)
    })

    it('laisse passer les ApiError existantes', () => {
        const error = new ApiError('Already normalized', { code: 'known_error', status: 400 })

        expect(normalizeApiError(error, 'Fallback')).toBe(error)
    })

    it('transforme une erreur generique en ApiError', () => {
        const error = new Error('Network down')
        const normalized = normalizeApiError(error, 'Fallback')

        expect(normalized).toBeInstanceOf(ApiError)
        expect(normalized.message).toBe('Fallback')
        expect(normalized.details).toBe(error)
    })

    it('extrait le message en respectant le fallback', () => {
        expect(getErrorMessage(new Error('Service unavailable'))).toBe('Service unavailable')
        expect(getErrorMessage(null, 'Unknown error')).toBe('Unknown error')
    })
})
