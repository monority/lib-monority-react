import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
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

    it('does not render when open={false}', () => {
        const view = render(<Toast open={false} title="Hidden" />)
        expect(view.querySelector('.mr-toast')).toBeNull()
    })

    it('renders and applies data-state="open" when open={true}', () => {
        const view = render(<Toast open={true} title="Visible" />)
        const el = view.querySelector('.mr-toast')
        expect(el).not.toBeNull()
        expect(el?.getAttribute('data-state')).toBe('open')
    })

    it('manages exit animation and calls onExitComplete when open changes to false', () => {
        vi.useFakeTimers()
        const onExitComplete = vi.fn()
        let isOpen = true

        function ControlledToast() {
            return (
                <Toast
                    open={isOpen}
                    title="Alert"
                    onClose={() => {
                        isOpen = false
                    }}
                    onExitComplete={onExitComplete}
                />
            )
        }

        render(<ControlledToast />)
        expect(document.body.querySelector('.mr-toast')).not.toBeNull()

        // Switch to closed
        isOpen = false
        act(() => {
            root?.render(<ControlledToast />)
        })

        const closingToast = document.body.querySelector('.mr-toast')
        expect(closingToast).not.toBeNull()
        expect(closingToast?.getAttribute('data-state')).toBe('closed')
        expect(closingToast?.hasAttribute('data-closing')).toBe(true)
        expect(onExitComplete).not.toHaveBeenCalled()

        // Advance through exit duration (150ms)
        act(() => {
            vi.advanceTimersByTime(150)
        })

        expect(document.body.querySelector('.mr-toast')).toBeNull()
        expect(onExitComplete).toHaveBeenCalledTimes(1)
        vi.useRealTimers()
    })
})
