import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/test-utils'
import { DashboardPage } from './DashboardPage'

const { useDashboardOverview, useErrorToast } = vi.hoisted(() => ({
    useDashboardOverview: vi.fn(),
    useErrorToast: vi.fn(),
}))

vi.mock('./hooks/useDashboardOverview', () => ({
    useDashboardOverview,
}))

vi.mock('@/hooks/useErrorToast', () => ({
    useErrorToast,
}))

describe('DashboardPage', () => {
    beforeEach(() => {
        useDashboardOverview.mockReset()
        useErrorToast.mockReset()
    })

    it('affiche le dashboard quand les donnees sont disponibles', () => {
        useDashboardOverview.mockReturnValue({
            data: {
                topbarContent: {
                    brand: 'Model Workspace',
                    navItems: ['Overview'],
                    meta: 'Cycle hebdo',
                    actionLabel: 'Creer un rapport',
                },
                headerContent: {
                    eyebrow: 'Dashboard',
                    title: 'Vue d ensemble produit',
                    description: 'Description',
                    meta: ['Mis a jour'],
                    primaryActionLabel: 'Partager',
                    secondaryActionLabel: 'Exporter',
                },
                metrics: [{ label: 'MRR', value: '48 200 EUR' }],
                alert: {
                    title: 'Une opportunite de conversion est en hausse',
                    description: 'Alert description',
                    actionLabel: 'Voir le segment',
                },
                tableColumns: [{ key: 'customer', header: 'Client' }],
                tableRows: [{ id: '1', customer: 'Acme Studio' }],
                sidebarData: {
                    highlights: [{ label: 'NPS', value: '48' }],
                    tasks: ['Partager le recap revenue avec l equipe'],
                },
            },
            isLoading: false,
            isError: false,
            errorMessage: null,
        })

        renderWithProviders(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>,
        )

        expect(screen.getByText('Vue d ensemble produit')).toBeInTheDocument()
        expect(screen.getByText('Une opportunite de conversion est en hausse')).toBeInTheDocument()
        expect(screen.getByText('Acme Studio')).toBeInTheDocument()
    })

    it('affiche une erreur visible quand le chargement echoue', () => {
        useDashboardOverview.mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
            errorMessage: 'Dashboard unavailable',
        })

        renderWithProviders(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>,
        )

        expect(screen.getByRole('alert')).toHaveTextContent('Dashboard unavailable')
    })

    it('affiche un etat de chargement accessible pendant le fetch', () => {
        useDashboardOverview.mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
            errorMessage: null,
        })

        renderWithProviders(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>,
        )

        expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
        expect(screen.getByText('Chargement du dashboard de demonstration...')).toHaveClass(
            'visually-hidden',
        )
    })
})
