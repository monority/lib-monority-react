import { DESIGN_PRESETS, ThemeProvider } from '@monority/ui'
import { LocaleProvider } from '@/shared/i18n'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppHeader } from './AppHeader'

function renderHeader(homeNav = false) {
    return render(
        <MemoryRouter>
            <LocaleProvider>
                <ThemeProvider>
                    <AppHeader homeNav={homeNav} />
                </ThemeProvider>
            </LocaleProvider>
        </MemoryRouter>
    )
}

describe('AppHeader', () => {
    it('exposes the moodboard in the main navigation', () => {
        renderHeader()

        const nav = screen.getByRole('navigation', { name: 'Main navigation' })
        expect(within(nav).getByRole('link', { name: 'Moodboard' })).toHaveAttribute(
            'href',
            '/moodboard'
        )
        expect(within(nav).getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs')
        expect(within(nav).queryByRole('link', { name: 'Showcase' })).toBeNull()
        expect(within(nav).queryByRole('link', { name: 'Playground' })).toBeNull()
    })

    it('exposes an accessible theme dropdown without an accent selector', () => {
        renderHeader()

        expect(screen.queryByLabelText('Accent')).not.toBeInTheDocument()
        expect(screen.queryByRole('group', { name: 'Theme' })).not.toBeInTheDocument()

        const toggle = screen.getByRole('button', { name: /theme/i })
        expect(toggle).toBeInTheDocument()
    })

    it('changes theme through the dropdown menu', () => {
        renderHeader()

        const toggle = screen.getByRole('button', { name: /theme/i })
        fireEvent.click(toggle)

        const darkOption = screen.getByRole('menuitem', { name: /dark/i })
        fireEvent.click(darkOption)

        expect(screen.getByRole('button', { name: /theme/i })).toHaveTextContent('Dark')
    })

    it('keeps the home variant on the landing page', () => {
        const { container } = renderHeader(true)
        expect(container.querySelector('.app-header--home')).toBeInTheDocument()
        expect(container.querySelector('.app-header__theme')).toBeInTheDocument()
    })

    it('names every preset theme instead of falling back to a generic label', () => {
        for (const { label } of DESIGN_PRESETS.themes) {
            expect(label).not.toBe('')
            expect(`Theme: ${label}`).not.toBe('Theme: Systeme')
        }
        /* Every theme the picker offers must be nameable by the toggle. */
        expect(DESIGN_PRESETS.themes.map((t) => t.label)).toContain('Slate')
    })

    it('shows the temporary changes section and the changelog trigger', () => {
        renderHeader()

        expect(screen.getByText(/Wave 7/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /latest changes/i })).toBeInTheDocument()
    })
})
