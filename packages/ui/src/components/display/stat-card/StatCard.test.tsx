import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
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
})
