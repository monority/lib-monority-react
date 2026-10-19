import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { ColorSwatch } from './ColorSwatch'

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

describe('ColorSwatch', () => {
    it('renders the preview element with the given color value', () => {
        const view = render(<ColorSwatch value="#ff0000" />)
        const swatch = view.querySelector('.mr-color-swatch')
        const preview = view.querySelector('.mr-color-swatch__preview') as HTMLElement | null

        expect(swatch).not.toBeNull()
        expect(preview).not.toBeNull()
        expect(preview?.style.backgroundColor).toBe('rgb(255, 0, 0)')
    })

    it('sets default data-size and data-shape attributes', () => {
        const view = render(<ColorSwatch value="var(--mr-bg-canvas)" />)
        const swatch = view.querySelector('.mr-color-swatch')

        expect(swatch?.getAttribute('data-size')).toBe('md')
        expect(swatch?.getAttribute('data-shape')).toBe('rounded')
    })

    it('supports custom size and shape attributes', () => {
        const view = render(<ColorSwatch value="var(--mr-brand-solid)" size="lg" shape="circle" />)
        const swatch = view.querySelector('.mr-color-swatch')

        expect(swatch?.getAttribute('data-size')).toBe('lg')
        expect(swatch?.getAttribute('data-shape')).toBe('circle')
    })

    it('renders label and value when requested', () => {
        const view = render(<ColorSwatch value="#123456" label="Primary Brand" showValue />)
        const label = view.querySelector('.mr-color-swatch__label')
        const val = view.querySelector('.mr-color-swatch__value')

        expect(label?.textContent).toBe('Primary Brand')
        expect(val?.textContent).toBe('#123456')
    })

    it('applies accessible role and aria-label when no visible text is present', () => {
        const view = render(<ColorSwatch value="#00ff00" aria-label="Accent Green" />)
        const swatch = view.querySelector('.mr-color-swatch')

        expect(swatch?.getAttribute('role')).toBe('img')
        expect(swatch?.getAttribute('aria-label')).toBe('Accent Green')
    })

    it('forwards ref directly to root element', () => {
        const ref = createRef<HTMLSpanElement>()
        render(<ColorSwatch ref={ref} value="#ffffff" />)

        expect(ref.current).toBeInstanceOf(HTMLSpanElement)
        expect(ref.current?.classList.contains('mr-color-swatch')).toBe(true)
    })
})
