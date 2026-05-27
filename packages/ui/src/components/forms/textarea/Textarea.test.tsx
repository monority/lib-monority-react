import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Textarea } from './Textarea'

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

describe('Textarea', () => {
  it('renders with default neutral tone and md size', () => {
    const view = render(<Textarea label="Bio" />)
    const textarea = view.querySelector('textarea')
    expect(textarea?.getAttribute('data-tone')).toBe('neutral')
    expect(textarea?.getAttribute('data-size')).toBe('md')
    expect(textarea?.className).toContain('mr-textarea--neutral')
    expect(textarea?.className).toContain('mr-textarea--md')
    expect(textarea?.getAttribute('aria-invalid')).toBeNull()
  })

  it('maps disabled, required, invalid and error states', () => {
    const view = render(<Textarea label="Comment" disabled required invalid error="Required" />)
    const textarea = view.querySelector('textarea')
    expect(textarea?.className).toContain('mr-textarea--disabled')
    expect(textarea?.className).toContain('mr-textarea--invalid')
    expect(textarea?.getAttribute('data-disabled')).toBe('true')
    expect(textarea?.getAttribute('data-required')).toBe('true')
    expect(textarea?.getAttribute('data-invalid')).toBe('true')
    expect(textarea?.getAttribute('aria-invalid')).toBe('true')
    expect(textarea?.disabled).toBe(true)
    expect(textarea?.required).toBe(true)
  })

  it('forwards ref to the native textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} />)
    expect(ref.current?.tagName).toBe('TEXTAREA')
  })

  it('connects hint and error via aria-describedby', () => {
    const view = render(<Textarea id="bio" label="Bio" hint="Max 500 chars" error="Too long" />)
    const textarea = view.querySelector('textarea')
    expect(textarea?.getAttribute('aria-describedby')).toBe('bio-hint bio-error')
  })

  it('applies accent tone when specified', () => {
    const view = render(<Textarea tone="accent" />)
    const textarea = view.querySelector('textarea')
    expect(textarea?.getAttribute('data-tone')).toBe('accent')
    expect(textarea?.className).toContain('mr-textarea--accent')
  })

  it('applies lg size when specified', () => {
    const view = render(<Textarea size="lg" />)
    const textarea = view.querySelector('textarea')
    expect(textarea?.getAttribute('data-size')).toBe('lg')
    expect(textarea?.className).toContain('mr-textarea--lg')
  })

  it('renders label, hint, and error via Field wrapper', () => {
    const view = render(<Textarea id="msg" label="Message" hint="Optional" error="Invalid" required />)
    const label = view.querySelector('label')
    const hint = view.querySelector('#msg-hint')
    const error = view.querySelector('#msg-error')
    expect(label?.getAttribute('for')).toBe('msg')
    expect(label?.textContent).toContain('Message')
    expect(hint?.textContent).toBe('Optional')
    expect(error?.getAttribute('role')).toBe('alert')
    expect(error?.textContent).toBe('Invalid')
  })
})
