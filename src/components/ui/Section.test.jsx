import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Section } from '@/components/ui/Section'
import { renderWithProviders } from '@/test/test-utils'

describe('Section', () => {
    it('rend une section par defaut', () => {
        const { container } = renderWithProviders(<Section>Contenu</Section>)

        expect(container.querySelector('section')).toBeInTheDocument()
    })

    it('applique la classe de spacing', () => {
        const { container } = renderWithProviders(<Section spacing="lg">Contenu</Section>)

        expect(container.querySelector('section')).toHaveClass('section', 'section--lg')
    })

    it('applique la classe surface quand surface=true', () => {
        const { container } = renderWithProviders(<Section surface>Contenu</Section>)

        expect(container.querySelector('section')).toHaveClass('surface', 'section--surface')
    })

    it('rend avec un element personnalise via as', () => {
        const { container } = renderWithProviders(<Section as="div">Contenu</Section>)

        expect(container.querySelector('div.section')).toBeInTheDocument()
    })

    it('affiche les children', () => {
        renderWithProviders(<Section>Contenu de section</Section>)

        expect(screen.getByText('Contenu de section')).toBeInTheDocument()
    })
})
