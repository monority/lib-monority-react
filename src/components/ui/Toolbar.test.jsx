import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'
import { Toolbar } from './Toolbar'

describe('Toolbar', () => {
    it('renders leading and trailing content', () => {
        render(
            <Toolbar
                leading={<span>Filters</span>}
                trailing={<Button>Export</Button>}
            />,
        )

        expect(screen.getByText('Filters')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument()
    })

    it('renders center content when provided', () => {
        render(<Toolbar leading={<span>Left</span>}>Center zone</Toolbar>)

        expect(screen.getByText('Center zone')).toBeInTheDocument()
    })
})
