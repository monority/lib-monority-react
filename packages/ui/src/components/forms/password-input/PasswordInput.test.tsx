import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { PasswordInput } from './PasswordInput'

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

describe('PasswordInput', () => {
  it('renders with type password by default', () => {
    const view = render(<PasswordInput label="Password" />)
    const input = view.querySelector('input')
    expect(input?.type).toBe('password')
    expect(input?.getAttribute('data-size')).toBe('md')
    expect(input?.className).toContain('mr-password-input--md')
  })

  it('maps disabled, required and error states', () => {
    const view = render(<PasswordInput label="Pass" disabled required error="Too weak" />)
    const input = view.querySelector('input')
    expect(input?.disabled).toBe(true)
    expect(input?.required).toBe(true)
    expect(input?.getAttribute('aria-invalid')).toBe('true')
    expect(input?.className).toContain('mr-password-input--disabled')
    expect(input?.className).toContain('mr-password-input--error')
  })

  it('forwards ref to the native input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<PasswordInput ref={ref} />)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('password')
  })

  it('toggles visibility on button click', () => {
    const view = render(<PasswordInput />)
    const toggle = view.querySelector('button')
    expect(toggle).toBeTruthy()
    const input = view.querySelector('input')!
    expect(input.type).toBe('password')
    act(() => toggle?.click())
    expect(input.type).toBe('text')
    act(() => toggle?.click())
    expect(input.type).toBe('password')
  })

  it('hides toggle when showToggle is false', () => {
    const view = render(<PasswordInput showToggle={false} />)
    expect(view.querySelector('button')).toBeNull()
  })

  it('applies sm and lg sizes', () => {
    const sm = render(<PasswordInput size="sm" />)
    expect(sm.querySelector('input')?.getAttribute('data-size')).toBe('sm')
    const lg = render(<PasswordInput size="lg" />)
    expect(lg.querySelector('input')?.getAttribute('data-size')).toBe('lg')
  })

  it('renders hint and error with aria-describedby', () => {
    const view = render(<PasswordInput hint="8+ chars" error="Too short" />)
    const describedBy = view.querySelector('input')?.getAttribute('aria-describedby')
    expect(describedBy).toContain('-hint')
    expect(describedBy).toContain('-error')
  })

  it('toggle button contains SVG icon', () => {
    const view = render(<PasswordInput />)
    const toggle = view.querySelector('button')
    expect(toggle?.querySelector('svg')).toBeTruthy()
  })
})
