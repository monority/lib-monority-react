import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Collapsible } from './Collapsible'

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

describe('Collapsible', () => {
  it('renders with title', () => {
    const view = render(<Collapsible title="My Title">Content</Collapsible>)
    const trigger = view.querySelector('.mr-collapsible__trigger')
    expect(trigger?.textContent).toBe('My Title')
  })

  it('children are hidden by default', () => {
    const view = render(<Collapsible title="Title">Hidden content</Collapsible>)
    const panel = view.querySelector('.mr-collapsible__panel') as HTMLElement
    expect(panel.hidden).toBe(true)
  })

  it('clicking trigger expands content', () => {
    const view = render(<Collapsible title="Title">Visible content</Collapsible>)
    const trigger = view.querySelector('.mr-collapsible__trigger') as HTMLButtonElement
    const panel = view.querySelector('.mr-collapsible__panel') as HTMLElement

    expect(panel.hidden).toBe(true)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    act(() => trigger.click())

    expect(panel.hidden).toBe(false)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
  })

  it('supports uncontrolled mode with defaultOpen', () => {
    const view = render(
      <Collapsible title="Title" defaultOpen>
        Pre-opened
      </Collapsible>,
    )
    const panel = view.querySelector('.mr-collapsible__panel') as HTMLElement
    expect(panel.hidden).toBe(false)
  })

  it('supports controlled mode', () => {
    const view = render(
      <Collapsible title="Title" open={false}>
        Controlled
      </Collapsible>,
    )
    const panel = view.querySelector('.mr-collapsible__panel') as HTMLElement
    expect(panel.hidden).toBe(true)
  })

  it('calls onOpenChange when toggled', () => {
    const onOpenChange = vi.fn()
    const view = render(
      <Collapsible title="Title" onOpenChange={onOpenChange}>
        Content
      </Collapsible>,
    )
    const trigger = view.querySelector('.mr-collapsible__trigger') as HTMLButtonElement

    act(() => trigger.click())
    expect(onOpenChange).toHaveBeenCalledWith(true)

    act(() => trigger.click())
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('controlled open does not change internal state on click', () => {
    const onOpenChange = vi.fn()
    const view = render(
      <Collapsible title="Title" open={false} onOpenChange={onOpenChange}>
        Controlled content
      </Collapsible>,
    )
    const trigger = view.querySelector('.mr-collapsible__trigger') as HTMLButtonElement
    const panel = view.querySelector('.mr-collapsible__panel') as HTMLElement

    act(() => trigger.click())
    // Panel stays hidden because open is controlled to false
    expect(panel.hidden).toBe(true)
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Collapsible ref={ref} title="Title">
        Content
      </Collapsible>,
    )
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-collapsible')
  })

  it('applies custom className', () => {
    const view = render(
      <Collapsible title="Title" className="my-custom-class">
        Content
      </Collapsible>,
    )
    const root = view.querySelector('.mr-collapsible')
    expect(root?.className).toContain('my-custom-class')
  })

  it('size variants produce correct CSS classes', () => {
    const viewSm = render(
      <Collapsible title="Title" size="sm">
        Content
      </Collapsible>,
    )
    expect(viewSm.querySelector('.mr-collapsible')?.className).toContain('mr-collapsible--sm')

    const viewMd = render(
      <Collapsible title="Title" size="md">
        Content
      </Collapsible>,
    )
    expect(viewMd.querySelector('.mr-collapsible')?.className).toContain('mr-collapsible--md')

    const viewLg = render(
      <Collapsible title="Title" size="lg">
        Content
      </Collapsible>,
    )
    expect(viewLg.querySelector('.mr-collapsible')?.className).toContain('mr-collapsible--lg')
  })

  it('default size has no size modifier class', () => {
    const view = render(
      <Collapsible title="Title">
        Content
      </Collapsible>,
    )
    const el = view.querySelector('.mr-collapsible')
    expect(el?.className).not.toContain('mr-collapsible--sm')
    expect(el?.className).not.toContain('mr-collapsible--lg')
  })

  it('has correct ARIA attributes', () => {
    const view = render(<Collapsible title="Title">Content</Collapsible>)
    const trigger = view.querySelector('.mr-collapsible__trigger') as HTMLButtonElement
    const panel = view.querySelector('.mr-collapsible__panel') as HTMLElement

    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(trigger.getAttribute('aria-controls')).toBeTruthy()
    expect(panel.getAttribute('role')).toBe('region')
    expect(panel.getAttribute('aria-labelledby')).toBeTruthy()
    expect(panel.getAttribute('aria-labelledby')).toBe(trigger.getAttribute('id'))
  })

  it('data-open attribute is set when open', () => {
    const view = render(
      <Collapsible title="Title" defaultOpen>
        Content
      </Collapsible>,
    )
    const root = view.querySelector('.mr-collapsible')
    expect(root?.hasAttribute('data-open')).toBe(true)
  })

  it('data-open attribute is absent when closed', () => {
    const view = render(
      <Collapsible title="Title">
        Content
      </Collapsible>,
    )
    const root = view.querySelector('.mr-collapsible')
    expect(root?.getAttribute('data-open')).toBeNull()
  })
})
