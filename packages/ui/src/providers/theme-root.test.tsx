import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from './theme-provider'
import { ThemeRoot } from './theme-root'

afterEach(() => {
    vi.restoreAllMocks()
})

describe('ThemeRoot', () => {
    it('avertit une seule fois en développement', () => {
        Object.defineProperty(window, 'matchMedia', {
            configurable: true,
            value: vi.fn(() => ({
                matches: false,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            })),
        })
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
        const view = (children: React.ReactNode) => (
            <ThemeProvider>
                <ThemeRoot>{children}</ThemeRoot>
            </ThemeProvider>
        )

        const first = render(view('A'))
        first.rerender(view('B'))
        first.unmount()

        expect(
            warn.mock.calls.filter(([message]) => String(message).includes('theme.ThemeRoot'))
        ).toHaveLength(1)
    })
})
