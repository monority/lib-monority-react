import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { PageHeader } from './PageHeader'

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

describe('PageHeader', () => {
  it('renders children', () => {
    const view = render(<PageHeader><h1>Title</h1></PageHeader>)
    expect(view.querySelector('h1')?.textContent).toBe('Title')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<PageHeader ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
