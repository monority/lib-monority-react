import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomePage } from './HomePage'
import { renderWithProviders } from '@/shared/test/test-utils'

describe('HomePage', () => {
    it('renders header, hero, sections and footer without error', () => {
        renderWithProviders(<HomePage />, { initialEntries: ['/'] })

        // Hero header
        expect(screen.getByRole('heading', { level: 1, name: 'Monority UI' })).toBeInTheDocument()
        expect(screen.getByText('Documentation (84 Composants)')).toBeInTheDocument()
        expect(screen.getAllByText('Design Studio').length).toBeGreaterThanOrEqual(2)

        // Sections
        expect(
            screen.getByRole('heading', { level: 2, name: 'Live Design Tokens' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 2, name: 'Architectural Foundation' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 2, name: 'Component Ecosystem' })
        ).toBeInTheDocument()

        // Contentinfo footer
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
        expect(screen.getByText('Monority UI — MIT License')).toBeInTheDocument()
    })
})
