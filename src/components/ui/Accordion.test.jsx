import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Accordion } from '@/components/ui/Accordion'
import { renderWithProviders } from '@/test/test-utils'

const items = [
    { value: 'a', label: 'Section A', content: <p>Contenu A</p> },
    { value: 'b', label: 'Section B', content: <p>Contenu B</p> },
]

describe('Accordion', () => {
    it('affiche les titres des sections', () => {
        renderWithProviders(<Accordion items={items} />)

        expect(screen.getByText('Section A')).toBeInTheDocument()
        expect(screen.getByText('Section B')).toBeInTheDocument()
    })

    it('masque le contenu par defaut', () => {
        renderWithProviders(<Accordion items={items} />)

        expect(screen.getByText('Contenu A').closest('[hidden]')).toBeInTheDocument()
        expect(screen.getByText('Contenu B').closest('[hidden]')).toBeInTheDocument()
    })

    it('ouvre une section au clic', () => {
        renderWithProviders(<Accordion items={items} />)

        fireEvent.click(screen.getByRole('button', { name: /Section A/ }))

        expect(screen.getByRole('button', { name: /Section A/ })).toHaveAttribute(
            'aria-expanded',
            'true',
        )
        expect(screen.getByText('Contenu A').closest('[hidden]')).toBeNull()
    })

    it('ferme une section ouverte quand collapsible', () => {
        renderWithProviders(<Accordion items={items} collapsible />)

        fireEvent.click(screen.getByRole('button', { name: /Section A/ }))
        fireEvent.click(screen.getByRole('button', { name: /Section A/ }))

        expect(screen.getByRole('button', { name: /Section A/ })).toHaveAttribute(
            'aria-expanded',
            'false',
        )
    })

    it('ouvre plusieurs sections avec allowMultiple', () => {
        renderWithProviders(<Accordion items={items} allowMultiple />)

        fireEvent.click(screen.getByRole('button', { name: /Section A/ }))
        fireEvent.click(screen.getByRole('button', { name: /Section B/ }))

        expect(screen.getByRole('button', { name: /Section A/ })).toHaveAttribute(
            'aria-expanded',
            'true',
        )
        expect(screen.getByRole('button', { name: /Section B/ })).toHaveAttribute(
            'aria-expanded',
            'true',
        )
    })

    it('appelle onChange au changement de valeur', () => {
        const onChange = vi.fn()
        renderWithProviders(<Accordion items={items} onChange={onChange} />)

        fireEvent.click(screen.getByRole('button', { name: /Section A/ }))

        expect(onChange).toHaveBeenCalledWith('a')
    })

    it('respecte la valeur initiale defaultValue', () => {
        renderWithProviders(<Accordion items={items} defaultValue="b" />)

        expect(screen.getByRole('button', { name: /Section B/ })).toHaveAttribute(
            'aria-expanded',
            'true',
        )
    })
})
