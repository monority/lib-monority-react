import { renderWithProviders } from '@/shared/test/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Introduction } from './Introduction'
import { docsComponentRegistry } from './components/registry'

describe('Introduction page (/docs)', () => {
    it('renders English page with telemetry, 4 pillars, interactive preview, and category registry', () => {
        renderWithProviders(<Introduction />, { initialEntries: ['/docs'] })

        // Hero and CTAs
        expect(screen.getByRole('heading', { level: 1, name: 'Introduction' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Installation guide' })).toHaveAttribute(
            'href',
            '/docs/installation'
        )
        expect(screen.getByRole('link', { name: 'Browse components' })).toHaveAttribute(
            'href',
            '/docs/button'
        )

        // Telemetry strip
        expect(screen.getByText(String(docsComponentRegistry.length))).toBeInTheDocument()
        expect(screen.getByText('Components')).toBeInTheDocument()
        expect(screen.getByText('OKLCH themes')).toBeInTheDocument()
        expect(screen.getByText('CSS @layers')).toBeInTheDocument()
        expect(screen.getByText('React & strict TS')).toBeInTheDocument()

        // 4 Architectural pillars
        expect(screen.getByText('@layer mr.*')).toBeInTheDocument()
        expect(screen.getByText('oklch() · ThemeScope')).toBeInTheDocument()
        expect(screen.getByText('WAI-ARIA · React 19')).toBeInTheDocument()
        expect(screen.getByText('exports["./*"]')).toBeInTheDocument()

        // Package manager tabs in quickstart
        expect(screen.getByRole('tab', { name: 'pnpm' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'npm' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'yarn' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'bun' })).toBeInTheDocument()

        // Interactive ThemeScope sample card controls
        const oceanOption = screen.getByRole('radio', { name: 'Ocean' })
        expect(oceanOption).toBeInTheDocument()
        fireEvent.click(oceanOption)
        expect(oceanOption).toHaveAttribute('aria-checked', 'true')

        // Compact density option
        const compactOption = screen.getByRole('radio', { name: 'Compact' })
        expect(compactOption).toBeInTheDocument()
        fireEvent.click(compactOption)
        expect(compactOption).toHaveAttribute('aria-checked', 'true')

        // Component directory categories
        expect(screen.getByRole('heading', { level: 3, name: 'Actions' })).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 3, name: 'Forms & Inputs' })
        ).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 3, name: 'Navigation' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 3, name: 'Overlays' })).toBeInTheDocument()

        // Registry link check (sample)
        expect(screen.getByRole('link', { name: 'Button' })).toHaveAttribute('href', '/docs/button')
        expect(screen.getByRole('link', { name: 'Modal' })).toHaveAttribute('href', '/docs/modal')

        // DocPager
        const nextLink = screen.getByRole('link', { name: /Next.*Installation/i })
        expect(nextLink).toHaveAttribute('href', '/docs/installation')
    })

    it('renders French page with localized texts and routes (/fr/docs)', () => {
        renderWithProviders(<Introduction />, { initialEntries: ['/fr/docs'] })

        expect(screen.getByRole('heading', { level: 1, name: 'Introduction' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Guide d’installation' })).toHaveAttribute(
            'href',
            '/fr/docs/installation'
        )
        expect(screen.getByRole('link', { name: 'Parcourir les composants' })).toHaveAttribute(
            'href',
            '/fr/docs/button'
        )

        expect(screen.getByText('Composants')).toBeInTheDocument()
        expect(screen.getByText('Thèmes OKLCH')).toBeInTheDocument()
        expect(screen.getByText('Couches @layer')).toBeInTheDocument()

        // French category titles
        expect(screen.getByRole('heading', { level: 3, name: 'Actions' })).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 3, name: 'Formulaires et saisies' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 3, name: 'Retour et statuts' })
        ).toBeInTheDocument()

        // Localized chip href
        expect(screen.getByRole('link', { name: 'Button' })).toHaveAttribute(
            'href',
            '/fr/docs/button'
        )

        // Localized pager
        const nextLink = screen.getByRole('link', { name: /Suivant.*Installation/i })
        expect(nextLink).toHaveAttribute('href', '/fr/docs/installation')
    })
})
