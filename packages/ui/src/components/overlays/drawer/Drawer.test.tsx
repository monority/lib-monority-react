import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Drawer } from './Drawer'

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
    document.body.style.overflow = ''
    root = null
    container = null
    vi.useRealTimers()
})

describe('Drawer', () => {
    it('renders nothing when closed', () => {
        render(
            <Drawer open={false} title="Nav" onClose={vi.fn()}>
                Content
            </Drawer>
        )
        expect(document.body.querySelector('.mr-drawer__backdrop')).toBeNull()
    })

    it('renders when open', () => {
        render(
            <Drawer open title="Nav" onClose={vi.fn()}>
                Content
            </Drawer>
        )
        const backdrop = document.body.querySelector('.mr-drawer__backdrop')
        expect(backdrop).not.toBeNull()
        expect(backdrop?.getAttribute('data-open')).toBe('true')
    })

    it('renders title and children', () => {
        render(
            <Drawer open title="Settings" onClose={vi.fn()}>
                Body text
            </Drawer>
        )
        expect(document.body.querySelector('.mr-drawer__title')?.textContent).toBe('Settings')
        expect(document.body.querySelector('.mr-drawer__body')?.textContent).toBe('Body text')
    })

    it('applies side attribute', () => {
        render(
            <Drawer open title="Nav" side="left" onClose={vi.fn()}>
                X
            </Drawer>
        )
        const panel = document.body.querySelector('.mr-drawer__panel')
        expect(panel?.getAttribute('data-side')).toBe('left')
    })

    it('applies right side by default', () => {
        render(
            <Drawer open title="Nav" onClose={vi.fn()}>
                X
            </Drawer>
        )
        const panel = document.body.querySelector('.mr-drawer__panel')
        expect(panel?.getAttribute('data-side')).toBe('right')
    })

    it('calls onClose from backdrop click', () => {
        const onClose = vi.fn()
        render(
            <Drawer open title="Nav" onClose={onClose}>
                X
            </Drawer>
        )
        act(() => {
            document.body
                .querySelector('.mr-drawer__backdrop-surface')
                ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose from close button', () => {
        const onClose = vi.fn()
        render(
            <Drawer open title="Nav" onClose={onClose}>
                X
            </Drawer>
        )
        act(() => {
            document.body.querySelector<HTMLButtonElement>('[aria-label="Close panel"]')?.click()
        })
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('handles exit animation lifecycle when open changes to false', () => {
        vi.useFakeTimers()
        let isOpen = true
        function ControlledDrawer() {
            return (
                <Drawer
                    open={isOpen}
                    title="Nav"
                    onClose={() => {
                        isOpen = false
                    }}
                >
                    X
                </Drawer>
            )
        }
        render(<ControlledDrawer />)
        expect(document.body.querySelector('.mr-drawer__panel')).not.toBeNull()

        // Trigger close
        isOpen = false
        act(() => {
            root?.render(<ControlledDrawer />)
        })

        const closingPanel = document.body.querySelector('.mr-drawer__panel')
        expect(closingPanel).not.toBeNull()
        expect(closingPanel?.getAttribute('data-state')).toBe('closed')
        expect(closingPanel?.hasAttribute('data-closing')).toBe(true)

        // Advance through exit duration
        act(() => {
            vi.advanceTimersByTime(250)
        })

        expect(document.body.querySelector('.mr-drawer__panel')).toBeNull()
    })

    it('forwards ref to panel element', () => {
        const ref = createRef<HTMLDivElement>()
        render(
            <Drawer ref={ref} open title="Test" onClose={() => {}}>
                X
            </Drawer>
        )
        expect(ref.current?.tagName).toBe('DIV')
        expect(ref.current?.getAttribute('role')).toBe('dialog')
    })

    it('sets data-open on backdrop and panel', () => {
        render(
            <Drawer open title="Test" onClose={() => {}}>
                X
            </Drawer>
        )
        const backdrop = document.body.querySelector('.mr-drawer__backdrop')
        const panel = document.body.querySelector('.mr-drawer__panel')
        expect(backdrop?.getAttribute('data-open')).toBe('true')
        expect(panel?.getAttribute('data-open')).toBe('true')
    })

    it('accepts custom className', () => {
        render(
            <Drawer open title="Test" onClose={() => {}} className="custom">
                X
            </Drawer>
        )
        const backdrop = document.body.querySelector('.mr-drawer__backdrop')
        expect(backdrop?.className).toContain('custom')
    })

    it('renders compound subcomponents directly', () => {
        const onClose = vi.fn()
        render(
            <Drawer open onClose={onClose}>
                <Drawer.Header>
                    <Drawer.Title>Compound Drawer</Drawer.Title>
                    <Drawer.Description>Compound Details</Drawer.Description>
                    <Drawer.Close onClose={onClose}>Dismiss</Drawer.Close>
                </Drawer.Header>
                <Drawer.Body>Body text</Drawer.Body>
                <Drawer.Footer>
                    <button type="button">Action</button>
                </Drawer.Footer>
            </Drawer>
        )

        expect(document.body.querySelector('.mr-drawer__title')?.textContent).toBe(
            'Compound Drawer'
        )
        expect(document.body.querySelector('.mr-drawer__description')?.textContent).toBe(
            'Compound Details'
        )
        expect(document.body.querySelector('.mr-drawer__body')?.textContent).toBe('Body text')
        expect(document.body.querySelector('.mr-drawer__footer button')?.textContent).toBe('Action')

        act(() => {
            document.body.querySelector<HTMLButtonElement>('.mr-drawer__close')?.click()
        })
        expect(onClose).toHaveBeenCalledTimes(1)
    })
})
