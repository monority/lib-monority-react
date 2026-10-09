import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { SidebarLayout } from './SidebarLayout'

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

describe('SidebarLayout', () => {
    it('renders sidebar and children', () => {
        const view = render(
            <SidebarLayout sidebar={<nav>Sidebar</nav>}>
                <main>Content</main>
            </SidebarLayout>
        )
        expect(view.querySelector('aside')?.textContent).toBe('Sidebar')
        expect(view.querySelector('.mr-sidebar-layout__content')?.textContent).toBe('Content')
    })

    it('renders header when provided', () => {
        const view = render(<SidebarLayout header={<div>Header</div>}>Content</SidebarLayout>)
        expect(view.querySelector('.mr-sidebar-layout__header')?.textContent).toBe('Header')
    })

    it('does not render header when absent', () => {
        const view = render(<SidebarLayout>Content</SidebarLayout>)
        expect(view.querySelector('.mr-sidebar-layout__header')).toBeNull()
    })

    it('applies default md width', () => {
        const view = render(<SidebarLayout />)
        expect(view.querySelector('div')?.getAttribute('data-sidebar-width')).toBe('md')
    })

    it('applies sm width', () => {
        const view = render(<SidebarLayout sidebarWidth="sm" />)
        expect(view.querySelector('div')?.getAttribute('data-sidebar-width')).toBe('sm')
    })

    it('applies lg width', () => {
        const view = render(<SidebarLayout sidebarWidth="lg" />)
        expect(view.querySelector('div')?.getAttribute('data-sidebar-width')).toBe('lg')
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>()
        render(<SidebarLayout ref={ref} />)
        expect(ref.current?.tagName).toBe('DIV')
    })

    it('supports collapsible mode with toggle button', () => {
        const onOpenChange = vi.fn()
        const view = render(
            <SidebarLayout
                collapsible
                defaultOpen={true}
                onOpenChange={onOpenChange}
                sidebar={<nav>Nav</nav>}
            >
                Main
            </SidebarLayout>
        )
        const toggleBtn = view.querySelector('.mr-sidebar-layout__toggle') as HTMLButtonElement
        expect(toggleBtn).not.toBeNull()
        expect(view.querySelector('.mr-sidebar-layout')?.getAttribute('data-collapsed')).toBeNull()

        act(() => {
            toggleBtn.click()
        })
        expect(view.querySelector('.mr-sidebar-layout')?.getAttribute('data-collapsed')).toBe(
            'true'
        )
        expect(onOpenChange).toHaveBeenCalledWith(false)
    })
})
