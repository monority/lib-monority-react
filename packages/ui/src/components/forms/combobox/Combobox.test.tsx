import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { fireEvent } from '@testing-library/dom'
import { Combobox } from './Combobox'

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

const sampleItems = [
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'es', label: 'Spain' },
]

describe('Combobox', () => {
  it('renders with default neutral tone and md size', () => {
    const view = render(<Combobox label="Country" items={sampleItems} />)
    const wrapper = view.querySelector('.mr-combobox')
    expect(wrapper?.getAttribute('data-tone')).toBe('neutral')
    expect(wrapper?.getAttribute('data-size')).toBe('md')
    expect(wrapper?.className).toContain('mr-combobox--neutral')
    expect(wrapper?.className).toContain('mr-combobox--md')
    expect(wrapper?.getAttribute('data-open')).toBeNull()
    expect(wrapper?.getAttribute('data-invalid')).toBeNull()
  })

  it('maps disabled, required, invalid and error states', () => {
    const view = render(
      <Combobox
        label="City"
        items={sampleItems}
        disabled
        required
        invalid
        error="Required field"
      />,
    )
    const wrapper = view.querySelector('.mr-combobox')
    const input = view.querySelector('input')
    expect(wrapper?.getAttribute('data-disabled')).toBe('true')
    expect(wrapper?.getAttribute('data-required')).toBe('true')
    expect(wrapper?.getAttribute('data-invalid')).toBe('true')
    expect(input?.getAttribute('aria-invalid')).toBe('true')
    expect(input?.disabled).toBe(true)
    expect(input?.required).toBe(true)
  })

  it('forwards ref to the native input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Combobox ref={ref} items={sampleItems} />)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.getAttribute('role')).toBe('combobox')
  })

  it('connects hint and error via aria-describedby', () => {
    const view = render(
      <Combobox id="country" label="Country" hint="Choose one" error="Invalid" items={sampleItems} />,
    )
    const input = view.querySelector('input')
    expect(input?.getAttribute('aria-describedby')).toBe('country-hint country-error')
  })

  it('applies accent tone when specified', () => {
    const view = render(<Combobox tone="accent" items={sampleItems} />)
    const wrapper = view.querySelector('.mr-combobox')
    expect(wrapper?.getAttribute('data-tone')).toBe('accent')
    expect(wrapper?.className).toContain('mr-combobox--accent')
  })

  it('applies lg size when specified', () => {
    const view = render(<Combobox size="lg" items={sampleItems} />)
    const wrapper = view.querySelector('.mr-combobox')
    expect(wrapper?.getAttribute('data-size')).toBe('lg')
    expect(wrapper?.className).toContain('mr-combobox--lg')
  })

  it('applies sm size when specified', () => {
    const view = render(<Combobox size="sm" items={sampleItems} />)
    const wrapper = view.querySelector('.mr-combobox')
    expect(wrapper?.getAttribute('data-size')).toBe('sm')
    expect(wrapper?.className).toContain('mr-combobox--sm')
  })

  it('applies danger tone when specified', () => {
    const view = render(<Combobox tone="danger" items={sampleItems} />)
    const wrapper = view.querySelector('.mr-combobox')
    expect(wrapper?.getAttribute('data-tone')).toBe('danger')
    expect(wrapper?.className).toContain('mr-combobox--danger')
  })

  it('opens dropdown on focus and sets aria-expanded', () => {
    const view = render(<Combobox label="Country" items={sampleItems} />)
    const input = view.querySelector('input')
    act(() => { input?.focus() })
    const wrapper = view.querySelector('.mr-combobox')
    expect(input?.getAttribute('aria-expanded')).toBe('true')
    expect(wrapper?.getAttribute('data-open')).toBe('true')
  })

  it('selects an item and closes dropdown', () => {
    const onChange = vi.fn()
    const view = render(
      <Combobox label="Country" items={sampleItems} onChange={onChange} />,
    )
    const input = view.querySelector('input')
    act(() => { input?.focus() })

    // Portal renders to document.body
    const firstItem = document.querySelector('.mr-combobox__item')
    act(() => { firstItem?.dispatchEvent(new MouseEvent('click', { bubbles: true })) })

    expect(onChange).toHaveBeenCalledWith('fr')
    expect(input?.getAttribute('aria-expanded')).toBe('false')
  })

  it('filters items when typing', () => {
    const view = render(<Combobox label="Country" items={sampleItems} />)
    const input = view.querySelector('input')
    act(() => { input?.focus() })

    act(() => {
      fireEvent.input(input!, { target: { value: 'Ger' } })
    })

    // Portal renders to document.body
    const items = document.querySelectorAll('.mr-combobox__item')
    expect(items.length).toBe(1)
    expect(items[0]?.textContent).toContain('Germany')
  })

  it('supports controlled value', () => {
    const view = render(
      <Combobox label="Country" items={sampleItems} value="de" />,
    )
    const input = view.querySelector('input')
    expect(input?.value).toBe('Germany')
  })

  it('supports uncontrolled defaultValue', () => {
    const view = render(
      <Combobox label="Country" items={sampleItems} defaultValue="es" />,
    )
    const input = view.querySelector('input')
    expect(input?.value).toBe('Spain')
  })

  it('renders empty state when no items match', () => {
    const view = render(<Combobox label="Country" items={sampleItems} emptyLabel="No results" />)
    const input = view.querySelector('input')
    act(() => { input?.focus() })

    act(() => {
      fireEvent.input(input!, { target: { value: 'xyz' } })
    })

    // Portal renders to document.body
    const empty = document.querySelector('.mr-combobox__empty')
    expect(empty?.textContent).toBe('No results')
  })
})
