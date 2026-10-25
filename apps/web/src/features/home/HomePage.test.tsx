import { docsComponentRegistry } from '@/features/docs/components/registry'
import { renderWithProviders } from '@/shared/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomePage } from './HomePage'

describe('HomePage', () => {
    it('renders header, hero, sections and footer without error', () => {
        renderWithProviders(<HomePage />, { initialEntries: ['/'] })

        expect(screen.getByRole('heading', { level: 1, name: 'Monority UI' })).toBeInTheDocument()
        expect(
            screen.getByText(`Documentation (${docsComponentRegistry.length} components)`)
        ).toBeInTheDocument()
        expect(screen.getAllByText('Design Studio').length).toBeGreaterThanOrEqual(2)

        expect(
            screen.getByRole('heading', { level: 2, name: 'Live design tokens' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 2, name: 'Architectural foundation' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 2, name: 'Component ecosystem' })
        ).toBeInTheDocument()

        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
        expect(screen.getByText('Monority UI — MIT License')).toBeInTheDocument()
    })
})
