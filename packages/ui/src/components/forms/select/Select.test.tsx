import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { Select } from './Select'

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

describe('Select', () => {
    it('renders with default neutral tone and md size', () => {
        const view = render(
            <Select label="Country">
                <option value="fr">France</option>
                <option value="de">Germany</option>
            </Select>
        )
        const select = view.querySelector('select')
        expect(select?.getAttribute('data-tone')).toBe('neutral')
        expect(select?.getAttribute('data-size')).toBe('md')
        expect(select?.className).toContain('mr-select--neutral')
        expect(select?.className).toContain('mr-select--md')
        expect(select?.getAttribute('aria-invalid')).toBeNull()
        expect(select?.children.length).toBe(2)
        expect(view.querySelector('.mr-select-wrapper')?.getAttribute('data-size')).toBe('md')
    })

    it('maps disabled, required, invalid and error states', () => {
        const view = render(
            <Select label="City" disabled required invalid error="Required field">
                <option value="">Select...</option>
            </Select>
        )
        const select = view.querySelector('select')
        expect(select?.className).toContain('mr-select--disabled')
        expect(select?.className).toContain('mr-select--invalid')
        expect(select?.getAttribute('data-disabled')).toBe('true')
        expect(select?.getAttribute('data-required')).toBe('true')
        expect(select?.getAttribute('data-invalid')).toBe('true')
        expect(select?.getAttribute('aria-invalid')).toBe('true')
        expect(select?.disabled).toBe(true)
        expect(select?.required).toBe(true)
    })

    it('keeps native select semantics inside the styled wrapper', () => {
        const view = render(
            <Select data-testid="native-select">
                <option value="a">A</option>
            </Select>
        )
        const select = view.querySelector('select')
        const wrapper = view.querySelector('.mr-select-wrapper')
        expect(select?.tagName).toBe('SELECT')
        expect(wrapper?.querySelector('select')).toBe(select)
    })

    it('forwards ref to the native select element', () => {
        const ref = createRef<HTMLSelectElement>()
        render(
            <Select ref={ref}>
                <option>Test</option>
            </Select>
        )
        expect(ref.current?.tagName).toBe('SELECT')
    })

    it('connects hint and error via aria-describedby', () => {
        const view = render(
            <Select id="country" label="Country" hint="Choose one" error="Invalid">
                <option>Test</option>
            </Select>
        )
        const select = view.querySelector('select')
        expect(select?.getAttribute('aria-describedby')).toBe('country-hint country-error')
    })

    it('applies accent tone when specified', () => {
        const view = render(
            <Select tone="accent">
                <option>Test</option>
            </Select>
        )
        const select = view.querySelector('select')
        expect(select?.getAttribute('data-tone')).toBe('accent')
        expect(select?.className).toContain('mr-select--accent')
    })

    it('applies lg size when specified', () => {
        const view = render(
            <Select size="lg">
                <option>Test</option>
            </Select>
        )
        const select = view.querySelector('select')
        expect(select?.getAttribute('data-size')).toBe('lg')
        expect(select?.className).toContain('mr-select--lg')
    })
})
