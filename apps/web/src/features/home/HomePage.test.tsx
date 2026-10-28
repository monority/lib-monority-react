import { renderWithProviders } from '@/shared/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomePage } from './HomePage'

describe('HomePage', () => {
    it('renders hero, 3D matrix, architectural pillars, code experience and footer without error', () => {
        renderWithProviders(<HomePage />, { initialEntries: ['/'] })

        expect(
            screen.getByRole('heading', {
                level: 1,
                name: 'The component library engineered for high-density production.',
            })
        ).toBeInTheDocument()

        expect(screen.getByRole('link', { name: 'Explore Components' })).toBeInTheDocument()
        expect(screen.getAllByRole('link', { name: 'GitHub' }).length).toBeGreaterThanOrEqual(1)
        expect(screen.getByText('npm i @monority/ui')).toBeInTheDocument()

        expect(screen.getByRole('figure')).toBeInTheDocument()
        expect(screen.getByText('Drag to orbit 3D')).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { level: 2, name: 'Architectural Foundations' })
        ).toBeInTheDocument()
        expect(screen.getByText('Native CSS @layer Isolation')).toBeInTheDocument()
        expect(screen.getByText('OKLCH Runtime Theming')).toBeInTheDocument()
        expect(screen.getByText('84 Accessible Primitives')).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { level: 2, name: 'Developer Experience' })
        ).toBeInTheDocument()

        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
        expect(screen.getByText('Monority UI — MIT License')).toBeInTheDocument()
    })
})
