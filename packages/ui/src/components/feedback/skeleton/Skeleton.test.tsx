import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Skeleton } from './Skeleton'

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

describe('Skeleton', () => {
  it('renders with aria-hidden', () => {
    const view = render(<Skeleton />)
    expect(view.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })

  it('applies default md size', () => {
    const view = render(<Skeleton />)
    const el = view.querySelector('div')
    expect(el?.getAttribute('data-size')).toBe('md')
    expect(el?.className).toContain('mr-skeleton--md')
  })

  it('applies sm and lg sizes', () => {
    const sm = render(<Skeleton size="sm" />)
    expect(sm.querySelector('div')?.getAttribute('data-size')).toBe('sm')
    const lg = render(<Skeleton size="lg" />)
    expect(lg.querySelector('div')?.getAttribute('data-size')).toBe('lg')
  })

  it('accepts custom width and height', () => {
    const view = render(<Skeleton width="200px" height="100px" />)
    const el = view.querySelector('div')
    expect(el?.style.width).toBe('200px')
    expect(el?.style.height).toBe('100px')
  })

  it('applies rounded class when rounded is true', () => {
    const view = render(<Skeleton rounded />)
    expect(view.querySelector('div')?.className).toContain('mr-skeleton--rounded')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Skeleton ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
