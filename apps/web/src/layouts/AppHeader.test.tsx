import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppHeader } from './AppHeader'
import { DESIGN_PRESETS, ThemeProvider } from '@monority/ui'

function renderHeader(homeNav = false) {
    return render(
        <MemoryRouter>
            <ThemeProvider>
                <AppHeader homeNav={homeNav} />
            </ThemeProvider>
        </MemoryRouter>
    )
}

describe('AppHeader', () => {
    it('expose le moodboard dans la navigation principale', () => {
        renderHeader()

        const nav = screen.getByRole('navigation', { name: 'Navigation principale' })
        expect(within(nav).getByRole('link', { name: 'Moodboard' })).toHaveAttribute(
            'href',
            '/moodboard'
        )
        expect(within(nav).getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs')
        expect(within(nav).getByRole('link', { name: 'Showcase' })).toHaveAttribute(
            'href',
            '/showcase'
        )
        expect(within(nav).getByRole('link', { name: 'Playground' })).toHaveAttribute(
            'href',
            '/playground'
        )
    })

    it('expose un seul bouton de bascule Light/Dark, sans sélecteur d accent', () => {
        renderHeader()

        expect(screen.queryByLabelText('Accent')).not.toBeInTheDocument()
        expect(screen.queryByRole('group', { name: 'Theme' })).not.toBeInTheDocument()

        const toggle = screen.getByRole('button', { name: /thème/i })
        expect(toggle).toBeInTheDocument()
    })

    it('bascule entre light et dark au clic', () => {
        renderHeader()

        // Thème initial : light → le bouton propose de passer en sombre.
        const toggle = screen.getByRole('button', { name: /thème/i })
        expect(toggle).toHaveTextContent('Dark')

        fireEvent.click(toggle)
        expect(screen.getByRole('button', { name: /thème/i })).toHaveTextContent('Light')

        fireEvent.click(screen.getByRole('button', { name: /thème/i }))
        expect(screen.getByRole('button', { name: /thème/i })).toHaveTextContent('Dark')
    })

    it('conserve la variante home pour la page d accueil', () => {
        const { container } = renderHeader(true)
        expect(container.querySelector('.app-header--home')).toBeInTheDocument()
        expect(container.querySelector('.app-header__theme')).toBeInTheDocument()
    })

    it('nomme chaque thème du preset plutôt que de retomber sur un label générique', () => {
        for (const { label } of DESIGN_PRESETS.themes) {
            expect(label).not.toBe('')
            expect(`Theme: ${label}`).not.toBe('Theme: Systeme')
        }
        /* Every theme the picker offers must be nameable by the toggle. */
        expect(DESIGN_PRESETS.themes.map((t) => t.label)).toContain('Slate')
    })
})
