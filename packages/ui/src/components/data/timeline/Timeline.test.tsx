import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
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
                extra: 'v1.0.0',
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

        const extra = itemElements[0]?.querySelector('.mr-timeline__extra')
        expect(extra?.textContent).toBe('v1.0.0')
    })

    it('renders with compound components and applies inherited status', () => {
        render(
            <Timeline orientation="horizontal" size="lg" lineStyle="dashed">
                <Timeline.Item status="warning">
                    <Timeline.Point variant="outline" />
                    <Timeline.Content>
                        <Timeline.Header>
                            <Timeline.Date>Hier</Timeline.Date>
                            <Timeline.Extra>Urgent</Timeline.Extra>
                        </Timeline.Header>
                        <Timeline.Title>Alerte de securite</Timeline.Title>
                        <Timeline.Description>Correctif requis</Timeline.Description>
                    </Timeline.Content>
                </Timeline.Item>
            </Timeline>
        )

        const list = document.body.querySelector('ol.mr-timeline')
        expect(list?.getAttribute('data-orientation')).toBe('horizontal')
        expect(list?.getAttribute('data-size')).toBe('lg')
        expect(list?.getAttribute('data-line-style')).toBe('dashed')

        const item = document.body.querySelector('li.mr-timeline__item')
        expect(item?.getAttribute('data-size')).toBe('lg')
        expect(item?.getAttribute('data-line-style')).toBe('dashed')

        const point = document.body.querySelector('.mr-timeline__point')
        expect(point?.getAttribute('data-status')).toBe('warning')
        expect(point?.getAttribute('data-variant')).toBe('outline')
        expect(point?.getAttribute('data-size')).toBe('lg')

        const header = document.body.querySelector('.mr-timeline__header')
        expect(header).not.toBeNull()

        const title = document.body.querySelector('h4.mr-timeline__title')
        expect(title?.textContent).toBe('Alerte de securite')

        const extra = document.body.querySelector('.mr-timeline__extra')
        expect(extra?.textContent).toBe('Urgent')
    })

    it('supports icons inside Timeline.Point and sets data-has-icon', () => {
        render(
            <Timeline>
                <Timeline.Item status="success">
                    <Timeline.Point icon={<span data-testid="test-icon">✓</span>} />
                    <Timeline.Content>
                        <Timeline.Title>Livraison effectuee</Timeline.Title>
                    </Timeline.Content>
                </Timeline.Item>
            </Timeline>
        )

        const point = document.body.querySelector('.mr-timeline__point')
        expect(point?.getAttribute('data-has-icon')).toBe('true')
        expect(document.body.querySelector('[data-testid="test-icon"]')).not.toBeNull()
    })

    it('handles interactive item clicks and keyboard activation', () => {
        const handleClick = vi.fn()

        render(
            <Timeline>
                <Timeline.Item interactive onClick={handleClick}>
                    <Timeline.Point status="primary" />
                    <Timeline.Content>
                        <Timeline.Title>Action cliquable</Timeline.Title>
                    </Timeline.Content>
                </Timeline.Item>
            </Timeline>
        )

        const item = document.body.querySelector('li.mr-timeline__item') as HTMLLIElement
        expect(item.getAttribute('data-interactive')).toBe('true')
        expect(item.getAttribute('role')).toBe('button')
        expect(item.tabIndex).toBe(0)

        act(() => {
            item.click()
        })
        expect(handleClick).toHaveBeenCalledTimes(1)

        act(() => {
            item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
        })
        expect(handleClick).toHaveBeenCalledTimes(2)

        act(() => {
            item.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
        })
        expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('forwards ref to all compound elements', () => {
        const refList = createRef<HTMLOListElement>()
        const refItem = createRef<HTMLLIElement>()
        const refPoint = createRef<HTMLSpanElement>()
        const refContent = createRef<HTMLDivElement>()
        const refHeader = createRef<HTMLDivElement>()
        const refDate = createRef<HTMLTimeElement>()
        const refTitle = createRef<HTMLHeadingElement>()
        const refDesc = createRef<HTMLParagraphElement>()
        const refExtra = createRef<HTMLDivElement>()

        render(
            <Timeline ref={refList}>
                <Timeline.Item ref={refItem}>
                    <Timeline.Point ref={refPoint} />
                    <Timeline.Content ref={refContent}>
                        <Timeline.Header ref={refHeader}>
                            <Timeline.Date ref={refDate}>10:00</Timeline.Date>
                            <Timeline.Extra ref={refExtra}>Info</Timeline.Extra>
                        </Timeline.Header>
                        <Timeline.Title ref={refTitle}>Etape</Timeline.Title>
                        <Timeline.Description ref={refDesc}>Detail</Timeline.Description>
                    </Timeline.Content>
                </Timeline.Item>
            </Timeline>
        )

        expect(refList.current).toBeInstanceOf(HTMLOListElement)
        expect(refItem.current).toBeInstanceOf(HTMLLIElement)
        expect(refPoint.current).toBeInstanceOf(HTMLSpanElement)
        expect(refContent.current).toBeInstanceOf(HTMLDivElement)
        expect(refHeader.current).toBeInstanceOf(HTMLDivElement)
        expect(refDate.current).toBeInstanceOf(HTMLTimeElement)
        expect(refTitle.current).toBeInstanceOf(HTMLHeadingElement)
        expect(refDesc.current).toBeInstanceOf(HTMLParagraphElement)
        expect(refExtra.current).toBeInstanceOf(HTMLDivElement)
    })
})
