import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Popover } from '@/components/ui/Popover'
import { renderWithProviders } from '@/test/test-utils'

describe('Popover', () => {
    it('rend le trigger sans le contenu popover', () => {
        renderWithProviders(
            <Popover trigger={<button type="button">Info</button>}>
                <p>Contenu popover</p>
            </Popover>,
        )

        expect(screen.getByRole('button', { name: 'Info' })).toBeInTheDocument()
        expect(screen.queryByText('Contenu popover')).toBeNull()
    })

    it('ouvre le popover au clic sur le trigger', () => {
        renderWithProviders(
            <Popover trigger={<button type="button">Info</button>}>
                <p>Contenu popover</p>
            </Popover>,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Info' }))

        expect(screen.getByText('Contenu popover')).toBeInTheDocument()
    })

    it('ferme le popover sur Escape', () => {
        renderWithProviders(
            <Popover trigger={<button type="button">Info</button>}>
                <p>Contenu popover</p>
            </Popover>,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Info' }))
        expect(screen.getByText('Contenu popover')).toBeInTheDocument()

        fireEvent.keyDown(document, { key: 'Escape' })

        expect(screen.queryByText('Contenu popover')).toBeNull()
    })

    it('s ouvre avec defaultOpen=true', () => {
        renderWithProviders(
            <Popover trigger={<button type="button">Info</button>} defaultOpen>
                <p>Ouvert par defaut</p>
            </Popover>,
        )

        expect(screen.getByText('Ouvert par defaut')).toBeInTheDocument()
    })

    it('respecte l etat open controle', () => {
        renderWithProviders(
            <Popover
                trigger={<button type="button">Info</button>}
                open={true}
                onOpenChange={() => {}}
            >
                <p>Contenu controle</p>
            </Popover>,
        )

        expect(screen.getByText('Contenu controle')).toBeInTheDocument()
    })

    it('appelle onOpenChange au clic sur le trigger', () => {
        const onOpenChange = vi.fn()
        renderWithProviders(
            <Popover
                trigger={<button type="button">Info</button>}
                open={false}
                onOpenChange={onOpenChange}
            >
                <p>Contenu</p>
            </Popover>,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Info' }))

        expect(onOpenChange).toHaveBeenCalledWith(true)
    })
})
