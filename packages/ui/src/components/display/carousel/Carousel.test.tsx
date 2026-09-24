import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Carousel } from './Carousel'

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

const slides = [<div key="0">Slide 1</div>, <div key="1">Slide 2</div>, <div key="2">Slide 3</div>]

describe('Carousel', () => {
    it('renders slides', () => {
        const view = render(<Carousel slides={slides} />)
        const track = view.querySelector('.mr-carousel__track')
        expect(track?.children.length).toBe(3)
        expect(track?.textContent).toContain('Slide 1')
        expect(track?.textContent).toContain('Slide 2')
        expect(track?.textContent).toContain('Slide 3')
    })

    it('renders native, labelled navigation buttons', () => {
        const view = render(<Carousel slides={slides} />)
        const arrows = view.querySelectorAll('.mr-carousel__arrow')
        expect(arrows.length).toBe(2)
        expect(arrows[0]?.tagName).toBe('BUTTON')
        expect(arrows[0]?.getAttribute('type')).toBe('button')
        expect(arrows[0]?.getAttribute('aria-label')).toBe('Previous slide')
        expect(arrows[1]?.getAttribute('aria-label')).toBe('Next slide')
    })

    it('renders dot indicators', () => {
        const view = render(<Carousel slides={slides} />)
        const dots = view.querySelectorAll('.mr-carousel__dot')
        expect(dots.length).toBe(3)
    })

    it('dot click navigates', () => {
        const view = render(<Carousel slides={slides} />)
        const dots = view.querySelectorAll('.mr-carousel__dot')

        act(() => {
            ;(dots[2] as HTMLButtonElement).click()
        })

        const activeDot = view.querySelector('.mr-carousel__dot--active')
        expect(activeDot?.getAttribute('aria-label')).toBe('Go to slide 3')
    })

    it('prev/next buttons navigate', () => {
        const view = render(<Carousel slides={slides} />)
        const nextBtn = view.querySelector('.mr-carousel__arrow--next') as HTMLButtonElement

        act(() => {
            nextBtn.click()
        })

        const activeDot = view.querySelector('.mr-carousel__dot--active')
        expect(activeDot?.getAttribute('aria-label')).toBe('Go to slide 2')

        const prevBtn = view.querySelector('.mr-carousel__arrow--prev') as HTMLButtonElement
        act(() => {
            prevBtn.click()
        })

        const activeDotAfter = view.querySelector('.mr-carousel__dot--active')
        expect(activeDotAfter?.getAttribute('aria-label')).toBe('Go to slide 1')
    })

    it('autoPlay advances slides', () => {
        vi.useFakeTimers()
        const view = render(<Carousel slides={slides} autoPlay interval={100} />)

        act(() => {
            vi.advanceTimersByTime(100)
        })

        const activeDot = view.querySelector('.mr-carousel__dot--active')
        expect(activeDot?.getAttribute('aria-label')).toBe('Go to slide 2')

        act(() => {
            vi.advanceTimersByTime(100)
        })

        const activeDot2 = view.querySelector('.mr-carousel__dot--active')
        expect(activeDot2?.getAttribute('aria-label')).toBe('Go to slide 3')

        vi.useRealTimers()
    })

    it('loop wraps around', () => {
        const view = render(<Carousel slides={slides} loop />)
        const nextBtn = view.querySelector('.mr-carousel__arrow--next') as HTMLButtonElement

        // Go to last slide
        act(() => {
            ;(view.querySelectorAll('.mr-carousel__dot')[2] as HTMLButtonElement).click()
        })

        // Next should wrap to first
        act(() => {
            nextBtn.click()
        })

        const activeDot = view.querySelector('.mr-carousel__dot--active')
        expect(activeDot?.getAttribute('aria-label')).toBe('Go to slide 1')
    })

    it('disabled arrows at boundaries (no loop)', () => {
        const view = render(<Carousel slides={slides} loop={false} />)
        const prevBtn = view.querySelector('.mr-carousel__arrow--prev') as HTMLButtonElement
        const nextBtn = view.querySelector('.mr-carousel__arrow--next') as HTMLButtonElement

        // At start: prev disabled, next enabled
        expect(prevBtn.disabled).toBe(true)
        expect(nextBtn.disabled).toBe(false)

        // Go to last slide
        act(() => {
            ;(view.querySelectorAll('.mr-carousel__dot')[2] as HTMLButtonElement).click()
        })

        // At end: prev enabled, next disabled
        const prevBtnAfter = view.querySelector('.mr-carousel__arrow--prev') as HTMLButtonElement
        const nextBtnAfter = view.querySelector('.mr-carousel__arrow--next') as HTMLButtonElement
        expect(prevBtnAfter.disabled).toBe(false)
        expect(nextBtnAfter.disabled).toBe(true)
    })

    it('returns null for empty slides', () => {
        const view = render(<Carousel slides={[]} />)
        expect(view.innerHTML).toBe('')
    })

    it('passes custom className to root', () => {
        const view = render(<Carousel slides={slides} className="custom-class" />)
        const root = view.querySelector('.mr-carousel')
        expect(root?.className).toContain('custom-class')
    })

    it('forwards ref to root element', () => {
        const ref = createRef<HTMLDivElement>()
        render(<Carousel ref={ref} slides={slides} />)
        expect(ref.current?.tagName).toBe('DIV')
        expect(ref.current?.className).toContain('mr-carousel')
    })

    it('hides arrows when showArrows is false', () => {
        const view = render(<Carousel slides={slides} showArrows={false} />)
        const arrows = view.querySelectorAll('.mr-carousel__arrow')
        expect(arrows.length).toBe(0)
    })

    it('hides dots when showDots is false', () => {
        const view = render(<Carousel slides={slides} showDots={false} />)
        const dots = view.querySelectorAll('.mr-carousel__dot')
        expect(dots.length).toBe(0)
    })

    it('applies correct orientation classes', () => {
        const view = render(<Carousel slides={slides} orientation="vertical" />)
        const root = view.querySelector('.mr-carousel')
        const track = view.querySelector('.mr-carousel__track')
        expect(root?.className).toContain('mr-carousel--vertical')
        expect(track?.className).toContain('mr-carousel__track--vertical')
    })

    it('no arrows or dots for single slide', () => {
        const view = render(<Carousel slides={[<div key="0">Only one</div>]} />)
        const arrows = view.querySelectorAll('.mr-carousel__arrow')
        const dots = view.querySelectorAll('.mr-carousel__dot')
        expect(arrows.length).toBe(0)
        expect(dots.length).toBe(0)
    })

    it('applies slideClassName to slides', () => {
        const view = render(<Carousel slides={slides} slideClassName="my-slide" />)
        const slideEl = view.querySelector('.mr-carousel__slide')
        expect(slideEl?.className).toContain('my-slide')
    })

    it('sets aria-hidden on non-visible slides', () => {
        const view = render(<Carousel slides={slides} />)
        const slideEls = view.querySelectorAll('.mr-carousel__slide')
        expect(slideEls[0]?.getAttribute('aria-hidden')).toBe('false')
        expect(slideEls[1]?.getAttribute('aria-hidden')).toBe('true')
        expect(slideEls[2]?.getAttribute('aria-hidden')).toBe('true')
    })

    it('has correct ARIA roles', () => {
        const view = render(<Carousel slides={slides} />)
        const root = view.querySelector('[role="region"]')
        expect(root?.getAttribute('aria-roledescription')).toBe('carousel')

        const firstSlide = view.querySelector('[role="group"]')
        expect(firstSlide?.getAttribute('aria-roledescription')).toBe('slide')
    })
})
