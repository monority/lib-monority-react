import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { ScrollArea } from './ScrollArea'

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

describe('ScrollArea', () => {
  it('renders children', () => {
    const view = render(
      <ScrollArea>
        <span>Scrollable content</span>
      </ScrollArea>,
    )
    expect(view.querySelector('span')?.textContent).toBe('Scrollable content')
  })

  it('applies vertical orientation by default', () => {
    const view = render(<ScrollArea />)
    const wrapper = view.querySelector('div')
    expect(wrapper?.className).toContain('mr-scroll-area--vertical')
    expect(wrapper?.className).not.toContain('mr-scroll-area--hide')
  })

  it('applies horizontal orientation', () => {
    const view = render(<ScrollArea orientation="horizontal" />)
    const wrapper = view.querySelector('div')
    expect(wrapper?.className).toContain('mr-scroll-area--horizontal')
  })

  it('applies both orientation', () => {
    const view = render(<ScrollArea orientation="both" />)
    const wrapper = view.querySelector('div')
    expect(wrapper?.className).toContain('mr-scroll-area--both')
  })

  it('applies hideScrollbar modifier', () => {
    const view = render(<ScrollArea hideScrollbar />)
    const wrapper = view.querySelector('div')
    expect(wrapper?.className).toContain('mr-scroll-area--hide')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<ScrollArea ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
  })

  it('merges className', () => {
    const view = render(<ScrollArea className="custom-class" />)
    const wrapper = view.querySelector('div')
    expect(wrapper?.className).toContain('mr-scroll-area')
    expect(wrapper?.className).toContain('custom-class')
  })
})
