import { renderWithProviders } from '@/shared/test/test-utils'
import { screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { HeroMonolith3D } from './HeroMonolith3D'
import { readMonolithTokens } from './monolith-tokens'

describe('HeroMonolith3D', () => {
    afterEach(() => {
        document.documentElement.removeAttribute('data-theme')
        document.documentElement.removeAttribute('data-motion')
    })

    it('renders accessible role="img" with English aria-label and instant SVG poster fallback', () => {
        const { container, unmount } = renderWithProviders(<HeroMonolith3D />, {
            initialEntries: ['/'],
        })

        const monolith = screen.getByRole('img', {
            name: /Interactive 3D machined monolith/i,
        })
        expect(monolith).toBeInTheDocument()
        expect(monolith).toHaveAttribute('data-webgl-ready', 'false')

        const poster = container.querySelector('svg.mr-monolith__poster')
        expect(poster).toBeInTheDocument()
        expect(poster).not.toHaveClass('mr-monolith__poster--hidden')

        expect(() => unmount()).not.toThrow()
    })

    it('renders localized French aria-label when mounted on /fr', () => {
        renderWithProviders(<HeroMonolith3D />, { initialEntries: ['/fr'] })

        expect(
            screen.getByRole('img', {
                name: /Monolithe 3D usiné interactif/i,
            })
        ).toBeInTheDocument()
    })

    it('reads theme and motion attributes deterministically in readMonolithTokens', () => {
        const host = document.createElement('div')
        document.body.appendChild(host)

        document.documentElement.setAttribute('data-theme', 'high-contrast')
        document.documentElement.setAttribute('data-motion', 'reduce')

        const tokens = readMonolithTokens(host)
        expect(tokens.theme).toBe('high-contrast')
        expect(tokens.isHighContrast).toBe(true)
        expect(tokens.reducedMotion).toBe(true)

        document.documentElement.setAttribute('data-motion', 'always')
        const activeTokens = readMonolithTokens(host)
        expect(activeTokens.reducedMotion).toBe(false)

        host.remove()
    })
})
