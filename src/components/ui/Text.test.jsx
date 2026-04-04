import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Text } from '@/components/ui/Text'
import { renderWithProviders } from '@/test/test-utils'

describe('Text', () => {
    it('rend un paragraphe par defaut', () => {
        renderWithProviders(<Text>Contenu texte</Text>)

        expect(screen.getByText('Contenu texte').tagName).toBe('P')
    })

    it('applique les classes de tone et taille', () => {
        renderWithProviders(
            <Text tone="strong" size="lg">
                Texte fort
            </Text>,
        )

        const el = screen.getByText('Texte fort')
        expect(el).toHaveClass('ui-text', 'ui-text--strong', 'ui-text--lg')
    })

    it('rend avec un element personnalise via as', () => {
        renderWithProviders(<Text as="span">Span texte</Text>)

        expect(screen.getByText('Span texte').tagName).toBe('SPAN')
    })

    it('applique une classe supplementaire', () => {
        renderWithProviders(<Text className="custom">Texte</Text>)

        expect(screen.getByText('Texte')).toHaveClass('custom')
    })
})
