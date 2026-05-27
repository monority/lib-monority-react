import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

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

describe('Button', () => {
  it('renders children with default button semantics', () => {
    const view = render(<Button>Save</Button>)
    const button = view.querySelector('button')

    expect(button?.textContent).toBe('Save')
    expect(button?.getAttribute('type')).toBe('button')
    expect(button?.getAttribute('data-variant')).toBe('primary')
    expect(button?.getAttribute('data-size')).toBe('md')
    expect(button?.className).toContain('mr-btn--primary')
    expect(button?.className).toContain('mr-btn--md')
  })

  it('maps variant, size, full width and loading state to stable hooks', () => {
    const view = render(
      <Button variant="danger" size="lg" fullWidth loading>
        Delete
      </Button>,
    )
    const button = view.querySelector('button')

    expect(button?.className).toContain('mr-btn--danger')
    expect(button?.className).toContain('mr-btn--lg')
    expect(button?.className).toContain('mr-btn--full-width')
    expect(button?.className).toContain('mr-btn--loading')
    expect(button?.getAttribute('data-variant')).toBe('danger')
    expect(button?.getAttribute('data-size')).toBe('lg')
    expect(button?.getAttribute('data-full-width')).toBe('true')
    expect(button?.getAttribute('data-loading')).toBe('true')
    expect(button?.getAttribute('data-disabled')).toBe('true')
    expect(button?.hasAttribute('disabled')).toBe(true)
    expect(button?.getAttribute('aria-busy')).toBe('true')
  })

  it('forwards refs', () => {
    const ref = { current: null as HTMLButtonElement | null }

    render(<Button ref={ref}>Focusable</Button>)

    expect(ref.current?.tagName).toBe('BUTTON')
  })

  it('renders with variant="primary"', () => {
    const view = render(<Button variant="primary">Primary</Button>)
    const button = view.querySelector('button')
    expect(button?.getAttribute('data-variant')).toBe('primary')
    expect(button?.className).toContain('mr-btn--primary')
  })

  it('renders with variant="muted"', () => {
    const view = render(<Button variant="muted">Muted</Button>)
    const button = view.querySelector('button')
    expect(button?.getAttribute('data-variant')).toBe('muted')
    expect(button?.className).toContain('mr-btn--muted')
  })

  it('renders with size="sm"', () => {
    const view = render(<Button size="sm">Small</Button>)
    const button = view.querySelector('button')
    expect(button?.getAttribute('data-size')).toBe('sm')
    expect(button?.className).toContain('mr-btn--sm')
  })

  it('renders with size="lg"', () => {
    const view = render(<Button size="lg">Large</Button>)
    const button = view.querySelector('button')
    expect(button?.getAttribute('data-size')).toBe('lg')
    expect(button?.className).toContain('mr-btn--lg')
  })

  it('renders with loading state alone', () => {
    const view = render(<Button loading>Loading</Button>)
    const button = view.querySelector('button')
    expect(button?.getAttribute('aria-busy')).toBe('true')
    expect(button?.getAttribute('data-loading')).toBe('true')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    const view = render(<Button onClick={onClick}>Click me</Button>)
    const button = view.querySelector('button')
    act(() => {
      button?.click()
    })
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders as polymorphic element', () => {
    const view = render(<Button as="a" href="#">Link</Button>)
    const link = view.querySelector('a')
    expect(link).not.toBeNull()
    expect(link?.getAttribute('href')).toBe('#')
    expect(link?.getAttribute('data-variant')).toBe('primary')
  })

  describe('copy mode', () => {
    it('copies text to clipboard on click', () => {
      Object.assign(navigator, { clipboard: { writeText: vi.fn() } })
      const view = render(<Button copyValue="test">Copy</Button>)
      act(() => view.querySelector('button')?.click())
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test')
    })

    it('shows copied label after copy click', () => {
      Object.assign(navigator, { clipboard: { writeText: vi.fn() } })
      const view = render(<Button copyValue="test" copiedLabel="Copied!" duration={5000}>Copy</Button>)
      act(() => view.querySelector('button')?.click())
      expect(view.querySelector('button')?.textContent).toBe('Copied!')
    })

    it('sets data-copied attribute', () => {
      Object.assign(navigator, { clipboard: { writeText: vi.fn() } })
      const view = render(<Button copyValue="test" duration={5000}>Copy</Button>)
      act(() => view.querySelector('button')?.click())
      expect(view.querySelector('button')?.getAttribute('data-copied')).toBe('true')
    })
  })

  describe('icon-only mode', () => {
    it('renders icon-only with aria-label', () => {
      const view = render(<Button iconOnly aria-label="Close">✕</Button>)
      const btn = view.querySelector('button')
      expect(btn?.getAttribute('aria-label')).toBe('Close')
      expect(btn?.getAttribute('data-icon-only')).toBe('true')
      expect(btn?.textContent).toBe('✕')
    })

    it('maps disabled state in icon-only mode', () => {
      const view = render(<Button iconOnly aria-label="X" disabled>✕</Button>)
      const btn = view.querySelector('button')
      expect(btn?.disabled).toBe(true)
      expect(btn?.getAttribute('data-disabled')).toBe('true')
    })
  })
})
