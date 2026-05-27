import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Toolbar } from './Toolbar'

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

describe('Toolbar', () => {
  it('renders with toolbar role', () => {
    const view = render(<Toolbar><button>Action</button></Toolbar>)
    expect(view.querySelector('[role="toolbar"]')).toBeTruthy()
  })

  it('renders children', () => {
    const view = render(<Toolbar><button>Btn</button></Toolbar>)
    expect(view.querySelector('button')?.textContent).toBe('Btn')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Toolbar ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
