import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Breadcrumb } from './Breadcrumb'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => { root?.render(ui) })
  return container
}

afterEach(() => {
  act(() => { root?.unmount() })
  container?.remove()
  root = null
  container = null
})

describe('Breadcrumb', () => {
  it('renders items with links', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
    ]
    const view = render(<Breadcrumb items={items} />)
    const links = view.querySelectorAll('a.mr-breadcrumb__link')
    expect(links.length).toBe(2)
    expect(links[0].getAttribute('href')).toBe('/')
    expect(links[0].textContent).toBe('Home')
    expect(links[1].getAttribute('href')).toBe('/library')
  })

  it('renders last item as current with aria-current', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Current' },
    ]
    const view = render(<Breadcrumb items={items} />)
    const current = view.querySelector('.mr-breadcrumb__current')
    expect(current).not.toBeNull()
    expect(current?.getAttribute('aria-current')).toBe('page')
    expect(current?.textContent).toBe('Current')
  })

  it('uses aria-label on nav', () => {
    const view = render(<Breadcrumb items={[]} />)
    const nav = view.querySelector('nav')
    expect(nav?.getAttribute('aria-label')).toBe('Breadcrumb')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLElement>()
    render(<Breadcrumb ref={ref} items={[]} />)
    expect(ref.current?.tagName).toBe('NAV')
  })

  it('renders separators between items', () => {
    const items = [
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C' },
    ]
    const view = render(<Breadcrumb items={items} />)
    const separators = view.querySelectorAll('.mr-breadcrumb__separator')
    expect(separators.length).toBe(2)
  })

  it('renders empty list when no items', () => {
    const view = render(<Breadcrumb items={[]} />)
    const listItems = view.querySelectorAll('.mr-breadcrumb__item')
    expect(listItems.length).toBe(0)
  })
})
