import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CommandPalette } from './CommandPalette'

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

function fireInput(input: HTMLInputElement, value: string) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
    )?.set
    nativeInputValueSetter?.call(input, value)
    input.dispatchEvent(new Event('input', { bubbles: true }))
}

afterEach(() => {
    act(() => {
        root?.unmount()
    })
    container?.remove()
    document.body.style.overflow = ''
    root = null
    container = null
})

describe('CommandPalette', () => {
    const sampleItems = [
        {
            value: 'open-file',
            label: 'Open File',
            description: 'Open a file from disk',
            shortcut: 'Ctrl+O',
        },
        {
            value: 'save-file',
            label: 'Save File',
            description: 'Save current file',
            shortcut: 'Ctrl+S',
        },
        { value: 'new-file', label: 'New File', keywords: 'create document', shortcut: 'Ctrl+N' },
    ]

    it('renders nothing when closed', () => {
        render(<CommandPalette open={false} items={sampleItems} />)
        expect(document.body.querySelector('.mr-modal')).toBeNull()
    })

    it('renders when open', () => {
        render(<CommandPalette open items={sampleItems} />)
        const wrapper = document.body.querySelector('.mr-modal')
        expect(wrapper).not.toBeNull()
        expect(wrapper?.getAttribute('data-open')).toBe('true')
    })

    it('renders items', () => {
        render(<CommandPalette open items={sampleItems} />)
        const labels = document.body.querySelectorAll('.mr-command__item-label')
        expect(labels.length).toBe(3)
        expect(labels[0]?.textContent).toBe('Open File')
        expect(labels[1]?.textContent).toBe('Save File')
        expect(labels[2]?.textContent).toBe('New File')
    })

    it('filters by query', () => {
        render(<CommandPalette open items={sampleItems} />)
        const input = document.body.querySelector<HTMLInputElement>('input[type="text"]')
        act(() => {
            fireInput(input!, 'save')
        })
        const items = document.body.querySelectorAll('.mr-command__item')
        expect(items.length).toBe(1)
        expect(document.body.querySelector('.mr-command__item-label')?.textContent).toBe(
            'Save File'
        )
    })

    it('navigates with arrow keys', () => {
        render(<CommandPalette open items={sampleItems} />)
        const panel = document.body.querySelector('[role="dialog"]')
        act(() => {
            panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
        })
        const items = document.body.querySelectorAll('.mr-command__item')
        expect(items[0]?.getAttribute('aria-selected')).toBe('false')
        expect(items[1]?.getAttribute('aria-selected')).toBe('true')
    })

    it('selects with Enter', () => {
        const onSelect = vi.fn()
        const onClose = vi.fn()
        render(
            <CommandPalette
                open
                items={[{ value: 'test', label: 'Test', onSelect }]}
                onClose={onClose}
            />
        )
        const panel = document.body.querySelector('[role="dialog"]')
        act(() => {
            panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
        })
        expect(onSelect).toHaveBeenCalled()
        expect(onClose).toHaveBeenCalled()
    })

    it('shows empty label when no results', () => {
        render(<CommandPalette open items={sampleItems} emptyLabel="Nothing found" />)
        const input = document.body.querySelector<HTMLInputElement>('input[type="text"]')
        act(() => {
            fireInput(input!, 'zzzzz')
        })
        expect(document.body.querySelector('.mr-command__empty')?.textContent).toBe('Nothing found')
    })

    it('forwards ref to the root element', () => {
        const ref = createRef<HTMLDivElement>()
        render(<CommandPalette ref={ref} open items={sampleItems} />)
        expect(ref.current?.tagName).toBe('DIV')
        expect(ref.current?.className).toContain('mr-modal')
    })

    it('renders declarative compound subcomponents correctly', () => {
        const onSelect = vi.fn()
        const onClose = vi.fn()
        render(
            <CommandPalette open onClose={onClose}>
                <CommandPalette.Header>
                    <CommandPalette.Input placeholder="Search actions..." />
                </CommandPalette.Header>
                <CommandPalette.List>
                    <CommandPalette.Group heading="Navigation">
                        <CommandPalette.Item value="home" onSelect={onSelect}>
                            <CommandPalette.ItemLabel>Go Home</CommandPalette.ItemLabel>
                            <CommandPalette.ItemDescription>
                                Main dashboard
                            </CommandPalette.ItemDescription>
                            <CommandPalette.Shortcut>Cmd+H</CommandPalette.Shortcut>
                        </CommandPalette.Item>
                    </CommandPalette.Group>
                    <CommandPalette.Separator />
                    <CommandPalette.Empty>No results</CommandPalette.Empty>
                </CommandPalette.List>
            </CommandPalette>
        )

        expect(document.body.querySelector('.mr-command__header')).not.toBeNull()
        expect(document.body.querySelector('.mr-command__input')?.getAttribute('placeholder')).toBe(
            'Search actions...'
        )
        expect(document.body.querySelector('.mr-command__group-heading')?.textContent).toBe(
            'Navigation'
        )
        expect(document.body.querySelector('.mr-command__item-label')?.textContent).toBe('Go Home')
        expect(document.body.querySelector('.mr-command__item-description')?.textContent).toBe(
            'Main dashboard'
        )
        expect(document.body.querySelector('.mr-command__shortcut')?.textContent).toBe('Cmd+H')
        expect(document.body.querySelector('.mr-command__separator')).not.toBeNull()
        expect(document.body.querySelector('.mr-command__empty')?.textContent).toBe('No results')

        const item = document.body.querySelector<HTMLButtonElement>('.mr-command__item')
        act(() => {
            item?.click()
        })
        expect(onSelect).toHaveBeenCalled()
        expect(onClose).toHaveBeenCalled()
    })

    it('handles keyboard navigation with compound items', () => {
        const onSelect = vi.fn()
        render(
            <CommandPalette open>
                <CommandPalette.List>
                    <CommandPalette.Item value="first">
                        <CommandPalette.ItemLabel>First</CommandPalette.ItemLabel>
                    </CommandPalette.Item>
                    <CommandPalette.Item value="second" onSelect={onSelect}>
                        <CommandPalette.ItemLabel>Second</CommandPalette.ItemLabel>
                    </CommandPalette.Item>
                </CommandPalette.List>
            </CommandPalette>
        )

        const panel = document.body.querySelector('[role="dialog"]')
        const items = document.body.querySelectorAll('.mr-command__item')
        expect(items[0]?.getAttribute('aria-selected')).toBe('true')

        act(() => {
            panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
        })
        expect(items[0]?.getAttribute('aria-selected')).toBe('false')
        expect(items[1]?.getAttribute('aria-selected')).toBe('true')

        act(() => {
            panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
        })
        expect(onSelect).toHaveBeenCalled()
    })

    it('orchestre le cycle de sortie avec data-closing avant demontage', () => {
        vi.useFakeTimers()
        container = document.createElement('div')
        document.body.appendChild(container)
        root = createRoot(container)

        act(() => {
            root?.render(<CommandPalette open items={sampleItems} />)
        })

        expect(document.body.querySelector('.mr-command-palette')).not.toBeNull()

        act(() => {
            root?.render(<CommandPalette open={false} items={sampleItems} />)
        })

        // Reste dans le DOM pendant la sortie avec data-closing
        const closingPalette = document.body.querySelector('.mr-command-palette')
        expect(closingPalette).not.toBeNull()
        expect(closingPalette?.hasAttribute('data-closing')).toBe(true)

        // A la fin de l'animation de sortie (200ms)
        act(() => {
            vi.advanceTimersByTime(200)
        })

        expect(document.body.querySelector('.mr-command-palette')).toBeNull()
        vi.useRealTimers()
    })
})
