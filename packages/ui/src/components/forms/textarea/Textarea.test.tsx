import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
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
    expect(view.querySelector('textarea')?.getAttribute('data-tone')).toBe('accent')
    expect(view.querySelector('textarea')?.className).toContain('mr-textarea--accent')
  })

  it('applies lg size when specified', () => {
    const view = render(<Textarea size="lg" />)
    expect(view.querySelector('textarea')?.getAttribute('data-size')).toBe('lg')
    expect(view.querySelector('textarea')?.className).toContain('mr-textarea--lg')
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

  it('respects resize prop via data-resize', () => {
    const viewNone = render(<Textarea resize="none" />)
    expect(viewNone.querySelector('textarea')?.getAttribute('data-resize')).toBe('none')
    const viewBoth = render(<Textarea resize="both" />)
    expect(viewBoth.querySelector('textarea')?.getAttribute('data-resize')).toBe('both')
    const viewVertical = render(<Textarea resize="vertical" />)
    expect(viewVertical.querySelector('textarea')?.getAttribute('data-resize')).toBe('vertical')
  })

  it('shows character counter when maxLength is provided', () => {
    const view = render(<Textarea id="bio" maxLength={100} value="Hello" onChange={() => {}} />)
    const counter = view.querySelector('.mr-textarea__counter')
    expect(counter?.textContent).toBe('5 / 100')
  })

  it('does not show counter when maxLength is absent', () => {
    const view = render(<Textarea />)
    expect(view.querySelector('.mr-textarea__counter')).toBeNull()
  })

  it('sets aria-invalid when error is provided', () => {
    const view = render(<Textarea error="Required" />)
    expect(view.querySelector('textarea')?.getAttribute('aria-invalid')).toBe('true')
  })

  it.each(['neutral', 'accent', 'danger'] as const)(
    'sets data-tone="%s" and variant class for tone="%s"',
    (tone) => {
      const view = render(<Textarea tone={tone} />)
      const textarea = view.querySelector('textarea')
      expect(textarea?.getAttribute('data-tone')).toBe(tone)
      expect(textarea?.className).toContain(`mr-textarea--${tone}`)
    },
  )

  it.each(['sm', 'md', 'lg'] as const)(
    'sets data-size="%s" and variant class for size="%s"',
    (size) => {
      const view = render(<Textarea size={size} />)
      const textarea = view.querySelector('textarea')
      expect(textarea?.getAttribute('data-size')).toBe(size)
      expect(textarea?.className).toContain(`mr-textarea--${size}`)
    },
  )

  it('calls onChange when value changes', () => {
    const onChange = vi.fn()
    const view = render(<Textarea onChange={onChange} />)
    const textarea = view.querySelector('textarea') as HTMLTextAreaElement
    act(() => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value',
      )?.set
      nativeInputValueSetter?.call(textarea, 'test value')
      textarea.dispatchEvent(new Event('input', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('forwards id to the textarea element', () => {
    const view = render(<Textarea id="my-textarea" />)
    expect(view.querySelector('textarea')?.getAttribute('id')).toBe('my-textarea')
  })

  it('merges custom className on the field wrapper', () => {
    const view = render(<Textarea className="my-custom-class" />)
    const wrapper = view.querySelector('.mr-field')
    expect(wrapper?.className).toContain('my-custom-class')
  })

  it('passes placeholder to the native textarea', () => {
    const view = render(<Textarea placeholder="Enter text..." />)
    expect(view.querySelector('textarea')?.getAttribute('placeholder')).toBe('Enter text...')
  })

  it('renders controlled value', () => {
    const view = render(<Textarea value="Controlled" onChange={() => {}} />)
    expect(view.querySelector('textarea')?.value).toBe('Controlled')
  })
})
