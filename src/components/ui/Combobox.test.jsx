import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Combobox } from '@/components/ui/Combobox'
import { renderWithProviders } from '@/test/test-utils'

const items = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte', description: 'Framework leger' },
]

describe('Combobox', () => {
    it('rend un input avec le role combobox', () => {
        renderWithProviders(<Combobox items={items} label="Framework" />)

        expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('affiche le label', () => {
        renderWithProviders(<Combobox items={items} label="Framework" />)

        expect(screen.getByText('Framework')).toBeInTheDocument()
    })

    it('ouvre la liste au focus', () => {
        renderWithProviders(<Combobox items={items} label="Framework" />)

        fireEvent.focus(screen.getByRole('combobox'))

        expect(screen.getByRole('listbox')).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'React' })).toBeInTheDocument()
    })

    it('filtre les options selon la saisie', () => {
        renderWithProviders(<Combobox items={items} label="Framework" />)

        const input = screen.getByRole('combobox')
        fireEvent.focus(input)
        fireEvent.change(input, { target: { value: 'vue' } })

        expect(screen.queryByRole('option', { name: 'React' })).toBeNull()
        expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
    })

    it('affiche le message vide quand aucun resultat', () => {
        renderWithProviders(<Combobox items={items} label="Framework" emptyLabel="Rien trouve" />)

        const input = screen.getByRole('combobox')
        fireEvent.focus(input)
        fireEvent.change(input, { target: { value: 'angular' } })

        expect(screen.getByText('Rien trouve')).toBeInTheDocument()
    })

    it('selectionne un item au clic et appelle onChange', () => {
        const onChange = vi.fn()
        renderWithProviders(<Combobox items={items} label="Framework" onChange={onChange} />)

        fireEvent.focus(screen.getByRole('combobox'))
        fireEvent.click(screen.getByRole('option', { name: 'Vue' }))

        expect(onChange).toHaveBeenCalledWith('vue')
        expect(screen.queryByRole('listbox')).toBeNull()
    })

    it('ferme la liste sur Escape', () => {
        renderWithProviders(<Combobox items={items} label="Framework" />)

        const input = screen.getByRole('combobox')
        fireEvent.focus(input)
        expect(screen.getByRole('listbox')).toBeInTheDocument()

        fireEvent.keyDown(input, { key: 'Escape' })
        expect(screen.queryByRole('listbox')).toBeNull()
    })

    it('selectionne avec Enter sur l option active', () => {
        const onChange = vi.fn()
        renderWithProviders(<Combobox items={items} label="Framework" onChange={onChange} />)

        const input = screen.getByRole('combobox')
        fireEvent.focus(input)
        fireEvent.keyDown(input, { key: 'Enter' })

        expect(onChange).toHaveBeenCalledWith('react')
    })

    it('affiche le message d erreur', () => {
        renderWithProviders(<Combobox items={items} error="Champ requis" />)

        expect(screen.getByText('Champ requis')).toBeInTheDocument()
    })
})
