import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Field } from './Field'

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

describe('Field', () => {
  it('renders with label, hint, and error', () => {
    const view = render(
      <Field label="Name" hint="Enter your name" error="Required">
        <input />
      </Field>,
    )
    expect(view.querySelector('.mr-field__label')?.textContent).toBe('Name')
    expect(view.querySelector('.mr-field__hint')?.textContent).toBe('Enter your name')
    expect(view.querySelector('.mr-field__error')?.textContent).toBe('Required')
  })

  it('shows required asterisk when required=true', () => {
    const view = render(<Field label="Email" required />)
    const required = view.querySelector('.mr-field__required')
    expect(required).not.toBeNull()
    expect(required?.textContent).toBe(' *')
  })

  it('does not show required asterisk when required=false', () => {
    const view = render(<Field label="Email" />)
    expect(view.querySelector('.mr-field__required')).toBeNull()
  })

  it('applies htmlFor to label', () => {
    const view = render(<Field label="Name" htmlFor="my-input" />)
    expect(view.querySelector('label')?.getAttribute('for')).toBe('my-input')
  })

  it('applies hintId and errorId', () => {
    const view = render(
      <Field hint="hint" error="err" hintId="h1" errorId="e1" />,
    )
    expect(view.querySelector('.mr-field__hint')?.id).toBe('h1')
    expect(view.querySelector('.mr-field__error')?.id).toBe('e1')
  })

  it('renders error with role=alert and aria-live=assertive', () => {
    const view = render(<Field error="Bad value" />)
    const error = view.querySelector('.mr-field__error')
    expect(error?.getAttribute('role')).toBe('alert')
    expect(error?.getAttribute('aria-live')).toBe('assertive')
  })

  it('applies custom className', () => {
    const view = render(<Field className="custom-class" />)
    expect(view.querySelector('.mr-field')?.classList.contains('custom-class')).toBe(true)
  })

  it('renders children', () => {
    const view = render(<Field><span data-testid="child">hello</span></Field>)
    expect(view.querySelector('[data-testid="child"]')?.textContent).toBe('hello')
  })

  it('omits label/hint/error when not provided', () => {
    const view = render(<Field />)
    expect(view.querySelector('.mr-field__label')).toBeNull()
    expect(view.querySelector('.mr-field__hint')).toBeNull()
    expect(view.querySelector('.mr-field__error')).toBeNull()
  })
})
