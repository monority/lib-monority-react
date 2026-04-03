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
