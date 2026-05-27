import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Grid } from './Grid'

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

describe('Grid', () => {
  it('renders children', () => {
    const view = render(<Grid><span>Item</span></Grid>)
    expect(view.querySelector('span')?.textContent).toBe('Item')
  })

  it('applies default 2 columns', () => {
    const view = render(<Grid />)
    expect(view.querySelector('div')?.getAttribute('data-columns')).toBe('2')
  })

  it('applies custom columns', () => {
    const view = render(<Grid columns={3} />)
    expect(view.querySelector('div')?.className).toContain('mr-grid--3')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Grid ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
