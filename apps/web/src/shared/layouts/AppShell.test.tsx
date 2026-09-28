import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppShell } from '@/shared/layouts/AppShell'
import { renderWithProviders } from '@/shared/test/test-utils'

describe('AppShell', () => {
    it('rend un seul header global et le contenu de la page', () => {
        const { container } = renderWithProviders(
            <AppShell>
                <div>Content</div>
            </AppShell>,
            { initialEntries: ['/showcase'] }
        )

        expect(screen.getByText('Content')).toBeInTheDocument()

        // The shared header: brand + main nav + Light/Dark toggle.
        const header = container.querySelector('.app-header')
        expect(header).toBeInTheDocument()
        expect(
            within(header as HTMLElement).getByRole('link', { name: 'Monority' })
        ).toHaveAttribute('href', '/')
        expect(
            within(header as HTMLElement).getByRole('navigation', { name: 'Navigation principale' })
        ).toBeInTheDocument()

        // No secondary chrome bar.
        expect(container.querySelector('.app-shell__chrome')).not.toBeInTheDocument()
        expect(container.querySelector('.app-nav')).not.toBeInTheDocument()
    })

    it('expose un skip link vers le contenu principal', () => {
        renderWithProviders(
            <AppShell>
                <div>Content</div>
            </AppShell>,
            { initialEntries: ['/playground'] }
        )

        expect(screen.getByRole('link', { name: 'Aller au contenu principal' })).toHaveAttribute(
            'href',
            '#main-content'
        )
        expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
    })

    it('garde la bascule Light/Dark accessible depuis le header', () => {
        renderWithProviders(
            <AppShell>
                <div>Content</div>
            </AppShell>,
            { initialEntries: ['/dashboard'] }
        )

        expect(screen.getByRole('button', { name: /thème/i })).toBeInTheDocument()
    })
})
