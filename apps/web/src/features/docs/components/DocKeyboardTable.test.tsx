import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DocKeyboardTable } from './DocKeyboardTable'

describe('DocKeyboardTable', () => {
    it('returns null when shortcuts array is empty', () => {
        const { container } = render(<DocKeyboardTable shortcuts={[]} />)
        expect(container.firstChild).toBeNull()
    })

    it('renders shortcuts, action descriptions and context', () => {
        render(
            <DocKeyboardTable
                shortcuts={[
                    {
                        key: ['Control', 'k'],
                        action: 'Ouvre la palette',
                        context: 'Raccourci global',
                    },
                    {
                        key: 'Escape',
                        action: 'Ferme la vue',
                    },
                ]}
            />
        )

        expect(screen.getByText('Control')).toBeInTheDocument()
        expect(screen.getByText('k')).toBeInTheDocument()
        expect(screen.getByText('Ouvre la palette')).toBeInTheDocument()
        expect(screen.getByText('Raccourci global')).toBeInTheDocument()

        expect(screen.getByText('Escape')).toBeInTheDocument()
        expect(screen.getByText('Ferme la vue')).toBeInTheDocument()
        expect(screen.getByText('Global')).toBeInTheDocument()
    })
})
