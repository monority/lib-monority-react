import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Toast } from './Toast'

describe('Toast', () => {
    it('utilise un role status pour les toasts neutres', () => {
        render(<Toast title="Info" description="Saved" />)

        expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('utilise un role alert pour les toasts d erreur', () => {
        render(<Toast title="Erreur" description="Request failed" tone="danger" />)

        expect(screen.getByRole('alert')).toBeInTheDocument()
    })
})
