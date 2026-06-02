import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Stack } from './Stack'

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

describe('Stack', () => {
  it('renders children', () => {
    const view = render(<Stack><span>Item</span></Stack>)
    expect(view.querySelector('span')?.textContent).toBe('Item')
  })

  it('applies default md gap', () => {
    const view = render(<Stack />)
    expect(view.querySelector('div')?.getAttribute('data-gap')).toBe('md')
  })

  it('applies gap variants', () => {
    const view = render(<Stack gap="xl" />)
    expect(view.querySelector('div')?.className).toContain('mr-stack--xl')
  })

  it('applies direction, align, and justify data attributes', () => {
    const view = render(<Stack direction="horizontal" align="center" justify="between" />)
    const stack = view.querySelector('.mr-stack')
    expect(stack?.getAttribute('data-direction')).toBe('horizontal')
    expect(stack?.getAttribute('data-align')).toBe('center')
    expect(stack?.getAttribute('data-justify')).toBe('between')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Stack ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
