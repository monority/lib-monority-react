import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Table } from '@/components/ui/Table'
import { renderWithProviders } from '@/test/test-utils'

const columns = [
    { key: 'name', header: 'Nom' },
    { key: 'role', header: 'Role' },
]

const rows = [
    { id: '1', name: 'Alice', role: 'Admin' },
    { id: '2', name: 'Bob', role: 'Editeur' },
]

describe('Table', () => {
    it('affiche les en-tetes de colonnes', () => {
        renderWithProviders(<Table columns={columns} rows={rows} />)

        expect(screen.getByRole('columnheader', { name: 'Nom' })).toBeInTheDocument()
        expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument()
    })

    it('affiche les donnees des lignes', () => {
        renderWithProviders(<Table columns={columns} rows={rows} />)

        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(screen.getByText('Editeur')).toBeInTheDocument()
    })

    it('utilise un render personnalise pour une colonne', () => {
        const customColumns = [
            { key: 'name', header: 'Nom', render: (value) => <strong>{value}</strong> },
        ]
        renderWithProviders(<Table columns={customColumns} rows={rows} />)

        expect(screen.getByText('Alice').tagName).toBe('STRONG')
    })

    it('affiche l etat vide quand il n y a pas de lignes', () => {
        renderWithProviders(<Table columns={columns} rows={[]} />)

        expect(screen.getByText('Aucune ligne')).toBeInTheDocument()
    })

    it('affiche un etat vide personnalise', () => {
        renderWithProviders(
            <Table columns={columns} rows={[]} emptyState={<p>Aucun utilisateur</p>} />,
        )

        expect(screen.getByText('Aucun utilisateur')).toBeInTheDocument()
    })
})
