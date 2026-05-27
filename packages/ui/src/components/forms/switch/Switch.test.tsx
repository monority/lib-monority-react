import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Switch } from './Switch'

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

describe('Switch', () => {
  it('renders default unchecked state with accent tone and md size', () => {
    const view = render(<Switch label="Enable notifications" />)
    const label = view.querySelector('label')
    const input = view.querySelector('input')
    expect(label?.textContent).toBe('Enable notifications')
    expect(label?.getAttribute('data-tone')).toBe('accent')
    expect(label?.getAttribute('data-size')).toBe('md')
    expect(label?.className).toContain('mr-switch--accent')
    expect(label?.className).toContain('mr-switch--md')
    expect(label?.getAttribute('data-checked')).toBeNull()
    expect(input?.type).toBe('checkbox')
    expect(input?.checked).toBe(false)
    expect(input?.getAttribute('aria-invalid')).toBeNull()
    expect(input?.getAttribute('role')).toBe('switch')
  })

  it('maps checked, disabled, invalid and required states', () => {
    const view = render(<Switch label="Required" checked disabled invalid required />)
    const label = view.querySelector('label')
    const input = view.querySelector('input')
    expect(label?.className).toContain('mr-switch--checked')
    expect(label?.className).toContain('mr-switch--disabled')
    expect(label?.className).toContain('mr-switch--invalid')
    expect(label?.getAttribute('data-checked')).toBe('true')
    expect(label?.getAttribute('data-disabled')).toBe('true')
    expect(label?.getAttribute('data-invalid')).toBe('true')
    expect(label?.getAttribute('data-required')).toBe('true')
    expect(input?.checked).toBe(true)
    expect(input?.disabled).toBe(true)
    expect(input?.required).toBe(true)
    expect(input?.getAttribute('aria-invalid')).toBe('true')
  })

  it('forwards ref to the native input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Switch ref={ref} />)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('checkbox')
  })

  it('applies danger tone when specified', () => {
    const view = render(<Switch tone="danger" label="Danger" />)
    expect(view.querySelector('label')?.getAttribute('data-tone')).toBe('danger')
    expect(view.querySelector('label')?.className).toContain('mr-switch--danger')
  })

  it('applies neutral tone when specified', () => {
    const view = render(<Switch tone="neutral" />)
    expect(view.querySelector('label')?.getAttribute('data-tone')).toBe('neutral')
    expect(view.querySelector('label')?.className).toContain('mr-switch--neutral')
  })

  it('applies sm and lg sizes with correct data-size', () => {
    const viewSm = render(<Switch size="sm" />)
    expect(viewSm.querySelector('label')?.getAttribute('data-size')).toBe('sm')
    expect(viewSm.querySelector('label')?.className).toContain('mr-switch--sm')
    const viewLg = render(<Switch size="lg" />)
    expect(viewLg.querySelector('label')?.getAttribute('data-size')).toBe('lg')
    expect(viewLg.querySelector('label')?.className).toContain('mr-switch--lg')
  })
})
