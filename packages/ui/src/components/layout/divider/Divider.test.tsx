import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Divider } from './Divider'

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

describe('Divider', () => {
  it('renders div with separator role', () => {
    const view = render(<Divider />)
    const el = view.querySelector('[role="separator"]')
    expect(el?.tagName).toBe('DIV')
    expect(el?.getAttribute('aria-orientation')).toBe('horizontal')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Divider ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
  })

  it('renders label when provided', () => {
    const view = render(<Divider label="OR" />)
    const label = view.querySelector('.mr-divider__label')
    expect(label?.textContent).toBe('OR')
  })

  it('renders children as label when no label prop', () => {
    const view = render(<Divider>AND</Divider>)
    const label = view.querySelector('.mr-divider__label')
    expect(label?.textContent).toBe('AND')
  })

  it('prefers label prop over children', () => {
    const view = render(<Divider label="OR">AND</Divider>)
    const label = view.querySelector('.mr-divider__label')
    expect(label?.textContent).toBe('OR')
  })
})
