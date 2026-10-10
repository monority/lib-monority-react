import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Sheet } from './Sheet'

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
    document.body.style.overflow = ''
    root = null
    container = null
    vi.useRealTimers()
})

describe('Sheet', () => {
    it('renders nothing when closed', () => {
        render(
            <Sheet open={false} title="Filtres" onClose={vi.fn()}>
                Contenu
            </Sheet>
        )
        expect(document.body.querySelector('.mr-sheet__backdrop')).toBeNull()
    })

    it('renders dialog and backdrop when open', () => {
        render(
            <Sheet open title="Filtres" onClose={vi.fn()}>
                Contenu
            </Sheet>
        )
        const backdrop = document.body.querySelector('.mr-sheet__backdrop')
        expect(backdrop).not.toBeNull()
        expect(backdrop?.getAttribute('data-open')).toBe('true')

        const dialog = document.body.querySelector('[role="dialog"]')
        expect(dialog).not.toBeNull()
        expect(dialog?.getAttribute('aria-modal')).toBe('true')
    })

    it('renders title, description and children', () => {
        render(
            <Sheet
                open
                title="Panneau d'edition"
                description="Modifier les parametres"
                onClose={vi.fn()}
            >
                Formulaire
            </Sheet>
        )
        expect(document.body.querySelector('.mr-sheet__title')?.textContent).toBe(
            "Panneau d'edition"
        )
        expect(document.body.querySelector('.mr-sheet__description')?.textContent).toBe(
            'Modifier les parametres'
        )
        expect(document.body.querySelector('.mr-sheet__body')?.textContent).toBe('Formulaire')
    })

    it('applies side attribute properly', () => {
        render(
            <Sheet open title="Filtres" side="left" onClose={vi.fn()}>
                Contenu
            </Sheet>
        )
        const panel = document.body.querySelector('.mr-sheet__panel')
        expect(panel?.getAttribute('data-side')).toBe('left')
    })

    it('calls onClose when clicking close button after animation', () => {
        vi.useFakeTimers()
        const onClose = vi.fn()
        render(
            <Sheet open title="Filtres" onClose={onClose}>
                Contenu
            </Sheet>
        )

        const closeBtn = document.body.querySelector('.mr-sheet__close') as HTMLButtonElement
        expect(closeBtn).not.toBeNull()

        act(() => {
            closeBtn.click()
        })

        expect(document.body.querySelector('.mr-sheet__panel')?.hasAttribute('data-closing')).toBe(
            true
        )

        act(() => {
            vi.advanceTimersByTime(200)
        })

        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('renders custom footer', () => {
        render(
            <Sheet
                open
                title="Filtres"
                footer={<button type="button">Sauvegarder</button>}
                onClose={vi.fn()}
            >
                Contenu
            </Sheet>
        )
        expect(document.body.querySelector('.mr-sheet__footer button')?.textContent).toBe(
            'Sauvegarder'
        )
    })

    it('forwards ref to the sheet panel element', () => {
        const ref = createRef<HTMLDivElement>()
        render(
            <Sheet ref={ref} open title="Ref test" onClose={vi.fn()}>
                Test
            </Sheet>
        )
        expect(ref.current).toBeInstanceOf(HTMLDivElement)
        expect(ref.current?.classList.contains('mr-sheet__panel')).toBe(true)
    })

    it('renders compound components correctly', () => {
        render(
            <div>
                <Sheet.Header>
                    <Sheet.Title>Titre compose</Sheet.Title>
                    <Sheet.Description>Description composee</Sheet.Description>
                </Sheet.Header>
                <Sheet.Body>Corps compose</Sheet.Body>
                <Sheet.Footer>Pied compose</Sheet.Footer>
            </div>
        )

        expect(document.body.querySelector('.mr-sheet__title')?.textContent).toBe('Titre compose')
        expect(document.body.querySelector('.mr-sheet__description')?.textContent).toBe(
            'Description composee'
        )
        expect(document.body.querySelector('.mr-sheet__body')?.textContent).toBe('Corps compose')
        expect(document.body.querySelector('.mr-sheet__footer')?.textContent).toBe('Pied compose')
    })
})
