import { useEffect, useEffectEvent, useMemo, useState } from 'react'
import { THEME_STORAGE_KEY, ThemeName } from '@/config/theme'
import { ThemeContext } from './theme-context'

function canUseDOM() {
    return typeof window !== 'undefined'
}

function getSystemTheme() {
    if (!canUseDOM()) {
        return ThemeName.LIGHT
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return ThemeName.DARK
    }

    return ThemeName.LIGHT
}

function getStoredTheme() {
    if (!canUseDOM()) {
        return ThemeName.SYSTEM
    }

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
    const handleSystemThemeChange = useEffectEvent((event) => {
        setSystemTheme(event.matches ? ThemeName.DARK : ThemeName.LIGHT)
    })

    useEffect(() => {
        if (!canUseDOM()) {
            return undefined
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener('change', handleSystemThemeChange)

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange)
        }
    }, [])

    useEffect(() => {
        if (!canUseDOM()) {
            return
        }

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
