import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Accordion } from './Accordion'

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

describe('Accordion', () => {
  const items = [
    { value: '1', title: 'Section 1', content: 'Content 1' },
    { value: '2', title: 'Section 2', content: 'Content 2' },
  ]

  it('renders all items', () => {
    const view = render(<Accordion items={items} />)
    expect(view.querySelectorAll('.mr-accordion__item').length).toBe(2)
  })

  it('starts with all closed by default', () => {
    const view = render(<Accordion items={items} />)
    view.querySelectorAll('.mr-accordion__panel').forEach((panel) => {
      expect((panel as HTMLElement).hidden).toBe(true)
    })
  })

  it('opens item on trigger click', () => {
    const view = render(<Accordion items={items} collapsible />)
    const trigger = view.querySelector(
      '.mr-accordion__trigger',
    ) as HTMLButtonElement
    act(() => trigger.click())
    const panel = view.querySelector('.mr-accordion__panel') as HTMLElement
    expect(panel.hidden).toBe(false)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
  })

  it('opens defaultValue on mount', () => {
    const view = render(<Accordion items={items} defaultValue="1" />)
    const panels = view.querySelectorAll('.mr-accordion__panel')
    expect((panels[0] as HTMLElement).hidden).toBe(false)
    expect((panels[1] as HTMLElement).hidden).toBe(true)
  })

  it('applies data-size attribute', () => {
    const view = render(<Accordion items={items} size="lg" />)
    expect(view.querySelector('.mr-accordion')?.getAttribute('data-size')).toBe(
      'lg',
    )
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Accordion ref={ref} items={items} />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-accordion')
  })
})
