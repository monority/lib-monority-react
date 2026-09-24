import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DateRangePicker } from './DateRangePicker'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    act(() => root?.render(ui))
    return container
}

afterEach(() => {
    act(() => root?.unmount())
    container?.remove()
    root = null
    container = null
})

describe('DateRangePicker', () => {
    it('renders two datepicker wrappers', () => {
        const view = render(<DateRangePicker />)
        const datepickers = view.querySelectorAll('.mr-datepicker')
        expect(datepickers.length).toBe(2)
    })

    it('renders from and to labels', () => {
        const view = render(<DateRangePicker fromLabel="Start" toLabel="End" />)
        expect(view.textContent).toContain('Start')
        expect(view.textContent).toContain('End')
    })

    it('renders separator', () => {
        const view = render(<DateRangePicker />)
        expect(view.querySelector('.mr-date-range-picker__separator')).toBeTruthy()
    })

    it('forwards ref to wrapper div', () => {
        const ref = createRef<HTMLDivElement>()
        render(<DateRangePicker ref={ref} />)
        expect(ref.current?.tagName).toBe('DIV')
    })

    it('disables end dates on or before start', () => {
        const view = render(
            <DateRangePicker
                fromProps={{ defaultValue: new Date(2026, 8, 20) }}
                toProps={{ defaultValue: new Date(2026, 8, 22) }}
            />
        )
        const triggers = view.querySelectorAll('input[type="text"]')
        act(() => (triggers[1] as HTMLInputElement).click())

        for (const day of ['18', '19', '20']) {
            const button = Array.from(document.querySelectorAll('.mr-datepicker__day')).find(
                (candidate) => candidate.textContent?.trim() === day
            )
            expect(button?.getAttribute('data-disabled')).toBe('true')
        }
        const nextDay = Array.from(document.querySelectorAll('.mr-datepicker__day')).find(
            (candidate) => candidate.textContent?.trim() === '21'
        )
        expect(nextDay?.getAttribute('data-disabled')).toBeNull()
    })

    it('rejects invalid end selection and accepts a later date', () => {
        const onChange = vi.fn()
        const view = render(
            <DateRangePicker
                fromProps={{ defaultValue: new Date(2026, 8, 20) }}
                toProps={{ defaultValue: new Date(2026, 8, 22), onChange }}
            />
        )
        const triggers = view.querySelectorAll('input[type="text"]')
        act(() => (triggers[1] as HTMLInputElement).click())

        const sameDay = Array.from(document.querySelectorAll('.mr-datepicker__day')).find(
            (candidate) => candidate.textContent?.trim() === '20'
        ) as HTMLButtonElement
        act(() => sameDay.click())
        expect(onChange).not.toHaveBeenCalled()

        const laterDay = Array.from(document.querySelectorAll('.mr-datepicker__day')).find(
            (candidate) => candidate.textContent?.trim() === '21'
        ) as HTMLButtonElement
        act(() => laterDay.click())
        expect(onChange).toHaveBeenCalledWith(new Date(2026, 8, 21))
    })

    it('clears an uncontrolled end when start moves past it', () => {
        const view = render(
            <DateRangePicker
                fromProps={{ defaultValue: new Date(2026, 8, 20) }}
                toProps={{ defaultValue: new Date(2026, 8, 22) }}
            />
        )
        const triggers = view.querySelectorAll('input[type="text"]')
        act(() => (triggers[0] as HTMLInputElement).click())
        const laterStart = Array.from(document.querySelectorAll('.mr-datepicker__day')).find(
            (candidate) => candidate.textContent?.trim() === '25'
        ) as HTMLButtonElement
        act(() => laterStart.click())

        expect((triggers[1] as HTMLInputElement).value).toBe('')
    })

    it('focuses the first enabled end date for empty keyboard selection', () => {
        const onChange = vi.fn()
        const view = render(
            <DateRangePicker
                fromProps={{ defaultValue: new Date(2026, 8, 20) }}
                toProps={{ onChange }}
            />
        )
        const endTrigger = view.querySelectorAll('input[type="text"]')[1] as HTMLInputElement
        act(() => endTrigger.click())

        const focusedDay = document.activeElement as HTMLButtonElement
        expect(focusedDay.className).toContain('mr-datepicker__day')
        const focusedText = focusedDay.textContent?.trim()
        act(() =>
            focusedDay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
        )
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange.mock.calls[0]?.[0]).toEqual(new Date(2026, 8, Number(focusedText)))
    })

    it('enforces chronology for keyboard selection', () => {
        const onChange = vi.fn()
        const view = render(
            <DateRangePicker
                fromProps={{ defaultValue: new Date(2026, 8, 20) }}
                toProps={{ defaultValue: new Date(2026, 8, 22), onChange }}
            />
        )
        const trigger = view.querySelectorAll('input[type="text"]')[1] as HTMLInputElement
        act(() => trigger.click())
        const grid = document.querySelector('.mr-datepicker__grid') as HTMLDivElement

        act(() => {
            grid.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
        })
        act(() => {
            grid.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
        })
        act(() => {
            grid.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
        })
        expect(onChange).not.toHaveBeenCalled()

        act(() => {
            grid.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
        })
        act(() => {
            grid.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
        })
        expect(onChange).toHaveBeenCalledWith(new Date(2026, 8, 21))
    })

    it('normalizes an invalid controlled range through the end callback', () => {
        const onEndChange = vi.fn()
        render(
            <DateRangePicker
                fromProps={{ value: new Date(2026, 8, 20) }}
                toProps={{ value: new Date(2026, 8, 19), onChange: onEndChange }}
            />
        )
        expect(onEndChange).toHaveBeenCalledTimes(1)
        expect(onEndChange).toHaveBeenCalledWith(null)
    })

    it('clears a controlled end once when a new start invalidates it', () => {
        const onEndChange = vi.fn()
        const view = render(
            <DateRangePicker
                fromProps={{ value: new Date(2026, 8, 20) }}
                toProps={{ value: new Date(2026, 8, 22), onChange: onEndChange }}
            />
        )

        act(() =>
            root?.render(
                <DateRangePicker
                    fromProps={{ value: new Date(2026, 8, 25) }}
                    toProps={{ value: new Date(2026, 8, 22), onChange: onEndChange }}
                />
            )
        )

        expect(view.querySelectorAll('input[type="text"]')[1]?.value).toBe('')
        expect(onEndChange).toHaveBeenCalledTimes(1)
        expect(onEndChange).toHaveBeenCalledWith(null)
    })
})
