import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useHomeUI } from './useHomeUI'

describe('useHomeUI', () => {
    it('la modal est fermee par defaut', () => {
        const { result } = renderHook(() => useHomeUI())
        expect(result.current.isModalOpen).toBe(false)
    })

    it('openModal passe isModalOpen a true', () => {
        const { result } = renderHook(() => useHomeUI())
        act(() => result.current.openModal())
        expect(result.current.isModalOpen).toBe(true)
    })

    it('closeModal repasse isModalOpen a false', () => {
        const { result } = renderHook(() => useHomeUI())
        act(() => result.current.openModal())
        act(() => result.current.closeModal())
        expect(result.current.isModalOpen).toBe(false)
    })
})
