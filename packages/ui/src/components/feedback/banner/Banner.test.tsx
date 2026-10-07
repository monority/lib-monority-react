import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Banner } from './Banner'

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

describe('Banner', () => {
    it('renders title', () => {
        const view = render(<Banner title="Important" />)
        expect(view.querySelector('.mr-banner__title')?.textContent).toBe('Important')
    })

    it('renders children as fallback description', () => {
        const view = render(<Banner>Maintenance starts at 18:00.</Banner>)
        expect(view.querySelector('.mr-banner__description')?.textContent).toBe(
            'Maintenance starts at 18:00.'
        )
    })

    it('renders description', () => {
        const view = render(<Banner description="Details here" />)
        expect(view.querySelector('.mr-banner__description')?.textContent).toBe('Details here')
    })

    it('applies tone and role="status" for non-danger', () => {
        const view = render(<Banner tone="success" title="Done" />)
        const el = view.querySelector('section')
        expect(el?.getAttribute('data-tone')).toBe('success')
        expect(el?.getAttribute('role')).toBe('status')
    })

    it('applies role="alert" for danger tone', () => {
        const view = render(<Banner tone="danger" title="Alerte critique" />)
        const el = view.querySelector('section')
        expect(el?.getAttribute('role')).toBe('alert')
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLElement>()
        render(<Banner ref={ref} title="Test" />)
        expect(ref.current?.tagName).toBe('SECTION')
        expect(ref.current?.className).toContain('mr-banner')
    })

    it('renders compound components declaratively', () => {
        const view = render(
            <Banner tone="warning">
                <Banner.Eyebrow>Avis</Banner.Eyebrow>
                <Banner.Title>Mise à jour</Banner.Title>
                <Banner.Description>Redémarrage prévu.</Banner.Description>
                <Banner.Actions>
                    <button type="button">Voir</button>
                </Banner.Actions>
            </Banner>
        )

        expect(view.querySelector('.mr-banner__eyebrow')?.textContent).toBe('Avis')
        expect(view.querySelector('.mr-banner__title')?.textContent).toBe('Mise à jour')
        expect(view.querySelector('.mr-banner__description')?.textContent).toBe(
            'Redémarrage prévu.'
        )
        expect(view.querySelector('button')?.textContent).toBe('Voir')
    })

    it('renders dismiss button when dismissible or onDismiss provided', () => {
        let dismissed = false
        const view = render(
            <Banner
                title="Notice"
                dismissible
                onDismiss={() => {
                    dismissed = true
                }}
            />
        )
        const closeBtn = view.querySelector('.mr-banner__close') as HTMLButtonElement
        expect(closeBtn).not.toBeNull()
        expect(closeBtn.getAttribute('aria-label')).toBe("Fermer l'annonce")

        act(() => {
            closeBtn.click()
        })
        expect(dismissed).toBe(true)
    })

    it('does not render when open is false', () => {
        const view = render(<Banner open={false} title="Hidden" />)
        expect(view.querySelector('.mr-banner')).toBeNull()
    })
})
