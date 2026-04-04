import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from '@/components/ui/Card'
import { renderWithProviders } from '@/test/test-utils'

describe('Card', () => {
    it('affiche son contenu', () => {
        renderWithProviders(<Card>Contenu de la carte</Card>)

        expect(screen.getByText('Contenu de la carte')).toBeInTheDocument()
    })

    it('rend un article par defaut', () => {
        renderWithProviders(<Card>Contenu</Card>)

        expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('rend avec un element personnalise via as', () => {
        const { container } = renderWithProviders(<Card as="section">Contenu</Card>)

        expect(container.querySelector('section')).toBeInTheDocument()
    })

    it('applique la classe interactive quand interactive=true', () => {
        renderWithProviders(<Card interactive>Carte cliquable</Card>)

        expect(screen.getByRole('article')).toHaveClass('ui-card--interactive')
    })
})
