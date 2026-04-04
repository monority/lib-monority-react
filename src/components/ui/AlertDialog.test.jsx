import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { renderWithProviders } from '@/test/test-utils'

describe('AlertDialog', () => {
    it('ne rend rien quand open=false', () => {
        renderWithProviders(
            <AlertDialog open={false} title="Confirmation" onConfirm={() => {}} onCancel={() => {}} />,
        )

        expect(screen.queryByRole('alertdialog')).toBeNull()
    })

    it('rend un alertdialog accessible quand open=true', () => {
        renderWithProviders(
            <AlertDialog open title="Supprimer ?" onConfirm={() => {}} onCancel={() => {}} />,
        )

        expect(screen.getByRole('alertdialog', { name: 'Supprimer ?' })).toBeInTheDocument()
    })

    it('affiche le titre et la description', () => {
        renderWithProviders(
            <AlertDialog
                open
                title="Supprimer ?"
                description="Cette action est irreversible."
                onConfirm={() => {}}
                onCancel={() => {}}
            />,
        )

        expect(screen.getByText('Supprimer ?')).toBeInTheDocument()
        expect(screen.getByText('Cette action est irreversible.')).toBeInTheDocument()
    })

    it('appelle onConfirm au clic sur Confirmer', () => {
        const onConfirm = vi.fn()
        renderWithProviders(
            <AlertDialog open title="Supprimer ?" onConfirm={onConfirm} onCancel={() => {}} />,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Confirmer' }))

        expect(onConfirm).toHaveBeenCalledTimes(1)
    })

    it('appelle onCancel au clic sur Annuler', () => {
        const onCancel = vi.fn()
        renderWithProviders(
            <AlertDialog open title="Supprimer ?" onConfirm={() => {}} onCancel={onCancel} />,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Annuler' }))

        expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('appelle onCancel sur la touche Escape', () => {
        const onCancel = vi.fn()
        renderWithProviders(
            <AlertDialog open title="Supprimer ?" onConfirm={() => {}} onCancel={onCancel} />,
        )

        fireEvent.keyDown(screen.getByRole('alertdialog', { name: 'Supprimer ?' }), {
            key: 'Escape',
        })

        expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('affiche les labels personnalises des boutons', () => {
        renderWithProviders(
            <AlertDialog
                open
                title="Confirmation"
                confirmLabel="Oui, supprimer"
                cancelLabel="Non, garder"
                onConfirm={() => {}}
                onCancel={() => {}}
            />,
        )

        expect(screen.getByRole('button', { name: 'Oui, supprimer' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Non, garder' })).toBeInTheDocument()
    })
})
