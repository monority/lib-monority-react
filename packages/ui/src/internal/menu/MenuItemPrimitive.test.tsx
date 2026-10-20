import { act } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MenuItemPrimitive, MenuLabelPrimitive, MenuSeparatorPrimitive } from './MenuItemPrimitive'

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

describe('MenuItemPrimitive', () => {
    it('renders accessible menuitem button with label, icon and shortcut', () => {
        const onSelect = vi.fn()
        const onItemClick = vi.fn()

        const el = render(
            <MenuItemPrimitive
                value="edit"
                icon={<span data-testid="icon">E</span>}
                shortcut="Cmd+E"
                classPrefix="mr-dropdown"
                onSelect={onSelect}
                onItemClick={onItemClick}
            >
                Edit
            </MenuItemPrimitive>
        )

        const item = el.querySelector<HTMLButtonElement>('[role="menuitem"]')
        expect(item).not.toBeNull()
        expect(item?.className).toContain('mr-dropdown__item')
        expect(el.querySelector('[data-testid="icon"]')).not.toBeNull()
        expect(el.textContent).toContain('Edit')
        expect(el.textContent).toContain('Cmd+E')

        act(() => {
            item?.click()
        })
        expect(onSelect).toHaveBeenCalledWith('edit')
        expect(onItemClick).toHaveBeenCalledTimes(1)
    })

    it('supports danger modifier', () => {
        const el = render(
            <MenuItemPrimitive danger classPrefix="mr-context-menu">
                Delete
            </MenuItemPrimitive>
        )
        const item = el.querySelector<HTMLButtonElement>('[role="menuitem"]')
        expect(item?.className).toContain('mr-context-menu__item')
        expect(item?.className).toContain('is-danger')
    })

    it('renders separator and label primitives with classPrefix', () => {
        const el = render(
            <div>
                <MenuLabelPrimitive classPrefix="mr-dropdown">Options</MenuLabelPrimitive>
                <MenuSeparatorPrimitive classPrefix="mr-dropdown" />
            </div>
        )
        const label = el.querySelector('.mr-dropdown__label')
        const sep = el.querySelector('[role="separator"]')
        expect(label?.textContent).toBe('Options')
        expect(sep?.className).toContain('mr-dropdown__separator')
    })
})
