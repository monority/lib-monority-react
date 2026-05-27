import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Title } from './Title'

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

describe('Title', () => {
  it('renders as h2 by default', () => {
    const view = render(<Title>Heading</Title>)
    const el = view.querySelector('h2')
    expect(el?.textContent).toBe('Heading')
    expect(el?.getAttribute('data-size')).toBe('md')
  })

  it('renders as custom heading level', () => {
    const view = render(<Title as="h1">Heading</Title>)
    expect(view.querySelector('h1')).toBeTruthy()
  })

  it('applies display size', () => {
    const view = render(<Title size="display">Display</Title>)
    const el = view.querySelector('h2')
    expect(el?.getAttribute('data-size')).toBe('display')
    expect(el?.className).toContain('mr-title--display')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLHeadingElement>()
    render(<Title ref={ref}>Content</Title>)
    expect(ref.current?.tagName).toBe('H2')
  })
})
