import { renderWithProviders } from '@/shared/test/test-utils'
import { fireEvent, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Home3DMatrix } from './Home3DMatrix'

describe('Home3DMatrix', () => {
    it('renders accessible figure,figcaption, and isolated ThemeScope surface', () => {
        const { container } = renderWithProviders(<Home3DMatrix />)

        const figure = screen.getByRole('figure')
        expect(figure).toBeInTheDocument()
        expect(figure).toHaveAttribute('aria-label')

        expect(
            screen.getByText(/Live interactive Monority UI surface rendered with real Card/i)
        ).toBeInTheDocument()

        const scopeSurface = container.querySelector('.mr-showcase__surface')
        expect(scopeSurface).toBeInTheDocument()
        expect(scopeSurface).toHaveAttribute('data-theme')
        expect(scopeSurface).toHaveAttribute('data-density', 'comfortable')
    })

    it('switches local ThemeScope theme and density in real time via SegmentedControl', () => {
        const { container } = renderWithProviders(<Home3DMatrix />)
        const scopeSurface = container.querySelector('.mr-showcase__surface')
        expect(scopeSurface).not.toBeNull()

        const themeGroup = screen.getByRole('radiogroup', { name: 'Preview theme scope' })
        const oceanRadio = within(themeGroup).getByRole('radio', { name: 'Ocean' })
        fireEvent.click(oceanRadio)
        expect(oceanRadio).toHaveAttribute('aria-checked', 'true')
        expect(scopeSurface).toHaveAttribute('data-theme', 'ocean')

        const densityGroup = screen.getByRole('radiogroup', { name: 'Preview layout density' })
        const compactRadio = within(densityGroup).getByRole('radio', { name: 'Compact' })
        fireEvent.click(compactRadio)
        expect(compactRadio).toHaveAttribute('aria-checked', 'true')
        expect(scopeSurface).toHaveAttribute('data-density', 'compact')
    })

    it('updates live telemetry across Input filter, Switch, region selection, Apply and Reset', () => {
        renderWithProviders(<Home3DMatrix />)

        expect(screen.getByText('11.4 ms')).toBeInTheDocument()

        const cacheSwitch = screen.getByRole('switch', { name: 'Smart edge caching' })
        expect(cacheSwitch).toBeChecked()
        fireEvent.click(cacheSwitch)
        expect(cacheSwitch).not.toBeChecked()
        expect(screen.getByText('17.8 ms')).toBeInTheDocument()

        const filterInput = screen.getByRole('textbox', { name: 'Filter edge regions' })
        fireEvent.change(filterInput, { target: { value: 'tokyo' } })
        expect(screen.getByText('hnd-01')).toBeInTheDocument()
        expect(screen.queryByText('fra-01')).not.toBeInTheDocument()

        fireEvent.change(filterInput, { target: { value: 'zzz-none' } })
        expect(screen.getByText('No matching edge region.')).toBeInTheDocument()

        const applyBtn = screen.getByRole('button', { name: 'Apply policy' })
        fireEvent.click(applyBtn)
        expect(screen.getByText('Policy synced · 0ms')).toBeInTheDocument()

        const resetBtn = screen.getByRole('button', { name: 'Reset' })
        expect(resetBtn).not.toBeDisabled()
        fireEvent.click(resetBtn)
        expect(screen.getByText('11.4 ms')).toBeInTheDocument()
        expect(screen.getByText('fra-01')).toBeInTheDocument()
    })

    it('renders localized French copy when mounted on /fr', () => {
        renderWithProviders(<Home3DMatrix />, { initialEntries: ['/fr'] })

        expect(screen.getByText('Performance du cluster')).toBeInTheDocument()
        expect(screen.getByText('Politique de routage')).toBeInTheDocument()
        expect(screen.getByRole('switch', { name: 'Cache edge intelligent' })).toBeInTheDocument()
    })
})
