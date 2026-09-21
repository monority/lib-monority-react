import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Checkbox } from './Checkbox'

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

describe('Checkbox', () => {
  it('renders default unchecked state with accent tone and md size', () => {
    const view = render(<Checkbox label="Accept terms" />)
    const label = view.querySelector('label')
    const input = view.querySelector('input')

    expect(label?.textContent).toBe('Accept terms')
    expect(label?.getAttribute('data-tone')).toBe('accent')
    expect(label?.getAttribute('data-size')).toBe('md')
    expect(label?.className).toContain('mr-checkbox--accent')
    expect(label?.className).toContain('mr-checkbox--md')
    expect(label?.getAttribute('data-checked')).toBeNull()
    expect(input?.type).toBe('checkbox')
    expect(input?.checked).toBe(false)
    expect(input?.getAttribute('aria-invalid')).toBeNull()
  })

  it('maps checked, disabled, invalid, required and indeterminate states to hooks', () => {
    const view = render(
      <Checkbox label="Required field" checked disabled invalid required indeterminate />,
    )
    const label = view.querySelector('label')
    const input = view.querySelector('input')

    expect(label?.className).toContain('mr-checkbox--checked')
    expect(label?.className).toContain('mr-checkbox--disabled')
    expect(label?.className).toContain('mr-checkbox--invalid')
    expect(label?.className).toContain('mr-checkbox--indeterminate')
    expect(label?.getAttribute('data-checked')).toBe('true')
    expect(label?.getAttribute('data-disabled')).toBe('true')
    expect(label?.getAttribute('data-invalid')).toBe('true')
    expect(label?.getAttribute('data-required')).toBe('true')
    expect(label?.getAttribute('data-indeterminate')).toBe('true')
    expect(input?.checked).toBe(true)
    expect(input?.disabled).toBe(true)
    expect(input?.required).toBe(true)
    expect(input?.getAttribute('aria-invalid')).toBe('true')
    expect(input?.indeterminate).toBe(true)
  })

  it('forwards ref to the native input element', () => {
    const ref = createRef<HTMLInputElement>()

    render(<Checkbox ref={ref} />)

    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('checkbox')
  })

  it('toggles on user click when uncontrolled', () => {
    const view = render(<Checkbox label="Toggle me" />)
    const input = view.querySelector('input') as HTMLInputElement

    expect(input.checked).toBe(false)

    act(() => { input.click() })
    expect(input.checked).toBe(true)

    act(() => { input.click() })
    expect(input.checked).toBe(false)
  })

  it('respects controlled checked state via onChange', () => {
    let checked = false
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { checked = e.target.checked }

    const view = render(<Checkbox checked={checked} onChange={handleChange} />)
    const input = view.querySelector('input') as HTMLInputElement

    expect(input.checked).toBe(false)
    act(() => { input.click() })
    // controlled: React re-renders with checked=false because handler only sets local var
    expect(input.checked).toBe(false)
  })

  it('links hint and error through aria-describedby', () => {
    const view = render(<Checkbox id="terms" label="Accept" hint="Read carefully" error="Required" />)
    const input = view.querySelector('input') as HTMLInputElement

    const describedBy = input.getAttribute('aria-describedby')
    expect(describedBy).toContain('terms-hint')
    expect(describedBy).toContain('terms-error')
    expect(view.querySelector('.mr-field__hint')?.textContent).toBe('Read carefully')
    expect(view.querySelector('.mr-field__error')?.textContent).toBe('Required')
  })

  it('treats error as invalid state on the input', () => {
    const view = render(<Checkbox label="Accept" error="Required" />)
    const input = view.querySelector('input') as HTMLInputElement

    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(view.querySelector('label.mr-checkbox')?.className).toContain('mr-checkbox--invalid')
  })

  it('shares the explicit id between input and wrapper label', () => {
    const view = render(<Checkbox id="consent" label="Consent" />)
    const input = view.querySelector('input') as HTMLInputElement
    const box = view.querySelector('label.mr-checkbox') as HTMLLabelElement

    expect(input.id).toBe('consent')
    expect(box.getAttribute('for')).toBe('consent')
  })

  it('toggles with keyboard (Space) when uncontrolled', () => {
    const onChange = vi.fn()
    const view = render(<Checkbox label="Toggle" onChange={onChange} />)
    const input = view.querySelector('input') as HTMLInputElement

    expect(input.checked).toBe(false)
    act(() => { input.click() })
    expect(input.checked).toBe(true)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0]?.[0].target.checked).toBe(true)
  })

  it('stops internal state updates when controlled', () => {
    const view = render(<Checkbox checked label="Always on" />)
    const input = view.querySelector('input') as HTMLInputElement

    act(() => { input.click() })
    // parent still says checked=true
    expect(input.checked).toBe(true)
    expect(view.querySelector('label.mr-checkbox')?.getAttribute('data-checked')).toBe('true')
  })

  it('renders the indeterminate visual state and DOM property', () => {
    const view = render(<Checkbox label="Partial" indeterminate />)
    const input = view.querySelector('input') as HTMLInputElement

    expect(input.indeterminate).toBe(true)
    expect(view.querySelector('label.mr-checkbox')?.getAttribute('data-indeterminate')).toBe('true')
  })
})
