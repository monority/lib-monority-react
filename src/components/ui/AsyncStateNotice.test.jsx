import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AsyncStateNotice } from './AsyncStateNotice'

describe('AsyncStateNotice', () => {
    it('affiche le message de chargement', () => {
        render(
            <AsyncStateNotice
                isLoading
                isError={false}
                loadingMessage="Chargement en cours"
                errorMessage="Erreur"
            />,
        )

        expect(screen.getByText('Chargement en cours')).toBeInTheDocument()
        expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
    })

    it('affiche le message d erreur quand le chargement est termine', () => {
        render(
            <AsyncStateNotice
                isLoading={false}
                isError
                loadingMessage="Chargement en cours"
                errorMessage="Erreur"
            />,
        )

        expect(screen.getByText('Erreur')).toBeInTheDocument()
        expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('affiche un rendu de chargement personnalise quand il est fourni', () => {
        render(
            <AsyncStateNotice
                isLoading
                isError={false}
                loadingMessage="Chargement en cours"
                errorMessage="Erreur"
                loadingContent={<div>Skeleton custom</div>}
            />,
        )

        expect(screen.getByText('Skeleton custom')).toBeInTheDocument()
        expect(screen.getByText('Chargement en cours')).toHaveClass('visually-hidden')
    })

    it('n affiche rien en etat neutre', () => {
        const { container } = render(
            <AsyncStateNotice
                isLoading={false}
                isError={false}
                loadingMessage="Chargement en cours"
                errorMessage="Erreur"
            />,
        )

        expect(container).toBeEmptyDOMElement()
    })
})
