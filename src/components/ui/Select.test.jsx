import { screen } from '@testing-library/react'
import { Select } from '@/components/ui/Select'
import { renderWithProviders } from '@/test/test-utils'

describe('Select', () => {
    it('renders options and an accessible label', () => {
        renderWithProviders(
            <Select label="Theme preset" defaultValue="system">
                <option value="system">System</option>
                <option value="light">Light</option>
            </Select>,
        )

        const select = screen.getByRole('combobox', { name: /theme preset/i })

        expect(select).toHaveValue('system')
        expect(screen.getByRole('option', { name: 'Light' })).toBeInTheDocument()
    })
})
