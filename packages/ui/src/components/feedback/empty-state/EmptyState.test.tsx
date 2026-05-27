import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { EmptyState } from './EmptyState'

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

describe('EmptyState', () => {
  it('renders title', () => {
    const view = render(<EmptyState title="Nothing here" />)
    expect(view.textContent).toContain('Nothing here')
  })

  it('renders description when provided', () => {
    const view = render(<EmptyState title="Empty" description="Add some items" />)
    expect(view.textContent).toContain('Add some items')
  })

  it('renders icon when provided', () => {
    const view = render(<EmptyState title="Empty" icon={<span>📦</span>} />)
    expect(view.querySelector('[aria-hidden="true"]')?.textContent).toBe('📦')
  })

  it('renders action buttons', () => {
    const view = render(<EmptyState title="Empty" action={<button>Add</button>} />)
    expect(view.querySelector('button')?.textContent).toBe('Add')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<EmptyState ref={ref} title="Test" />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-empty-state')
  })
})
