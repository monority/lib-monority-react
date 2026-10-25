import { AppErrorBoundary } from '@/shared/errors/AppErrorBoundary'
import { renderWithProviders } from '@/shared/test/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

function ThrowingComponent(): null {
    throw new Error('Boom')
}

describe('AppErrorBoundary', () => {
    it('renders a fallback UI when a child throws', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

        renderWithProviders(
            <AppErrorBoundary>
                <ThrowingComponent />
            </AppErrorBoundary>
        )

        expect(
            screen.getByRole('heading', {
                name: /an error interrupted the application rendering/i,
            })
        ).toBeInTheDocument()

        consoleErrorSpy.mockRestore()
    })

    it('reloads the page when the reload action is clicked', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        const reloadSpy = vi.fn()
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: reloadSpy },
        })

        renderWithProviders(
            <AppErrorBoundary>
                <ThrowingComponent />
            </AppErrorBoundary>
        )

        fireEvent.click(screen.getByRole('button', { name: /reload/i }))

        expect(reloadSpy).toHaveBeenCalledTimes(1)

        consoleErrorSpy.mockRestore()
    })
})
