import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { Topbar } from './Topbar'

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

describe('Topbar', () => {
    it('renders children', () => {
        const view = render(
            <Topbar>
                <span>Logo</span>
            </Topbar>
        )
        expect(view.querySelector('span')?.textContent).toBe('Logo')
    })

    it('renders as header element', () => {
        const view = render(<Topbar />)
        expect(view.querySelector('header')).not.toBeNull()
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLElement>()
        render(<Topbar ref={ref} />)
        expect(ref.current?.tagName).toBe('HEADER')
    })

    it('renders composable brand, navigation, link and actions', () => {
        const view = render(
            <Topbar>
                <Topbar.Brand>
                    <Topbar.BrandMark>M</Topbar.BrandMark>
                    <span>My App</span>
                </Topbar.Brand>
                <Topbar.Nav aria-label="Menu principal">
                    <Topbar.Link href="/home" active>
                        Accueil
                    </Topbar.Link>
                    <Topbar.Link href="/about">À propos</Topbar.Link>
                </Topbar.Nav>
                <Topbar.Status tone="success">En ligne</Topbar.Status>
                <Topbar.Actions>
                    <button type="button">Action</button>
                </Topbar.Actions>
            </Topbar>
        )

        const brand = view.querySelector('.mr-topbar__brand')
        expect(brand).not.toBeNull()
        expect(brand?.textContent).toContain('My App')

        const brandMark = view.querySelector('.mr-topbar__brand-mark')
        expect(brandMark?.textContent).toBe('M')

        const nav = view.querySelector('nav.mr-topbar__navigation')
        expect(nav?.getAttribute('aria-label')).toBe('Menu principal')

        const links = view.querySelectorAll('a.mr-topbar__link')
        expect(links.length).toBe(2)
        expect(links[0]?.getAttribute('aria-current')).toBe('page')
        expect(links[0]?.getAttribute('data-active')).toBe('true')
        expect(links[1]?.getAttribute('aria-current')).toBeNull()

        const status = view.querySelector('.mr-topbar__status')
        expect(status?.getAttribute('data-tone')).toBe('success')
        expect(status?.textContent).toContain('En ligne')

        const actions = view.querySelector('.mr-topbar__actions')
        expect(actions?.querySelector('button')).not.toBeNull()
    })
})
