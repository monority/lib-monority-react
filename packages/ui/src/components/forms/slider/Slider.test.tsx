import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Slider } from './Slider'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => { root?.render(ui) })
  return container
}

afterEach(() => {
  act(() => { root?.unmount() })
  container?.remove()
  root = null
  container = null
})

describe('Slider', () => {
  it('renders with default md size and shows value', () => {
    const view = render(<Slider label="Volume" />)
    const input = view.querySelector('input')
    const output = view.querySelector('output')
    expect(input?.type).toBe('range')
    expect(input?.getAttribute('data-size')).toBe('md')
    expect(input?.className).toContain('mr-slider--md')
    expect(output?.textContent).toBe('50')
  })

  it('maps disabled, required and error states', () => {
    const view = render(<Slider label="Gain" disabled required error="Out of range" />)
    const input = view.querySelector('input')
    expect(input?.disabled).toBe(true)
    expect(input?.required).toBe(true)
    expect(input?.getAttribute('aria-invalid')).toBe('true')
    expect(input?.getAttribute('data-disabled')).toBe('true')
    expect(input?.getAttribute('data-required')).toBe('true')
    expect(input?.getAttribute('data-invalid')).toBe('true')
    expect(input?.className).toContain('mr-slider--disabled')
    expect(input?.className).toContain('mr-slider--error')
  })

  it('forwards ref to the native input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Slider ref={ref} />)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('range')
  })

  it('applies sm and lg sizes with correct data-size', () => {
    const viewSm = render(<Slider size="sm" />)
    expect(viewSm.querySelector('input')?.getAttribute('data-size')).toBe('sm')
    expect(viewSm.querySelector('input')?.className).toContain('mr-slider--sm')

    const viewLg = render(<Slider size="lg" />)
    expect(viewLg.querySelector('input')?.getAttribute('data-size')).toBe('lg')
    expect(viewLg.querySelector('input')?.className).toContain('mr-slider--lg')
  })

  it('hides the value output when showValue is false', () => {
    const view = render(<Slider showValue={false} />)
    expect(view.querySelector('output')).toBeNull()
  })

  it('renders hint and error with correct aria-describedby', () => {
    const view = render(<Slider hint="0-100" error="Too high" />)
    const describedBy = view.querySelector('input')?.getAttribute('aria-describedby')
    expect(describedBy).toContain('-hint')
    expect(describedBy).toContain('-error')
  })
})
