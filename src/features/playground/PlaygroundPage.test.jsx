import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/test-utils'
import { PlaygroundPage } from './PlaygroundPage'

const { usePlaygroundMetrics, useErrorToast } = vi.hoisted(() => ({
    usePlaygroundMetrics: vi.fn(),
    useErrorToast: vi.fn(),
}))

vi.mock('./hooks/usePlaygroundMetrics', () => ({
    usePlaygroundMetrics,
}))

vi.mock('@/hooks/useErrorToast', () => ({
    useErrorToast,
}))

describe('PlaygroundPage', () => {
    beforeEach(() => {
        usePlaygroundMetrics.mockReset()
        useErrorToast.mockReset()
    })

    it('affiche le playground et ses metriques quand les donnees sont disponibles', () => {
        usePlaygroundMetrics.mockReturnValue({
            data: [
                {
                    id: 'metric-1',
                    label: 'Starter readiness',
                    value: '10/10',
                    detail: 'Architecture deja posee.',
                },
            ],
            isLoading: false,
            isError: false,
            errorMessage: null,
        })

        renderWithProviders(
            <MemoryRouter>
                <PlaygroundPage />
            </MemoryRouter>,
        )

        expect(screen.getByText('Playground de feature reutilisable')).toBeInTheDocument()
        expect(screen.getByText('Dossier de feature isole avec son contenu propre')).toBeInTheDocument()
        expect(screen.getByText('Starter readiness')).toBeInTheDocument()
    })

    it('affiche une erreur visible quand les metriques ne se chargent pas', () => {
        usePlaygroundMetrics.mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
            errorMessage: 'Playground unavailable',
        })

        renderWithProviders(
            <MemoryRouter>
                <PlaygroundPage />
            </MemoryRouter>,
        )

        expect(screen.getByRole('alert')).toHaveTextContent('Playground unavailable')
    })

    it('affiche un etat de chargement accessible pendant le fetch', () => {
        usePlaygroundMetrics.mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
            errorMessage: null,
        })

        renderWithProviders(
            <MemoryRouter>
                <PlaygroundPage />
            </MemoryRouter>,
        )

        expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
        expect(screen.getByText('Chargement des metriques de demonstration...')).toHaveClass(
            'visually-hidden',
        )
    })
})
