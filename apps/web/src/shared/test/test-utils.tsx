import { AppProviders } from '@/shared/providers/AppProviders'
import { render } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

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
