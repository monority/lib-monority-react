import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
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
  it('renders two date inputs', () => {
    const view = render(<DateRangePicker label="Period" />)
    const inputs = view.querySelectorAll('input')
    expect(inputs.length).toBe(2)
    expect(inputs[0].type).toBe('date')
    expect(inputs[1].type).toBe('date')
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

  it('renders error with aria-invalid', () => {
    const view = render(<DateRangePicker error="Invalid range" />)
    view.querySelectorAll('input').forEach((input) => {
      expect(input.getAttribute('aria-invalid')).toBe('true')
    })
  })
})
