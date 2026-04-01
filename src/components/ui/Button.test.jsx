import { screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'
import { renderWithProviders } from '@/test/test-utils'

describe('Button', () => {
    it('renders button content', () => {
        renderWithProviders(<Button>Continuer</Button>)

        expect(screen.getByRole('button', { name: 'Continuer' })).toBeInTheDocument()
    })

    it('disables the button when loading', () => {
        renderWithProviders(<Button loading>Chargement</Button>)

        expect(screen.getByRole('button', { name: 'Chargement' })).toBeDisabled()
        expect(screen.getByRole('button', { name: 'Chargement' })).toHaveAttribute(
            'aria-busy',
            'true',
        )
    })
})
