import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/test-utils'
import { AdminPage } from './AdminPage'

const { useAdminOverview, useErrorToast } = vi.hoisted(() => ({
    useAdminOverview: vi.fn(),
    useErrorToast: vi.fn(),
}))

vi.mock('./hooks/useAdminOverview', () => ({
    useAdminOverview,
}))

vi.mock('@/hooks/useErrorToast', () => ({
    useErrorToast,
}))

describe('AdminPage', () => {
    beforeEach(() => {
        useAdminOverview.mockReset()
        useErrorToast.mockReset()
    })

    it('affiche l espace admin quand les donnees sont disponibles', () => {
        useAdminOverview.mockReturnValue({
            data: {
                headerContent: {
                    eyebrow: 'Admin',
                    title: 'Gestion des utilisateurs et des acces',
                    description: 'Description',
                    meta: ['128 membres'],
                    primaryActionLabel: 'Inviter',
                    secondaryActionLabel: 'Exporter CSV',
                },
                filters: [{ label: 'Actifs' }],
                columns: [{ key: 'name', header: 'Membre' }],
                rows: [{ id: '1', name: 'Alice Martin', status: 'Active' }],
                sidebarData: {
                    summary: [{ label: 'Admins', value: '8' }],
                    actions: ['Relancer les invitations en attente'],
                },
            },
            isLoading: false,
            isError: false,
            errorMessage: null,
        })

        renderWithProviders(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>,
        )

        expect(screen.getByText('Gestion des utilisateurs et des acces')).toBeInTheDocument()
        expect(screen.getByText('Alice Martin')).toBeInTheDocument()
        expect(screen.getByText('Relancer les invitations en attente')).toBeInTheDocument()
    })

    it('affiche une erreur visible quand le chargement echoue', () => {
        useAdminOverview.mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
            errorMessage: 'Admin unavailable',
        })

        renderWithProviders(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>,
        )

        expect(screen.getByRole('alert')).toHaveTextContent('Admin unavailable')
    })

    it('affiche un etat de chargement accessible pendant le fetch', () => {
        useAdminOverview.mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
            errorMessage: null,
        })

        renderWithProviders(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>,
        )

        expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
        expect(screen.getByText('Chargement de l espace admin de demonstration...')).toHaveClass(
            'visually-hidden',
        )
    })
})
