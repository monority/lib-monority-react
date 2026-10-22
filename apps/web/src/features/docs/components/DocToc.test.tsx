import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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
                <DocToc />
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
                <DocToc />
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
                <DocToc />
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
})
