import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Menubar } from './Menubar'

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

const basicItems = [
  {
    label: 'File',
    items: [
      { label: 'New', shortcut: 'Ctrl+N', onClick: vi.fn() },
      { label: 'Open', shortcut: 'Ctrl+O', onClick: vi.fn() },
      { separator: true } as const,
      { label: 'Save', shortcut: 'Ctrl+S', onClick: vi.fn() },
      { label: 'Exit', onClick: vi.fn() },
    ],
  },
  {
    label: 'Edit',
    items: [
      { label: 'Undo', shortcut: 'Ctrl+Z', onClick: vi.fn() },
      { label: 'Redo', shortcut: 'Ctrl+Y', onClick: vi.fn() },
      { separator: true } as const,
      { label: 'Cut', shortcut: 'Ctrl+X', onClick: vi.fn() },
      { label: 'Copy', shortcut: 'Ctrl+C', onClick: vi.fn() },
      { label: 'Paste', shortcut: 'Ctrl+V', onClick: vi.fn() },
    ],
  },
  {
    label: 'View',
    items: [
      { label: 'Zoom In', shortcut: 'Ctrl++', onClick: vi.fn() },
      { label: 'Zoom Out', shortcut: 'Ctrl+-', onClick: vi.fn() },
    ],
  },
]

const itemsWithDisabled = [
  {
    label: 'File',
    items: [
      { label: 'New', onClick: vi.fn() },
      { label: 'Open', disabled: true, onClick: vi.fn() },
      { label: 'Save', onClick: vi.fn() },
    ],
  },
  {
    label: 'Edit',
    disabled: true,
    items: [{ label: 'Undo', onClick: vi.fn() }],
  },
]

const itemsWithDanger = [
  {
    label: 'File',
    items: [
      { label: 'New', onClick: vi.fn() },
      { separator: true } as const,
      { label: 'Delete', variant: 'danger' as const, onClick: vi.fn() },
    ],
  },
]

const itemsWithIcons = [
  {
    label: 'File',
    items: [
      { label: 'New', icon: <span data-icon="new">📄</span>, onClick: vi.fn() },
      { label: 'Open', icon: <span data-icon="open">📂</span>, onClick: vi.fn() },
    ],
  },
]

describe('Menubar', () => {
  it('renders menu bar with correct role', () => {
    const view = render(<Menubar items={basicItems} />)
    const menubar = view.querySelector('[role="menubar"]')
    expect(menubar).toBeTruthy()
    expect(menubar?.className).toContain('mr-menubar')
  })

  it('renders all menu triggers', () => {
    const view = render(<Menubar items={basicItems} />)
    const triggers = view.querySelectorAll('.mr-menubar__trigger')
    expect(triggers.length).toBe(3)
    expect(triggers[0].textContent).toBe('File')
    expect(triggers[1].textContent).toBe('Edit')
    expect(triggers[2].textContent).toBe('View')
  })

  it('click opens dropdown', () => {
    const view = render(<Menubar items={basicItems} />)
    const fileTrigger = view.querySelectorAll('.mr-menubar__trigger')[0]

    act(() => {
      fileTrigger.click()
    })

    const menu = view.querySelector('.mr-menubar__menu')
    expect(menu).toBeTruthy()
    expect(fileTrigger.getAttribute('aria-expanded')).toBe('true')
  })

  it('click another menu closes previous', () => {
    const view = render(<Menubar items={basicItems} />)
    const triggers = view.querySelectorAll('.mr-menubar__trigger')

    act(() => {
      triggers[0].click()
    })
    expect(view.querySelectorAll('.mr-menubar__menu').length).toBe(1)

    act(() => {
      triggers[1].click()
    })
    const menus = view.querySelectorAll('.mr-menubar__menu')
    expect(menus.length).toBe(1)
    // The Edit menu should be open, not File
    expect(menus[0].getAttribute('aria-label')).toBe('Edit')
  })

  it('click item calls onClick', () => {
    const onClick = vi.fn()
    const items = [
      {
        label: 'File',
        items: [{ label: 'New', onClick }],
      },
    ]
    const view = render(<Menubar items={items} />)
    const trigger = view.querySelector('.mr-menubar__trigger')!

    act(() => {
      trigger.click()
    })

    const item = view.querySelector('.mr-menubar__item')!
    act(() => {
      item.click()
    })

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('click item closes menu', () => {
    const view = render(<Menubar items={basicItems} />)
    const trigger = view.querySelectorAll('.mr-menubar__trigger')[0]

    act(() => {
      trigger.click()
    })
    expect(view.querySelector('.mr-menubar__menu')).toBeTruthy()

    const item = view.querySelector('.mr-menubar__item')!
    act(() => {
      item.click()
    })

    expect(view.querySelector('.mr-menubar__menu')).toBeNull()
  })

  it('separator renders correctly', () => {
    const view = render(<Menubar items={basicItems} />)
    const trigger = view.querySelectorAll('.mr-menubar__trigger')[0]

    act(() => {
      trigger.click()
    })

    const separator = view.querySelector('.mr-menubar__separator')
    expect(separator).toBeTruthy()
    expect(separator?.getAttribute('role')).toBe('separator')
  })

  it('disabled menu item does not call onClick', () => {
    const onClick = vi.fn()
    const items = [
      {
        label: 'File',
        items: [
          { label: 'New', onClick },
          { label: 'Open', disabled: true, onClick },
        ],
      },
    ]
    const view = render(<Menubar items={items} />)
    const trigger = view.querySelector('.mr-menubar__trigger')!

    act(() => {
      trigger.click()
    })

    const items_ = view.querySelectorAll('.mr-menubar__item')
    const disabledItem = items_[1]
    expect(disabledItem.className).toContain('mr-menubar__item--disabled')

    act(() => {
      disabledItem.click()
    })

    expect(onClick).not.toHaveBeenCalled()
  })

  it('disabled menu group cannot be opened', () => {
    const view = render(<Menubar items={itemsWithDisabled} />)
    const triggers = view.querySelectorAll('.mr-menubar__trigger')
    const editTrigger = triggers[1]

    expect(editTrigger.disabled).toBe(true)

    act(() => {
      editTrigger.click()
    })

    expect(view.querySelector('.mr-menubar__menu')).toBeNull()
  })

  it('shortcut displays', () => {
    const view = render(<Menubar items={basicItems} />)
    const trigger = view.querySelectorAll('.mr-menubar__trigger')[0]

    act(() => {
      trigger.click()
    })

    const shortcut = view.querySelector('.mr-menubar__shortcut')
    expect(shortcut).toBeTruthy()
    expect(shortcut?.textContent).toBe('Ctrl+N')
  })

  it('variant danger applies correct class', () => {
    const view = render(<Menubar items={itemsWithDanger} />)
    const trigger = view.querySelector('.mr-menubar__trigger')!

    act(() => {
      trigger.click()
    })

    const dangerItem = view.querySelector('.mr-menubar__item--danger')
    expect(dangerItem).toBeTruthy()
    expect(dangerItem?.textContent).toContain('Delete')
  })

  it('click outside closes menu', () => {
    const view = render(<Menubar items={basicItems} />)
    const trigger = view.querySelectorAll('.mr-menubar__trigger')[0]

    act(() => {
      trigger.click()
    })
    expect(view.querySelector('.mr-menubar__menu')).toBeTruthy()

    act(() => {
      document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })

    expect(view.querySelector('.mr-menubar__menu')).toBeNull()
  })

  it('Escape closes menu', () => {
    const view = render(<Menubar items={basicItems} />)
    const trigger = view.querySelectorAll('.mr-menubar__trigger')[0]

    act(() => {
      trigger.click()
    })
    expect(view.querySelector('.mr-menubar__menu')).toBeTruthy()

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })

    expect(view.querySelector('.mr-menubar__menu')).toBeNull()
  })

  it('applies custom className', () => {
    const view = render(<Menubar items={basicItems} className="custom-menubar" />)
    const menubar = view.querySelector('[role="menubar"]')
    expect(menubar?.className).toContain('mr-menubar')
    expect(menubar?.className).toContain('custom-menubar')
  })

  it('forwards ref to the div element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Menubar ref={ref} items={basicItems} />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.getAttribute('role')).toBe('menubar')
  })

  it('supports defaultActive', () => {
    const view = render(<Menubar items={basicItems} defaultActive="File" />)
    const menu = view.querySelector('.mr-menubar__menu')
    expect(menu).toBeTruthy()
    expect(menu?.getAttribute('aria-label')).toBe('File')
  })

  it('menu items have role="menuitem"', () => {
    const view = render(<Menubar items={basicItems} />)
    const trigger = view.querySelectorAll('.mr-menubar__trigger')[0]

    act(() => {
      trigger.click()
    })

    const menuItems = view.querySelectorAll('.mr-menubar__menu [role="menuitem"]')
    expect(menuItems.length).toBeGreaterThanOrEqual(3)
  })

  it('renders icons when provided', () => {
    const view = render(<Menubar items={itemsWithIcons} />)
    const trigger = view.querySelector('.mr-menubar__trigger')!

    act(() => {
      trigger.click()
    })

    const icon = view.querySelector('.mr-menubar__item-icon')
    expect(icon).toBeTruthy()
    expect(icon?.textContent).toContain('📄')
  })

  it('toggles same menu on repeated click', () => {
    const view = render(<Menubar items={basicItems} />)
    const trigger = view.querySelectorAll('.mr-menubar__trigger')[0]

    act(() => {
      trigger.click()
    })
    expect(view.querySelector('.mr-menubar__menu')).toBeTruthy()

    act(() => {
      trigger.click()
    })
    expect(view.querySelector('.mr-menubar__menu')).toBeNull()
  })

  it('data-active attribute on active menu wrapper', () => {
    const view = render(<Menubar items={basicItems} />)
    const trigger = view.querySelectorAll('.mr-menubar__trigger')[0]

    act(() => {
      trigger.click()
    })

    const wrappers = view.querySelectorAll('.mr-menubar__menu-wrapper')
    const activeWrapper = wrappers[0]
    expect(activeWrapper.getAttribute('data-active')).toBe('true')
    expect(wrappers[1].getAttribute('data-active')).toBeNull()
  })
})
