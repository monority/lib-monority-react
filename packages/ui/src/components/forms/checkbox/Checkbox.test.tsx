import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
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
})
