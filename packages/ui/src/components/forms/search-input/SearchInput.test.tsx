import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SearchInput } from './SearchInput'

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

describe('SearchInput', () => {
  it('renders with type search and default md size', () => {
    const view = render(<SearchInput label="Search" />)
    const input = view.querySelector('input')
    expect(input?.type).toBe('search')
    expect(input?.getAttribute('data-size')).toBe('md')
    expect(input?.className).toContain('mr-search-input--md')
  })

  it('shows clear button when value is present', () => {
    const view = render(<SearchInput defaultValue="hello" />)
    expect(view.querySelector('.mr-search-input__clear')).toBeTruthy()
  })

  it('hides clear button when value is empty', () => {
    const view = render(<SearchInput />)
    expect(view.querySelector('.mr-search-input__clear')).toBeNull()
  })

  it('maps disabled, required and error states', () => {
    const view = render(<SearchInput label="Search" disabled required error="Required" />)
    const input = view.querySelector('input')
    expect(input?.disabled).toBe(true)
    expect(input?.required).toBe(true)
    expect(input?.getAttribute('aria-invalid')).toBe('true')
  })

  it('forwards ref to the native input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<SearchInput ref={ref} />)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('search')
  })

  it('calls onClear when clear button clicked', () => {
    const onClear = vi.fn()
    const view = render(<SearchInput defaultValue="test" onClear={onClear} />)
    act(() => view.querySelector('button')?.click())
    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('applies sm and lg sizes', () => {
    const sm = render(<SearchInput size="sm" />)
    expect(sm.querySelector('input')?.getAttribute('data-size')).toBe('sm')
    const lg = render(<SearchInput size="lg" />)
    expect(lg.querySelector('input')?.getAttribute('data-size')).toBe('lg')
  })

  it('renders hint and error with aria-describedby', () => {
    const view = render(<SearchInput hint="Type here" error="Error" />)
    const describedBy = view.querySelector('input')?.getAttribute('aria-describedby')
    expect(describedBy).toContain('-hint')
    expect(describedBy).toContain('-error')
  })
})
