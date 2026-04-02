import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
    it('renders title, description and actions', () => {
        render(
            <EmptyState
                title="Aucun projet"
                description="Commence par creer ta premiere ressource."
                action={<Button>Creer</Button>}
                secondaryAction={<Button variant="ghost">Importer</Button>}
            />,
        )

        expect(screen.getByRole('heading', { name: 'Aucun projet' })).toBeInTheDocument()
        expect(screen.getByText('Commence par creer ta premiere ressource.')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Creer' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Importer' })).toBeInTheDocument()
    })
})
