import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { PageHeader } from './PageHeader'

let containerEl: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
    containerEl = document.createElement('div')
    document.body.appendChild(containerEl)
    root = createRoot(containerEl)
    act(() => root?.render(ui))
    return containerEl
}

afterEach(() => {
    act(() => root?.unmount())
    containerEl?.remove()
    root = null
    containerEl = null
})

describe('PageHeader', () => {
    it('renders children', () => {
        const view = render(
            <PageHeader>
                <h1>Title</h1>
            </PageHeader>
        )
        expect(view.querySelector('h1')?.textContent).toBe('Title')
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLElement>()
        render(<PageHeader ref={ref} />)
        expect(ref.current?.tagName).toBe('HEADER')
    })

    it('renders composable kicker, title, description and actions', () => {
        const view = render(
            <PageHeader>
                <PageHeader.Kicker>System / Core</PageHeader.Kicker>
                <PageHeader.Title as="h2">Release Overview</PageHeader.Title>
                <PageHeader.Description>Details of deployment</PageHeader.Description>
                <PageHeader.Actions>
                    <button type="button">Deploy</button>
                </PageHeader.Actions>
            </PageHeader>
        )

        const kicker = view.querySelector('.mr-page-header__kicker')
        expect(kicker?.textContent).toBe('System / Core')

        const title = view.querySelector('h2.mr-page-header__title')
        expect(title?.textContent).toBe('Release Overview')

        const desc = view.querySelector('.mr-page-header__description')
        expect(desc?.textContent).toBe('Details of deployment')

        const actions = view.querySelector('.mr-page-header__actions')
        expect(actions?.querySelector('button')?.textContent).toBe('Deploy')
    })
})
