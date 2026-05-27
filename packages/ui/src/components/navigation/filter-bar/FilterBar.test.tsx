import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { FilterBar } from './FilterBar'

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

describe('FilterBar', () => {
  it('renders children', () => {
    const view = render(<FilterBar><span>Filter</span></FilterBar>)
    expect(view.querySelector('span')?.textContent).toBe('Filter')
  })

  it('has group role', () => {
    const view = render(<FilterBar />)
    const el = view.querySelector('div')
    expect(el?.getAttribute('role')).toBe('group')
    expect(el?.getAttribute('aria-label')).toBe('Filters')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<FilterBar ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
