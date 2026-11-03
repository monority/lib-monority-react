import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LocaleProvider } from '@/shared/i18n'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DocToc } from './DocToc'

describe('DocToc', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        document.body.innerHTML = `
            <div class="docs-page">
                <section id="overview" class="docs-section-card">
                    <div class="docs-section-card__header">
                        <h2 class="docs-section-card__title">
                            <a href="#overview" class="docs-section-card__anchor">
                                <span>Apercu</span>
                                <span class="docs-section-card__hash">#</span>
                            </a>
                        </h2>
                    </div>
                    <div class="docs-section-card__content">Apercu content</div>
                </section>
                <section id="examples" class="docs-section-card">
                    <div class="docs-section-card__header">
                        <h2 class="docs-section-card__title">
                            <a href="#examples" class="docs-section-card__anchor">
                                <span>Exemples</span>
                                <span class="docs-section-card__hash">#</span>
                            </a>
                        </h2>
                    </div>
                    <div class="docs-section-card__content">Exemples content</div>
                </section>
                <section id="api" class="docs-section-card">
                    <div class="docs-section-card__header">
                        <h2 class="docs-section-card__title">
                            <a href="#api" class="docs-section-card__anchor">
                                <span>Proprietes & API</span>
                                <span class="docs-section-card__hash">#</span>
                            </a>
                        </h2>
                    </div>
                    <div class="docs-section-card__content">API content</div>
                </section>
            </div>
        `
    })

    afterEach(() => {
        vi.useRealTimers()
        document.body.innerHTML = ''
    })

    it('collects headings and renders TOC links', () => {
        render(
            <MemoryRouter initialEntries={['/docs/button']}>
                <LocaleProvider>
                    <DocToc />
                </LocaleProvider>
            </MemoryRouter>
        )

        act(() => {
            vi.advanceTimersByTime(100)
        })

        expect(screen.getByText('On this page')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Apercu' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Exemples' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Proprietes & API' })).toBeInTheDocument()
    })

    it('sets initial active item to first heading', () => {
        render(
            <MemoryRouter initialEntries={['/docs/button']}>
                <LocaleProvider>
                    <DocToc />
                </LocaleProvider>
            </MemoryRouter>
        )

        act(() => {
            vi.advanceTimersByTime(100)
        })

        const apercuLink = screen.getByRole('link', { name: 'Apercu' })
        expect(apercuLink).toHaveClass('docs-toc__link--active')
        expect(apercuLink).toHaveAttribute('aria-current', 'location')
    })

    it('locks active state and calls window.scrollTo on click', () => {
        const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

        render(
            <MemoryRouter initialEntries={['/docs/button']}>
                <LocaleProvider>
                    <DocToc />
                </LocaleProvider>
            </MemoryRouter>
        )

        act(() => {
            vi.advanceTimersByTime(100)
        })

        const apiLink = screen.getByRole('link', { name: 'Proprietes & API' })
        fireEvent.click(apiLink)

        expect(apiLink).toHaveClass('docs-toc__link--active')
        expect(scrollToSpy).toHaveBeenCalled()

        scrollToSpy.mockRestore()
    })

    it('keeps second-to-last item active when it intersects reading line even near bottom', () => {
        render(
            <MemoryRouter initialEntries={['/docs/button']}>
                <LocaleProvider>
                    <DocToc />
                </LocaleProvider>
            </MemoryRouter>
        )

        act(() => {
            vi.advanceTimersByTime(100)
        })

        const overviewEl = document.getElementById('overview')!
        const examplesEl = document.getElementById('examples')!
        const apiEl = document.getElementById('api')!

        Object.defineProperty(window, 'scrollY', { value: 300, writable: true, configurable: true })

        vi.spyOn(overviewEl, 'getBoundingClientRect').mockReturnValue({
            top: -200,
            bottom: -50,
            left: 0,
            right: 100,
            width: 100,
            height: 150,
            x: 0,
            y: -200,
            toJSON: () => {},
        })
        // Mock bounding client rects:
        // examples (avant-dernier): top 90px <= 120px, bottom 350px > 120px
        // api (dernier): top 350px > 120px
        vi.spyOn(examplesEl, 'getBoundingClientRect').mockReturnValue({
            top: 90,
            bottom: 350,
            left: 0,
            right: 100,
            width: 100,
            height: 260,
            x: 0,
            y: 90,
            toJSON: () => {},
        })
        vi.spyOn(apiEl, 'getBoundingClientRect').mockReturnValue({
            top: 350,
            bottom: 600,
            left: 0,
            right: 100,
            width: 100,
            height: 250,
            x: 0,
            y: 350,
            toJSON: () => {},
        })

        // Simuler un événement de défilement
        fireEvent.scroll(window)

        const examplesLink = screen.getByRole('link', { name: 'Exemples' })
        expect(examplesLink).toHaveClass('docs-toc__link--active')
        expect(screen.getByRole('link', { name: 'Proprietes & API' })).not.toHaveClass(
            'docs-toc__link--active'
        )
    })
})
