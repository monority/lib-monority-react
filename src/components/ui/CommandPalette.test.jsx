import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { renderWithProviders } from '@/test/test-utils'

const items = [
    { value: 'new-file', label: 'Nouveau fichier', onSelect: vi.fn() },
    { value: 'open', label: 'Ouvrir', description: 'Ouvrir un fichier', keywords: 'fichier' },
    { value: 'save', label: 'Sauvegarder', shortcut: '⌘S', onSelect: vi.fn() },
]

describe('CommandPalette', () => {
    it('ne rend rien quand open=false', () => {
        renderWithProviders(<CommandPalette open={false} items={items} />)

        expect(screen.queryByRole('dialog')).toBeNull()
    })

    it('rend un dialog avec le champ de recherche quand open=true', () => {
        renderWithProviders(<CommandPalette open items={items} onClose={() => {}} />)

        expect(screen.getByRole('dialog')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Rechercher une action...')).toBeInTheDocument()
    })

    it('affiche tous les items initialement', () => {
        renderWithProviders(<CommandPalette open items={items} onClose={() => {}} />)

        expect(screen.getByRole('option', { name: /Nouveau fichier/ })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: /Ouvrir/ })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: /Sauvegarder/ })).toBeInTheDocument()
    })

    it('filtre les items selon la saisie', () => {
        renderWithProviders(<CommandPalette open items={items} onClose={() => {}} />)

        fireEvent.change(screen.getByPlaceholderText('Rechercher une action...'), {
            target: { value: 'sauv' },
        })

        expect(screen.queryByRole('option', { name: /Nouveau fichier/ })).toBeNull()
        expect(screen.getByRole('option', { name: /Sauvegarder/ })).toBeInTheDocument()
    })

    it('affiche le message vide quand aucun resultat', () => {
        renderWithProviders(
            <CommandPalette open items={items} onClose={() => {}} emptyLabel="Rien trouve" />,
        )

        fireEvent.change(screen.getByPlaceholderText('Rechercher une action...'), {
            target: { value: 'xyzxyz' },
        })

        expect(screen.getByText('Rien trouve')).toBeInTheDocument()
    })

    it('appelle onClose sur Escape', () => {
        const onClose = vi.fn()
        renderWithProviders(<CommandPalette open items={items} onClose={onClose} />)

        fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })

        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('appelle onSelect et ferme au clic sur un item', () => {
        const onClose = vi.fn()
        const onSelect = vi.fn()
        const menuItems = [{ value: 'save', label: 'Sauvegarder', onSelect }]
        renderWithProviders(<CommandPalette open items={menuItems} onClose={onClose} />)

        fireEvent.click(screen.getByRole('option', { name: /Sauvegarder/ }))

        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('affiche le titre personnalise', () => {
        renderWithProviders(
            <CommandPalette open items={items} onClose={() => {}} title="Mes commandes" />,
        )

        expect(screen.getByText('Mes commandes')).toBeInTheDocument()
    })
})
