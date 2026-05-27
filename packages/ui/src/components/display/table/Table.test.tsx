import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Table } from './Table'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)

  act(() => {
    root?.render(ui)
  })

  return container
}

afterEach(() => {
  act(() => {
    root?.unmount()
  })
  container?.remove()
  root = null
  container = null
})

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
]
const rows = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
]

describe('Table', () => {
  it('renders column headers', () => {
    const view = render(<Table columns={columns} rows={rows} />)
    expect(view.querySelector('thead')?.textContent).toContain('Name')
    expect(view.querySelector('thead')?.textContent).toContain('Age')
  })

  it('renders row data', () => {
    const view = render(<Table columns={columns} rows={rows} />)
    const cells = view.querySelectorAll('tbody td')
    expect(cells[0]?.textContent).toBe('Alice')
    expect(cells[2]?.textContent).toBe('Bob')
  })

  it('shows empty state when no rows', () => {
    const view = render(<Table columns={columns} rows={[]} />)
    expect(view.textContent).toContain('No data')
    expect(view.querySelector('table')).toBeNull()
  })

  it('renders custom empty state', () => {
    const view = render(
      <Table
        columns={columns}
        rows={[]}
        emptyState={<div>Custom empty</div>}
      />,
    )
    expect(view.textContent).toBe('Custom empty')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Table ref={ref} columns={columns} rows={rows} />)
    expect(ref.current?.className).toContain('mr-table')
  })
})
