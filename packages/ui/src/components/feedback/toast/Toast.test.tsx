import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Toast } from './Toast'

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

describe('Toast', () => {
    it('renders title', () => {
        const view = render(<Toast title="Saved" />)
        expect(view.querySelector('.mr-toast__title')?.textContent).toBe('Saved')
    })

    it('renders description', () => {
        const view = render(<Toast title="Done" description="File uploaded" />)
        expect(view.querySelector('.mr-toast__description')?.textContent).toBe('File uploaded')
    })

    it('renders close button when onClose is provided', () => {
        const view = render(<Toast title="Info" onClose={() => {}} />)
        expect(view.querySelector('button')).not.toBeNull()
    })

    it('applies tone data-*', () => {
        const view = render(<Toast tone="success" title="OK" />)
        const el = view.querySelector('div')
        expect(el?.getAttribute('data-tone')).toBe('success')
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>()
        render(<Toast ref={ref} title="Test" />)
        expect(ref.current?.tagName).toBe('DIV')
        expect(ref.current?.className).toContain('mr-toast')
    })

    it('calls onOpenChange on close button click', () => {
        let openState: boolean | undefined = true
        const view = render(
            <Toast
                title="Test"
                onOpenChange={(open) => {
                    openState = open
                }}
            />
        )
        const closeBtn = view.querySelector('button') as HTMLButtonElement
        expect(closeBtn).not.toBeNull()
        act(() => {
            closeBtn.click()
        })
        expect(openState).toBe(false)
    })

    it('renders compound components declaratively', () => {
        const view = render(
            <Toast tone="info">
                <Toast.Icon>
                    <span data-testid="custom-icon">★</span>
                </Toast.Icon>
                <Toast.Title>Notification</Toast.Title>
                <Toast.Description>Synchronisation terminée</Toast.Description>
            </Toast>
        )
        expect(view.querySelector('.mr-toast__title')?.textContent).toBe('Notification')
        expect(view.querySelector('.mr-toast__description')?.textContent).toBe(
            'Synchronisation terminée'
        )
        expect(view.querySelector('[data-testid="custom-icon"]')).not.toBeNull()
    })

    it('renders default tone icon when structured props are used', () => {
        const view = render(<Toast tone="success" title="Bravo" />)
        const iconEl = view.querySelector('.mr-toast__icon')
        expect(iconEl).not.toBeNull()
        expect(iconEl?.querySelector('svg')).not.toBeNull()
    })
})

