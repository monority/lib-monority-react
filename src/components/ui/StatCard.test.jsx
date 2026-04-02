import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatCard } from './StatCard'

describe('StatCard', () => {
    it('renders label, value and trend', () => {
        render(<StatCard label="Revenue" value="24.8k" trend="+12%" />)

        expect(screen.getByText('Revenue')).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: '24.8k' })).toBeInTheDocument()
        expect(screen.getByText('+12%')).toBeInTheDocument()
    })

    it('renders description and footer', () => {
        render(
            <StatCard
                label="Coverage"
                value="100%"
                description="Toutes les fondations critiques sont en place."
                footer={<span>Updated today</span>}
            />,
        )

        expect(screen.getByText('Toutes les fondations critiques sont en place.')).toBeInTheDocument()
        expect(screen.getByText('Updated today')).toBeInTheDocument()
    })
})
