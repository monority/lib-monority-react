import { renderWithProviders } from '@/shared/test/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Installation } from './Installation'

describe('Installation page (/docs/installation)', () => {
    it('renders English page with all installation steps, package managers, and framework tabs', () => {
        renderWithProviders(<Installation />, { initialEntries: ['/docs/installation'] })

        // Hero
        expect(screen.getByRole('heading', { level: 1, name: 'Installation' })).toBeInTheDocument()
        expect(screen.getByText('Getting started')).toBeInTheDocument()

        // Telemetry
        expect(screen.getByText('Peer dependencies')).toBeInTheDocument()
        expect(screen.getByText('react ^19.0.0 · react-dom ^19.0.0')).toBeInTheDocument()
        expect(screen.getByText('TypeScript')).toBeInTheDocument()
        expect(screen.getByText('CSS foundation')).toBeInTheDocument()

        // Step 1: Install
        expect(
            screen.getByRole('heading', { level: 2, name: /Install the package/i })
        ).toBeInTheDocument()
        const bunTab = screen.getByRole('tab', { name: 'bun' })
        expect(bunTab).toBeInTheDocument()
        fireEvent.click(bunTab)
        expect(bunTab).toHaveAttribute('aria-selected', 'true')
        expect(screen.getByText('bun add @monority/ui')).toBeInTheDocument()

        // Step 2: Styles
        expect(
            screen.getByRole('heading', {
                level: 2,
                name: /Load the CSS foundation & @layer order/i,
            })
        ).toBeInTheDocument()
        expect(screen.getByText('@monority/ui/styles.css')).toBeInTheDocument()
        expect(screen.getByText('@monority/ui/reset.css')).toBeInTheDocument()
        expect(screen.getByText('@monority/ui/utilities.css')).toBeInTheDocument()

        // Step 3: Providers
        expect(
            screen.getByRole('heading', {
                level: 2,
                name: /Configure ThemeProvider & ToastProvider/i,
            })
        ).toBeInTheDocument()
        expect(screen.getAllByText('ThemeProvider').length).toBeGreaterThan(0)
        expect(screen.getAllByText('ThemeScope').length).toBeGreaterThan(0)

        // Step 4: SSR
        expect(
            screen.getByRole('heading', {
                level: 2,
                name: /Prevent first-paint theme flash/i,
            })
        ).toBeInTheDocument()

        // Step 5: Imports
        expect(
            screen.getByRole('heading', {
                level: 2,
                name: /Import components, tree-shake & configure TypeScript/i,
            })
        ).toBeInTheDocument()
        expect(screen.getByText('Keep styles.css imported once at the root')).toBeInTheDocument()

        // Step 6: Frameworks
        expect(
            screen.getByRole('heading', { level: 2, name: /Framework quickstarts/i })
        ).toBeInTheDocument()
        const nextTab = screen.getByRole('tab', { name: 'Next.js App Router' })
        expect(nextTab).toBeInTheDocument()
        fireEvent.click(nextTab)
        expect(nextTab).toHaveAttribute('aria-selected', 'true')
        expect(screen.getByText('app/providers.tsx')).toBeInTheDocument()

        // DocPager (Previous: Introduction, Next: Button)
        const prevLink = screen.getByRole('link', { name: /Previous.*Introduction/i })
        expect(prevLink).toHaveAttribute('href', '/docs')
        const nextLink = screen.getByRole('link', { name: /Next.*Button/i })
        expect(nextLink).toHaveAttribute('href', '/docs/button')
    })

    it('renders French page with localized steps and links (/fr/docs/installation)', () => {
        renderWithProviders(<Installation />, {
            initialEntries: ['/fr/docs/installation'],
        })

        expect(screen.getByRole('heading', { level: 1, name: 'Installation' })).toBeInTheDocument()
        expect(screen.getByText('Premiers pas')).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { level: 2, name: /Installer le paquet/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', {
                level: 2,
                name: /Charger la fondation CSS et l’ordre @layer/i,
            })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', {
                level: 2,
                name: /Configurer ThemeProvider et ToastProvider/i,
            })
        ).toBeInTheDocument()

        // Localized Pager
        const prevLink = screen.getByRole('link', { name: /Précédent.*Introduction/i })
        expect(prevLink).toHaveAttribute('href', '/fr/docs')
        const nextLink = screen.getByRole('link', { name: /Suivant.*Button/i })
        expect(nextLink).toHaveAttribute('href', '/fr/docs/button')
    })
})
