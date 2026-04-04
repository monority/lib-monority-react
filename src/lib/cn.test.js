import { describe, expect, it } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
    it('joint plusieurs classes en une chaine', () => {
        expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz')
    })

    it('filtre les valeurs falsy', () => {
        expect(cn('foo', null, undefined, false, '', 'bar')).toBe('foo bar')
    })

    it('retourne une chaine vide sans arguments', () => {
        expect(cn()).toBe('')
    })

    it('accepte des conditions', () => {
        const isActive = true
        const isDisabled = false
        expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active')
    })
})
