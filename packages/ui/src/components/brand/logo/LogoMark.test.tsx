import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LogoMark } from './LogoMark'
import { MARK_PATH, MARK_VIEWBOX } from './path'

describe('LogoMark', () => {
    it('rend le tracé figé de la marque', () => {
        const { container } = render(<LogoMark />)
        const path = container.querySelector('path')
        expect(path?.getAttribute('d')).toBe(MARK_PATH)
        expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe(MARK_VIEWBOX)
    })

    it('est décoratif par défaut et nommé sur demande', () => {
        const { container, rerender } = render(<LogoMark />)
        const svg = container.querySelector('svg')
        expect(svg?.getAttribute('aria-hidden')).toBe('true')
        expect(svg?.getAttribute('role')).toBeNull()

        rerender(<LogoMark label="Monority" />)
        expect(screen.getByRole('img', { name: 'Monority' })).toBeTruthy()
        expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBeNull()
    })

    it('applique la couleur de chaque variante', () => {
        const { container, rerender } = render(<LogoMark variant="dark" />)
        expect(container.querySelector('svg')?.getAttribute('fill')).toBe('#EAE4DB')

        rerender(<LogoMark variant="light" />)
        expect(container.querySelector('svg')?.getAttribute('fill')).toBe('#0B0A09')

        rerender(<LogoMark variant="amber" />)
        expect(container.querySelector('svg')?.getAttribute('fill')).toBe('#F28A36')

        rerender(<LogoMark variant="current" />)
        expect(container.querySelector('svg')?.getAttribute('fill')).toBe('currentColor')
    })

    it('conserve la règle de remplissage, sans laquelle la marque se remplit', () => {
        const { container } = render(<LogoMark />)
        expect(container.querySelector('svg')?.getAttribute('fill-rule')).toBe('evenodd')
    })

    it('remonte la classe et la taille demandées', () => {
        const { container } = render(<LogoMark size={32} className="custom" />)
        const svg = container.querySelector('svg')
        expect(svg?.getAttribute('width')).toBe('32')
        expect(svg?.getAttribute('height')).toBe('32')
        expect(svg?.getAttribute('class')).toContain('custom')
        expect(svg?.getAttribute('class')).toContain('mr-logo-mark')
    })
})
