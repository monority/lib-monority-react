import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DropdownMenu } from '@/components/ui/DropdownMenu'
import { renderWithProviders } from '@/test/test-utils'

const items = [
    { value: 'edit', label: 'Modifier', onSelect: vi.fn() },
    { value: 'duplicate', label: 'Dupliquer', onSelect: vi.fn() },
    { type: 'separator' },
    { value: 'delete', label: 'Supprimer', danger: true, onSelect: vi.fn() },
]

describe('DropdownMenu', () => {
    it('rend le trigger sans ouvrir le menu', () => {
        renderWithProviders(<DropdownMenu trigger="Options" items={items} />)

        expect(screen.getByRole('button', { name: 'Options' })).toBeInTheDocument()
        expect(screen.queryByRole('menu')).toBeNull()
    })

    it('ouvre le menu au clic sur le trigger', () => {
        renderWithProviders(<DropdownMenu trigger="Options" items={items} />)

        fireEvent.click(screen.getByRole('button', { name: 'Options' }))

        expect(screen.getByRole('menu')).toBeInTheDocument()
        expect(screen.getByRole('menuitem', { name: 'Modifier' })).toBeInTheDocument()
        expect(screen.getByRole('menuitem', { name: 'Supprimer' })).toBeInTheDocument()
    })

    it('ferme le menu sur Escape', () => {
        renderWithProviders(<DropdownMenu trigger="Options" items={items} />)

        fireEvent.click(screen.getByRole('button', { name: 'Options' }))
        expect(screen.getByRole('menu')).toBeInTheDocument()

        fireEvent.keyDown(document, { key: 'Escape' })

        expect(screen.queryByRole('menu')).toBeNull()
    })

    it('appelle onSelect et ferme le menu au clic sur un item', () => {
        const onSelect = vi.fn()
        const menuItems = [{ value: 'edit', label: 'Modifier', onSelect }]
        renderWithProviders(<DropdownMenu trigger="Options" items={menuItems} />)

        fireEvent.click(screen.getByRole('button', { name: 'Options' }))
        fireEvent.click(screen.getByRole('menuitem', { name: 'Modifier' }))

        expect(onSelect).toHaveBeenCalledWith('edit')
        expect(screen.queryByRole('menu')).toBeNull()
    })

    it('respecte l etat open controle', () => {
        renderWithProviders(<DropdownMenu trigger="Options" items={items} open={true} onOpenChange={() => {}} />)

        expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('appelle onOpenChange au clic sur le trigger', () => {
        const onOpenChange = vi.fn()
        renderWithProviders(
            <DropdownMenu trigger="Options" items={items} open={false} onOpenChange={onOpenChange} />,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Options' }))

        expect(onOpenChange).toHaveBeenCalledWith(true)
    })
})
