import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DropdownMenu } from './DropdownMenu'

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

describe('DropdownMenu', () => {
  const sampleItems = [
    { value: 'edit', label: 'Edit' },
    { value: 'sep-1', label: '', type: 'separator' as const },
    { value: 'delete', label: 'Delete', danger: true },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ]

  it('renders trigger', () => {
    render(<DropdownMenu trigger="Actions" items={sampleItems} />)
    const trigger = container?.querySelector('button')
    expect(trigger?.textContent).toBe('Actions')
  })

  it('opens on click', () => {
    render(<DropdownMenu trigger="Actions" items={sampleItems} />)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    const wrapper = container?.querySelector('.mr-dropdown')
    expect(wrapper?.getAttribute('data-open')).toBe('true')
  })

  it('renders items', () => {
    render(<DropdownMenu trigger="Actions" items={sampleItems} />)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    const menuItems = document.body.querySelectorAll('[role="menuitem"]')
    expect(menuItems.length).toBe(3)
    expect(document.body.querySelector('.mr-dropdown__separator')).not.toBeNull()
  })

  it('selects item', () => {
    const onSelect = vi.fn()
    const items = [{ value: 'copy', label: 'Copy', onSelect }]
    render(<DropdownMenu trigger="Actions" items={items} />)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    const menuItem = document.body.querySelector('[role="menuitem"]')
    act(() => {
      menuItem?.click()
    })
    expect(onSelect).toHaveBeenCalledWith('copy')
  })

  it('keyboard navigation', () => {
    render(<DropdownMenu trigger="Actions" items={sampleItems} />)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    const content = document.body.querySelector('.mr-dropdown__content')
    act(() => {
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    })
    const menuItems = document.body.querySelectorAll('[role="menuitem"]')
    expect(document.activeElement).toBe(menuItems[1])
  })

  it('renders separator', () => {
    render(<DropdownMenu trigger="Actions" items={sampleItems} />)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    expect(document.body.querySelector('[role="separator"]')).not.toBeNull()
  })

  it('renders disabled items', () => {
    render(<DropdownMenu trigger="Actions" items={sampleItems} />)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    const disabledBtn = document.body.querySelector<HTMLButtonElement>('[role="menuitem"][disabled]')
    expect(disabledBtn?.textContent).toBe('Disabled')
  })

  it('renders danger items', () => {
    render(<DropdownMenu trigger="Actions" items={sampleItems} />)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    const dangerBtn = document.body.querySelector('[role="menuitem"].is-danger')
    expect(dangerBtn?.textContent).toBe('Delete')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<DropdownMenu ref={ref} trigger="Actions" items={sampleItems} />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-dropdown')
  })

  it('applies align/side data-*', () => {
    render(<DropdownMenu trigger="Actions" items={sampleItems} align="start" side="top" />)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    const wrapper = container?.querySelector('.mr-dropdown')
    expect(wrapper?.getAttribute('data-align')).toBe('start')
    expect(wrapper?.getAttribute('data-side')).toBe('top')
  })

  it('navigates up with ArrowUp', () => {
    const simpleItems = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' },
    ]
    render(<DropdownMenu trigger="Actions" items={simpleItems} />)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    const content = document.body.querySelector('.mr-dropdown__content')
    act(() => {
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
    })
    const menuItems = document.body.querySelectorAll('[role="menuitem"]')
    expect(document.activeElement).toBe(menuItems[0])
  })

  it('navigates to first with Home', () => {
    render(<DropdownMenu trigger="Actions" items={sampleItems} />)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    const content = document.body.querySelector('.mr-dropdown__content')
    act(() => {
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      content?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))
    })
    const menuItems = document.body.querySelectorAll('[role="menuitem"]')
    expect(document.activeElement).toBe(menuItems[0])
  })

  it('closes on Escape', () => {
    render(<DropdownMenu trigger="Actions" items={sampleItems} />)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    expect(container?.querySelector('.mr-dropdown')?.getAttribute('data-open')).toBe('true')

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    })

    expect(container?.querySelector('.mr-dropdown')?.getAttribute('data-open')).not.toBe('true')
  })

  it('supports controlled open state', () => {
    const onOpenChange = vi.fn()
    render(<DropdownMenu trigger="Actions" items={sampleItems} open={true} onOpenChange={onOpenChange} />)
    expect(container?.querySelector('.mr-dropdown')?.getAttribute('data-open')).toBe('true')

    act(() => {
      document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('closes on click outside', () => {
    render(<DropdownMenu trigger="Actions" items={sampleItems} />)
    const trigger = container?.querySelector('button')
    act(() => {
      trigger?.click()
    })
    expect(container?.querySelector('.mr-dropdown')?.getAttribute('data-open')).toBe('true')

    act(() => {
      document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })

    expect(container?.querySelector('.mr-dropdown')?.getAttribute('data-open')).not.toBe('true')
  })
})
