import { fireEvent, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/test-utils'
import { MoodboardPage } from './MoodboardPage'

const themes = ['dark', 'light', 'oled', 'ocean', 'night'] as const

describe('MoodboardPage', () => {
    it('renders the same interface across all five atmosphere panels', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        expect(screen.getByTestId('moodboard-page')).toBeInTheDocument()
        expect(screen.getByText('One language, independent axes.')).toBeInTheDocument()
        expect(screen.getAllByTestId(/moodboard-panel-/)).toHaveLength(5)

        for (const theme of themes) {
            const panel = screen.getByTestId(`moodboard-panel-${theme}`)
            expect(panel).toHaveAttribute('data-moodboard-theme', theme)
            expect(within(panel).getByRole('heading', { name: 'Release control' })).toBeInTheDocument()
            expect(within(panel).getByText('Component language')).toBeInTheDocument()
            expect(within(panel).getByText('TOKEN STRIP')).toBeInTheDocument()
            expect(within(panel).getByText('Surface')).toBeInTheDocument()
            expect(within(panel).getByText('Geometry')).toBeInTheDocument()
            expect(within(panel).getByTestId(`moodboard-${theme}-tokens`)).toBeInTheDocument()
            expect(panel.querySelectorAll('.moodboard-card')).toHaveLength(6)
            expect(within(panel).getByRole('button', { name: 'primary' })).toBeInTheDocument()
            expect(within(panel).getByRole('button', { name: 'danger' })).toBeInTheDocument()
            expect(within(panel).getByRole('button', { name: 'loading' })).toBeInTheDocument()
        }
    })

    it('shares controls and resets them from the global toolbar', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        const lightPanel = screen.getByTestId('moodboard-panel-light')
        const darkPanel = screen.getByTestId('moodboard-panel-dark')
        expect(within(lightPanel).getByLabelText('Workspace')).toHaveValue('monority-prod')
        expect(within(darkPanel).getByLabelText('Workspace')).toHaveValue('monority-prod')

        fireEvent.change(within(lightPanel).getByLabelText('Workspace'), {
            target: { value: 'shared-workspace' },
        })
        expect(within(darkPanel).getByLabelText('Workspace')).toHaveValue('shared-workspace')

        fireEvent.click(within(screen.getByRole('group', { name: 'Layout density axis' })).getByRole('button', { name: 'Compact' }))
        expect(screen.getByTestId('moodboard-panel-light')).toHaveAttribute('data-density', 'compact')
        expect(screen.getByTestId('moodboard-panel-dark')).toHaveAttribute('data-density', 'compact')

        fireEvent.click(within(screen.getByRole('group', { name: 'Accent axis' })).getByRole('button', { name: 'Violet' }))
        expect(screen.getByTestId('moodboard-page').parentElement).toHaveAttribute('data-design-accent', 'violet')
        fireEvent.click(screen.getByRole('button', { name: 'Rounded' }))
        fireEvent.click(screen.getByRole('button', { name: 'Réinitialiser l’état' }))
        expect(screen.getByTestId('moodboard-panel-light')).toHaveAttribute('data-density', 'comfortable')
        expect(screen.getByTestId('moodboard-page').parentElement).toHaveAttribute('data-design-accent', 'cyan')
        expect(within(lightPanel).getByLabelText('Workspace')).toHaveValue('monority-prod')
    })
})
