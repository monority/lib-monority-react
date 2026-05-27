import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Topbar } from './Topbar'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => { root?.render(ui) })
  return container
}

afterEach(() => {
  act(() => { root?.unmount() })
  container?.remove()
  root = null
  container = null
})

describe('Topbar', () => {
  it('renders children', () => {
    const view = render(<Topbar><span>Logo</span></Topbar>)
    expect(view.querySelector('span')?.textContent).toBe('Logo')
  })

  it('renders as header element', () => {
    const view = render(<Topbar />)
    expect(view.querySelector('header')).not.toBeNull()
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLElement>()
    render(<Topbar ref={ref} />)
    expect(ref.current?.tagName).toBe('HEADER')
  })
})
