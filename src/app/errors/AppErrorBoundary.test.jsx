import { fireEvent, screen } from '@testing-library/react'
import { AppErrorBoundary } from '@/app/errors/AppErrorBoundary'
import { renderWithProviders } from '@/test/test-utils'

function ThrowingComponent() {
    throw new Error('Boom')
}

describe('AppErrorBoundary', () => {
    it('renders a fallback UI when a child throws', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

        renderWithProviders(
            <AppErrorBoundary>
                <ThrowingComponent />
            </AppErrorBoundary>,
        )

        expect(
            screen.getByRole('heading', {
                name: /une erreur a interrompu le rendu de l'application/i,
            }),
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
            </AppErrorBoundary>,
        )

        fireEvent.click(screen.getByRole('button', { name: /recharger/i }))

        expect(reloadSpy).toHaveBeenCalledTimes(1)

        consoleErrorSpy.mockRestore()
    })
})
