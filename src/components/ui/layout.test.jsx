import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Stack } from '@/components/ui/Stack'
import { Grid } from '@/components/ui/Grid'
import { Container } from '@/components/ui/Container'
import { renderWithProviders } from '@/test/test-utils'

describe('Stack', () => {
    it('affiche les children', () => {
        renderWithProviders(<Stack>Contenu stack</Stack>)

        expect(screen.getByText('Contenu stack')).toBeInTheDocument()
    })

    it('applique la classe de gap par defaut (m)', () => {
        const { container } = renderWithProviders(<Stack>Item</Stack>)

        expect(container.querySelector('.stack-m')).toBeInTheDocument()
    })

    it('applique la classe de gap specifie', () => {
        const { container } = renderWithProviders(<Stack gap="l">Item</Stack>)

        expect(container.querySelector('.stack-l')).toBeInTheDocument()
    })

    it('rend avec un element personnalise via as', () => {
        const { container } = renderWithProviders(<Stack as="ul">Item</Stack>)

        expect(container.querySelector('ul')).toBeInTheDocument()
    })
})

describe('Grid', () => {
    it('affiche les children', () => {
        renderWithProviders(<Grid>Contenu grid</Grid>)

        expect(screen.getByText('Contenu grid')).toBeInTheDocument()
    })

    it('applique les classes de cols et gap par defaut', () => {
        const { container } = renderWithProviders(<Grid>Item</Grid>)

        expect(container.querySelector('.grid')).toHaveClass('grid', 'cols-2', 'grid-gap-md')
    })

    it('applique le nombre de colonnes specifie', () => {
        const { container } = renderWithProviders(<Grid cols={3}>Item</Grid>)

        expect(container.querySelector('.grid')).toHaveClass('cols-3')
    })
})

describe('Container', () => {
    it('affiche les children', () => {
        renderWithProviders(<Container>Contenu container</Container>)

        expect(screen.getByText('Contenu container')).toBeInTheDocument()
    })

    it('applique les classes de size et gutter par defaut', () => {
        const { container } = renderWithProviders(<Container>Item</Container>)

        expect(container.querySelector('.container')).toHaveClass('container', 'container-gutter-md')
    })

    it('applique la taille large', () => {
        const { container } = renderWithProviders(<Container size="lg">Item</Container>)

        expect(container.querySelector('.container-lg')).toBeInTheDocument()
    })
})
