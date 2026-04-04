import { describe, expect, it } from 'vitest'
import { mapSessionResponse } from './authMappers'

describe('mapSessionResponse', () => {
    it('retourne null si la session est nulle ou indefinie', () => {
        expect(mapSessionResponse(null)).toBeNull()
        expect(mapSessionResponse(undefined)).toBeNull()
    })

    it('mappe une session complete', () => {
        const session = {
            user: { id: 'u-1', name: 'Alice Martin', email: 'alice@example.com', role: 'Admin' },
            workspace: { id: 'w-1', name: 'Acme', plan: 'Pro' },
        }

        expect(mapSessionResponse(session)).toEqual({
            user: { id: 'u-1', name: 'Alice Martin', email: 'alice@example.com', role: 'Admin' },
            workspace: { id: 'w-1', name: 'Acme', plan: 'Pro' },
        })
    })

    it('applique les valeurs par defaut sur les champs manquants', () => {
        expect(mapSessionResponse({})).toEqual({
            user: { id: '', name: 'Unknown user', email: '', role: 'Member' },
            workspace: { id: '', name: 'Unknown workspace', plan: 'Free' },
        })
    })

    it('gere des champs user partiellement presents', () => {
        const session = {
            user: { name: 'Bob' },
            workspace: { name: 'Beta' },
        }

        const result = mapSessionResponse(session)

        expect(result.user.name).toBe('Bob')
        expect(result.user.id).toBe('')
        expect(result.workspace.name).toBe('Beta')
        expect(result.workspace.plan).toBe('Free')
    })
})
