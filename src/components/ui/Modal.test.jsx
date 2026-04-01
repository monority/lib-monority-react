import { fireEvent, screen } from '@testing-library/react'
import { Modal } from '@/components/ui/Modal'
import { renderWithProviders } from '@/test/test-utils'

describe('Modal', () => {
    it('renders a dialog when open', () => {
        renderWithProviders(
            <Modal open title="Exemple modal" onClose={() => {}}>
                <p>Contenu</p>
            </Modal>,
        )

        expect(screen.getByRole('dialog', { name: 'Exemple modal' })).toBeInTheDocument()
    })

    it('calls onClose when escape is pressed', () => {
        const onClose = vi.fn()

        renderWithProviders(
            <Modal open title="Exemple modal" onClose={onClose}>
                <button type="button">Action</button>
            </Modal>,
        )

        fireEvent.keyDown(screen.getByRole('dialog', { name: 'Exemple modal' }), { key: 'Escape' })

        expect(onClose).toHaveBeenCalledTimes(1)
    })
})
