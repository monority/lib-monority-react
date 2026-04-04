import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiError } from './ApiError'
import { fakeHttpClient } from './fakeHttpClient'

describe('fakeHttpClient', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('retourne les donnees apres le delai', async () => {
        const promise = fakeHttpClient({ data: { id: 1 }, delay: 100 })
        vi.advanceTimersByTime(100)

        await expect(promise).resolves.toEqual({ id: 1 })
    })

    it('lance une ApiError quand shouldFail=true', async () => {
        const promise = fakeHttpClient({
            data: {},
            delay: 0,
            shouldFail: true,
            errorMessage: 'Echec demo',
            errorCode: 'demo_failed',
            errorStatus: 503,
        })
        vi.advanceTimersByTime(0)

        let caught
        try {
            await promise
        } catch (error) {
            caught = error
        }

        expect(caught).toBeInstanceOf(ApiError)
        expect(caught.message).toBe('Echec demo')
        expect(caught.code).toBe('demo_failed')
        expect(caught.status).toBe(503)
    })

    it('rejette avec AbortError si le signal est deja annule', async () => {
        const controller = new AbortController()
        controller.abort()

        const promise = fakeHttpClient({ data: {}, signal: controller.signal })

        await expect(promise).rejects.toMatchObject({ name: 'AbortError' })
    })

    it('rejette avec AbortError si le signal est annule pendant l attente', async () => {
        const controller = new AbortController()
        const promise = fakeHttpClient({ data: {}, delay: 500, signal: controller.signal })

        vi.advanceTimersByTime(100)
        controller.abort()
        vi.advanceTimersByTime(400)

        await expect(promise).rejects.toMatchObject({ name: 'AbortError' })
    })
})
