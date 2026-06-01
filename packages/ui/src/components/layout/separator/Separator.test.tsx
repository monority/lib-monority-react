import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Separator } from './Separator'

let containerEl: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  containerEl = document.createElement('div')
  document.body.appendChild(containerEl)
  root = createRoot(containerEl)
  act(() => root?.render(ui))
  return containerEl
}

afterEach(() => {
  act(() => root?.unmount())
  containerEl?.remove()
  root = null
  containerEl = null
})

describe('Separator', () => {
  it('renders div with horizontal orientation by default', () => {
    const view = render(<Separator />)
    const el = view.querySelector('div')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('data-orientation')).toBe('horizontal')
    expect(el?.getAttribute('role')).toBe('separator')
  })

  it('renders div for vertical orientation', () => {
    const view = render(<Separator orientation="vertical" />)
    const el = view.querySelector('div')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('role')).toBe('separator')
    expect(el?.getAttribute('aria-orientation')).toBe('vertical')
    expect(el?.getAttribute('data-orientation')).toBe('vertical')
  })

  it('applies correct CSS classes', () => {
    const view = render(<Separator />)
    const el = view.querySelector('div')
    expect(el?.className).toContain('mr-separator')
    expect(el?.className).toContain('mr-separator--horizontal')
  })

  it('applies vertical CSS classes', () => {
    const view = render(<Separator orientation="vertical" />)
    const el = view.querySelector('div')
    expect(el?.className).toContain('mr-separator--vertical')
  })

  it('sets role="separator" on vertical by default', () => {
    const view = render(<Separator orientation="vertical" />)
    const el = view.querySelector('[role="separator"]')
    expect(el).not.toBeNull()
  })

  it('sets role="presentation" when decorative on vertical', () => {
    const view = render(<Separator orientation="vertical" decorative />)
    const el = view.querySelector('[role="presentation"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('aria-orientation')).toBeNull()
  })

  it('sets role="presentation" when decorative on horizontal', () => {
    const view = render(<Separator decorative />)
    const el = view.querySelector('div')
    expect(el?.getAttribute('role')).toBe('presentation')
    expect(el?.getAttribute('aria-orientation')).toBeNull()
  })

  it('forwards ref on vertical separator', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Separator orientation="vertical" ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
  })

  it('merges custom className', () => {
    const view = render(<Separator className="custom-class" />)
    const el = view.querySelector('div')
    expect(el?.className).toContain('custom-class')
  })

  it('spreads additional props', () => {
    const view = render(<Separator data-testid="my-separator" />)
    const el = view.querySelector('[data-testid="my-separator"]')
    expect(el?.tagName).toBe('DIV')
  })
})
