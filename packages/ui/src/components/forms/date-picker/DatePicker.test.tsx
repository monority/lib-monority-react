import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DatePicker } from './DatePicker'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => root?.render(ui))
  return container
}

function cleanup() {
  act(() => root?.unmount())
  container?.remove()
  root = null
  container = null
}

afterEach(cleanup)

describe('DatePicker', () => {
  // 1. Renders trigger input
  it('renders trigger input with label', () => {
    const view = render(<DatePicker label="Date" />)
    const input = view.querySelector('input[type="text"]')
    expect(input).not.toBeNull()
    expect(input?.getAttribute('role')).toBeNull() // not a combobox, just a trigger
    expect(view.textContent).toContain('Date')
  })

  // 2. Opens calendar popover on trigger click
  it('opens calendar popover on trigger click', () => {
    const view = render(<DatePicker label="Date" />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    act(() => trigger?.click())
    const popover = document.querySelector('.mr-datepicker__popover')
    expect(popover).not.toBeNull()
    expect(trigger?.getAttribute('aria-expanded')).toBe('true')
  })

  // 3. Closes popover on day selection
  it('closes popover on day selection', () => {
    const view = render(<DatePicker label="Date" />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    act(() => trigger?.click())
    // Click on a day cell (first day without data-disabled)
    const days = document.querySelectorAll('.mr-datepicker__day')
    const clickableDay = Array.from(days).find((d) => !d.hasAttribute('data-disabled'))
    if (clickableDay) {
      act(() => (clickableDay as HTMLButtonElement).click())
    }
    const popover = document.querySelector('.mr-datepicker__popover')
    expect(popover).toBeNull()
  })

  // 4. Closes popover on Escape key
  it('closes popover on Escape key', () => {
    const view = render(<DatePicker label="Date" />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    act(() => trigger?.click())
    expect(document.querySelector('.mr-datepicker__popover')).not.toBeNull()
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(document.querySelector('.mr-datepicker__popover')).toBeNull()
  })

  // 5. Closes popover on outside click
  it('closes popover on outside click', () => {
    const view = render(<DatePicker label="Date" />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    act(() => trigger?.click())
    expect(document.querySelector('.mr-datepicker__popover')).not.toBeNull()
    act(() => {
      document.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
    })
    expect(document.querySelector('.mr-datepicker__popover')).toBeNull()
  })

  // 6. Selects a date — formatted value shows in input
  it('shows formatted date in input after selection', () => {
    const view = render(<DatePicker label="Date" />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    act(() => trigger?.click())
    // Find a clickable day
    const days = document.querySelectorAll('.mr-datepicker__day:not([data-disabled])')
    if (days.length > 0) {
      act(() => (days[0] as HTMLButtonElement).click())
    }
    // Input should have a value (formatted date)
    expect(trigger?.value).toMatch(/\d{2}\/\d{2}\/\d{4}/)
  })

  // 7. Controlled: value prop updates selection
  it('controlled: value prop sets selected date', () => {
    const controlledDate = new Date(2025, 5, 15)
    const view = render(<DatePicker label="Date" value={controlledDate} />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    // Should show the formatted date
    expect(trigger?.value).toContain('2025')
  })

  // 8. Controlled: onChange fires on day select
  it('controlled: onChange fires on day select', () => {
    const handleChange = vi.fn()
    const view = render(<DatePicker label="Date" value={new Date(2025, 0, 1)} onChange={handleChange} />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    act(() => trigger?.click())
    const days = document.querySelectorAll('.mr-datepicker__day:not([data-disabled])')
    if (days.length > 0) {
      act(() => (days[0] as HTMLButtonElement).click())
    }
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(expect.any(Date))
  })

  // 9. Uncontrolled: defaultValue works
  it('uncontrolled: defaultValue sets initial display', () => {
    const defaultDate = new Date(2024, 11, 25)
    const view = render(<DatePicker label="Date" defaultValue={defaultDate} />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    expect(trigger?.value).toContain('2024')
  })

  // 10. Navigates to next month
  it('navigates to next month via button', () => {
    const view = render(<DatePicker label="Date" defaultValue={new Date(2025, 0, 1)} />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    act(() => trigger?.click())
    const monthLabel = document.querySelector('.mr-datepicker__month-label')
    expect(monthLabel?.textContent).toContain('January')
    const nextBtn = document.querySelector('.mr-datepicker__nav-btn:last-child') as HTMLButtonElement
    act(() => nextBtn?.click())
    const updatedLabel = document.querySelector('.mr-datepicker__month-label')
    expect(updatedLabel?.textContent).toContain('February')
  })

  // 11. Navigates to prev month
  it('navigates to prev month via button', () => {
    const view = render(<DatePicker label="Date" defaultValue={new Date(2025, 1, 1)} />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    act(() => trigger?.click())
    const monthLabel = document.querySelector('.mr-datepicker__month-label')
    expect(monthLabel?.textContent).toContain('February')
    const prevBtn = document.querySelector('.mr-datepicker__nav-btn:first-child') as HTMLButtonElement
    act(() => prevBtn?.click())
    const updatedLabel = document.querySelector('.mr-datepicker__month-label')
    expect(updatedLabel?.textContent).toContain('January')
  })

  // 12. Disabled state
  it('disabled state prevents opening', () => {
    const view = render(<DatePicker label="Date" disabled />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    expect(trigger?.disabled).toBe(true)
    act(() => trigger?.click())
    expect(document.querySelector('.mr-datepicker__popover')).toBeNull()
  })

  // 13. Error state
  it('error state shows red border and aria-invalid', () => {
    const view = render(<DatePicker label="Date" error="Invalid date" />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    expect(trigger?.getAttribute('aria-invalid')).toBe('true')
    const wrapper = view.querySelector('.mr-datepicker')
    expect(wrapper?.getAttribute('data-invalid')).toBe('true')
  })

  // 14. Size variants
  it('applies size variants', () => {
    const sm = render(<DatePicker size="sm" />)
    expect(sm.querySelector('.mr-datepicker')?.getAttribute('data-size')).toBe('sm')
    cleanup()
    const lg = render(<DatePicker size="lg" />)
    expect(lg.querySelector('.mr-datepicker')?.getAttribute('data-size')).toBe('lg')
  })

  // 15. Disabled dates
  it('disabled dates are not clickable', () => {
    const disabledDate = new Date(2025, 0, 15)
    const view = render(<DatePicker label="Date" defaultValue={new Date(2025, 0, 1)} disabledDates={[disabledDate]} />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    act(() => trigger?.click())
    // Find the disabled day
    const days = document.querySelectorAll('.mr-datepicker__day')
    const disabledDay = Array.from(days).find(
      (d) => d.getAttribute('data-disabled') === 'true' && d.textContent?.trim() === '15',
    )
    expect(disabledDay).not.toBeUndefined()
    expect(disabledDay?.getAttribute('data-disabled')).toBe('true')
  })

  // 16. Min/max date
  it('min and max dates disable out-of-range days', () => {
    const minDate = new Date(2025, 0, 10)
    const maxDate = new Date(2025, 0, 20)
    const view = render(
      <DatePicker label="Date" defaultValue={new Date(2025, 0, 15)} minDate={minDate} maxDate={maxDate} />,
    )
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    act(() => trigger?.click())
    const days = document.querySelectorAll('.mr-datepicker__day')
    // Day 5 should be disabled (before minDate)
    const day5 = Array.from(days).find((d) => d.textContent?.trim() === '5')
    expect(day5?.getAttribute('data-disabled')).toBe('true')
    // Day 25 should be disabled (after maxDate)
    const day25 = Array.from(days).find((d) => d.textContent?.trim() === '25')
    expect(day25?.getAttribute('data-disabled')).toBe('true')
  })

  // 17. Today highlight
  it('today has data-today attribute', () => {
    const view = render(<DatePicker label="Date" />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    act(() => trigger?.click())
    const today = document.querySelector('.mr-datepicker__day[data-today="true"]')
    expect(today).not.toBeNull()
  })

  // 18. Out-of-month days dimmed
  it('out-of-month days lack data-current-month attribute', () => {
    const view = render(<DatePicker label="Date" defaultValue={new Date(2025, 0, 15)} />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    act(() => trigger?.click())
    const days = document.querySelectorAll('.mr-datepicker__day')
    const outOfMonth = Array.from(days).find(
      (d) => !d.hasAttribute('data-current-month') && d.textContent?.trim() !== '15',
    )
    expect(outOfMonth).not.toBeUndefined()
  })

  // 19. forwardRef works
  it('forwards ref to hidden input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<DatePicker ref={ref} name="my-date" />)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('hidden')
    expect(ref.current?.name).toBe('my-date')
  })

  // 20. Empty state — no value, shows placeholder
  it('shows placeholder when no value', () => {
    const view = render(<DatePicker label="Date" placeholder="Pick a date" />)
    const trigger = view.querySelector('input[type="text"]') as HTMLInputElement
    expect(trigger?.value).toBe('')
    expect(trigger?.placeholder).toBe('Pick a date')
  })
})
