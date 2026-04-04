import { describe, expect, it } from 'vitest'
import { asyncStatus, createAsyncState } from './createAsyncState'

describe('asyncStatus', () => {
    it('expose les quatre statuts attendus', () => {
        expect(asyncStatus.idle).toBe('idle')
        expect(asyncStatus.loading).toBe('loading')
        expect(asyncStatus.success).toBe('success')
        expect(asyncStatus.error).toBe('error')
    })
})

describe('createAsyncState', () => {
    it('retourne l etat initial idle par defaut', () => {
        expect(createAsyncState()).toEqual({
            status: 'idle',
            data: null,
            error: null,
        })
    })

    it('fusionne les surcharges fournies', () => {
        expect(createAsyncState({ status: 'loading' })).toEqual({
            status: 'loading',
            data: null,
            error: null,
        })
    })

    it('permet de surcharger data et error', () => {
        expect(
            createAsyncState({ status: 'success', data: { id: 1 }, error: null }),
        ).toEqual({
            status: 'success',
            data: { id: 1 },
            error: null,
        })
    })

    it('permet de poser un etat error avec un message', () => {
        expect(
            createAsyncState({ status: 'error', error: 'Erreur reseau' }),
        ).toEqual({
            status: 'error',
            data: null,
            error: 'Erreur reseau',
        })
    })
})
