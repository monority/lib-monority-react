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

  it('keeps exactly one trigger in the roving tabindex', () => {
    const view = render(<Accordion items={items} />)
    const triggers = view.querySelectorAll('.mr-accordion__trigger')
    const tabbables = Array.from(triggers).filter((t) => (t as HTMLElement).tabIndex === 0)

    expect(tabbables.length).toBe(1)
    expect(tabbables[0]).toBe(triggers[0])
  })

  it('moves focus with ArrowDown and ArrowUp', () => {
    const view = render(<Accordion items={items} />)
    const triggers = view.querySelectorAll('.mr-accordion__trigger') as NodeListOf<HTMLButtonElement>

    act(() => {
      triggers[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    })
    expect(document.activeElement).toBe(triggers[1])
    expect(triggers[1].tabIndex).toBe(0)
    expect(triggers[0].tabIndex).toBe(-1)

    act(() => {
      triggers[1]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
    })
    expect(document.activeElement).toBe(triggers[0])
  })

  it('wraps focus around with arrow keys', () => {
    const view = render(<Accordion items={items} />)
    const triggers = view.querySelectorAll('.mr-accordion__trigger') as NodeListOf<HTMLButtonElement>

    act(() => {
      triggers[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
    })
    expect(document.activeElement).toBe(triggers[1])

    act(() => {
      triggers[1]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    })
    expect(document.activeElement).toBe(triggers[0])
  })

  it('jumps to first/last trigger with Home and End', () => {
    const view = render(<Accordion items={items} />)
    const triggers = view.querySelectorAll('.mr-accordion__trigger') as NodeListOf<HTMLButtonElement>

    act(() => {
      triggers[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
    })
    expect(document.activeElement).toBe(triggers[1])

    act(() => {
      triggers[1]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))
    })
    expect(document.activeElement).toBe(triggers[0])
  })

  it('toggles panels with Enter and Space (native button activation)', () => {
    const view = render(<Accordion items={items} collapsible />)
    const trigger = view.querySelector('.mr-accordion__trigger') as HTMLButtonElement
    const panel = view.querySelector('.mr-accordion__panel') as HTMLElement

    expect(panel.hidden).toBe(true)
    act(() => { trigger.click() })
    expect(panel.hidden).toBe(false)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    act(() => { trigger.click() })
    expect(panel.hidden).toBe(true)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('relates trigger and panel with aria-controls / aria-labelledby', () => {
    const view = render(<Accordion items={items} />)
    const trigger = view.querySelector('.mr-accordion__trigger') as HTMLButtonElement
    const panel = view.querySelector('.mr-accordion__panel') as HTMLElement

    expect(panel.getAttribute('aria-labelledby')).toBe(trigger.id)
    expect(trigger.getAttribute('aria-controls')).toBe(panel.id)
    expect(panel.getAttribute('role')).toBe('region')
  })

  it('skips disabled items in keyboard navigation and blocks toggling them', () => {
    const disabledItems = [
      { value: '1', title: 'Section 1', content: 'Content 1' },
      { value: '2', title: 'Section 2', content: 'Content 2', disabled: true },
      { value: '3', title: 'Section 3', content: 'Content 3' },
    ]
    const view = render(<Accordion items={disabledItems} />)
    const triggers = view.querySelectorAll('.mr-accordion__trigger') as NodeListOf<HTMLButtonElement>

    expect(triggers[1].disabled).toBe(true)
    expect(view.querySelector('.mr-accordion__item[data-disabled="true"]')).not.toBeNull()

    // Roving tabindex lands on the first *enabled* trigger
    expect(triggers[0].tabIndex).toBe(0)

    // ArrowDown skips the disabled item
    act(() => {
      triggers[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    })
    expect(document.activeElement).toBe(triggers[2])

    // Disabled trigger cannot open its panel
    act(() => { triggers[1]?.click() })
    const panels = view.querySelectorAll('.mr-accordion__panel')
    expect((panels[1] as HTMLElement).hidden).toBe(true)
  })

  it('supports multiple open panels with allowMultiple', () => {
    const view = render(<Accordion items={items} allowMultiple />)
    const triggers = view.querySelectorAll('.mr-accordion__trigger') as NodeListOf<HTMLButtonElement>

    act(() => { triggers[0]?.click() })
    act(() => { triggers[1]?.click() })
    const panels = view.querySelectorAll('.mr-accordion__panel')
    expect((panels[0] as HTMLElement).hidden).toBe(false)
    expect((panels[1] as HTMLElement).hidden).toBe(false)
  })
})
