import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from '@/components/ui/Badge'
import { renderWithProviders } from '@/test/test-utils'

describe('Badge', () => {
    it('affiche son contenu', () => {
        renderWithProviders(<Badge>Nouveau</Badge>)

        expect(screen.getByText('Nouveau')).toBeInTheDocument()
    })

    it('applique une classe supplementaire', () => {
        renderWithProviders(<Badge className="badge-custom">Actif</Badge>)

        expect(screen.getByText('Actif')).toHaveClass('ui-badge', 'badge-custom')
    })
})
