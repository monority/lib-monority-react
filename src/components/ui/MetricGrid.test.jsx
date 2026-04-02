import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MetricGrid } from './MetricGrid'

describe('MetricGrid', () => {
    it('renders multiple stat cards from items', () => {
        render(
            <MetricGrid
                items={[
                    { label: 'Components', value: '40+' },
                    { label: 'Coverage', value: '100%' },
                ]}
            />,
        )

        expect(screen.getByText('Components')).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: '40+' })).toBeInTheDocument()
        expect(screen.getByText('Coverage')).toBeInTheDocument()
    })
})
