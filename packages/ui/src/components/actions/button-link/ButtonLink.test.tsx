import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ButtonLink } from './ButtonLink'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)

    act(() => {
        root?.render(ui)
    })

    return container
}

afterEach(() => {
    act(() => {
        root?.unmount()
    })
    container?.remove()
    root = null
    container = null
})

describe('ButtonLink', () => {
    it('renders an anchor with default attributes and styling', () => {
        const view = render(<ButtonLink href="/dashboard">Aller au tableau de bord</ButtonLink>)
        const link = view.querySelector('a')

        expect(link).toBeTruthy()
        expect(link?.getAttribute('href')).toBe('/dashboard')
        expect(link?.textContent).toBe('Aller au tableau de bord')
        expect(link?.getAttribute('data-variant')).toBe('secondary')
        expect(link?.getAttribute('data-size')).toBe('md')
        expect(link?.className).toContain('mr-btn')
    })

    it('maps variant, size, and fullWidth to data attributes', () => {
        const view = render(
            <ButtonLink href="/settings" variant="primary" size="lg" fullWidth>
                Paramètres
            </ButtonLink>
        )
        const link = view.querySelector('a')

        expect(link?.getAttribute('data-variant')).toBe('primary')
        expect(link?.getAttribute('data-size')).toBe('lg')
        expect(link?.getAttribute('data-full-width')).toBe('true')
    })

    it('handles disabled state and prevents click interaction', () => {
        const handleClick = vi.fn()
        const view = render(
            <ButtonLink href="/profile" disabled onClick={handleClick}>
                Profil
            </ButtonLink>
        )
        const link = view.querySelector('a')

        expect(link?.getAttribute('aria-disabled')).toBe('true')
        expect(link?.getAttribute('data-disabled')).toBe('true')

        const event = new MouseEvent('click', { bubbles: true, cancelable: true })
        act(() => {
            link?.dispatchEvent(event)
        })

        expect(event.defaultPrevented).toBe(true)
        expect(handleClick).not.toHaveBeenCalled()
    })

    it('handles loading state and prevents click interaction', () => {
        const handleClick = vi.fn()
        const view = render(
            <ButtonLink href="/export" loading onClick={handleClick}>
                Exporter
            </ButtonLink>
        )
        const link = view.querySelector('a')

        expect(link?.getAttribute('aria-busy')).toBe('true')
        expect(link?.getAttribute('aria-disabled')).toBe('true')
        expect(link?.getAttribute('data-loading')).toBe('true')
        expect(link?.getAttribute('data-disabled')).toBe('true')

        const event = new MouseEvent('click', { bubbles: true, cancelable: true })
        act(() => {
            link?.dispatchEvent(event)
        })

        expect(event.defaultPrevented).toBe(true)
        expect(handleClick).not.toHaveBeenCalled()
    })

    it('renders leading and trailing icons with label', () => {
        const view = render(
            <ButtonLink
                href="/docs"
                iconLeading={<span data-testid="leading">L</span>}
                iconTrailing={<span data-testid="trailing">T</span>}
            >
                Documentation
            </ButtonLink>
        )

        expect(view.querySelector('[data-testid="leading"]')).toBeTruthy()
        expect(view.querySelector('[data-testid="trailing"]')).toBeTruthy()
        expect(view.querySelector('.mr-btn__label')?.textContent).toBe('Documentation')
    })

    it('forwards ref to the native anchor element', () => {
        let anchorRef: HTMLAnchorElement | null = null
        render(
            <ButtonLink
                href="/help"
                ref={(node) => {
                    anchorRef = node
                }}
            >
                Aide
            </ButtonLink>
        )

        expect(anchorRef).toBeInstanceOf(HTMLAnchorElement)
        expect(anchorRef?.getAttribute('href')).toBe('/help')
    })

    it('prevents Enter keydown when disabled', () => {
        const handleKeyDown = vi.fn()
        const view = render(
            <ButtonLink href="/locked" disabled onKeyDown={handleKeyDown}>
                Verrouillé
            </ButtonLink>
        )
        const link = view.querySelector('a')

        const event = new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true,
            cancelable: true,
        })
        act(() => {
            link?.dispatchEvent(event)
        })

        expect(event.defaultPrevented).toBe(true)
        expect(handleKeyDown).not.toHaveBeenCalled()
    })
})
