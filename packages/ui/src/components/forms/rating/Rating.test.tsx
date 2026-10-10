import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Rating } from './Rating'

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

describe('Rating', () => {
    it('renders 5 stars by default with role radiogroup', () => {
        render(<Rating defaultValue={3} />)
        const group = document.body.querySelector('[role="radiogroup"]')
        expect(group).not.toBeNull()

        const radios = document.body.querySelectorAll('[role="radio"]')
        expect(radios.length).toBe(5)

        const activeStars = document.body.querySelectorAll('.mr-rating__item[data-active]')
        expect(activeStars.length).toBe(3)
    })

    it('handles click selection and triggers onChange', () => {
        const onChange = vi.fn()
        render(<Rating onChange={onChange} />)

        const radios = document.body.querySelectorAll('[role="radio"]')
        const fourthStar = radios[3] as HTMLButtonElement

        act(() => {
            fourthStar.click()
        })

        expect(onChange).toHaveBeenCalledWith(4)
        const activeStars = document.body.querySelectorAll('.mr-rating__item[data-active]')
        expect(activeStars.length).toBe(4)
    })

    it('handles keyboard navigation with arrow keys', () => {
        const onChange = vi.fn()
        render(<Rating defaultValue={2} onChange={onChange} />)

        const radios = document.body.querySelectorAll('[role="radio"]')
        const secondStar = radios[1] as HTMLButtonElement

        act(() => {
            secondStar.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
            )
        })

        expect(onChange).toHaveBeenCalledWith(3)
    })

    it('renders non-interactive spans in readOnly mode', () => {
        render(<Rating value={4} readOnly />)
        const radios = document.body.querySelectorAll('[role="radio"]')
        expect(radios.length).toBe(0)

        const items = document.body.querySelectorAll('.mr-rating__item')
        expect(items.length).toBe(5)

        const activeItems = document.body.querySelectorAll('.mr-rating__item[data-active]')
        expect(activeItems.length).toBe(4)
    })

    it('forwards ref to root element', () => {
        const ref = createRef<HTMLDivElement>()
        render(<Rating ref={ref} />)
        expect(ref.current).toBeInstanceOf(HTMLDivElement)
        expect(ref.current?.classList.contains('mr-rating')).toBe(true)
    })
})
