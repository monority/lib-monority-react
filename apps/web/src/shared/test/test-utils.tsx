import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { ReactElement, ReactNode } from 'react'
import { AppProviders } from '@/shared/providers/AppProviders'

interface RenderWithProvidersOptions {
    initialEntries?: string[]
    [key: string]: unknown
}

export function renderWithProviders(ui: ReactElement, options: RenderWithProvidersOptions = {}) {
    const Wrapper = ({ children }: { children: ReactNode }) => {
        return (
            <MemoryRouter initialEntries={options.initialEntries}>
                <AppProviders>{children}</AppProviders>
            </MemoryRouter>
        )
    }

    return render(ui, { wrapper: Wrapper, ...options })
}
