import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Tooltip } from './Tooltip'

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

describe('Tooltip', () => {
  it('renders content', () => {
    const view = render(
      <Tooltip content="Help text">
        <span>Trigger</span>
      </Tooltip>,
    )
    expect(view.querySelector('.mr-tooltip__content')?.textContent).toBe('Help text')
  })

  it('renders children', () => {
    const view = render(
      <Tooltip content="Help text">
        <span data-testid="trigger">Trigger</span>
      </Tooltip>,
    )
    expect(view.querySelector('[data-testid="trigger"]')?.textContent).toBe('Trigger')
  })

  it('has tooltip role', () => {
    const view = render(
      <Tooltip content="Help text">
        <span>Trigger</span>
      </Tooltip>,
    )
    expect(view.querySelector('[role="tooltip"]')).not.toBeNull()
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Tooltip ref={ref} content="Help text">
        <span>Trigger</span>
      </Tooltip>,
    )
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-tooltip')
  })

  it('accepts custom className', () => {
    const view = render(
      <Tooltip content="Help text" className="custom-class">
        <span>Trigger</span>
      </Tooltip>,
    )
    expect(view.querySelector('.mr-tooltip')?.className).toContain('custom-class')
  })

  it('passes aria-describedby to child element', () => {
    const view = render(
      <Tooltip content="Help text">
        <button type="button">Action</button>
      </Tooltip>,
    )
    const tooltipContent = view.querySelector('[role="tooltip"]')
    const button = view.querySelector('button')
    expect(button?.getAttribute('aria-describedby')).toBe(tooltipContent?.getAttribute('id'))
  })

  it('marks the tooltip dismissed when Escape is pressed', () => {
    const view = render(
      <Tooltip content="Help text">
        <button type="button">Action</button>
      </Tooltip>,
    )
    const wrapper = view.querySelector('.mr-tooltip') as HTMLElement

    expect(wrapper.getAttribute('data-hidden')).toBeNull()
    act(() => {
      wrapper.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      )
    })
    expect(wrapper.getAttribute('data-hidden')).toBe('true')
  })

  it('clears the dismissal when the pointer leaves the trigger', () => {
    const view = render(
      <Tooltip content="Help text">
        <button type="button">Action</button>
      </Tooltip>,
    )
    const wrapper = view.querySelector('.mr-tooltip') as HTMLElement

    act(() => {
      wrapper.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      )
    })
    expect(wrapper.getAttribute('data-hidden')).toBe('true')

    act(() => {
      // React derives onMouseLeave from delegated mouseout/mouseover
      wrapper.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }))
    })
    expect(wrapper.getAttribute('data-hidden')).toBeNull()
  })

  it('does not treat other keys as dismissal', () => {
    const view = render(
      <Tooltip content="Help text">
        <button type="button">Action</button>
      </Tooltip>,
    )
    const wrapper = view.querySelector('.mr-tooltip') as HTMLElement

    act(() => {
      wrapper.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
      )
    })
    expect(wrapper.getAttribute('data-hidden')).toBeNull()
  })

  it('keeps plain (non-element) children as-is', () => {
    const view = render(
      <Tooltip content="Help text">
        <span data-testid="plain">Trigger</span>
      </Tooltip>,
    )
    expect(view.querySelector('[data-testid="plain"]')).not.toBeNull()
  })
})
