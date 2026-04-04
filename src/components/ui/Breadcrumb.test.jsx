import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { renderWithProviders } from '@/test/test-utils'

const items = [
    { label: 'Accueil', href: '/' },
    { label: 'Produits', href: '/produits' },
    { label: 'Detail' },
]

describe('Breadcrumb', () => {
    it('rend une navigation accessible', () => {
        renderWithProviders(<Breadcrumb items={items} />)

        expect(screen.getByRole('navigation', { name: "Fil d'Ariane" })).toBeInTheDocument()
    })

    it('affiche tous les items', () => {
        renderWithProviders(<Breadcrumb items={items} />)

        expect(screen.getByText('Accueil')).toBeInTheDocument()
        expect(screen.getByText('Produits')).toBeInTheDocument()
        expect(screen.getByText('Detail')).toBeInTheDocument()
    })

    it('rend les items intermediaires comme liens', () => {
        renderWithProviders(<Breadcrumb items={items} />)

        expect(screen.getByRole('link', { name: 'Accueil' })).toHaveAttribute('href', '/')
        expect(screen.getByRole('link', { name: 'Produits' })).toHaveAttribute('href', '/produits')
    })

    it('marque le dernier item avec aria-current page', () => {
        renderWithProviders(<Breadcrumb items={items} />)

        const current = screen.getByText('Detail')
        expect(current).toHaveAttribute('aria-current', 'page')
    })

    it('n affiche pas le dernier item comme lien', () => {
        renderWithProviders(<Breadcrumb items={items} />)

        const links = screen.getAllByRole('link')
        const lastItemLink = links.find((link) => link.textContent === 'Detail')
        expect(lastItemLink).toBeUndefined()
    })
})
