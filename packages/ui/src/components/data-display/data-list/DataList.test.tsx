import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { DataList } from './DataList'

let container: HTMLDivElement | null = null
let root: Root | null = null
function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => root?.render(ui))
  return container
}
afterEach(() => {
  act(() => root?.unmount())
  container?.remove()
  root = null
  container = null
})

const items = [
  { label: 'Name', value: 'Alice' },
  { label: 'Role', value: 'Admin' },
]

describe('DataList', () => {
  it('renders items', () => {
    const view = render(<DataList items={items} />)
    const dts = view.querySelectorAll('dt')
    const dds = view.querySelectorAll('dd')
    expect(dts[0]?.textContent).toBe('Name')
    expect(dds[0]?.textContent).toBe('Alice')
  })

  it('applies columns variant', () => {
    const view = render(<DataList items={items} columns="split" />)
    expect(view.querySelector('dl')?.getAttribute('data-columns')).toBe('split')
    expect(view.querySelector('dl')?.className).toContain('mr-data-list--split')
  })

  it('uses render function when provided', () => {
    const withRender = [{ label: 'Custom', value: 'val', render: () => 'rendered' }]
    const view = render(<DataList items={withRender} />)
    expect(view.querySelector('dd')?.textContent).toBe('rendered')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDListElement>()
    render(<DataList ref={ref} items={items} />)
    expect(ref.current?.tagName).toBe('DL')
  })
})
