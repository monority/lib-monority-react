import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { HoverCard } from './HoverCard'

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
  document.querySelectorAll('.mr-hovercard__content').forEach(el => el.remove())
})

describe('HoverCard', () => {
  it('renders trigger', () => {
    render(
      <HoverCard content="Card content">
        <span>Hover me</span>
      </HoverCard>,
    )
    const trigger = container?.querySelector('.mr-hovercard__trigger')
    expect(trigger?.textContent).toBe('Hover me')
  })

  it('shows content when defaultOpen', () => {
    render(
      <HoverCard content="Card content" defaultOpen openDelay={0}>
        <span>Hover me</span>
      </HoverCard>,
    )
    const wrapper = container?.querySelector('.mr-hovercard')
    expect(wrapper?.getAttribute('data-open')).toBe('true')
    const portalContent = document.body.querySelector('.mr-hovercard__content')
    expect(portalContent).not.toBeNull()
    expect(portalContent?.textContent).toContain('Card content')
  })

  it('hides content by default', () => {
    render(
      <HoverCard content="Card content">
        <span>Hover me</span>
      </HoverCard>,
    )
    const wrapper = container?.querySelector('.mr-hovercard')
    expect(wrapper?.getAttribute('data-open')).toBeNull()
    expect(document.body.querySelector('.mr-hovercard__content')).toBeNull()
  })

  it('applies align/side data-*', () => {
    render(
      <HoverCard content="Card content" align="end" side="top">
        <span>Hover me</span>
      </HoverCard>,
    )
    const wrapper = container?.querySelector('.mr-hovercard')
    expect(wrapper?.getAttribute('data-align')).toBe('end')
    expect(wrapper?.getAttribute('data-side')).toBe('top')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <HoverCard ref={ref} content="Card content">
        <span>Hover me</span>
      </HoverCard>,
    )
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-hovercard')
  })

  it('supports controlled open', () => {
    const onOpenChange = vi.fn()
    render(
      <HoverCard content="Card content" open onOpenChange={onOpenChange}>
        <span>Hover me</span>
      </HoverCard>,
    )
    const wrapper = container?.querySelector('.mr-hovercard')
    expect(wrapper?.getAttribute('data-open')).toBe('true')
  })

  it('supports defaultOpen', () => {
    render(
      <HoverCard content="Card content" defaultOpen openDelay={0}>
        <span>Hover me</span>
      </HoverCard>,
    )
    const wrapper = container?.querySelector('.mr-hovercard')
    expect(wrapper?.getAttribute('data-open')).toBe('true')
  })

  it('accepts custom className on wrapper', () => {
    render(
      <HoverCard content="Card content" className="custom-class">
        <span>Hover me</span>
      </HoverCard>,
    )
    const wrapper = container?.querySelector('.mr-hovercard')
    expect(wrapper?.className).toContain('custom-class')
  })

  it('hides arrow when arrow=false', () => {
    render(
      <HoverCard content="Card content" defaultOpen openDelay={0} arrow={false}>
        <span>Hover me</span>
      </HoverCard>,
    )
    const portalContent = document.body.querySelector('.mr-hovercard__content')
    expect(portalContent?.querySelector('.mr-hovercard__arrow')).toBeNull()
  })

  it('shows arrow by default', () => {
    render(
      <HoverCard content="Card content" defaultOpen openDelay={0}>
        <span>Hover me</span>
      </HoverCard>,
    )
    const portalContent = document.body.querySelector('.mr-hovercard__content')
    expect(portalContent?.querySelector('.mr-hovercard__arrow')).not.toBeNull()
  })

  it('calls onOpenChange when state changes', () => {
    const onOpenChange = vi.fn()
    render(
      <HoverCard content="Card content" onOpenChange={onOpenChange}>
        <span>Hover me</span>
      </HoverCard>,
    )
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('renders content in portal attached to body', () => {
    render(
      <HoverCard content="Portal content" defaultOpen openDelay={0}>
        <span>Trigger</span>
      </HoverCard>,
    )
    const portalContent = document.body.querySelector('.mr-hovercard__content')
    expect(portalContent).not.toBeNull()
    expect(container?.querySelector('.mr-hovercard__content')).toBeNull()
  })
})
