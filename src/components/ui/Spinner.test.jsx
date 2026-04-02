import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {
    it('renders an accessible label', () => {
        render(<Spinner label="Chargement des donnees" />)

        expect(screen.getByText('Chargement des donnees')).toHaveClass('sr-only')
    })

    it('renders the visual ring', () => {
        render(<Spinner />)

        expect(document.querySelector('.ui-spinner__ring')).toBeInTheDocument()
    })
})
