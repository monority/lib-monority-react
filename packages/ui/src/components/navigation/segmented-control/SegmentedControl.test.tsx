import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SegmentedControl } from './SegmentedControl'

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

const sampleOptions = [
    { value: 'day', label: 'Jour' },
    { value: 'week', label: 'Semaine' },
    { value: 'month', label: 'Mois' },
]

describe('SegmentedControl', () => {
    it('renders options and selects defaultValue', () => {
        const view = render(<SegmentedControl options={sampleOptions} defaultValue="week" />)

        const group = view.querySelector('[role="radiogroup"]')
        expect(group !== null).toBe(true)

        const radios = view.querySelectorAll('[role="radio"]')
        expect(radios.length).toBe(3)

        const weekRadio = Array.from(radios).find((r) => r.textContent?.includes('Semaine'))
        expect(weekRadio?.getAttribute('aria-checked')).toBe('true')
        expect(weekRadio?.getAttribute('data-selected')).toBe('true')

        const dayRadio = Array.from(radios).find((r) => r.textContent?.includes('Jour'))
        expect(dayRadio?.getAttribute('aria-checked')).toBe('false')
    })

    it('handles interactive selection in uncontrolled mode', () => {
        const onChange = vi.fn()
        const view = render(
            <SegmentedControl options={sampleOptions} defaultValue="day" onChange={onChange} />
        )

        const radios = view.querySelectorAll('[role="radio"]')
        const monthRadio = Array.from(radios).find((r) =>
            r.textContent?.includes('Mois')
        ) as HTMLButtonElement

        act(() => {
            monthRadio.click()
        })

        expect(onChange).toHaveBeenCalledWith('month')
        expect(monthRadio.getAttribute('aria-checked')).toBe('true')
    })

    it('operates in controlled mode', () => {
        const onChange = vi.fn()
        const view = render(
            <SegmentedControl options={sampleOptions} value="day" onChange={onChange} />
        )

        const radios = view.querySelectorAll('[role="radio"]')
        const weekRadio = Array.from(radios).find((r) =>
            r.textContent?.includes('Semaine')
        ) as HTMLButtonElement

        act(() => {
            weekRadio.click()
        })

        expect(onChange).toHaveBeenCalledWith('week')

        act(() => {
            root?.render(
                <SegmentedControl options={sampleOptions} value="week" onChange={onChange} />
            )
        })

        expect(weekRadio.getAttribute('aria-checked')).toBe('true')
    })

    it('navigates with arrow keys', () => {
        const onChange = vi.fn()
        const view = render(
            <SegmentedControl options={sampleOptions} defaultValue="day" onChange={onChange} />
        )

        const group = view.querySelector('[role="radiogroup"]') as HTMLDivElement

        act(() => {
            group.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
        })
        expect(onChange).toHaveBeenCalledWith('week')

        act(() => {
            group.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
        })
        expect(onChange).toHaveBeenCalledWith('day')
    })

    it('respects disabled state', () => {
        const onChange = vi.fn()
        const view = render(
            <SegmentedControl options={sampleOptions} disabled onChange={onChange} />
        )

        const radios = view.querySelectorAll('[role="radio"]')
        const weekRadio = Array.from(radios).find((r) =>
            r.textContent?.includes('Semaine')
        ) as HTMLButtonElement

        expect(weekRadio.disabled).toBe(true)

        act(() => {
            weekRadio.click()
        })
        expect(onChange).not.toHaveBeenCalled()
    })

    it('supports compound component API', () => {
        const onChange = vi.fn()
        const view = render(
            <SegmentedControl defaultValue="code" onChange={onChange}>
                <SegmentedControl.Item value="preview">Apercu</SegmentedControl.Item>
                <SegmentedControl.Item value="code">Code</SegmentedControl.Item>
            </SegmentedControl>
        )

        const radios = view.querySelectorAll('[role="radio"]')
        const codeRadio = Array.from(radios).find((r) => r.textContent?.includes('Code'))
        expect(codeRadio?.getAttribute('aria-checked')).toBe('true')

        const previewRadio = Array.from(radios).find((r) =>
            r.textContent?.includes('Apercu')
        ) as HTMLButtonElement
        act(() => {
            previewRadio.click()
        })
        expect(onChange).toHaveBeenCalledWith('preview')
    })
})
