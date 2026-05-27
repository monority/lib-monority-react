import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Callout } from './Callout'

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

describe('Callout', () => {
  it('renders title', () => {
    const view = render(<Callout title="Note" />)
    expect(view.querySelector('.mr-callout__title')?.textContent).toBe('Note')
  })

  it('renders description', () => {
    const view = render(<Callout description="Details" />)
    expect(view.querySelector('.mr-callout__description')?.textContent).toBe('Details')
  })

  it('renders children', () => {
    const view = render(<Callout><span>extra</span></Callout>)
    expect(view.querySelector('span')?.textContent).toBe('extra')
  })

  it('applies tone', () => {
    const view = render(<Callout tone="warning" title="Caution" />)
    const el = view.querySelector('div')
    expect(el?.className).toContain('mr-callout--warning')
    expect(el?.getAttribute('data-tone')).toBe('warning')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Callout ref={ref} title="Test" />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-callout')
  })
})
