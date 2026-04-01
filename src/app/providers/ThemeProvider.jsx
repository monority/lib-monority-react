import { useEffect, useMemo, useState } from 'react'
import { THEME_STORAGE_KEY, ThemeName } from '@/config/theme'
import { ThemeContext } from './theme-context'

function getSystemTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return ThemeName.DARK
    }

    return ThemeName.LIGHT
}

function getStoredTheme() {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

    if (
        savedTheme === ThemeName.LIGHT ||
        savedTheme === ThemeName.DARK ||
        savedTheme === ThemeName.SYSTEM
    ) {
        return savedTheme
    }

    return ThemeName.SYSTEM
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getStoredTheme)
    const [systemTheme, setSystemTheme] = useState(getSystemTheme)
    const resolvedTheme = theme === ThemeName.SYSTEM ? systemTheme : theme

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (event) => {
            setSystemTheme(event.matches ? ThemeName.DARK : ThemeName.LIGHT)
        }

        mediaQuery.addEventListener('change', handleChange)

        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    }, [theme])

    const value = useMemo(
        () => ({
            theme,
            resolvedTheme,
            isDark: resolvedTheme === ThemeName.DARK,
            setTheme,
            toggleTheme: () => {
                setTheme((currentTheme) => {
                    const currentResolvedTheme =
                        currentTheme === ThemeName.SYSTEM ? systemTheme : currentTheme

                    return currentResolvedTheme === ThemeName.DARK
                        ? ThemeName.LIGHT
                        : ThemeName.DARK
                })
            },
        }),
        [resolvedTheme, systemTheme, theme],
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
