import { renderWithProviders } from '@/shared/test/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomePillars } from './HomePillars'

describe('HomePillars', () => {
    it('renders the 3 architectural pillars and allows interacting with accent swatches', () => {
        renderWithProviders(<HomePillars />)

        expect(
            screen.getByRole('heading', { level: 2, name: /Architectural Foundations/i })
        ).toBeInTheDocument()
        expect(screen.getByText(/Native CSS @layer Isolation/i)).toBeInTheDocument()
        expect(screen.getByText(/OKLCH Runtime Theming/i)).toBeInTheDocument()
        expect(screen.getByText(/84 Accessible Primitives/i)).toBeInTheDocument()

        // Layer cascade visualization
        expect(screen.getByText('Consumer Application CSS')).toBeInTheDocument()
        expect(screen.getByText('WINNER')).toBeInTheDocument()

        // Accent swatches
        const cyanButton = screen.getByRole('button', { name: 'Cyan' })
        expect(cyanButton).toBeInTheDocument()
        fireEvent.click(cyanButton)
        expect(screen.getByText(/oklch\(0.72 0.16 215\)/i)).toBeInTheDocument()

        // Primitives links
        expect(screen.getByRole('link', { name: 'Button' })).toHaveAttribute(
            'href',
            expect.stringContaining('/docs/components/button')
        )
        expect(screen.getByRole('link', { name: 'CommandPalette' })).toHaveAttribute(
            'href',
            expect.stringContaining('/docs/components/command-palette')
        )
    })
})
