import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { StatCard } from './StatCard'

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

describe('StatCard', () => {
    it('renders label and value', () => {
        const view = render(<StatCard label="Revenue" value="$10k" />)
        expect(view.textContent).toContain('Revenue')
        expect(view.textContent).toContain('$10k')
    })

    it('renders trend when provided', () => {
        const view = render(<StatCard label="Sales" value="100" trend="+12%" />)
        expect(view.textContent).toContain('+12%')
        expect(view.querySelector('.mr-stat-card__trend')?.getAttribute('data-trend-tone')).toBe(
            'neutral'
        )
    })

    it('keeps the trend at the header-end edge after an optional icon', () => {
        const view = render(
            <StatCard label="Revenue" value="$12k" trend="8.4%" icon={<span>icon</span>} />
        )
        const headerEnd = view.querySelector('.mr-stat-card__header-end')
        const trend = view.querySelector('.mr-stat-card__trend')
        expect(headerEnd?.contains(trend)).toBe(true)
        expect(headerEnd?.lastElementChild).toBe(trend)
    })

    it('marks the value for styling hooks', () => {
        const view = render(<StatCard label="Sales" value="100" />)
        expect(view.querySelector('.mr-stat-card__value')?.textContent).toBe('100')
    })

    it('renders icon when provided', () => {
        const view = render(<StatCard label="Orders" value="5" icon={<span>icon</span>} />)
        expect(view.querySelector('[aria-hidden="true"]')).toBeTruthy()
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>()
        render(<StatCard ref={ref} label="Test" value="0" />)
        expect(ref.current?.className).toContain('mr-stat-card')
    })

    it('supports declarative compound composition', () => {
        const view = render(
            <StatCard>
                <StatCard.Header>
                    <StatCard.Label>Active Users</StatCard.Label>
                    <StatCard.HeaderEnd>
                        <StatCard.Trend tone="success">+15%</StatCard.Trend>
                    </StatCard.HeaderEnd>
                </StatCard.Header>
                <StatCard.Metric>
                    <StatCard.Value>1,420</StatCard.Value>
                </StatCard.Metric>
                <StatCard.Description>Monthly active subscribers</StatCard.Description>
                <StatCard.Footer>Live synced</StatCard.Footer>
            </StatCard>
        )
        expect(view.querySelector('.mr-stat-card__label')?.textContent).toBe('Active Users')
        expect(view.querySelector('.mr-stat-card__value')?.textContent).toBe('1,420')
        expect(view.querySelector('.mr-stat-card__trend')?.textContent).toContain('+15%')
        expect(view.querySelector('.mr-stat-card__trend')?.getAttribute('data-trend-tone')).toBe(
            'success'
        )
        expect(view.querySelector('.mr-stat-card__description')?.textContent).toBe(
            'Monthly active subscribers'
        )
        expect(view.querySelector('.mr-stat-card__footer')?.textContent).toBe('Live synced')
    })
})
