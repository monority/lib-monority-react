import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Pagination } from './Pagination'

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

describe('Pagination', () => {
  it('renders page buttons', () => {
    const view = render(<Pagination page={1} totalPages={3} />)
    const buttons = view.querySelectorAll('button.mr-pagination__btn')
    // prev + pages (1,2,3) + next = 5
    expect(buttons.length).toBe(5)
  })

  it('highlights current page', () => {
    const view = render(<Pagination page={2} totalPages={5} />)
    const activeBtn = view.querySelector('button.mr-pagination__btn--active')
    expect(activeBtn?.textContent?.trim()).toBe('2')
    expect(activeBtn?.getAttribute('aria-current')).toBe('page')
  })

  it('disables prev at first page', () => {
    const view = render(<Pagination page={1} totalPages={3} />)
    const prevBtn = view.querySelectorAll('button.mr-pagination__btn')[0]
    expect(prevBtn?.disabled).toBe(true)
  })

  it('disables next at last page', () => {
    const view = render(<Pagination page={3} totalPages={3} />)
    const buttons = view.querySelectorAll('button.mr-pagination__btn')
    const nextBtn = buttons[buttons.length - 1]
    expect(nextBtn?.disabled).toBe(true)
  })

  it('calls onPageChange on click', () => {
    let changed = 0
    const view = render(<Pagination page={1} totalPages={3} onPageChange={(p) => { changed = p }} />)
    const buttons = view.querySelectorAll('button.mr-pagination__btn')
    // buttons: [prev, 1, 2, 3, next]
    act(() => { (buttons[2] as HTMLButtonElement).click() })
    expect(changed).toBe(2)
  })

  it('calls onPageChange for next button', () => {
    let changed = 0
    const view = render(<Pagination page={1} totalPages={3} onPageChange={(p) => { changed = p }} />)
    const buttons = view.querySelectorAll('button.mr-pagination__btn')
    const nextBtn = buttons[buttons.length - 1]
    act(() => { (nextBtn as HTMLButtonElement).click() })
    expect(changed).toBe(2)
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLElement>()
    render(<Pagination ref={ref} page={1} totalPages={1} />)
    expect(ref.current?.tagName).toBe('NAV')
  })

  it('shows ellipsis for large page ranges', () => {
    const view = render(<Pagination page={10} totalPages={20} />)
    const ellipsis = view.querySelector('.mr-pagination__ellipsis')
    expect(ellipsis).not.toBeNull()
  })
})
