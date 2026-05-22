import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ReactElement } from 'react'
import { AppProviders } from '@/providers/AppProviders.jsx'

export function renderWithProviders(ui, options = {}) {
    const Wrapper = ({ children }) => {
        return (
            <MemoryRouter initialEntries={options.initialEntries}>
                <AppProviders>{children}</AppProviders>
            </MemoryRouter>
        )
    }

    return render(ui, { wrapper: Wrapper, ...options })
}
