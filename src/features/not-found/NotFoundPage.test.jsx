import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/test-utils'
import { NotFoundPage } from './NotFoundPage'

describe('NotFoundPage', () => {
    it('affiche le titre 404', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/inexistant']}>
                <NotFoundPage />
            </MemoryRouter>,
        )
        expect(screen.getByText('La page demandee est introuvable.')).toBeInTheDocument()
    })

    it('affiche un lien vers l accueil', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/inexistant']}>
                <NotFoundPage />
            </MemoryRouter>,
        )
        expect(screen.getByRole('link', { name: "Retour a l'accueil" })).toBeInTheDocument()
    })
})
