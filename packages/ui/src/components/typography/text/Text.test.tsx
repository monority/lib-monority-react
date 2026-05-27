import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Text } from './Text'

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
  root = null
  container = null
})

describe('Text', () => {
  it('renders as p by default', () => {
    const view = render(<Text>Hello</Text>)
    const el = view.querySelector('p')
    expect(el?.textContent).toBe('Hello')
    expect(el?.getAttribute('data-tone')).toBe('base')
    expect(el?.getAttribute('data-size')).toBe('md')
  })

  it('renders as custom element', () => {
    const view = render(<Text as="span">Hello</Text>)
    expect(view.querySelector('span')).toBeTruthy()
  })

  it('applies tone and size', () => {
    const view = render(<Text tone="muted" size="sm">Small</Text>)
    const el = view.querySelector('p')
    expect(el?.getAttribute('data-tone')).toBe('muted')
    expect(el?.getAttribute('data-size')).toBe('sm')
    expect(el?.className).toContain('mr-text--muted')
    expect(el?.className).toContain('mr-text--sm')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLParagraphElement>()
    render(<Text ref={ref}>Content</Text>)
    expect(ref.current?.tagName).toBe('P')
  })
})
