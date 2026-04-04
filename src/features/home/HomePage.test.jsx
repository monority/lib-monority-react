import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/test-utils'
import { HomePage } from './HomePage'

function renderHomePage() {
    return renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
            <HomePage />
        </MemoryRouter>,
    )
}

describe('HomePage', () => {
    it('affiche le titre principal', () => {
        renderHomePage()
        expect(
            screen.getByText('Starter frontend pro, propre et reutilisable.'),
        ).toBeInTheDocument()
    })

    it('affiche les boutons d action du hero', () => {
        renderHomePage()
        expect(screen.getByRole('link', { name: 'Demarrer' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Voir composant modal' })).toBeInTheDocument()
    })

    it('ouvre la modal quand on clique sur le bouton', async () => {
        const user = userEvent.setup()
        renderHomePage()
        await user.click(screen.getByRole('button', { name: 'Voir composant modal' }))
        expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('ferme la modal quand on clique sur Fermer', async () => {
        const user = userEvent.setup()
        renderHomePage()
        await user.click(screen.getByRole('button', { name: 'Voir composant modal' }))
        const dialog = screen.getByRole('dialog')
        expect(dialog).toBeInTheDocument()
        await user.click(screen.getByRole('button', { name: 'Fermer la fenetre' }))
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
})
