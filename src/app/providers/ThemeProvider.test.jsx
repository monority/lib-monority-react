import { fireEvent, screen } from '@testing-library/react'
import { Button, Text } from '@/components/ui'
import { THEME_STORAGE_KEY, ThemeName } from '@/config/theme'
import { useTheme } from '@/hooks/useTheme'
import { renderWithProviders } from '@/test/test-utils'

function ThemeConsumer() {
    const { theme, resolvedTheme, toggleTheme } = useTheme()

    return (
        <>
            <Text>{`${theme}:${resolvedTheme}`}</Text>
            <Button onClick={toggleTheme}>Toggle theme</Button>
        </>
    )
}

describe('ThemeProvider', () => {
    beforeEach(() => {
        window.localStorage.clear()
        window.matchMedia = vi.fn().mockImplementation(() => ({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }))
    })

    it('uses system theme by default and resolves to light', () => {
        renderWithProviders(<ThemeConsumer />)

        expect(screen.getByText(`${ThemeName.SYSTEM}:${ThemeName.LIGHT}`)).toBeInTheDocument()
        expect(document.querySelector('.app-theme')).toHaveAttribute('data-theme', ThemeName.LIGHT)
    })

    it('persists the selected theme after toggle', () => {
        renderWithProviders(<ThemeConsumer />)

        fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }))

        expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(ThemeName.DARK)
        expect(document.querySelector('.app-theme')).toHaveAttribute('data-theme', ThemeName.DARK)
    })
})
