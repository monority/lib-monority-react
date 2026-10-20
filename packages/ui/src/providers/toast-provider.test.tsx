import { act } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ToastContext } from '../contexts/toast-context'
import { ToastProvider } from './toast-provider'

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

function MountedReader({
    actions,
}: {
    actions: (ctx: {
        pushToast: (t: unknown) => string
        dismissToast: (id: string) => void
    }) => void
}) {
    return (
        <ToastProvider>
            <ToastContext.Consumer>
                {(ctx) => {
                    if (!ctx) return null
                    return (
                        <button
                            type="button"
                            data-testid="actions"
                            onClick={() =>
                                actions({
                                    pushToast: ctx.pushToast,
                                    dismissToast: ctx.dismissToast,
                                })
                            }
                        >
                            actions
                        </button>
                    )
                }}
            </ToastContext.Consumer>
        </ToastProvider>
    )
}

function clickActions(container: HTMLElement) {
    const button = container.querySelector('[data-testid="actions"]') as HTMLButtonElement
    act(() => {
        button.click()
    })
}

function getViewport(): HTMLElement | null {
    return document.querySelector('.mr-toast-viewport')
}

beforeEach(() => {
    vi.useFakeTimers()
})

afterEach(() => {
    vi.useRealTimers()
    act(() => {
        root?.unmount()
    })
    container?.remove()
    root = null
    container = null
})

describe('ToastProvider', () => {
    it('renders pushed toasts inside the viewport', () => {
        let container2: HTMLElement | null = null
        container2 = render(
            <MountedReader
                actions={({ pushToast }) => {
                    pushToast({ title: 'First', tone: 'success' })
                }}
            />
        )
        clickActions(container2)

        expect(getViewport()).not.toBeNull()
        expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(1)
        expect(getViewport()?.textContent).toContain('First')
    })

    it('supports several toasts simultaneously', () => {
        let container2: HTMLElement | null = null
        container2 = render(
            <MountedReader
                actions={({ pushToast }) => {
                    pushToast({ title: 'One' })
                    pushToast({ title: 'Two' })
                }}
            />
        )
        clickActions(container2)

        expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(2)
    })

    it('auto-dismisses each toast after its own duration with exit animation', () => {
        let container2: HTMLElement | null = null
        container2 = render(
            <MountedReader
                actions={({ pushToast }) => {
                    pushToast({ title: 'Short', duration: 1000 })
                    pushToast({ title: 'Long', duration: 5000 })
                }}
            />
        )
        clickActions(container2)
        expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(2)

        // Reach duration of short toast: starts exit animation
        act(() => {
            vi.advanceTimersByTime(1000)
        })
        const closingToast = Array.from(getViewport()?.querySelectorAll('.mr-toast') ?? []).find(
            (el) => el.getAttribute('data-state') === 'closed'
        )
        expect(closingToast).not.toBeUndefined()
        expect(closingToast?.textContent).toContain('Short')

        // Complete exit duration (150ms)
        act(() => {
            vi.advanceTimersByTime(150)
        })
        expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(1)
        expect(getViewport()?.textContent).toContain('Long')

        // Reach duration of long toast + exit duration
        act(() => {
            vi.advanceTimersByTime(4000)
        })
        act(() => {
            vi.advanceTimersByTime(150)
        })
        expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(0)
    })

    it('does not reset an existing countdown when another toast is pushed', () => {
        let pushedOnce = false
        let container2: HTMLElement | null = null
        container2 = render(
            <MountedReader
                actions={({ pushToast }) => {
                    if (!pushedOnce) {
                        pushToast({ title: 'First', duration: 2000 })
                        pushedOnce = true
                    } else {
                        pushToast({ title: 'Second', duration: 1000 })
                    }
                }}
            />
        )
        clickActions(container2)

        act(() => {
            vi.advanceTimersByTime(1500)
        })
        // Push a second toast mid-flight of the first countdown
        clickActions(container2)
        expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(2)

        // The first toast (2000ms) reaches its duration at +500ms and finishes exit at +150ms
        act(() => {
            vi.advanceTimersByTime(500)
        })
        act(() => {
            vi.advanceTimersByTime(150)
        })
        expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(1)
        expect(getViewport()?.textContent).toContain('Second')
    })

    it('dismisses manually via dismissToast or the close button with exit animation', () => {
        let container2: HTMLElement | null = null
        container2 = render(
            <MountedReader
                actions={({ pushToast }) => {
                    pushToast({ title: 'Sticky', duration: Number.POSITIVE_INFINITY })
                }}
            />
        )
        clickActions(container2)
        expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(1)

        const closeButton = getViewport()?.querySelector('button') as HTMLButtonElement
        act(() => {
            closeButton.click()
        })
        // Immediately enters closing state with animation
        expect(getViewport()?.querySelector('.mr-toast')?.getAttribute('data-state')).toBe('closed')
        expect(getViewport()?.querySelector('.mr-toast')?.hasAttribute('data-closing')).toBe(true)

        // Completes exit after duration
        act(() => {
            vi.advanceTimersByTime(150)
        })
        expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(0)
    })

    it('keeps duration=Number.POSITIVE_INFINITY toasts until manually dismissed', () => {
        let container2: HTMLElement | null = null
        container2 = render(
            <MountedReader
                actions={({ pushToast }) => {
                    pushToast({ title: 'Persistent', duration: Number.POSITIVE_INFINITY })
                }}
            />
        )
        clickActions(container2)

        act(() => {
            vi.advanceTimersByTime(60000)
        })
        expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(1)
    })
})
