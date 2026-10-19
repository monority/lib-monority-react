import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
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
    })

    it('has no columns variant when the prop is absent', () => {
        const view = render(<DataList items={items} />)
        const dl = view.querySelector('dl')
        // sans prop `columns`, aucune variante n'est appliquée : le comportement
        // historique (base) doit être conservé
        expect(dl?.getAttribute('data-columns')).toBeNull()
        expect(dl?.className).toBe('mr-data-list')
    })

    it('applies the auto columns when specified explicitly', () => {
        const view = render(<DataList items={items} columns="auto" />)
        expect(view.querySelector('dl')?.getAttribute('data-columns')).toBe('auto')
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

    it('supports declarative compound composition', () => {
        const view = render(
            <DataList columns="split">
                <DataList.Item>
                    <DataList.Label>Status</DataList.Label>
                    <DataList.Value>Active</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>Role</DataList.Label>
                    <DataList.Value>Lead</DataList.Value>
                </DataList.Item>
            </DataList>
        )
        const dts = view.querySelectorAll('dt')
        const dds = view.querySelectorAll('dd')
        expect(dts.length).toBe(2)
        expect(dds.length).toBe(2)
        expect(dts[0]?.textContent).toBe('Status')
        expect(dds[0]?.textContent).toBe('Active')
        expect(dts[1]?.textContent).toBe('Role')
        expect(dds[1]?.textContent).toBe('Lead')
        expect(view.querySelector('dl')?.getAttribute('data-columns')).toBe('split')
    })
})
