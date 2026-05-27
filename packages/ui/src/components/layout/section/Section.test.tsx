import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Section } from './Section'

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

describe('Section', () => {
  it('renders as section element', () => {
    const view = render(<Section>Content</Section>)
    expect(view.querySelector('section')?.textContent).toBe('Content')
  })

  it('applies default md spacing', () => {
    const view = render(<Section />)
    expect(view.querySelector('section')?.getAttribute('data-spacing')).toBe('md')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLElement>()
    render(<Section ref={ref} />)
    expect(ref.current?.tagName).toBe('SECTION')
  })
})
