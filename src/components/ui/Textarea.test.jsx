import { screen } from '@testing-library/react'
import { Textarea } from '@/components/ui/Textarea'
import { renderWithProviders } from '@/test/test-utils'

describe('Textarea', () => {
    it('renders as a multiline textbox with the configured rows', () => {
        renderWithProviders(<Textarea label="Notes" rows={7} />)

        const textarea = screen.getByRole('textbox', { name: /notes/i })

        expect(textarea).toHaveAttribute('rows', '7')
    })
})
