import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Card } from './Card'

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

describe('Card', () => {
    it('renders with default padding hooks', () => {
        const view = render(<Card>Content</Card>)
        const card = view.querySelector('div')

        expect(card?.textContent).toBe('Content')
        expect(card?.className).toContain('mr-card')
        expect(card?.getAttribute('data-padding')).toBe('md')
    })

    it('maps padding and interactive state to stable hooks and a11y', () => {
        const view = render(
            <Card padding="lg" interactive>
                Feature
            </Card>
        )
        const card = view.querySelector('div')

        expect(card?.getAttribute('data-padding')).toBe('lg')
        expect(card?.getAttribute('data-interactive')).toBe('true')
        expect(card?.getAttribute('role')).toBe('button')
        expect(card?.getAttribute('tabindex')).toBe('0')
    })

    it('forwards ref to the root div element', () => {
        const ref = createRef<HTMLDivElement>()
        render(<Card ref={ref}>Content</Card>)
        expect(ref.current?.tagName).toBe('DIV')
        expect(ref.current?.className).toContain('mr-card')
    })

    it('renders with padding="sm"', () => {
        const view = render(<Card padding="sm">Content</Card>)
        const card = view.querySelector('div')
        expect(card?.getAttribute('data-padding')).toBe('sm')
    })

    it('passes className to the root', () => {
        const view = render(<Card className="custom">Content</Card>)
        const card = view.querySelector('div')
        expect(card?.className).toContain('custom')
    })

    it('renders compound subcomponents correctly', () => {
        const view = render(
            <Card>
                <Card.Header>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Description>Card Description</Card.Description>
                </Card.Header>
                <Card.Content>
                    <span>Card Body Content</span>
                </Card.Content>
                <Card.Footer>
                    <span>Card Footer Content</span>
                </Card.Footer>
            </Card>
        )

        expect(view.querySelector('.mr-card__header')).not.toBeNull()
        expect(view.querySelector('.mr-card__title')?.textContent).toBe('Card Title')
        expect(view.querySelector('.mr-card__description')?.textContent).toBe('Card Description')
        expect(view.querySelector('.mr-card__content')?.textContent).toBe('Card Body Content')
        expect(view.querySelector('.mr-card__footer')?.textContent).toBe('Card Footer Content')
    })
})
