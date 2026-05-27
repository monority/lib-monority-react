import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { DataTable } from './DataTable'

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

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
]
const rows = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
]

describe('DataTable', () => {
  it('renders headers and rows', () => {
    const view = render(<DataTable columns={columns} rows={rows} />)
    expect(view.querySelector('thead')?.textContent).toContain('Name')
    expect(view.querySelector('tbody')?.textContent).toContain('Alice')
  })

  it('shows empty state when no rows', () => {
    const view = render(<DataTable columns={columns} rows={[]} />)
    expect(view.textContent).toContain('No data')
  })

  it('supports sorting', () => {
    const view = render(<DataTable columns={[{ key: 'name', header: 'Name', sortable: true }]} rows={rows} />)
    const sortBtn = view.querySelector('.mr-data-table__sort') as HTMLButtonElement
    act(() => sortBtn.click())
    const cells = view.querySelectorAll('tbody td')
    expect(cells[0]?.textContent).toBe('Alice')
  })

  it('supports selection', () => {
    const view = render(<DataTable columns={columns} rows={rows} selectable getRowId={(r: any) => r.name} />)
    const checkboxes = view.querySelectorAll('.mr-data-table__checkbox')
    expect(checkboxes.length).toBe(3) // select all + 2 rows
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<DataTable ref={ref} columns={columns} rows={rows} />)
    expect(ref.current?.className).toContain('mr-data-table-wrap')
  })
})
