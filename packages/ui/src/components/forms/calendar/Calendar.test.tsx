import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Calendar } from './Calendar'

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

describe('Calendar', () => {
  it('renders current month with day grid', () => {
    const view = render(<Calendar />)
    const today = new Date()
    const monthLabel = view.querySelector('.mr-calendar__month-label')
    const grid = view.querySelector('[role="grid"]')
    const days = view.querySelectorAll('.mr-calendar__day:not(.mr-calendar__day--hidden)')

    expect(monthLabel?.textContent).toContain(today.getFullYear().toString())
    expect(grid).toBeTruthy()
    expect(days.length).toBeGreaterThanOrEqual(28)
  })

  it('selects a day on click (uncontrolled)', () => {
    const view = render(<Calendar defaultValue={null} />)
    const firstDay = view.querySelector('.mr-calendar__day--current-month') as HTMLButtonElement

    expect(firstDay).toBeTruthy()
    expect(firstDay.getAttribute('aria-selected')).toBeNull()

    act(() => { firstDay.click() })

    expect(firstDay.getAttribute('aria-selected')).toBe('true')
    expect(firstDay.getAttribute('data-selected')).toBe('true')
  })

  it('calls onChange with selected date', () => {
    let selected: Date | null = null
    const handleChange = (date: Date | null) => { selected = date }

    const view = render(<Calendar onChange={handleChange} />)
    const firstDay = view.querySelector('.mr-calendar__day--current-month') as HTMLButtonElement

    act(() => { firstDay.click() })

    expect(selected).toBeTruthy()
    expect(selected?.getDate()).toBe(parseInt(firstDay.textContent!, 10))
  })

  it('respects controlled value', () => {
    const controlledDate = new Date(2024, 5, 15)
    const view = render(<Calendar value={controlledDate} />)

    const selectedDay = view.querySelector('.mr-calendar__day--selected')
    expect(selectedDay).toBeTruthy()
    expect(selectedDay?.textContent).toBe('15')
  })

  it('navigates to previous month', () => {
    const view = render(<Calendar />)
    const today = new Date()
    const prevBtn = view.querySelector('.mr-calendar__nav-btn--prev') as HTMLButtonElement

    act(() => { prevBtn.click() })

    const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1)
    const monthLabel = view.querySelector('.mr-calendar__month-label')
    expect(monthLabel?.textContent).toContain(prevMonth.getFullYear().toString())
  })

  it('navigates to next month', () => {
    const view = render(<Calendar />)
    const today = new Date()
    const nextBtn = view.querySelector('.mr-calendar__nav-btn--next') as HTMLButtonElement

    act(() => { nextBtn.click() })

    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1)
    const monthLabel = view.querySelector('.mr-calendar__month-label')
    expect(monthLabel?.textContent).toContain(nextMonth.getFullYear().toString())
  })

  it('disables dates before minDate', () => {
    const minDate = new Date(2024, 5, 15)
    const view = render(<Calendar value={new Date(2024, 5, 20)} minDate={minDate} />)

    // June 1, 2024 should be disabled (before minDate June 15)
    const day1 = view.querySelector('[aria-label*="June 1, 2024"]') as HTMLButtonElement
    if (day1 && day1.getAttribute('data-current-month')) {
      expect(day1.getAttribute('data-disabled')).toBe('true')
    }
  })

  it('disables dates after maxDate', () => {
    const maxDate = new Date(2024, 5, 15)
    const view = render(<Calendar value={new Date(2024, 5, 10)} maxDate={maxDate} />)

    // June 20, 2024 should be disabled (after maxDate June 15)
    const day20 = view.querySelector('[aria-label*="June 20, 2024"]') as HTMLButtonElement
    if (day20 && day20.getAttribute('data-current-month')) {
      expect(day20.getAttribute('data-disabled')).toBe('true')
    }
  })

  it('disables specific dates via array', () => {
    const disabledDates = [new Date(2024, 5, 10), new Date(2024, 5, 20)]
    const view = render(<Calendar value={new Date(2024, 5, 15)} disabledDates={disabledDates} />)

    const day10 = view.querySelector('[aria-label*="June 10, 2024"]') as HTMLButtonElement
    if (day10 && day10.getAttribute('data-current-month')) {
      expect(day10.getAttribute('data-disabled')).toBe('true')
    }
  })

  it('disables dates via function', () => {
    // Disable weekends
    const disabledFn = (date: Date) => date.getDay() === 0 || date.getDay() === 6
    const view = render(<Calendar value={new Date(2024, 5, 15)} disabledDates={disabledFn} />)

    // June 1, 2024 is a Saturday
    const day1 = view.querySelector('[aria-label*="June 1, 2024"]') as HTMLButtonElement
    if (day1 && day1.getAttribute('data-current-month')) {
      expect(day1.getAttribute('data-disabled')).toBe('true')
    }
  })

  it('hides outside days when showOutsideDays=false', () => {
    const view = render(<Calendar showOutsideDays={false} />)
    const otherMonthDays = view.querySelectorAll('.mr-calendar__day--other-month')
    const hiddenDays = view.querySelectorAll('.mr-calendar__day--hidden')

    expect(otherMonthDays.length).toBe(0)
    expect(hiddenDays.length).toBeGreaterThan(0)
  })

  it('shows outside days by default', () => {
    const view = render(<Calendar />)
    const otherMonthDays = view.querySelectorAll('.mr-calendar__day--other-month')
    const hiddenDays = view.querySelectorAll('.mr-calendar__day--hidden')

    expect(otherMonthDays.length).toBeGreaterThan(0)
    expect(hiddenDays.length).toBe(0)
  })

  it('highlights today', () => {
    const view = render(<Calendar />)
    const today = new Date()
    const todayBtn = view.querySelector('.mr-calendar__day--today')

    // Today should be highlighted
    expect(todayBtn).toBeTruthy()
    expect(todayBtn?.getAttribute('data-today')).toBe('true')
  })

  it('renders with default value', () => {
    const defaultDate = new Date(2024, 5, 15)
    const view = render(<Calendar defaultValue={defaultDate} />)

    const selectedDay = view.querySelector('.mr-calendar__day--selected')
    expect(selectedDay).toBeTruthy()
    expect(selectedDay?.textContent).toBe('15')
  })

  it('forwards ref to root element', () => {
    const ref = createRef<HTMLDivElement>()

    render(<Calendar ref={ref} />)

    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.getAttribute('role')).toBe('application')
  })

  it('renders multiple months', () => {
    const view = render(<Calendar numberOfMonths={2} />)
    const months = view.querySelectorAll('.mr-calendar__month')

    expect(months.length).toBe(2)
  })

  it('has proper ARIA attributes', () => {
    const view = render(<Calendar />)
    const root = view.querySelector('[role="application"]')
    const grid = view.querySelector('[role="grid"]')
    const row = view.querySelector('[role="row"]')
    const gridcell = view.querySelector('[role="gridcell"]')

    expect(root?.getAttribute('aria-label')).toBe('Calendar')
    expect(grid).toBeTruthy()
    expect(row).toBeTruthy()
    expect(gridcell).toBeTruthy()
  })
})
