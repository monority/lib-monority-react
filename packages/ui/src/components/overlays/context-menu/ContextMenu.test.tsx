import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContextMenu } from './ContextMenu'

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

describe('ContextMenu', () => {
  const sampleItems = [
    { value: 'edit', label: 'Edit' },
    { value: 'sep-1', label: '', type: 'separator' as const },
    { value: 'delete', label: 'Delete', danger: true },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ]

  it('renders trigger', () => {
    render(<ContextMenu trigger="Right-click me" items={sampleItems} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    expect(trigger?.textContent).toBe('Right-click me')
  })

  it('opens on right-click (contextmenu)', () => {
    render(<ContextMenu trigger="Right-click me" items={sampleItems} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    act(() => {
      trigger?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }))
    })
    const wrapper = container?.querySelector('.mr-context-menu')
    expect(wrapper?.getAttribute('data-open')).toBe('true')
  })

  it('renders items when open', () => {
    render(<ContextMenu trigger="Right-click me" items={sampleItems} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    act(() => {
      trigger?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }))
    })
    const menuItems = document.body.querySelectorAll('[role="menuitem"]')
    expect(menuItems.length).toBe(3)
    expect(document.body.querySelector('.mr-context-menu__separator')).not.toBeNull()
  })

  it('closes on click outside', () => {
    render(<ContextMenu trigger="Right-click me" items={sampleItems} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    act(() => {
      trigger?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }))
    })
    expect(container?.querySelector('.mr-context-menu')?.getAttribute('data-open')).toBe('true')

    act(() => {
      document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })

    expect(container?.querySelector('.mr-context-menu')?.getAttribute('data-open')).not.toBe('true')
  })

  it('closes on Escape', () => {
    render(<ContextMenu trigger="Right-click me" items={sampleItems} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    act(() => {
      trigger?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }))
    })
    expect(container?.querySelector('.mr-context-menu')?.getAttribute('data-open')).toBe('true')

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    })

    expect(container?.querySelector('.mr-context-menu')?.getAttribute('data-open')).not.toBe('true')
  })

  it('closes on item selection', () => {
    const onSelect = vi.fn()
    const items = [{ value: 'copy', label: 'Copy', onSelect }]
    render(<ContextMenu trigger="Right-click me" items={items} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    act(() => {
      trigger?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }))
    })
    const menuItem = document.body.querySelector('[role="menuitem"]')
    act(() => {
      menuItem?.click()
    })
    expect(onSelect).toHaveBeenCalledWith('copy')
    expect(container?.querySelector('.mr-context-menu')?.getAttribute('data-open')).not.toBe('true')
  })

  it('renders separator', () => {
    render(<ContextMenu trigger="Right-click me" items={sampleItems} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    act(() => {
      trigger?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }))
    })
    expect(document.body.querySelector('[role="separator"]')).not.toBeNull()
  })

  it('renders disabled items', () => {
    render(<ContextMenu trigger="Right-click me" items={sampleItems} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    act(() => {
      trigger?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }))
    })
    const disabledBtn = document.body.querySelector<HTMLButtonElement>('[role="menuitem"][disabled]')
    expect(disabledBtn?.textContent).toBe('Disabled')
  })

  it('renders danger items with is-danger class', () => {
    render(<ContextMenu trigger="Right-click me" items={sampleItems} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    act(() => {
      trigger?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }))
    })
    const dangerBtn = document.body.querySelector('[role="menuitem"].is-danger')
    expect(dangerBtn?.textContent).toBe('Delete')
  })

  it('supports controlled open state', () => {
    const onOpenChange = vi.fn()
    render(<ContextMenu trigger="Right-click me" items={sampleItems} open={true} onOpenChange={onOpenChange} />)
    expect(container?.querySelector('.mr-context-menu')?.getAttribute('data-open')).toBe('true')

    act(() => {
      document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<ContextMenu ref={ref} trigger="Right-click me" items={sampleItems} />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-context-menu')
  })

  it('applies className', () => {
    render(<ContextMenu trigger="Right-click me" items={sampleItems} className="custom-class" />)
    const wrapper = container?.querySelector('.mr-context-menu')
    expect(wrapper?.className).toContain('custom-class')
  })

  it('keyboard navigation with ArrowDown', () => {
    render(<ContextMenu trigger="Right-click me" items={sampleItems} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    act(() => {
      trigger?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }))
    })
    const content = document.body.querySelector('.mr-context-menu__content')
    act(() => {
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    })
    const menuItems = document.body.querySelectorAll('[role="menuitem"]')
    expect(document.activeElement).toBe(menuItems[1])
  })

  it('keyboard navigation with ArrowUp', () => {
    const simpleItems = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' },
    ]
    render(<ContextMenu trigger="Right-click me" items={simpleItems} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    act(() => {
      trigger?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }))
    })
    const content = document.body.querySelector('.mr-context-menu__content')
    act(() => {
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
    })
    const menuItems = document.body.querySelectorAll('[role="menuitem"]')
    expect(document.activeElement).toBe(menuItems[0])
  })

  it('navigates to first with Home', () => {
    render(<ContextMenu trigger="Right-click me" items={sampleItems} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    act(() => {
      trigger?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }))
    })
    const content = document.body.querySelector('.mr-context-menu__content')
    act(() => {
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))
    })
    const menuItems = document.body.querySelectorAll('[role="menuitem"]')
    expect(document.activeElement).toBe(menuItems[0])
  })

  it('navigates to last with End', () => {
    const simpleItems = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' },
    ]
    render(<ContextMenu trigger="Right-click me" items={simpleItems} />)
    const trigger = container?.querySelector('.mr-context-menu__trigger')
    act(() => {
      trigger?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }))
    })
    const content = document.body.querySelector('.mr-context-menu__content')
    act(() => {
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
    })
    const menuItems = document.body.querySelectorAll('[role="menuitem"]')
    expect(document.activeElement).toBe(menuItems[menuItems.length - 1])
  })
})
