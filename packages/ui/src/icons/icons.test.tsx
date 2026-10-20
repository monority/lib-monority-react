import { createRef } from 'react'
import type { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import {
    IconAlertCircle,
    IconAlertTriangle,
    IconCalendar,
    IconCheck,
    IconCheckCircle,
    IconChevronLeft,
    IconChevronRight,
    IconClose,
    IconInfo,
    IconMinus,
    IconPause,
    IconPlay,
    IconPlus,
    IconSearch,
} from './icons'

let container: HTMLDivElement | null = null

function render(ui: ReactElement) {
    container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    act(() => {
        root.render(ui)
    })
    return container
}

afterEach(() => {
    container?.remove()
    container = null
})

describe('Monority Icons', () => {
    it('renders with default attributes (aria-hidden, mr-icon, size 1em)', () => {
        const view = render(<IconChevronLeft />)
        const svg = view.querySelector('svg')
        expect(svg).toBeTruthy()
        expect(svg?.getAttribute('aria-hidden')).toBe('true')
        expect(svg?.getAttribute('width')).toBe('1em')
        expect(svg?.getAttribute('height')).toBe('1em')
        expect(svg?.classList.contains('mr-icon')).toBe(true)
    })

    it('accepts custom size, strokeWidth, and className', () => {
        const view = render(<IconClose size={24} strokeWidth={1.5} className="custom-close" />)
        const svg = view.querySelector('svg')
        expect(svg?.getAttribute('width')).toBe('24')
        expect(svg?.getAttribute('height')).toBe('24')
        expect(svg?.getAttribute('stroke-width')).toBe('1.5')
        expect(svg?.classList.contains('custom-close')).toBe(true)
    })

    it('forwards ref directly using React 19 native ref passing', () => {
        const ref = createRef<SVGSVGElement>()
        render(<IconCheck ref={ref} />)
        expect(ref.current).toBeInstanceOf(SVGSVGElement)
    })

    it('renders various icons correctly', () => {
        const icons = [
            IconChevronRight,
            IconCheckCircle,
            IconAlertTriangle,
            IconAlertCircle,
            IconInfo,
            IconCalendar,
            IconSearch,
            IconPlus,
            IconMinus,
            IconPlay,
            IconPause,
        ]
        icons.forEach((Icon) => {
            const view = render(<Icon />)
            expect(view.querySelector('svg')).toBeTruthy()
        })
    })
})
