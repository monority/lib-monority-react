import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { IconButton } from './IconButton'

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

describe('IconButton', () => {
  it('renders with aria-label', () => {
    const view = render(<IconButton label="Close">✕</IconButton>)
    const btn = view.querySelector('button')
    expect(btn?.getAttribute('aria-label')).toBe('Close')
    expect(btn?.textContent).toBe('✕')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<IconButton ref={ref} label="X">✕</IconButton>)
    expect(ref.current?.tagName).toBe('BUTTON')
  })

  it('applies data-* attributes', () => {
    const view = render(<IconButton label="Edit" size="lg" tone="accent">✎</IconButton>)
    const btn = view.querySelector('button')
    expect(btn?.getAttribute('data-size')).toBe('lg')
    expect(btn?.getAttribute('data-tone')).toBe('accent')
  })

  it('maps disabled state', () => {
    const view = render(<IconButton label="X" disabled>✕</IconButton>)
    const btn = view.querySelector('button')
    expect(btn?.disabled).toBe(true)
    expect(btn?.getAttribute('data-disabled')).toBe('true')
  })
})
