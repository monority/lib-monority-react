import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Divider } from '@/components/ui/Divider'
import { renderWithProviders } from '@/test/test-utils'

describe('Divider', () => {
    it('rend un separateur accessible', () => {
        renderWithProviders(<Divider />)

        expect(screen.getByRole('separator')).toBeInTheDocument()
    })

    it('affiche un label quand fourni', () => {
        renderWithProviders(<Divider label="ou" />)

        expect(screen.getByText('ou')).toBeInTheDocument()
    })

    it('pose aria-label sur le separateur quand label fourni', () => {
        renderWithProviders(<Divider label="Section suivante" />)

        expect(screen.getByRole('separator')).toHaveAttribute('aria-label', 'Section suivante')
    })

    it('applique une classe supplementaire', () => {
        renderWithProviders(<Divider className="my-divider" />)

        expect(screen.getByRole('separator')).toHaveClass('ui-divider', 'my-divider')
    })
})
