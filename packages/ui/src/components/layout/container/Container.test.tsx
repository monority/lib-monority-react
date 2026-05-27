import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Container } from './Container'

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

describe('Container', () => {
  it('renders children', () => {
    const view = render(<Container><span>Content</span></Container>)
    expect(view.querySelector('span')?.textContent).toBe('Content')
  })

  it('applies default md size', () => {
    const view = render(<Container />)
    expect(view.querySelector('div')?.getAttribute('data-size')).toBe('md')
  })

  it('applies size variants', () => {
    const view = render(<Container size="xl" />)
    expect(view.querySelector('div')?.className).toContain('mr-container--xl')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Container ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
