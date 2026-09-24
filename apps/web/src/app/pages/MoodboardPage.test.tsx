import { renderWithProviders } from '@/test/test-utils'
import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MoodboardPage } from './MoodboardPage'

const themes = ['light', 'dark', 'oled'] as const

describe('MoodboardPage', () => {
    it('renders the same interface across all three theme panels', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        expect(screen.getByTestId('moodboard-page')).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /one language/i })).toBeInTheDocument()
        expect(screen.getAllByTestId(/moodboard-panel-/)).toHaveLength(3)

        for (const theme of themes) {
            const panel = screen.getByTestId(`moodboard-panel-${theme}`)
            expect(panel).toHaveAttribute('data-moodboard-theme', theme)
            expect(
                within(panel).getByRole('heading', { name: 'Release control' })
            ).toBeInTheDocument()
            expect(within(panel).getByText('Component language')).toBeInTheDocument()
            expect(within(panel).getByText('TOKEN STRIP')).toBeInTheDocument()
            expect(within(panel).getByText('Border')).toBeInTheDocument()
            expect(within(panel).getByText('Spacing')).toBeInTheDocument()
            expect(within(panel).getByLabelText('Border levels')).toBeInTheDocument()
            expect(within(panel).getByLabelText('Spacing scale')).toBeInTheDocument()
            expect(within(panel).getByTestId(`moodboard-${theme}-tokens`)).toBeInTheDocument()
            expect(panel.querySelectorAll('.moodboard-card')).toHaveLength(5)
            expect(within(panel).getByRole('button', { name: 'Primary' })).toBeInTheDocument()
            expect(within(panel).getByRole('button', { name: 'Destructive' })).toBeInTheDocument()
            expect(within(panel).getByRole('button', { name: 'Loading' })).toBeInTheDocument()
        }
    })

    it('keeps canonical form, data, and navigation components visible', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        const lightPanel = screen.getByTestId('moodboard-panel-light')
        expect(within(lightPanel).getByLabelText('Workspace')).toHaveValue('monority-prod')
        expect(within(lightPanel).getByLabelText('Region')).toHaveValue('eu-west-1')
        expect(within(lightPanel).getByText('edge-router')).toBeInTheDocument()
        expect(
            within(lightPanel).getByRole('navigation', { name: 'Compact navigation' })
        ).toBeInTheDocument()
        expect(
            within(lightPanel).getByRole('tablist', { name: 'Moodboard sections' })
        ).toBeInTheDocument()
        expect(
            within(lightPanel).getByRole('checkbox', { name: 'Require owner approval' })
        ).toBeInTheDocument()
    })
})
