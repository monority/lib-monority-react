import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { InputBase } from './InputBase'
import { FormControl } from '@/primitives/form-control/FormControl'

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

describe('InputBase', () => {
  it('renders <input> when as="input"', () => {
    const view = render(<InputBase as="input" />)
    const el = view.querySelector('input')
    expect(el).toBeTruthy()
    expect(el?.tagName.toLowerCase()).toBe('input')
  })

  it('renders <textarea> when as="textarea"', () => {
    const view = render(<InputBase as="textarea" />)
    const el = view.querySelector('textarea')
    expect(el).toBeTruthy()
    expect(el?.tagName.toLowerCase()).toBe('textarea')
  })

  it('renders <select> when as="select"', () => {
    const view = render(<InputBase as="select" />)
    const el = view.querySelector('select')
    expect(el).toBeTruthy()
    expect(el?.tagName.toLowerCase()).toBe('select')
  })

  it('applies mr-input-base class', () => {
    const view = render(<InputBase as="input" />)
    const el = view.querySelector('input')
    expect(el?.className).toContain('mr-input-base')
  })

  it('forwardRef works', () => {
    const ref = createRef<HTMLInputElement>()
    render(<InputBase as="input" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('forwardRef works for textarea', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<InputBase as="textarea" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('forwardRef works for select', () => {
    const ref = createRef<HTMLSelectElement>()
    render(<InputBase as="select" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
  })

  it('extra className is concatenated', () => {
    const view = render(<InputBase as="input" className="custom-class" />)
    const el = view.querySelector('input')
    expect(el?.className).toContain('mr-input-base')
    expect(el?.className).toContain('custom-class')
  })

  it('passes additional props to the underlying element', () => {
    const view = render(<InputBase as="input" placeholder="Enter name" name="username" />)
    const el = view.querySelector('input')
    expect(el?.getAttribute('placeholder')).toBe('Enter name')
    expect(el?.getAttribute('name')).toBe('username')
  })

  it('renders children for select', () => {
    const view = render(
      <InputBase as="select">
        <option value="a">A</option>
        <option value="b">B</option>
      </InputBase>,
    )
    const el = view.querySelector('select')
    expect(el?.children.length).toBe(2)
  })
})

describe('InputBase + FormControl context', () => {
  it('connected to FormControl context — id', () => {
    const view = render(
      <FormControl id="ctx-test">
        <InputBase as="input" />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('id')).toBe('ctx-test')
  })

  it('connected to FormControl context — aria-describedby', () => {
    const view = render(
      <FormControl id="ctx-test" hint error>
        <InputBase as="input" />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('aria-describedby')).toBe('ctx-test-hint ctx-test-error')
  })

  it('connected to FormControl context — aria-invalid from error', () => {
    const view = render(
      <FormControl id="ctx-test" error>
        <InputBase as="input" />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('aria-invalid')).toBe('true')
  })

  it('connected to FormControl context — data-invalid', () => {
    const view = render(
      <FormControl id="ctx-test" error>
        <InputBase as="input" />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('data-invalid')).toBe('true')
  })

  it('connected to FormControl context — data-disabled', () => {
    const view = render(
      <FormControl id="ctx-test" disabled>
        <InputBase as="input" />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('data-disabled')).toBe('true')
  })

  it('connected to FormControl context — data-required', () => {
    const view = render(
      <FormControl id="ctx-test" required>
        <InputBase as="input" />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('data-required')).toBe('true')
  })

  it('connected to FormControl context — data-size', () => {
    const view = render(
      <FormControl id="ctx-test" size="lg">
        <InputBase as="input" />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('data-size')).toBe('lg')
  })

  it('connected to FormControl context — data-tone', () => {
    const view = render(
      <FormControl id="ctx-test" tone="danger">
        <InputBase as="input" />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('data-tone')).toBe('danger')
  })

  it('props override context — size', () => {
    const view = render(
      <FormControl id="ctx-test" size="sm">
        <InputBase as="input" size="lg" />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('data-size')).toBe('lg')
  })

  it('props override context — tone', () => {
    const view = render(
      <FormControl id="ctx-test" tone="neutral">
        <InputBase as="input" tone="accent" />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('data-tone')).toBe('accent')
  })

  it('props override context — invalid', () => {
    const view = render(
      <FormControl id="ctx-test" error>
        <InputBase as="input" invalid={false} />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('data-invalid')).toBe(null)
    expect(el?.getAttribute('aria-invalid')).toBe(null)
  })

  it('props override context — disabled', () => {
    const view = render(
      <FormControl id="ctx-test" disabled>
        <InputBase as="input" disabled={false} />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('data-disabled')).toBe(null)
  })

  it('props override context — required', () => {
    const view = render(
      <FormControl id="ctx-test" required>
        <InputBase as="input" required={false} />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('data-required')).toBe(null)
  })

  it('props override context — id', () => {
    const view = render(
      <FormControl id="ctx-test">
        <InputBase as="input" id="override-id" />
      </FormControl>,
    )
    const el = view.querySelector('input')
    expect(el?.getAttribute('id')).toBe('override-id')
  })

  it('uses defaults when no FormControl provider', () => {
    const view = render(<InputBase as="input" />)
    const el = view.querySelector('input')
    expect(el?.getAttribute('data-size')).toBe('md')
    expect(el?.getAttribute('data-tone')).toBe('neutral')
    expect(el?.getAttribute('data-invalid')).toBe(null)
    expect(el?.getAttribute('data-disabled')).toBe(null)
    expect(el?.getAttribute('data-required')).toBe(null)
  })
})
