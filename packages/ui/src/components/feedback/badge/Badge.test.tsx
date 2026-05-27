import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Badge } from './Badge'

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

describe('Badge', () => {
  it('renders children with default hooks', () => {
    const view = render(<Badge>Draft</Badge>)
    const badge = view.querySelector('span')

    expect(badge?.textContent).toBe('Draft')
    expect(badge?.className).toContain('mr-badge')
    expect(badge?.getAttribute('data-variant')).toBe('default')
  })

  it('maps variant to class and data hooks', () => {
    const view = render(<Badge variant="success">Live</Badge>)
    const badge = view.querySelector('span')

    expect(badge?.className).toContain('mr-badge--success')
    expect(badge?.getAttribute('data-variant')).toBe('success')
  })

  it('forwards ref to the root span element', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Badge ref={ref}>Label</Badge>)
    expect(ref.current?.tagName).toBe('SPAN')
    expect(ref.current?.className).toContain('mr-badge')
  })

  it('renders with variant="primary"', () => {
    const view = render(<Badge variant="primary">New</Badge>)
    const badge = view.querySelector('span')
    expect(badge?.getAttribute('data-variant')).toBe('primary')
  })

  it('renders with variant="danger"', () => {
    const view = render(<Badge variant="danger">Error</Badge>)
    const badge = view.querySelector('span')
    expect(badge?.getAttribute('data-variant')).toBe('danger')
  })
})
