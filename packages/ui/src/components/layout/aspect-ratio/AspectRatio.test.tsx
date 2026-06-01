import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { AspectRatio } from './AspectRatio'

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

describe('AspectRatio', () => {
  it('renders children', () => {
    const view = render(
      <AspectRatio>
        <span>Content</span>
      </AspectRatio>,
    )
    expect(view.querySelector('span')?.textContent).toBe('Content')
  })

  it('applies default ratio 16/9', () => {
    const view = render(<AspectRatio />)
    const wrapper = view.querySelector('div')
    expect(wrapper?.style.paddingBottom).toBe('56.25%')
  })

  it('applies custom ratio', () => {
    const view = render(<AspectRatio ratio={4 / 3} />)
    const wrapper = view.querySelector('div')
    expect(wrapper?.style.paddingBottom).toBe('75%')
  })

  it('applies square ratio', () => {
    const view = render(<AspectRatio ratio={1} />)
    const wrapper = view.querySelector('div')
    expect(wrapper?.style.paddingBottom).toBe('100%')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<AspectRatio ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
  })

  it('merges className', () => {
    const view = render(<AspectRatio className="custom-class" />)
    const wrapper = view.querySelector('div')
    expect(wrapper?.className).toContain('mr-aspect-ratio')
    expect(wrapper?.className).toContain('custom-class')
  })
})
