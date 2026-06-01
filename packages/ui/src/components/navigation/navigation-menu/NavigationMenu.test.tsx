import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NavigationMenu } from './NavigationMenu'

vi.useFakeTimers()

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
  vi.useRealTimers()
})

beforeEach(() => {
  vi.useFakeTimers()
})

const simpleItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const itemsWithSubItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    items: [
      { label: 'Analytics', href: '/products/analytics', description: 'Track your metrics' },
      { label: 'Automation', href: '/products/automation', description: 'Automate workflows' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
]

const itemsWithIcons = [
  { label: 'Dashboard', href: '/dashboard', icon: <span data-icon="dashboard">📊</span> },
  { label: 'Settings', href: '/settings', icon: <span data-icon="settings">⚙️</span> },
]

const itemsWithDisabled = [
  { label: 'Home', href: '/' },
  { label: 'Disabled', href: '/disabled', disabled: true },
  {
    label: 'Disabled Sub',
    disabled: true,
    items: [{ label: 'Sub', href: '/sub' }],
  },
]

describe('NavigationMenu', () => {
  it('renders all top-level items', () => {
    const view = render(<NavigationMenu items={simpleItems} />)
    const nav = view.querySelector('nav')
    expect(nav).toBeTruthy()
    expect(nav?.getAttribute('role')).toBe('navigation')
    expect(nav?.getAttribute('aria-label')).toBe('Main navigation')
    expect(view.querySelectorAll('.mr-nav-menu__item').length).toBe(3)
  })

  it('renders links for items without sub-items', () => {
    const view = render(<NavigationMenu items={simpleItems} />)
    const links = view.querySelectorAll('.mr-nav-menu__link')
    expect(links.length).toBe(3)
    expect(links[0].getAttribute('href')).toBe('/')
    expect(links[1].getAttribute('href')).toBe('/about')
  })

  it('renders sub-items content when item is active (hovered)', () => {
    const view = render(<NavigationMenu items={itemsWithSubItems} />)
    const productsItem = view.querySelectorAll('.mr-nav-menu__item')[1]

    act(() => {
      productsItem.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })

    const content = view.querySelector('.mr-nav-menu__content')
    expect(content).toBeTruthy()
    const subItems = view.querySelectorAll('.mr-nav-menu__sub-item')
    expect(subItems.length).toBe(2)
    expect(subItems[0].textContent).toContain('Analytics')
    expect(subItems[1].textContent).toContain('Automation')
  })

  it('shows sub-item descriptions', () => {
    const view = render(<NavigationMenu items={itemsWithSubItems} />)
    const productsItem = view.querySelectorAll('.mr-nav-menu__item')[1]

    act(() => {
      productsItem.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })

    const desc = view.querySelector('.mr-nav-menu__sub-desc')
    expect(desc?.textContent).toBe('Track your metrics')
  })

  it('active state toggles on hover', () => {
    const view = render(<NavigationMenu items={itemsWithSubItems} />)
    const productsItem = view.querySelectorAll('.mr-nav-menu__item')[1]
    const homeItem = view.querySelectorAll('.mr-nav-menu__item')[0]

    // Hover on Products
    act(() => {
      productsItem.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })
    expect(productsItem.className).toContain('mr-nav-menu__item--active')
    expect(productsItem.getAttribute('data-active')).toBe('true')
    expect(homeItem.className).not.toContain('mr-nav-menu__item--active')

    // Hover on Home - Products should deactivate
    act(() => {
      homeItem.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })
    const updatedProducts = view.querySelectorAll('.mr-nav-menu__item')[1]
    expect(updatedProducts.className).not.toContain('mr-nav-menu__item--active')
    expect(updatedProducts.getAttribute('data-active')).toBeNull()
    expect(homeItem.className).toContain('mr-nav-menu__item--active')
  })

  it('renders icons when provided', () => {
    const view = render(<NavigationMenu items={itemsWithIcons} />)
    const iconContainers = view.querySelectorAll('.mr-nav-menu__icon')
    expect(iconContainers.length).toBe(2)
    // The icon prop renders inside the icon container
    expect(iconContainers[0].textContent).toContain('📊')
    expect(iconContainers[1].textContent).toContain('⚙️')
  })

  it('renders disabled items with correct attributes', () => {
    const view = render(<NavigationMenu items={itemsWithDisabled} />)
    const disabledItem = view.querySelectorAll('.mr-nav-menu__item')[1]
    expect(disabledItem.className).toContain('mr-nav-menu__item--disabled')
    expect(disabledItem.getAttribute('data-disabled')).toBe('true')

    const link = disabledItem.querySelector('.mr-nav-menu__link')
    expect(link?.getAttribute('aria-disabled')).toBe('true')
    expect(link?.getAttribute('tabindex')).toBe('-1')
  })

  it('disabled trigger button has aria-expanded=false when not active', () => {
    const view = render(<NavigationMenu items={itemsWithDisabled} />)
    const disabledSubItem = view.querySelectorAll('.mr-nav-menu__item')[2]
    const trigger = disabledSubItem.querySelector('.mr-nav-menu__trigger')
    expect(trigger?.getAttribute('aria-expanded')).toBe('false')
    expect(trigger?.getAttribute('aria-haspopup')).toBe('true')
  })

  it('indicator is visible when item is active', () => {
    const view = render(<NavigationMenu items={itemsWithSubItems} />)
    const indicator = view.querySelector('.mr-nav-menu__indicator')
    expect(indicator).toBeTruthy()

    // Initially hidden (no active item)
    expect(indicator?.getAttribute('style')).toContain('opacity: 0')

    // Hover on Products to activate
    const productsItem = view.querySelectorAll('.mr-nav-menu__item')[1]
    act(() => {
      productsItem.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })

    expect(indicator?.getAttribute('style')).toContain('opacity: 1')
  })

  it('applies custom className', () => {
    const view = render(<NavigationMenu items={simpleItems} className="custom-nav" />)
    const nav = view.querySelector('nav')
    expect(nav?.className).toContain('mr-nav-menu')
    expect(nav?.className).toContain('custom-nav')
  })

  it('forwards ref to the nav element', () => {
    const ref = createRef<HTMLElement>()
    render(<NavigationMenu ref={ref} items={simpleItems} />)
    expect(ref.current?.tagName).toBe('NAV')
    expect(ref.current?.getAttribute('role')).toBe('navigation')
  })

  it('supports controlled value', () => {
    const view = render(<NavigationMenu items={itemsWithSubItems} value="products" />)
    const productsItem = view.querySelectorAll('.mr-nav-menu__item')[1]
    expect(productsItem.className).toContain('mr-nav-menu__item--active')
    expect(productsItem.getAttribute('data-active')).toBe('true')

    const content = view.querySelector('.mr-nav-menu__content')
    expect(content).toBeTruthy()
  })

  it('calls onValueChange when hovering items', () => {
    let changedValue = ''
    const handleChange = (v: string) => {
      changedValue = v
    }
    const view = render(
      <NavigationMenu items={itemsWithSubItems} onValueChange={handleChange} />,
    )
    const productsItem = view.querySelectorAll('.mr-nav-menu__item')[1]

    act(() => {
      productsItem.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })

    expect(changedValue).toBe('products')
  })

  it('supports defaultValue for uncontrolled mode', () => {
    const view = render(<NavigationMenu items={itemsWithSubItems} defaultValue="products" />)
    const productsItem = view.querySelectorAll('.mr-nav-menu__item')[1]
    expect(productsItem.className).toContain('mr-nav-menu__item--active')
  })

  it('chevron rotates when item is active', () => {
    const view = render(<NavigationMenu items={itemsWithSubItems} />)
    const productsItem = view.querySelectorAll('.mr-nav-menu__item')[1]

    // Before hover - no active class on item
    expect(productsItem.className).not.toContain('mr-nav-menu__item--active')

    act(() => {
      productsItem.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })

    expect(productsItem.className).toContain('mr-nav-menu__item--active')
    const chevron = productsItem.querySelector('.mr-nav-menu__chevron')
    expect(chevron).toBeTruthy()
  })

  it('sub-items have role="menuitem"', () => {
    const view = render(<NavigationMenu items={itemsWithSubItems} />)
    const productsItem = view.querySelectorAll('.mr-nav-menu__item')[1]

    act(() => {
      productsItem.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })

    const menuItems = view.querySelectorAll('[role="menuitem"]')
    // The trigger button + sub items
    expect(menuItems.length).toBeGreaterThanOrEqual(2)
  })

  it('content has role="menu"', () => {
    const view = render(<NavigationMenu items={itemsWithSubItems} />)
    const productsItem = view.querySelectorAll('.mr-nav-menu__item')[1]

    act(() => {
      productsItem.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })

    const menu = view.querySelector('[role="menu"]')
    expect(menu).toBeTruthy()
  })
})
