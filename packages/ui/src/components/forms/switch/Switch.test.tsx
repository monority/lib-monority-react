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
    const switchEl = view.querySelector('.mr-switch')
    const input = view.querySelector('input')
    expect(view.textContent).toContain('Enable notifications')
    expect(switchEl?.getAttribute('data-tone')).toBe('accent')
    expect(switchEl?.getAttribute('data-size')).toBe('md')
    expect(switchEl?.className).toContain('mr-switch--accent')
    expect(switchEl?.className).toContain('mr-switch--md')
    expect(switchEl?.getAttribute('data-checked')).toBeNull()
    expect(input?.type).toBe('checkbox')
    expect(input?.checked).toBe(false)
    expect(input?.getAttribute('aria-invalid')).toBeNull()
    expect(input?.getAttribute('role')).toBe('switch')
  })

  it('maps checked, disabled, invalid and required states', () => {
    const view = render(<Switch label="Required" checked disabled invalid required />)
    const switchEl = view.querySelector('.mr-switch')
    const input = view.querySelector('input')
    expect(switchEl?.className).toContain('mr-switch--checked')
    expect(switchEl?.className).toContain('mr-switch--disabled')
    expect(switchEl?.className).toContain('mr-switch--invalid')
    expect(switchEl?.getAttribute('data-checked')).toBe('true')
    expect(switchEl?.getAttribute('data-disabled')).toBe('true')
    expect(switchEl?.getAttribute('data-invalid')).toBe('true')
    expect(switchEl?.getAttribute('data-required')).toBe('true')
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
    expect(view.querySelector('.mr-switch')?.getAttribute('data-tone')).toBe('danger')
    expect(view.querySelector('.mr-switch')?.className).toContain('mr-switch--danger')
  })

  it('applies neutral tone when specified', () => {
    const view = render(<Switch tone="neutral" />)
    expect(view.querySelector('.mr-switch')?.getAttribute('data-tone')).toBe('neutral')
    expect(view.querySelector('.mr-switch')?.className).toContain('mr-switch--neutral')
  })

  it('applies sm and lg sizes with correct data-size', () => {
    const viewSm = render(<Switch size="sm" />)
    expect(viewSm.querySelector('.mr-switch')?.getAttribute('data-size')).toBe('sm')
    expect(viewSm.querySelector('.mr-switch')?.className).toContain('mr-switch--sm')
    const viewLg = render(<Switch size="lg" />)
    expect(viewLg.querySelector('.mr-switch')?.getAttribute('data-size')).toBe('lg')
    expect(viewLg.querySelector('.mr-switch')?.className).toContain('mr-switch--lg')
  })

  it('renders hint and error via Field wrapper', () => {
    const view = render(<Switch id="notif" label="Notify" hint="Enable for alerts" error="Required" />)
    const hint = view.querySelector('#notif-hint')
    const error = view.querySelector('#notif-error')
    const input = view.querySelector('input')
    expect(hint?.textContent).toBe('Enable for alerts')
    expect(error?.getAttribute('role')).toBe('alert')
    expect(error?.textContent).toBe('Required')
    expect(input?.getAttribute('aria-describedby')).toBe('notif-hint notif-error')
    expect(input?.getAttribute('aria-invalid')).toBe('true')
  })

  it('shows label rendered by Field wrapper', () => {
    const view = render(<Switch label="Silent mode" />)
    expect(view.textContent).toContain('Silent mode')
  })

  it('sets aria-invalid when error is provided', () => {
    const view = render(<Switch error="Required" />)
    expect(view.querySelector('input')?.getAttribute('aria-invalid')).toBe('true')
  })
})
