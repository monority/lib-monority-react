import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Banner } from './Banner'

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

describe('Banner', () => {
  it('renders title', () => {
    const view = render(<Banner title="Important" />)
    expect(view.querySelector('.mr-banner__title')?.textContent).toBe('Important')
  })

  it('renders children as fallback description', () => {
    const view = render(<Banner>Maintenance starts at 18:00.</Banner>)
    expect(view.querySelector('.mr-banner__description')?.textContent).toBe(
      'Maintenance starts at 18:00.',
    )
  })

  it('renders description', () => {
    const view = render(<Banner description="Details here" />)
    expect(view.querySelector('.mr-banner__description')?.textContent).toBe('Details here')
  })

  it('applies tone', () => {
    const view = render(<Banner tone="success" title="Done" />)
    const el = view.querySelector('section')
    expect(el?.className).toContain('mr-banner--success')
    expect(el?.getAttribute('data-tone')).toBe('success')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLElement>()
    render(<Banner ref={ref} title="Test" />)
    expect(ref.current?.tagName).toBe('SECTION')
    expect(ref.current?.className).toContain('mr-banner')
  })
})
