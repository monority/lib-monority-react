import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { NumberInput } from './NumberInput'

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

describe('NumberInput', () => {
  it('renders with default md size', () => {
    const view = render(<NumberInput label="Count" />)
    const input = view.querySelector('input')
    expect(input?.type).toBe('number')
    expect(input?.getAttribute('data-size')).toBe('md')
    expect(input?.className).toContain('mr-number-input--md')
  })

  it('maps disabled, required and error states', () => {
    const view = render(<NumberInput label="Qty" disabled required error="Invalid" />)
    const input = view.querySelector('input')
    expect(input?.disabled).toBe(true)
    expect(input?.required).toBe(true)
    expect(input?.getAttribute('aria-invalid')).toBe('true')
    expect(input?.getAttribute('data-disabled')).toBe('true')
    expect(input?.getAttribute('data-required')).toBe('true')
    expect(input?.getAttribute('data-invalid')).toBe('true')
    expect(input?.className).toContain('mr-number-input--disabled')
    expect(input?.className).toContain('mr-number-input--error')
  })

  it('forwards ref to the native input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<NumberInput ref={ref} />)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('number')
  })

  it('applies sm and lg sizes with correct data-size', () => {
    const sm = render(<NumberInput size="sm" />)
    expect(sm.querySelector('input')?.getAttribute('data-size')).toBe('sm')
    expect(sm.querySelector('input')?.className).toContain('mr-number-input--sm')

    const lg = render(<NumberInput size="lg" />)
    expect(lg.querySelector('input')?.getAttribute('data-size')).toBe('lg')
    expect(lg.querySelector('input')?.className).toContain('mr-number-input--lg')
  })

  it('renders hint and error with correct aria-describedby', () => {
    const view = render(<NumberInput hint="0-100" error="Too high" />)
    const describedBy = view.querySelector('input')?.getAttribute('aria-describedby')
    expect(describedBy).toContain('-hint')
    expect(describedBy).toContain('-error')
  })

  it('accepts number-specific props', () => {
    const view = render(<NumberInput min={0} max={10} step={0.5} />)
    const input = view.querySelector('input')
    expect(input?.min).toBe('0')
    expect(input?.max).toBe('10')
    expect(input?.step).toBe('0.5')
  })
})
