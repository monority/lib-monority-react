import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Field } from '@/components/ui/Field'
import { renderWithProviders } from '@/test/test-utils'

describe('Field', () => {
    it('affiche le label associe au children', () => {
        renderWithProviders(
            <Field label="Nom" htmlFor="name-input">
                <input id="name-input" type="text" />
            </Field>,
        )

        expect(screen.getByText('Nom')).toBeInTheDocument()
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('affiche le marqueur required quand required=true', () => {
        renderWithProviders(
            <Field label="Email" required htmlFor="email">
                <input id="email" type="email" />
            </Field>,
        )

        expect(screen.getByText('*', { exact: false })).toBeInTheDocument()
    })

    it('affiche le hint', () => {
        renderWithProviders(
            <Field label="Email" hint="Format: nom@domaine.com" htmlFor="email">
                <input id="email" type="email" />
            </Field>,
        )

        expect(screen.getByText('Format: nom@domaine.com')).toBeInTheDocument()
    })

    it('affiche le message d erreur avec role alert', () => {
        renderWithProviders(
            <Field label="Email" error="Email invalide" htmlFor="email">
                <input id="email" type="email" />
            </Field>,
        )

        expect(screen.getByRole('alert')).toHaveTextContent('Email invalide')
    })

    it('n affiche pas le label si absent', () => {
        renderWithProviders(
            <Field>
                <input type="text" />
            </Field>,
        )

        expect(screen.queryByRole('label')).toBeNull()
    })
})
