import { useEffect, useEffectEvent, useMemo, useState } from 'react'
import { THEME_STORAGE_KEY, ThemeName } from '../lib/constants'
import { ThemeContext } from '../contexts/theme-context'

type ThemeNameType = (typeof ThemeName)[keyof typeof ThemeName]

function canUseDOM() {
  return typeof window !== 'undefined'
}

function getSystemTheme(): ThemeNameType {
  if (!canUseDOM()) {
    return ThemeName.LIGHT
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return ThemeName.DARK
  }

  return ThemeName.LIGHT
}

function getStoredTheme(): ThemeNameType {
  if (!canUseDOM()) {
    return ThemeName.SYSTEM
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (
    savedTheme === ThemeName.LIGHT ||
    savedTheme === ThemeName.DARK ||
    savedTheme === ThemeName.OLED ||
    savedTheme === ThemeName.SYSTEM
  ) {
    return savedTheme as ThemeNameType
  }

  return ThemeName.SYSTEM
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeNameType>(getStoredTheme)
  const [systemTheme, setSystemTheme] = useState<ThemeNameType>(getSystemTheme)
  const resolvedTheme = theme === ThemeName.SYSTEM ? systemTheme : theme
  const handleSystemThemeChange = useEffectEvent((event: MediaQueryListEvent) => {
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
      isDark: resolvedTheme === ThemeName.DARK || resolvedTheme === ThemeName.OLED,
      setTheme,
      toggleTheme: () => {
        setTheme((currentTheme: ThemeNameType) => {
          const currentResolvedTheme =
            currentTheme === ThemeName.SYSTEM ? systemTheme : currentTheme

          if (currentResolvedTheme === ThemeName.LIGHT) return ThemeName.DARK
          if (currentResolvedTheme === ThemeName.DARK) return ThemeName.OLED
          return ThemeName.LIGHT
        })
      },
    }),
    [resolvedTheme, systemTheme, theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
