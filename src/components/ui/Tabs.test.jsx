import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Tabs } from '@/components/ui/Tabs'
import { renderWithProviders } from '@/test/test-utils'

const items = [
    { value: 'tab1', label: 'Premier onglet' },
    { value: 'tab2', label: 'Deuxieme onglet' },
    { value: 'tab3', label: 'Troisieme onglet' },
]

describe('Tabs', () => {
    it('affiche les onglets avec les bons roles', () => {
        renderWithProviders(<Tabs items={items} value="tab1" onChange={() => {}} />)

        expect(screen.getByRole('tab', { name: 'Premier onglet' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Deuxieme onglet' })).toBeInTheDocument()
    })

    it('marque l onglet actif avec aria-selected', () => {
        renderWithProviders(<Tabs items={items} value="tab2" onChange={() => {}} />)

        expect(screen.getByRole('tab', { name: 'Deuxieme onglet' })).toHaveAttribute(
            'aria-selected',
            'true',
        )
        expect(screen.getByRole('tab', { name: 'Premier onglet' })).toHaveAttribute(
            'aria-selected',
            'false',
        )
    })

    it('appelle onChange au clic sur un onglet', () => {
        const onChange = vi.fn()
        renderWithProviders(<Tabs items={items} value="tab1" onChange={onChange} />)

        fireEvent.click(screen.getByRole('tab', { name: 'Deuxieme onglet' }))

        expect(onChange).toHaveBeenCalledWith('tab2')
    })

    it('navigue vers l onglet suivant avec ArrowRight', () => {
        const onChange = vi.fn()
        renderWithProviders(<Tabs items={items} value="tab1" onChange={onChange} />)

        fireEvent.keyDown(screen.getByRole('tab', { name: 'Premier onglet' }), {
            key: 'ArrowRight',
        })

        expect(onChange).toHaveBeenCalledWith('tab2')
    })

    it('navigue vers l onglet precedent avec ArrowLeft', () => {
        const onChange = vi.fn()
        renderWithProviders(<Tabs items={items} value="tab2" onChange={onChange} />)

        fireEvent.keyDown(screen.getByRole('tab', { name: 'Deuxieme onglet' }), {
            key: 'ArrowLeft',
        })

        expect(onChange).toHaveBeenCalledWith('tab1')
    })

    it('va au premier onglet avec Home', () => {
        const onChange = vi.fn()
        renderWithProviders(<Tabs items={items} value="tab3" onChange={onChange} />)

        fireEvent.keyDown(screen.getByRole('tab', { name: 'Troisieme onglet' }), { key: 'Home' })

        expect(onChange).toHaveBeenCalledWith('tab1')
    })

    it('va au dernier onglet avec End', () => {
        const onChange = vi.fn()
        renderWithProviders(<Tabs items={items} value="tab1" onChange={onChange} />)

        fireEvent.keyDown(screen.getByRole('tab', { name: 'Premier onglet' }), { key: 'End' })

        expect(onChange).toHaveBeenCalledWith('tab3')
    })
})
