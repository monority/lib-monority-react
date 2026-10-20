import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
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
        const view = render(
            <DataTable columns={[{ key: 'name', header: 'Name', sortable: true }]} rows={rows} />
        )
        const sortBtn = view.querySelector('.mr-data-table__sort') as HTMLButtonElement
        act(() => sortBtn.click())
        const cells = view.querySelectorAll('tbody td')
        expect(cells[0]?.textContent).toBe('Alice')
    })

    it('supports selection', () => {
        const view = render(
            <DataTable
                columns={columns}
                rows={rows}
                selectable
                getRowId={(r: { name: string; age: number }) => r.name}
            />
        )
        const checkboxes = view.querySelectorAll('.mr-data-table__checkbox')
        expect(checkboxes.length).toBe(3) // select all + 2 rows
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>()
        render(<DataTable ref={ref} columns={columns} rows={rows} />)
        expect(ref.current?.className).toContain('mr-data-table-wrap')
    })

    it('supports client-side pagination slicing and onPageChange', () => {
        let currentPage = 1
        const manyRows = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
            { name: 'Charlie', age: 35 },
            { name: 'David', age: 28 },
        ]
        const view = render(
            <DataTable
                columns={columns}
                rows={manyRows}
                page={1}
                pageSize={2}
                onPageChange={(p) => {
                    currentPage = p
                }}
            />
        )
        const renderedRows = view.querySelectorAll('tbody tr')
        expect(renderedRows.length).toBe(2)
        expect(renderedRows[0]?.textContent).toContain('Alice')
        expect(renderedRows[1]?.textContent).toContain('Bob')

        const pagination = view.querySelector('.mr-pagination')
        expect(pagination).not.toBeNull()

        const nextBtn = view.querySelector('button[aria-label="Next page"]') as HTMLButtonElement
        expect(nextBtn).not.toBeNull()
        act(() => nextBtn.click())
        expect(currentPage).toBe(2)
    })

    it('supports server-side pagination with totalItems and controlled rows', () => {
        const page1Rows = [
            { name: 'Charlie', age: 35 },
            { name: 'David', age: 28 },
        ]
        const view = render(
            <DataTable
                columns={columns}
                rows={page1Rows}
                page={2}
                pageSize={2}
                totalItems={20}
                onPageChange={() => {}}
            />
        )
        const renderedRows = view.querySelectorAll('tbody tr')
        expect(renderedRows.length).toBe(2)
        expect(renderedRows[0]?.textContent).toContain('Charlie')

        const pagination = view.querySelector('.mr-pagination')
        expect(pagination).not.toBeNull()
        expect(view.textContent).toContain('10')
    })
})
