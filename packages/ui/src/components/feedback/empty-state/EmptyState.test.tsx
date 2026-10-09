import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { EmptyState } from './EmptyState'

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

describe('EmptyState', () => {
    it('renders title', () => {
        const view = render(<EmptyState title="Nothing here" />)
        expect(view.textContent).toContain('Nothing here')
        expect(view.querySelector('.mr-empty-state')?.getAttribute('role')).toBe('status')
    })

    it('renders description when provided', () => {
        const view = render(<EmptyState title="Empty" description="Add some items" />)
        expect(view.textContent).toContain('Add some items')
    })

    it('renders icon when provided', () => {
        const view = render(<EmptyState title="Empty" icon={<span>📦</span>} />)
        expect(view.querySelector('[aria-hidden="true"]')?.textContent).toBe('📦')
    })

    it('renders action buttons', () => {
        const view = render(<EmptyState title="Empty" action={<button>Add</button>} />)
        expect(view.querySelector('button')?.textContent).toBe('Add')
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>()
        render(<EmptyState ref={ref} title="Test" />)
        expect(ref.current?.tagName).toBe('DIV')
        expect(ref.current?.className).toContain('mr-empty-state')
    })

    it('renders loading state with aria-busy and spinner', () => {
        const view = render(<EmptyState state="loading" title="Chargement..." />)
        const el = view.querySelector('.mr-empty-state')
        expect(el?.getAttribute('aria-busy')).toBe('true')
        expect(view.querySelector('.mr-spinner')).not.toBeNull()
    })

    it('renders error state with role="alert"', () => {
        const view = render(<EmptyState state="error" title="Échec de synchronisation" />)
        const el = view.querySelector('.mr-empty-state')
        expect(el?.getAttribute('role')).toBe('alert')
        expect(el?.getAttribute('data-state')).toBe('error')
    })

    it('renders compound components declaratively', () => {
        const view = render(
            <EmptyState>
                <EmptyState.Icon>Icon</EmptyState.Icon>
                <EmptyState.Title>Titre vide</EmptyState.Title>
                <EmptyState.Description>Aucune donnée disponible</EmptyState.Description>
                <EmptyState.Actions>
                    <button type="button">Actualiser</button>
                </EmptyState.Actions>
            </EmptyState>
        )
        expect(view.querySelector('.mr-empty-state__title')?.textContent).toBe('Titre vide')
        expect(view.querySelector('.mr-empty-state__description')?.textContent).toBe(
            'Aucune donnée disponible'
        )
        expect(view.querySelector('.mr-empty-state__actions button')?.textContent).toBe(
            'Actualiser'
        )
    })
})
