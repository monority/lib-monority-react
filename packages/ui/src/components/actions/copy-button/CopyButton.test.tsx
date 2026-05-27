import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CopyButton } from './CopyButton'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => root?.render(ui))
  return container
}

afterEach(() => {
  act(() => root?.unmount())
  container?.remove()
  root = null; container = null
})

describe('CopyButton', () => {
  it('renders with copy icon by default', () => {
    const view = render(<CopyButton value="test" />)
    const btn = view.querySelector('button')
    expect(btn?.querySelector('svg')).toBeTruthy()
  })

  it('shows text label when provided', () => {
    const view = render(<CopyButton value="test" label="Copy email" />)
    expect(view.querySelector('button')?.textContent).toContain('Copy email')
  })

  it('shows copied label when label provided and clicked', () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn() } })
    const view = render(<CopyButton value="test" label="Copy" copiedLabel="Copied!" duration={5000} />)
    act(() => view.querySelector('button')?.click())
    expect(view.querySelector('button')?.textContent).toBe('Copied!')
  })

  it('sets data-copied after click', () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn() } })
    const view = render(<CopyButton value="test" duration={5000} />)
    act(() => view.querySelector('button')?.click())
    expect(view.querySelector('button')?.getAttribute('data-copied')).toBe('true')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<CopyButton ref={ref} value="x" />)
    expect(ref.current?.tagName).toBe('BUTTON')
  })

  it('applies data-* attributes', () => {
    const view = render(<CopyButton value="x" size="lg" variant="solid" />)
    const btn = view.querySelector('button')
    expect(btn?.getAttribute('data-size')).toBe('lg')
    expect(btn?.getAttribute('data-variant')).toBe('primary')
  })
})
