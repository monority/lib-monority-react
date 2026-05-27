import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Spinner } from './Spinner'

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

describe('Spinner', () => {
  it('renders with role status and loading label', () => {
    const view = render(<Spinner />)
    expect(view.querySelector('[role="status"]')).toBeTruthy()
    expect(view.querySelector('[aria-label="Loading"]')).toBeTruthy()
  })

  it('applies default md size and base tone', () => {
    const view = render(<Spinner />)
    const el = view.querySelector('span')
    expect(el?.getAttribute('data-size')).toBe('md')
    expect(el?.getAttribute('data-tone')).toBe('base')
  })

  it('applies size and tone variants', () => {
    const view = render(<Spinner size="lg" tone="inverse" />)
    const el = view.querySelector('span')
    expect(el?.className).toContain('mr-spinner--lg')
    expect(el?.className).toContain('mr-spinner--inverse')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Spinner ref={ref} />)
    expect(ref.current?.tagName).toBe('SPAN')
  })
})
