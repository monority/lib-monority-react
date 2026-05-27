import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Popover } from './Popover'

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

describe('Popover', () => {
  it('renders trigger', () => {
    render(<Popover trigger="Click me"><span>Content</span></Popover>)
    const trigger = container?.querySelector('button')
    expect(trigger?.textContent).toBe('Click me')
  })

  it('opens on trigger click', () => {
    render(<Popover trigger="Click me"><span>Content</span></Popover>)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    const wrapper = container?.querySelector('.mr-popover')
    expect(wrapper?.getAttribute('data-open')).toBe('true')
  })

  it('closes on outside click', () => {
    render(<Popover trigger="Click me"><span>Content</span></Popover>)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    expect(container?.querySelector('.mr-popover')?.getAttribute('data-open')).toBe('true')
    // Simulate outside click on an element outside both root and portal
    act(() => {
      const outside = document.createElement('div')
      document.body.appendChild(outside)
      outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
      outside.remove()
    })
    // After outside click, data-open should be removed (false -> undefined)
    const wrapper = container?.querySelector('.mr-popover')
    expect(wrapper?.getAttribute('data-open')).toBeNull()
  })

  it('applies align/side data-*', () => {
    render(<Popover trigger="Click me" align="end" side="top"><span>Content</span></Popover>)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    const wrapper = container?.querySelector('.mr-popover')
    expect(wrapper?.getAttribute('data-align')).toBe('end')
    expect(wrapper?.getAttribute('data-side')).toBe('top')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Popover ref={ref} trigger="Click me"><span>Content</span></Popover>)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-popover')
  })

  it('supports controlled open', () => {
    const onOpenChange = vi.fn()
    render(<Popover trigger="Click me" open onOpenChange={onOpenChange}><span>Content</span></Popover>)
    const wrapper = container?.querySelector('.mr-popover')
    expect(wrapper?.getAttribute('data-open')).toBe('true')
  })

  it('supports defaultOpen', () => {
    render(<Popover trigger="Click me" defaultOpen><span>Content</span></Popover>)
    const wrapper = container?.querySelector('.mr-popover')
    expect(wrapper?.getAttribute('data-open')).toBe('true')
  })
})
