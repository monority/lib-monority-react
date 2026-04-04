import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tooltip } from '@/components/ui/Tooltip'
import { renderWithProviders } from '@/test/test-utils'

describe('Tooltip', () => {
    it('rend le trigger et le contenu tooltip', () => {
        renderWithProviders(
            <Tooltip content="Aide contextuelle">
                <button type="button">Action</button>
            </Tooltip>,
        )

        expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
        expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })

    it('affiche le contenu du tooltip', () => {
        renderWithProviders(
            <Tooltip content="Aide contextuelle">
                <button type="button">Action</button>
            </Tooltip>,
        )

        expect(screen.getByRole('tooltip')).toHaveTextContent('Aide contextuelle')
    })

    it('associe le tooltip au trigger via aria-describedby', () => {
        renderWithProviders(
            <Tooltip content="Description">
                <button type="button">Bouton</button>
            </Tooltip>,
        )

        const trigger = screen.getByRole('button', { name: 'Bouton' })
        const tooltip = screen.getByRole('tooltip')

        expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
    })
})
