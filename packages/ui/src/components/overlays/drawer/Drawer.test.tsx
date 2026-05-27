import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Drawer } from './Drawer'

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
  document.body.style.overflow = ''
  root = null
  container = null
})

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    render(<Drawer open={false} title="Nav" onClose={vi.fn()}>Content</Drawer>)
    expect(document.body.querySelector('.mr-drawer__backdrop')).toBeNull()
  })

  it('renders when open', () => {
    render(<Drawer open title="Nav" onClose={vi.fn()}>Content</Drawer>)
    const backdrop = document.body.querySelector('.mr-drawer__backdrop')
    expect(backdrop).not.toBeNull()
    expect(backdrop?.getAttribute('data-open')).toBe('true')
  })

  it('renders title and children', () => {
    render(<Drawer open title="Settings" onClose={vi.fn()}>Body text</Drawer>)
    expect(document.body.querySelector('.mr-drawer__title')?.textContent).toBe('Settings')
    expect(document.body.querySelector('.mr-drawer__body')?.textContent).toBe('Body text')
  })

  it('applies side attribute', () => {
    render(<Drawer open title="Nav" side="left" onClose={vi.fn()}>X</Drawer>)
    const panel = document.body.querySelector('.mr-drawer__panel')
    expect(panel?.getAttribute('data-side')).toBe('left')
    expect(panel?.className).toContain('mr-drawer--left')
  })

  it('applies right side by default', () => {
    render(<Drawer open title="Nav" onClose={vi.fn()}>X</Drawer>)
    const panel = document.body.querySelector('.mr-drawer__panel')
    expect(panel?.getAttribute('data-side')).toBe('right')
  })

  it('calls onClose from backdrop click', () => {
    const onClose = vi.fn()
    render(<Drawer open title="Nav" onClose={onClose}>X</Drawer>)
    act(() => {
      document.body.querySelector('.mr-drawer__backdrop-surface')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose from close button', () => {
    const onClose = vi.fn()
    render(<Drawer open title="Nav" onClose={onClose}>X</Drawer>)
    act(() => {
      document.body.querySelector<HTMLButtonElement>('[aria-label="Fermer le panneau"]')?.click()
    })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('forwards ref to backdrop element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Drawer ref={ref} open title="Test" onClose={() => {}}>X</Drawer>)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-drawer__backdrop')
  })

  it('sets data-open on backdrop and panel', () => {
    render(<Drawer open title="Test" onClose={() => {}}>X</Drawer>)
    const backdrop = document.body.querySelector('.mr-drawer__backdrop')
    const panel = document.body.querySelector('.mr-drawer__panel')
    expect(backdrop?.getAttribute('data-open')).toBe('true')
    expect(panel?.getAttribute('data-open')).toBe('true')
  })

  it('accepts custom className', () => {
    render(<Drawer open title="Test" onClose={() => {}} className="custom">X</Drawer>)
    const backdrop = document.body.querySelector('.mr-drawer__backdrop')
    expect(backdrop?.className).toContain('custom')
  })
})
