import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Progress } from './Progress'

describe('Progress', () => {
    it('renders the clamped progress value', () => {
        render(<Progress label="Completion" value={140} />)

        expect(screen.getByRole('progressbar', { name: 'Completion' })).toHaveAttribute(
            'aria-valuenow',
            '100',
        )
        expect(screen.getByText('100%')).toBeInTheDocument()
    })

    it('supports hidden visible value text', () => {
        render(<Progress label="Upload" value={48} showValue={false} />)

        expect(screen.queryByText('48%')).not.toBeInTheDocument()
    })
})
