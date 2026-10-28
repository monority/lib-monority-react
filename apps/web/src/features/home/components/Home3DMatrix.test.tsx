import { renderWithProviders } from '@/shared/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Home3DMatrix } from './Home3DMatrix'

describe('Home3DMatrix', () => {
    it('renders 3D canvas and accessible figure with figcaption', () => {
        renderWithProviders(<Home3DMatrix />)

        const figure = screen.getByRole('figure')
        expect(figure).toBeInTheDocument()
        expect(figure).toHaveAttribute('aria-label')

        expect(
            screen.getByText(
                /Interactive 3D vector matrix demonstrating the Monority UI component core/i
            )
        ).toBeInTheDocument()
        expect(screen.getByText('Drag to orbit 3D')).toBeInTheDocument()
    })
})
