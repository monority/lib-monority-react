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

    it('closes the drawer synchronously when a navigation link is clicked', () => {
        renderDocsLayout()
        fireEvent.click(screen.getByRole('button', { name: 'Open documentation menu' }))
        const dialog = screen.getByRole('dialog', { name: 'Documentation navigation' })
        const toastLink = dialog.querySelector('a[href="/docs/toast"]')
        expect(toastLink).not.toBeNull()
        fireEvent.click(toastLink!)
        expect(screen.queryByRole('dialog', { name: 'Documentation navigation' })).toBeNull()
    })

    it('closes the navigation on Escape', () => {        renderDocsLayout()
        fireEvent.click(screen.getByRole('button', { name: 'Open documentation menu' }))
        expect(
            screen.getByRole('dialog', { name: 'Documentation navigation' }),
        ).toBeInTheDocument()

        fireEvent.keyDown(document, { key: 'Escape' })
        expect(screen.queryByRole('dialog', { name: 'Documentation navigation' })).toBeNull()
    })
})

describe('DocsLayout component search', () => {
    it('matches hyphenated slugs like date-picker', () => {
        renderDocsLayout()
        const search = screen.getByRole('searchbox', { name: 'Search components' })
        fireEvent.change(search, { target: { value: 'date-picker' } })
        expect(screen.getByRole('link', { name: /DatePicker/ })).toBeInTheDocument()
    })

    it('shows a clearable empty state when nothing matches', () => {
        renderDocsLayout()
        const search = screen.getByRole('searchbox', { name: 'Search components' })
        fireEvent.change(search, { target: { value: 'zzz-no-such-component' } })
        expect(screen.getByText(/No components match/)).toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))
        expect(
            (screen.getByRole('searchbox', { name: 'Search components' }) as HTMLInputElement)
                .value,
        ).toBe('')
    })

    it('clears the search on Escape', () => {
        renderDocsLayout()
        const search = screen.getByRole('searchbox', { name: 'Search components' })
        fireEvent.change(search, { target: { value: 'button' } })
        fireEvent.keyDown(search, { key: 'Escape' })
        expect((search as HTMLInputElement).value).toBe('')
    })

    it('resets the search filter on navigation', () => {
        renderDocsLayout()
        const search = screen.getByRole('searchbox', { name: 'Search components' })
        fireEvent.change(search, { target: { value: 'zzz-no-such-component' } })
        expect(screen.getByText(/No components match/)).toBeInTheDocument()
        fireEvent.click(screen.getByRole('link', { name: /Installation/ }))
        expect(screen.queryByText(/No components match/)).toBeNull()
        expect((screen.getByRole('searchbox', { name: 'Search components' }) as HTMLInputElement).value).toBe('')
    })
})
