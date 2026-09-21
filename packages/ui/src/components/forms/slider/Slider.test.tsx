import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
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
    expect(input?.className).toContain('mr-slider')
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

    const viewLg = render(<Slider size="lg" />)
    expect(viewLg.querySelector('input')?.getAttribute('data-size')).toBe('lg')
  })

  it('hides the value output when showValue is false', () => {
    const view = render(<Slider showValue={false} />)
    expect(view.querySelector('output')).toBeNull()
  })

  it('renders hint and error with correct aria-describedby', () => {
    const view = render(<Slider id="slider" hint="0-100" error="Too high" />)
    const describedBy = view.querySelector('input')?.getAttribute('aria-describedby')
    expect(describedBy).toContain('slider-hint')
    expect(describedBy).toContain('slider-error')
  })

  it('calls onValueChange when value changes', () => {
    const onValueChange = vi.fn()
    const view = render(<Slider onValueChange={onValueChange} />)
    const input = view.querySelector('input') as HTMLInputElement
    act(() => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set
      nativeInputValueSetter?.call(input, '75')
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
    expect(onValueChange).toHaveBeenCalledWith(75)
  })

  it('applies numeric range attributes on the native input', () => {
    const view = render(<Slider min={10} max={90} step={5} defaultValue={30} />)
    const input = view.querySelector('input') as HTMLInputElement

    expect(input.min).toBe('10')
    expect(input.max).toBe('90')
    expect(input.step).toBe('5')
    expect(input.value).toBe('30')
    // native range input exposes implicit slider role with value semantics
    expect(input.getAttribute('type')).toBe('range')
  })

  it('renders the controlled value in the output', () => {
    const view = render(<Slider value={42} />)
    const input = view.querySelector('input') as HTMLInputElement
    const output = view.querySelector('output')

    expect(input.value).toBe('42')
    expect(output?.textContent).toBe('42')
  })

  it('passes className to the wrapper', () => {
    const view = render(<Slider className="custom" />)
    const wrapper = view.querySelector('.mr-field')
    expect(wrapper?.className).toContain('custom')
  })
})
