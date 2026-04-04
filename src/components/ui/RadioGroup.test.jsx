import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { renderWithProviders } from '@/test/test-utils'

const items = [
    { value: 'small', label: 'Petit' },
    { value: 'medium', label: 'Moyen' },
    { value: 'large', label: 'Grand', description: 'Le plus spacieux' },
]

describe('RadioGroup', () => {
    it('affiche un groupe de radios accessible', () => {
        renderWithProviders(<RadioGroup label="Taille" items={items} />)

        expect(screen.getByRole('radiogroup')).toBeInTheDocument()
        expect(screen.getByRole('radio', { name: 'Petit' })).toBeInTheDocument()
        expect(screen.getByRole('radio', { name: 'Moyen' })).toBeInTheDocument()
    })

    it('affiche la description d un item si presente', () => {
        renderWithProviders(<RadioGroup items={items} />)

        expect(screen.getByText('Le plus spacieux')).toBeInTheDocument()
    })

    it('coche le bon item avec value', () => {
        renderWithProviders(<RadioGroup items={items} value="medium" onChange={() => {}} />)

        expect(screen.getByRole('radio', { name: 'Moyen' })).toBeChecked()
        expect(screen.getByRole('radio', { name: 'Petit' })).not.toBeChecked()
    })

    it('appelle onChange avec la valeur selectionnee', () => {
        const onChange = vi.fn()
        renderWithProviders(
            <RadioGroup items={items} value="small" onChange={onChange} />,
        )

        screen.getByRole('radio', { name: /Grand/ }).click()

        expect(onChange).toHaveBeenCalledWith('large')
    })

    it('desactive un item avec disabled', () => {
        const disabledItems = [
            { value: 'a', label: 'Choix A' },
            { value: 'b', label: 'Choix B', disabled: true },
        ]
        renderWithProviders(<RadioGroup items={disabledItems} />)

        expect(screen.getByRole('radio', { name: 'Choix B' })).toBeDisabled()
    })

    it('affiche le message d erreur', () => {
        renderWithProviders(
            <RadioGroup items={items} error="Selectionnez une option" />,
        )

        expect(screen.getByText('Selectionnez une option')).toBeInTheDocument()
    })
})
