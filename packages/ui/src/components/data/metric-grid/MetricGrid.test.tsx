import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { MetricGrid } from './MetricGrid'

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

describe('MetricGrid', () => {
    it('renders items', () => {
        const view = render(<MetricGrid items={[{ key: '1', label: 'Revenue', value: '$10k' }]} />)
        expect(view.textContent).toContain('Revenue')
        expect(view.textContent).toContain('$10k')
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>()
        render(<MetricGrid ref={ref} />)
        expect(ref.current?.tagName).toBe('DIV')
        expect(ref.current?.className).toContain('mr-metric-grid')
    })

    it('renders children directly', () => {
        const view = render(
            <MetricGrid>
                <div data-testid="custom-child">Child Metric</div>
            </MetricGrid>
        )
        expect(view.querySelector('[data-testid="custom-child"]')?.textContent).toBe('Child Metric')
    })
})
