import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Toggle } from './Toggle'

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

describe('Toggle', () => {
  it('renders as a button with default state off', () => {
    const view = render(<Toggle>Toggle</Toggle>)
    const button = view.querySelector('button')

    expect(button?.tagName).toBe('BUTTON')
    expect(button?.getAttribute('aria-pressed')).toBe('false')
    expect(button?.getAttribute('data-state')).toBe('off')
    expect(button?.textContent).toBe('Toggle')
  })

  it('toggles state on click (uncontrolled)', () => {
    const view = render(<Toggle>Toggle</Toggle>)
    const button = view.querySelector('button')

    expect(button?.getAttribute('aria-pressed')).toBe('false')

    act(() => {
      button?.click()
    })

    expect(button?.getAttribute('aria-pressed')).toBe('true')
    expect(button?.getAttribute('data-state')).toBe('on')

    act(() => {
      button?.click()
    })

    expect(button?.getAttribute('aria-pressed')).toBe('false')
    expect(button?.getAttribute('data-state')).toBe('off')
  })

  it('respects defaultPressed', () => {
    const view = render(<Toggle defaultPressed>Toggle</Toggle>)
    const button = view.querySelector('button')

    expect(button?.getAttribute('aria-pressed')).toBe('true')
    expect(button?.getAttribute('data-state')).toBe('on')
  })

  it('calls onPressedChange with new state', () => {
    const onPressedChange = vi.fn()
    const view = render(<Toggle onPressedChange={onPressedChange}>Toggle</Toggle>)
    const button = view.querySelector('button')

    act(() => {
      button?.click()
    })

    expect(onPressedChange).toHaveBeenCalledTimes(1)
    expect(onPressedChange).toHaveBeenCalledWith(true)

    act(() => {
      button?.click()
    })

    expect(onPressedChange).toHaveBeenCalledWith(false)
  })

  it('supports controlled mode', () => {
    const onPressedChange = vi.fn()
    const view = render(<Toggle pressed onPressedChange={onPressedChange}>Toggle</Toggle>)
    const button = view.querySelector('button')

    expect(button?.getAttribute('aria-pressed')).toBe('true')

    act(() => {
      button?.click()
    })

    expect(onPressedChange).toHaveBeenCalledWith(false)
    // State stays true because it's controlled
    expect(button?.getAttribute('aria-pressed')).toBe('true')
  })

  it('syncs internal state when controlled prop changes', () => {
    const view = render(<Toggle pressed={false}>Toggle</Toggle>)
    let button = view.querySelector('button')
    expect(button?.getAttribute('aria-pressed')).toBe('false')

    const { rerender } = { rerender: (ui: ReactElement) => {
      act(() => {
        root?.unmount()
        root = createRoot(container!)
        root?.render(ui)
      })
    }}
    rerender(<Toggle pressed>Toggle</Toggle>)
    button = view.querySelector('button')
    expect(button?.getAttribute('aria-pressed')).toBe('true')
  })

  it('disabled prevents toggle', () => {
    const onPressedChange = vi.fn()
    const view = render(<Toggle disabled onPressedChange={onPressedChange}>Toggle</Toggle>)
    const button = view.querySelector('button')

    expect(button?.disabled).toBe(true)

    act(() => {
      button?.click()
    })

    expect(onPressedChange).not.toHaveBeenCalled()
    expect(button?.getAttribute('aria-pressed')).toBe('false')
  })

  it('applies variant classes', () => {
    const view = render(<Toggle variant="outline">Toggle</Toggle>)
    const button = view.querySelector('button')

    expect(button?.className).toContain('mr-toggle--outline')
    expect(button?.getAttribute('data-variant')).toBe('outline')
  })

  it('applies size classes', () => {
    const view = render(<Toggle size="lg">Toggle</Toggle>)
    const button = view.querySelector('button')

    expect(button?.className).toContain('mr-toggle--lg')
    expect(button?.getAttribute('data-size')).toBe('lg')
  })

  it('applies pressed class when pressed', () => {
    const view = render(<Toggle defaultPressed>Toggle</Toggle>)
    const button = view.querySelector('button')

    expect(button?.className).toContain('mr-toggle--pressed')
  })

  it('forwards refs', () => {
    const ref = { current: null as HTMLButtonElement | null }

    render(<Toggle ref={ref}>Toggle</Toggle>)

    expect(ref.current?.tagName).toBe('BUTTON')
  })

  it('passes through additional props', () => {
    const view = render(<Toggle data-testid="custom-toggle" aria-label="My toggle">Toggle</Toggle>)
    const button = view.querySelector('button')

    expect(button?.getAttribute('data-testid')).toBe('custom-toggle')
    expect(button?.getAttribute('aria-label')).toBe('My toggle')
  })

  it('calls onClick in addition to onPressedChange', () => {
    const onClick = vi.fn()
    const onPressedChange = vi.fn()
    const view = render(<Toggle onClick={onClick} onPressedChange={onPressedChange}>Toggle</Toggle>)
    const button = view.querySelector('button')

    act(() => {
      button?.click()
    })

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onPressedChange).toHaveBeenCalledTimes(1)
  })
})
