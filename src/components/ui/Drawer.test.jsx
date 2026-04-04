import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Drawer } from '@/components/ui/Drawer'
import { renderWithProviders } from '@/test/test-utils'

describe('Drawer', () => {
    it('ne rend rien quand open=false', () => {
        renderWithProviders(<Drawer open={false} title="Menu" onClose={() => {}} />)

        expect(screen.queryByRole('dialog')).toBeNull()
    })

    it('rend un dialog accessible quand open=true', () => {
        renderWithProviders(
            <Drawer open title="Parametres" onClose={() => {}}>
                <p>Contenu</p>
            </Drawer>,
        )

        expect(screen.getByRole('dialog', { name: 'Parametres' })).toBeInTheDocument()
    })

    it('affiche les children', () => {
        renderWithProviders(
            <Drawer open title="Menu" onClose={() => {}}>
                <p>Elements de menu</p>
            </Drawer>,
        )

        expect(screen.getByText('Elements de menu')).toBeInTheDocument()
    })

    it('appelle onClose sur la touche Escape', () => {
        const onClose = vi.fn()
        renderWithProviders(
            <Drawer open title="Menu" onClose={onClose}>
                <p>Contenu</p>
            </Drawer>,
        )

        fireEvent.keyDown(screen.getByRole('dialog', { name: 'Menu' }), { key: 'Escape' })

        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('appelle onClose via le bouton Fermer', () => {
        const onClose = vi.fn()
        renderWithProviders(
            <Drawer open title="Menu" onClose={onClose}>
                <p>Contenu</p>
            </Drawer>,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Fermer le panneau' }))

        expect(onClose).toHaveBeenCalledTimes(1)
    })
})
