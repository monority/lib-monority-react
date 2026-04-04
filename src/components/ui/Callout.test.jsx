import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Callout } from '@/components/ui/Callout'
import { renderWithProviders } from '@/test/test-utils'

describe('Callout', () => {
    it('affiche le titre et la description', () => {
        renderWithProviders(
            <Callout title="Attention" description="Cette action est irreversible." />,
        )

        expect(screen.getByText('Attention')).toBeInTheDocument()
        expect(screen.getByText('Cette action est irreversible.')).toBeInTheDocument()
    })

    it('rend avec le role note', () => {
        renderWithProviders(<Callout title="Info" />)

        expect(screen.getByRole('note')).toBeInTheDocument()
    })

    it('applique la classe de tone', () => {
        renderWithProviders(<Callout title="Danger" tone="danger" />)

        expect(screen.getByRole('note')).toHaveClass('ui-callout--danger')
    })

    it('affiche des children', () => {
        renderWithProviders(
            <Callout>
                <span>Contenu libre</span>
            </Callout>,
        )

        expect(screen.getByText('Contenu libre')).toBeInTheDocument()
    })

    it('n affiche pas le titre si absent', () => {
        renderWithProviders(<Callout description="Seule une description" />)

        expect(screen.queryByRole('strong')).toBeNull()
    })
})
