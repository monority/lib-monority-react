import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { DocsLayout } from './DocsLayout'

function renderDocsLayout(initialEntries = ['/docs']) {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <DocsLayout>
                <div>Documentation content</div>
            </DocsLayout>
        </MemoryRouter>,
    )
}

describe('DocsLayout mobile navigation', () => {
    it('starts with the mobile navigation closed and content visible', () => {
        renderDocsLayout()
        expect(screen.getByText('Documentation content')).toBeInTheDocument()
        expect(screen.queryByRole('dialog', { name: 'Documentation navigation' })).toBeNull()
        expect(
            screen.getByRole('button', { name: 'Open documentation menu' }),
        ).toHaveAttribute('aria-expanded', 'false')
    })

    it('opens the navigation on burger toggle and closes it on second toggle', () => {
        renderDocsLayout()
        const toggle = screen.getByRole('button', { name: 'Open documentation menu' })

        fireEvent.click(toggle)
        const dialog = screen.getByRole('dialog', { name: 'Documentation navigation' })
        expect(dialog).toBeInTheDocument()
        expect(toggle).toHaveAttribute('aria-expanded', 'true')

        fireEvent.click(toggle)
        expect(screen.queryByRole('dialog', { name: 'Documentation navigation' })).toBeNull()
    })

    it('closes the navigation on Escape', () => {
        renderDocsLayout()
        fireEvent.click(screen.getByRole('button', { name: 'Open documentation menu' }))
        expect(
            screen.getByRole('dialog', { name: 'Documentation navigation' }),
        ).toBeInTheDocument()

        fireEvent.keyDown(document, { key: 'Escape' })
        expect(screen.queryByRole('dialog', { name: 'Documentation navigation' })).toBeNull()
    })
})
