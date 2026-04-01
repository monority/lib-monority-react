import { render } from '@testing-library/react'
import { AppProviders } from '@/app/providers/AppProviders'

export function renderWithProviders(ui) {
    return render(<AppProviders>{ui}</AppProviders>)
}
