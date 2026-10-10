import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { BadgeDelta } from './BadgeDelta'

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

describe('BadgeDelta', () => {
    it('renders with increase deltaType and default size', () => {
        render(<BadgeDelta deltaType="increase">+14.2%</BadgeDelta>)
        const badge = document.body.querySelector('.mr-badge-delta')
        expect(badge).not.toBeNull()
        expect(badge?.getAttribute('data-type')).toBe('increase')
        expect(badge?.getAttribute('data-size')).toBe('md')
        expect(badge?.textContent).toContain('+14.2%')
    })

    it('inverts visual type when isIncreasePositive is false', () => {
        render(
            <BadgeDelta deltaType="increase" isIncreasePositive={false}>
                +350ms
            </BadgeDelta>
        )
        const badge = document.body.querySelector('.mr-badge-delta')
        expect(badge?.getAttribute('data-type')).toBe('decrease')
    })

    it('renders all sizes', () => {
        render(<BadgeDelta size="sm">-2.5%</BadgeDelta>)
        const badge = document.body.querySelector('.mr-badge-delta')
        expect(badge?.getAttribute('data-size')).toBe('sm')
    })

    it('forwards ref properly', () => {
        const ref = createRef<HTMLSpanElement>()
        render(<BadgeDelta ref={ref}>0.0%</BadgeDelta>)
        expect(ref.current).toBeInstanceOf(HTMLSpanElement)
        expect(ref.current?.classList.contains('mr-badge-delta')).toBe(true)
    })
})
