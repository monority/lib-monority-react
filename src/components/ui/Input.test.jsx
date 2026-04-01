import { screen } from '@testing-library/react'
import { Input } from '@/components/ui/Input'
import { renderWithProviders } from '@/test/test-utils'

describe('Input', () => {
    it('associates label, hint and error with the input', () => {
        renderWithProviders(
            <Input
                label="Email"
                hint="Utilise une adresse professionnelle."
                error="Ce champ est requis."
            />,
        )

        const input = screen.getByRole('textbox', { name: /email/i })

        expect(input).toHaveAttribute('aria-invalid', 'true')
        expect(screen.getByText('Utilise une adresse professionnelle.')).toBeInTheDocument()
        expect(screen.getByRole('alert')).toHaveTextContent('Ce champ est requis.')
        expect(input).toHaveAttribute('aria-describedby')
    })
})
