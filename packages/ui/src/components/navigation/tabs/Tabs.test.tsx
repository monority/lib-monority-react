import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Tabs } from './Tabs'

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

const items = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3' },
]

describe('Tabs', () => {
    it('renders with default neutral tone and md size', () => {
        const view = render(<Tabs items={items} value="tab1" onChange={() => {}} />)
        const tablist = view.querySelector('[role="tablist"]')
        expect(tablist?.getAttribute('data-tone')).toBe('neutral')
        expect(tablist?.getAttribute('data-size')).toBe('md')
        expect(tablist?.className).toContain('mr-tabs--neutral')
        expect(tablist?.className).toContain('mr-tabs--md')
        expect(tablist?.getAttribute('aria-label')).toBe('Tabs')
        expect(view.querySelectorAll('[role="tab"]').length).toBe(3)
    })

    it('marks the active tab with aria-selected and data-active', () => {
        const view = render(<Tabs items={items} value="tab2" onChange={() => {}} />)
        const tabs = view.querySelectorAll('[role="tab"]')
        expect(tabs[0].getAttribute('aria-selected')).toBe('false')
        expect(tabs[1].getAttribute('aria-selected')).toBe('true')
        expect(tabs[2].getAttribute('aria-selected')).toBe('false')
        expect(tabs[1].className).toContain('mr-tabs__tab--active')
        expect(tabs[1].getAttribute('data-active')).toBe('true')
        expect(tabs[1].getAttribute('tabindex')).toBe('0')
        expect(tabs[0].getAttribute('tabindex')).toBe('-1')
        expect(tabs[0].getAttribute('data-active')).toBeNull()
    })

    it('maps disabled and fullWidth states', () => {
        const view = render(
            <Tabs items={items} value="tab1" onChange={() => {}} disabled fullWidth />
        )
        const tablist = view.querySelector('[role="tablist"]')
        expect(tablist?.className).toContain('mr-tabs--disabled')
        expect(tablist?.className).toContain('mr-tabs--full-width')
        expect(tablist?.getAttribute('data-disabled')).toBe('true')
        expect(tablist?.getAttribute('data-full-width')).toBe('true')
        view.querySelectorAll('[role="tab"]').forEach((tab) => {
            expect(tab.getAttribute('data-disabled')).toBe('true')
            expect((tab as HTMLButtonElement).disabled).toBe(true)
        })
    })

    it('fires onChange when a tab is clicked', () => {
        let selected = 'tab1'
        const handleChange = (value: string) => {
            selected = value
        }
        const view = render(<Tabs items={items} value="tab1" onChange={handleChange} />)
        act(() => {
            ;(view.querySelectorAll('[role="tab"]')[2] as HTMLButtonElement).click()
        })
        expect(selected).toBe('tab3')
    })

    it('applies accent tone when specified', () => {
        const view = render(<Tabs items={items} value="tab1" onChange={() => {}} tone="accent" />)
        expect(view.querySelector('[role="tablist"]')?.getAttribute('data-tone')).toBe('accent')
        expect(view.querySelector('[role="tablist"]')?.className).toContain('mr-tabs--accent')
    })

    it('applies lg size when specified', () => {
        const view = render(<Tabs items={items} value="tab1" onChange={() => {}} size="lg" />)
        expect(view.querySelector('[role="tablist"]')?.getAttribute('data-size')).toBe('lg')
        expect(view.querySelector('[role="tablist"]')?.className).toContain('mr-tabs--lg')
    })

    it('forwards ref to the tablist div', () => {
        const ref = createRef<HTMLDivElement>()
        render(<Tabs ref={ref} items={items} value="tab1" onChange={() => {}} />)
        expect(ref.current?.tagName).toBe('DIV')
        expect(ref.current?.getAttribute('role')).toBe('tablist')
    })

    it('supports keyboard navigation with ArrowRight', () => {
        let selected = 'tab1'
        const view = render(
            <Tabs
                items={items}
                value="tab1"
                onChange={(v) => {
                    selected = v
                }}
            />
        )
        act(() => {
            view.querySelectorAll('[role="tab"]')[0].dispatchEvent(
                new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
            )
        })
        expect(selected).toBe('tab2')
    })

    it('allows overriding aria-label', () => {
        const view = render(
            <Tabs items={items} value="tab1" onChange={() => {}} aria-label="Custom" />
        )
        expect(view.querySelector('[role="tablist"]')?.getAttribute('aria-label')).toBe('Custom')
    })

    it('navigates left with ArrowLeft', () => {
        let selected = 'tab1'
        const view = render(
            <Tabs
                items={items}
                value="tab1"
                onChange={(v) => {
                    selected = v
                }}
            />
        )
        act(() => {
            view.querySelectorAll('[role="tab"]')[0].dispatchEvent(
                new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
            )
        })
        expect(selected).toBe('tab3') // wraps to last
    })

    it('navigates to first tab with Home', () => {
        let selected = 'tab3'
        const view = render(
            <Tabs
                items={items}
                value="tab3"
                onChange={(v) => {
                    selected = v
                }}
            />
        )
        act(() => {
            view.querySelectorAll('[role="tab"]')[2].dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
            )
        })
        expect(selected).toBe('tab1')
    })

    it('navigates to last tab with End', () => {
        let selected = 'tab1'
        const view = render(
            <Tabs
                items={items}
                value="tab1"
                onChange={(v) => {
                    selected = v
                }}
            />
        )
        act(() => {
            view.querySelectorAll('[role="tab"]')[0].dispatchEvent(
                new KeyboardEvent('keydown', { key: 'End', bubbles: true })
            )
        })
        expect(selected).toBe('tab3')
    })

    it('supports uncontrolled usage with defaultValue', () => {
        const view = render(<Tabs items={items} defaultValue="tab2" />)
        const tabs = view.querySelectorAll('[role="tab"]')
        expect(tabs[1].getAttribute('aria-selected')).toBe('true')
        act(() => {
            tabs[2].dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })
        const updated = view.querySelectorAll('[role="tab"]')
        expect(updated[2].getAttribute('aria-selected')).toBe('true')
        expect(updated[1].getAttribute('aria-selected')).toBe('false')
    })

    it('defaults to the first item without value props', () => {
        const view = render(<Tabs items={items} />)
        const tabs = view.querySelectorAll('[role="tab"]')
        expect(tabs[0].getAttribute('aria-selected')).toBe('true')
    })

    it('does not reference missing panels via aria-controls', () => {
        const view = render(<Tabs items={items} value="tab1" onChange={() => {}} />)
        view.querySelectorAll('[role="tab"]').forEach((tab) => {
            expect(tab.getAttribute('aria-controls')).toBeNull()
        })
    })
})
