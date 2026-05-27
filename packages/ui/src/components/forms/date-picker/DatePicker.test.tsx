import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
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

afterEach(() => {
  act(() => root?.unmount())
  container?.remove()
  root = null
  container = null
})

describe('DatePicker', () => {
  it('renders with type date and default md size', () => {
    const view = render(<DatePicker label="Date" />)
    const input = view.querySelector('input')
    expect(input?.type).toBe('date')
    expect(input?.getAttribute('data-size')).toBe('md')
  })

  it('accepts datetime-local type', () => {
    const view = render(<DatePicker type="datetime-local" />)
    expect(view.querySelector('input')?.type).toBe('datetime-local')
  })

  it('maps disabled, required and error states', () => {
    const view = render(<DatePicker label="D" disabled required error="Invalid" />)
    const input = view.querySelector('input')
    expect(input?.disabled).toBe(true)
    expect(input?.required).toBe(true)
    expect(input?.getAttribute('aria-invalid')).toBe('true')
    expect(input?.getAttribute('data-disabled')).toBe('true')
    expect(input?.getAttribute('data-required')).toBe('true')
    expect(input?.getAttribute('data-invalid')).toBe('true')
  })

  it('forwards ref to native input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<DatePicker ref={ref} />)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('date')
  })

  it('applies sm and lg sizes', () => {
    const sm = render(<DatePicker size="sm" />)
    expect(sm.querySelector('input')?.getAttribute('data-size')).toBe('sm')
    const lg = render(<DatePicker size="lg" />)
    expect(lg.querySelector('input')?.getAttribute('data-size')).toBe('lg')
  })

  it('renders hint and error with aria-describedby', () => {
    const view = render(<DatePicker hint="Pick a date" error="Past" />)
    const input = view.querySelector('input')
    expect(input?.getAttribute('aria-describedby')).toContain('-hint')
    expect(input?.getAttribute('aria-describedby')).toContain('-error')
  })
})
