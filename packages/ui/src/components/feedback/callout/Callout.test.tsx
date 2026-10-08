import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Callout } from './Callout'

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
    try {
        act(() => {
            root?.unmount()
        })
    } catch {}
    container?.remove()
    root = null
    container = null
})

describe('Callout', () => {
    it('renders title', () => {
        const view = render(<Callout title="Note" />)
        expect(view.querySelector('.mr-callout__title')?.textContent).toBe('Note')
    })

    it('renders description', () => {
        const view = render(<Callout description="Details" />)
        expect(view.querySelector('.mr-callout__description')?.textContent).toBe('Details')
    })

    it('renders children', () => {
        const view = render(
            <Callout>
                <span>extra</span>
            </Callout>
        )
        expect(view.querySelector('span')?.textContent).toBe('extra')
    })

    it('applies tone', () => {
        const view = render(<Callout tone="warning" title="Caution" />)
        const el = view.querySelector('div')
        expect(el?.getAttribute('data-tone')).toBe('warning')
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>()
        render(<Callout ref={ref} title="Test" />)
        expect(ref.current?.tagName).toBe('DIV')
        expect(ref.current?.className).toContain('mr-callout')
    })

    it('has default role="note"', () => {
        const view = render(<Callout title="Note" />)
        const el = view.querySelector('[role]')
        expect(el?.getAttribute('role')).toBe('note')
    })

    it('accepts custom role', () => {
        const view = render(<Callout title="Alert" role="alert" />)
        const el = view.querySelector('[role]')
        expect(el?.getAttribute('role')).toBe('alert')
    })

    it('renders title and description with tone', () => {
        const view = render(
            <Callout title="Warning" description="Proceed with caution" tone="warning" />
        )
        expect(view.querySelector('.mr-callout__title')?.textContent).toBe('Warning')
        expect(view.querySelector('.mr-callout__description')?.textContent).toBe(
            'Proceed with caution'
        )
    })

    it('supports size="sm"', () => {
        const view = render(<Callout size="sm" title="Compact" />)
        expect(view.querySelector('.mr-callout')?.getAttribute('data-size')).toBe('sm')
    })

    it('renders compound components declaratively', () => {
        const view = render(
            <Callout tone="info">
                <Callout.Title>Titre composé</Callout.Title>
                <Callout.Description>Description composée</Callout.Description>
            </Callout>
        )
        expect(view.querySelector('.mr-callout__title')?.textContent).toBe('Titre composé')
        expect(view.querySelector('.mr-callout__description')?.textContent).toBe(
            'Description composée'
        )
    })

    it.each(['neutral', 'accent', 'info', 'success', 'warning', 'danger'] as const)(
        'sets data-tone="%s" for tone="%s"',
        (tone) => {
            const view = render(<Callout tone={tone} title="Test" />)
            expect(view.querySelector('div')?.getAttribute('data-tone')).toBe(tone)
        }
    )

    it('renders a tone-specific icon by default and allows custom icon', () => {
        const view = render(<Callout tone="success" title="Bravo" />)
        const iconEl = view.querySelector('.mr-callout__icon')
        expect(iconEl).not.toBeNull()
        expect(iconEl?.querySelector('svg')).not.toBeNull()

        const custom = render(
            <Callout title="Custom" icon={<span data-testid="custom-callout-icon">★</span>} />
        )
        expect(custom.querySelector('[data-testid="custom-callout-icon"]')).not.toBeNull()
    })
})
