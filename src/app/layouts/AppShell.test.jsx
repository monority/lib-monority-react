import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppShell } from './AppShell'

const { useAuth, useToast } = vi.hoisted(() => ({
    useAuth: vi.fn(),
    useToast: vi.fn(),
}))

vi.mock('@/hooks/useAuth', () => ({
    useAuth,
}))

vi.mock('@/hooks/useToast', () => ({
    useToast,
}))

function renderAppShell(overrides = {}, navigationItems = []) {
    const pushToast = vi.fn()
    const signOut = vi.fn().mockResolvedValue(undefined)

    useAuth.mockReturnValue({
        user: { name: 'Alice Martin', role: 'Admin' },
        workspace: { name: 'Model Workspace', plan: 'Pro' },
        isAuthenticated: true,
        isLoading: false,
        signOut,
        errorMessage: null,
        ...overrides,
    })

    useToast.mockReturnValue({ pushToast })

    render(
        <MemoryRouter>
            <AppShell
                isDark={false}
                theme="light"
                onToggleTheme={vi.fn()}
                navigationItems={navigationItems}
            >
                <div>Content</div>
            </AppShell>
        </MemoryRouter>,
    )

    return { pushToast, signOut }
}

describe('AppShell', () => {
    beforeEach(() => {
        useAuth.mockReset()
        useToast.mockReset()
    })

    it('declenche un toast de succes apres la deconnexion', async () => {
        const { pushToast, signOut } = renderAppShell()

        fireEvent.click(screen.getByRole('button', { name: 'Sign out' }))

        await waitFor(() => {
            expect(signOut).toHaveBeenCalledTimes(1)
        })

        expect(pushToast).toHaveBeenCalledWith({
            title: 'Session fermee',
            description: 'La deconnexion de demonstration a ete effectuee.',
            tone: 'success',
        })
    })

    it('declenche un toast d erreur si la deconnexion echoue', async () => {
        const error = new Error('Sign out failed')
        const { pushToast } = renderAppShell({
            signOut: vi.fn().mockRejectedValue(error),
        })

        fireEvent.click(screen.getByRole('button', { name: 'Sign out' }))

        await waitFor(() => {
            expect(pushToast).toHaveBeenCalledWith({
                title: 'Deconnexion impossible',
                description: 'Sign out failed',
                tone: 'danger',
            })
        })
    })

    it('declenche un toast si la session demo est indisponible', async () => {
        const { pushToast } = renderAppShell({
            user: null,
            workspace: null,
            isAuthenticated: false,
            errorMessage: 'Session unavailable',
        })

        await waitFor(() => {
            expect(pushToast).toHaveBeenCalledWith({
                title: 'Session demo indisponible',
                description: 'Session unavailable',
                tone: 'danger',
            })
        })
    })

    it('regroupe les liens de navigation dans des menus deroulants', () => {
        renderAppShell(
            {},
            [
                { label: 'Accueil', to: '/' },
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Admin', to: '/admin' },
                { label: 'Playground', to: '/playground' },
                { label: 'Showcase', to: '/showcase' },
                { label: 'Docs', to: '/docs' },
                { label: 'Features', href: '#features' },
            ],
        )

        expect(screen.getByRole('link', { name: 'Accueil' })).toBeInTheDocument()
        expect(screen.getByText('Produit')).toBeInTheDocument()
        expect(screen.getByText('Ressources')).toBeInTheDocument()
        expect(screen.getByText('Sections')).toBeInTheDocument()
    })

    it('ouvre une navigation mobile dans un drawer', () => {
        renderAppShell(
            {},
            [
                { label: 'Accueil', to: '/' },
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Docs', to: '/docs' },
            ],
        )

        fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le menu principal' }))

        const dialog = screen.getByRole('dialog', { name: 'Navigation' })

        expect(dialog).toBeInTheDocument()
        expect(within(dialog).getByText('Dashboard')).toBeInTheDocument()
    })

    it('referme le drawer mobile apres une navigation', async () => {
        renderAppShell(
            {},
            [
                { label: 'Accueil', to: '/' },
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Docs', to: '/docs' },
            ],
        )

        fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le menu principal' }))

        const dialog = screen.getByRole('dialog', { name: 'Navigation' })
        fireEvent.click(within(dialog).getByText('Dashboard'))

        await waitFor(() => {
            expect(screen.queryByRole('dialog', { name: 'Navigation' })).not.toBeInTheDocument()
        })
    })
})
