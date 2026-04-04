import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Title } from '@/components/ui/Title'
import { renderWithProviders } from '@/test/test-utils'

describe('Title', () => {
    it('rend un h2 par defaut', () => {
        renderWithProviders(<Title>Mon titre</Title>)

        expect(screen.getByRole('heading', { level: 2, name: 'Mon titre' })).toBeInTheDocument()
    })

    it('rend avec le niveau de titre specifie via as', () => {
        renderWithProviders(<Title as="h1">Titre principal</Title>)

        expect(screen.getByRole('heading', { level: 1, name: 'Titre principal' })).toBeInTheDocument()
    })

    it('applique la classe de taille', () => {
        renderWithProviders(<Title size="display">Grand titre</Title>)

        expect(screen.getByRole('heading', { name: 'Grand titre' })).toHaveClass(
            'ui-title',
            'ui-title--display',
        )
    })

    it('applique une classe supplementaire', () => {
        renderWithProviders(<Title className="custom-title">Titre</Title>)

        expect(screen.getByRole('heading', { name: 'Titre' })).toHaveClass('custom-title')
    })
})
