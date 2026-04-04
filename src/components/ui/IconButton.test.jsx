import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { IconButton } from '@/components/ui/IconButton'
import { renderWithProviders } from '@/test/test-utils'

describe('IconButton', () => {
    it('rend un bouton avec l aria-label fourni', () => {
        renderWithProviders(<IconButton label="Fermer">✕</IconButton>)

        expect(screen.getByRole('button', { name: 'Fermer' })).toBeInTheDocument()
    })

    it('appelle onClick au clic', () => {
        const onClick = vi.fn()
        renderWithProviders(
            <IconButton label="Supprimer" onClick={onClick}>
                ✕
            </IconButton>,
        )

        screen.getByRole('button', { name: 'Supprimer' }).click()

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('desactive le bouton avec disabled', () => {
        renderWithProviders(<IconButton label="Fermer" disabled>✕</IconButton>)

        expect(screen.getByRole('button', { name: 'Fermer' })).toBeDisabled()
    })
})
