import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FilterBar } from './FilterBar'

describe('FilterBar', () => {
    it('renders active filters and result count', () => {
        render(
            <FilterBar
                filters={[{ label: 'Active' }, { label: 'Design system' }]}
                resultsCount={12}
            />,
        )

        expect(screen.getByText('Active')).toBeInTheDocument()
        expect(screen.getByText('Design system')).toBeInTheDocument()
        expect(screen.getByText('12 results')).toBeInTheDocument()
    })

    it('calls reset when reset button is clicked', () => {
        const onReset = vi.fn()

        render(<FilterBar filters={[{ label: 'Active' }]} onReset={onReset} />)

        fireEvent.click(screen.getByRole('button', { name: 'Reset' }))

        expect(onReset).toHaveBeenCalledTimes(1)
    })
})
