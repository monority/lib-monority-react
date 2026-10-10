import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Timeline } from './Timeline'

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

describe('Timeline', () => {
    it('renders with declarative items prop', () => {
        const items = [
            {
                id: 1,
                date: '14h30',
                title: 'Deploiement',
                description: 'En ligne',
                status: 'success' as const,
            },
            { id: 2, date: '12h00', title: 'Revue de code', status: 'default' as const },
        ]

        render(<Timeline items={items} />)

        const list = document.body.querySelector('ol.mr-timeline')
        expect(list).not.toBeNull()
        expect(list?.getAttribute('data-orientation')).toBe('vertical')

        const itemElements = document.body.querySelectorAll('li.mr-timeline__item')
        expect(itemElements.length).toBe(2)
        expect(itemElements[0]?.getAttribute('data-status')).toBe('success')

        const point = itemElements[0]?.querySelector('.mr-timeline__point')
        expect(point?.getAttribute('data-status')).toBe('success')

        const date = itemElements[0]?.querySelector('time.mr-timeline__date')
        expect(date?.textContent).toBe('14h30')

        const title = itemElements[0]?.querySelector('h4.mr-timeline__title')
        expect(title?.textContent).toBe('Deploiement')

        const desc = itemElements[0]?.querySelector('p.mr-timeline__description')
        expect(desc?.textContent).toBe('En ligne')
    })

    it('renders with compound components and applies inherited status', () => {
        render(
            <Timeline orientation="horizontal">
                <Timeline.Item status="warning">
                    <Timeline.Point />
                    <Timeline.Content>
                        <Timeline.Date>Hier</Timeline.Date>
                        <Timeline.Title>Alerte de securite</Timeline.Title>
                        <Timeline.Description>Correctif requis</Timeline.Description>
                    </Timeline.Content>
                </Timeline.Item>
            </Timeline>
        )

        const list = document.body.querySelector('ol.mr-timeline')
        expect(list?.getAttribute('data-orientation')).toBe('horizontal')

        const point = document.body.querySelector('.mr-timeline__point')
        expect(point?.getAttribute('data-status')).toBe('warning')

        const title = document.body.querySelector('h4.mr-timeline__title')
        expect(title?.textContent).toBe('Alerte de securite')
    })

    it('forwards ref to the ol element', () => {
        const ref = createRef<HTMLOListElement>()
        render(<Timeline ref={ref} />)
        expect(ref.current).toBeInstanceOf(HTMLOListElement)
        expect(ref.current?.classList.contains('mr-timeline')).toBe(true)
    })
})
