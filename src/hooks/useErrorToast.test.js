import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useErrorToast } from './useErrorToast'

const { useToast } = vi.hoisted(() => ({
    useToast: vi.fn(),
}))

vi.mock('@/hooks/useToast', () => ({
    useToast,
}))

describe('useErrorToast', () => {
    it('declenche un toast de danger quand une erreur apparait', () => {
        const pushToast = vi.fn()
        useToast.mockReturnValue({ pushToast })

        renderHook(() =>
            useErrorToast({
                title: 'Chargement impossible',
                errorMessage: 'Service unavailable',
            }),
        )

        expect(pushToast).toHaveBeenCalledWith({
            title: 'Chargement impossible',
            description: 'Service unavailable',
            tone: 'danger',
        })
    })

    it('ne redeclenche pas le meme toast sur rerender', () => {
        const pushToast = vi.fn()
        useToast.mockReturnValue({ pushToast })

        const { rerender } = renderHook(
            ({ errorMessage }) =>
                useErrorToast({
                    title: 'Chargement impossible',
                    errorMessage,
                }),
            {
                initialProps: {
                    errorMessage: 'Service unavailable',
                },
            },
        )

        rerender({
            errorMessage: 'Service unavailable',
        })

        expect(pushToast).toHaveBeenCalledTimes(1)
    })
})
