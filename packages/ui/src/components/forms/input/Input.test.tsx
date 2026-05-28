import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Input } from './Input'

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

describe('Input', () => {
  it('renders label and default input hooks', () => {
    const view = render(<Input id="email" label="Email" placeholder="you@example.com" />)
    const label = view.querySelector('label')
    const input = view.querySelector('input')

    expect(label?.getAttribute('for')).toBe('email')
    expect(label?.textContent).toBe('Email')
    expect(input?.className).toContain('mr-input')
    expect(input?.getAttribute('id')).toBe('email')
    expect(input?.getAttribute('placeholder')).toBe('you@example.com')
    expect(input?.getAttribute('aria-invalid')).toBeNull()
  })

  it('maps hint, error, required and disabled state to stable hooks', () => {
    const view = render(
      <Input
        id="name"
        label="Name"
        hint="Visible to teammates"
        error="Name is required"
        required
        disabled
      />,
    )
    const input = view.querySelector('input')
    const hint = view.querySelector('#name-hint')
    const error = view.querySelector('#name-error')

    expect(hint?.textContent).toBe('Visible to teammates')
    expect(error?.getAttribute('role')).toBe('alert')
    expect(input?.className).toContain('mr-input--error')
    expect(input?.getAttribute('aria-invalid')).toBe('true')
    expect(input?.getAttribute('aria-describedby')).toBe('name-hint name-error')
    expect(input?.getAttribute('data-invalid')).toBe('true')
    expect(input?.getAttribute('data-required')).toBe('true')
    expect(input?.getAttribute('data-disabled')).toBe('true')
    expect(input?.hasAttribute('required')).toBe(true)
    expect(input?.hasAttribute('disabled')).toBe(true)
  })

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input ref={ref} id="ref-test" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.id).toBe('ref-test')
  })

  it('calls onChange when value changes', () => {
    const onChange = vi.fn()
    const view = render(<Input onChange={onChange} />)
    const input = view.querySelector('input') as HTMLInputElement
    act(() => {
      // React tracks value internally; bypass tracker to simulate user input
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set
      nativeInputValueSetter?.call(input, 'test value')
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('renders with auto-generated id and linked label', () => {
    const view = render(<Input label="Name" />)
    const label = view.querySelector('label')
    const input = view.querySelector('input')
    const inputId = input?.getAttribute('id')
    expect(inputId).toBeTruthy()
    expect(inputId?.length).toBeGreaterThan(0)
    expect(label?.getAttribute('for')).toBe(inputId)
  })

  it('passes className to the wrapper', () => {
    const view = render(<Input className="custom" />)
    const wrapper = view.querySelector('.mr-field')
    expect(wrapper?.className).toContain('custom')
  })
})
