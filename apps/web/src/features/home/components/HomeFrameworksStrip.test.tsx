import { renderWithProviders } from '@/shared/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomeFrameworksStrip } from './HomeFrameworksStrip'

describe('HomeFrameworksStrip', () => {
    it('renders supported ecosystem and frameworks list', () => {
        renderWithProviders(<HomeFrameworksStrip />)

        expect(
            screen.getByRole('region', { name: /Supported Ecosystem & Stack/i })
        ).toBeInTheDocument()
        expect(screen.getByText('React 19')).toBeInTheDocument()
        expect(screen.getByText('TypeScript 5')).toBeInTheDocument()
        expect(screen.getByText('Vite 6')).toBeInTheDocument()
        expect(screen.getByText('Next.js 15')).toBeInTheDocument()
        expect(screen.getByText('CSS @layer')).toBeInTheDocument()
        expect(screen.getByText('OKLCH Theming')).toBeInTheDocument()
    })
})
