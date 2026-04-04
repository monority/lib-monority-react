import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Skeleton } from '@/components/ui/Skeleton'
import { renderWithProviders } from '@/test/test-utils'

describe('Skeleton', () => {
    it('rend un element masque des technologies d assistance', () => {
        const { container } = renderWithProviders(<Skeleton />)
        const el = container.querySelector('.ui-skeleton')

        expect(el).toHaveAttribute('aria-hidden', 'true')
    })

    it('applique la classe ui-skeleton', () => {
        const { container } = renderWithProviders(<Skeleton />)

        expect(container.querySelector('.ui-skeleton')).toBeInTheDocument()
    })

    it('accepte une classe supplementaire', () => {
        const { container } = renderWithProviders(<Skeleton className="skeleton-custom" />)
        const el = container.querySelector('.ui-skeleton')

        expect(el).toHaveClass('ui-skeleton', 'skeleton-custom')
    })
})
