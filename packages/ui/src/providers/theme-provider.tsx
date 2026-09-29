import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'
import { THEME_STORAGE_KEY, ThemeName } from '../lib/constants'
import type { ResolvedThemeName, ThemeNameType, ThemePreference } from '../lib/constants'
import { ThemeContext } from '../contexts/theme-context'
import { deprecate } from '../internal/deprecate'
import { isDevelopment } from '../internal/env'
import type { ThemeContextValue } from '../contexts/theme-context'

const THEME_CHANGE_EVENT = 'monority-theme-change'
const RESOLVED_THEMES: readonly ResolvedThemeName[] = [
    'light',
    'dark',
    'slate',
    'oled',
    'ocean',
    'night',
    'high-contrast',
]

let hasWarnedAboutIsDark = false

function canUseDOM() {
    return typeof document !== 'undefined'
}

function isResolvedTheme(value: string | undefined): value is ResolvedThemeName {
    return RESOLVED_THEMES.includes(value as ResolvedThemeName)
}

function normalizeTheme(value: string | null | undefined): ThemeNameType {
    if (value === ThemeName.DIM) return ThemeName.DARK
    if (
        value === ThemeName.LIGHT ||
        value === ThemeName.DARK ||
        value === ThemeName.SLATE ||
        value === ThemeName.OLED ||
        value === ThemeName.OCEAN ||
        value === ThemeName.NIGHT ||
        value === ThemeName.HIGH_CONTRAST ||
        value === ThemeName.SYSTEM
    ) {
        return value
    }
    return ThemeName.SYSTEM
}

function getThemeSnapshot(): ThemeNameType {
    if (!canUseDOM()) return ThemeName.SYSTEM
    return normalizeTheme(document.documentElement.dataset.themeChoice)
}

function getThemeStoreSnapshot(): string {
    const theme = getThemeSnapshot()
    return theme === ThemeName.SYSTEM ? `${theme}:${getResolvedThemeSnapshot()}` : theme
}

function getResolvedThemeSnapshot(): ResolvedThemeName {
    if (!canUseDOM()) return ThemeName.LIGHT
    const attribute = document.documentElement.dataset.theme
    return isResolvedTheme(attribute) ? attribute : ThemeName.LIGHT
}

function readStoredTheme(): ThemeNameType {
    try {
        return normalizeTheme(window.localStorage.getItem(THEME_STORAGE_KEY))
    } catch {
        return ThemeName.DARK
    }
}

function resolveSystemTheme(): ResolvedThemeName {
    if (window.matchMedia('(prefers-contrast: more)').matches) return ThemeName.HIGH_CONTRAST
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemeName.DARK
        : ThemeName.LIGHT
}

function notifyThemeChange() {
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
}

function applyTheme(theme: ThemeNameType) {
    const normalizedTheme = normalizeTheme(theme)
    const resolvedTheme =
        normalizedTheme === ThemeName.SYSTEM ? resolveSystemTheme() : normalizedTheme
    const root = document.documentElement
    root.dataset.theme = resolvedTheme
    root.dataset.themeChoice = normalizedTheme
    root.style.colorScheme =
        resolvedTheme === ThemeName.DARK ||
        resolvedTheme === ThemeName.SLATE ||
        resolvedTheme === ThemeName.OLED
            ? 'dark'
            : 'light'

    if (theme === ThemeName.DIM) {
        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, ThemeName.DARK)
        } catch {
            // Le stockage peut être bloqué ; le thème reste appliqué pour la session.
        }
    }
}

function hydrateFromStorage() {
    if (!canUseDOM()) return
    const storedTheme = readStoredTheme()
    try {
        window.localStorage.setItem(THEME_STORAGE_KEY, storedTheme)
    } catch {
        // Le thème résolu reste disponible même sans persistance.
    }
    applyTheme(storedTheme)
    notifyThemeChange()
}

function warnAboutIsDark() {
    if (isDevelopment && !hasWarnedAboutIsDark) {
        hasWarnedAboutIsDark = true
        console.warn(
            '[Monority UI] ThemeContext.isDark is deprecated. Use resolvedTheme with ThemeName.DARK or ThemeName.OLED.'
        )
    }
}

export interface ThemeProviderProps {
    children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const subscriptionTheme = getThemeSnapshot()
    const subscribeToTheme = useCallback(
        (onStoreChange: () => void) => {
            if (!canUseDOM()) return () => undefined

            window.addEventListener(THEME_CHANGE_EVENT, onStoreChange)
            if (subscriptionTheme !== ThemeName.SYSTEM) {
                return () => window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange)
            }

            const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const contrastQuery = window.matchMedia('(prefers-contrast: more)')
            const handleSystemChange = () => {
                applyTheme(ThemeName.SYSTEM)
                onStoreChange()
            }
            darkQuery.addEventListener('change', handleSystemChange)
            contrastQuery.addEventListener('change', handleSystemChange)

            return () => {
                window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange)
                darkQuery.removeEventListener('change', handleSystemChange)
                contrastQuery.removeEventListener('change', handleSystemChange)
            }
        },
        [subscriptionTheme]
    )

    const storeSnapshot = useSyncExternalStore(
        subscribeToTheme,
        getThemeStoreSnapshot,
        () => `${ThemeName.SYSTEM}:${ThemeName.LIGHT}`
    )
    const [storedTheme, systemTheme] = storeSnapshot.split(':') as [
        ThemeNameType,
        ResolvedThemeName?,
    ]
    const theme = normalizeTheme(storedTheme) as ThemePreference
    const resolvedTheme =
        theme === ThemeName.SYSTEM ? (systemTheme ?? ThemeName.LIGHT) : (theme as ResolvedThemeName)

    useEffect(() => {
        if (!canUseDOM() || document.documentElement.dataset.themeChoice) return
        hydrateFromStorage()
    }, [])

    const setTheme = useCallback(
        (nextTheme: ThemeNameType | ((current: ThemeNameType) => ThemeNameType)) => {
            if (!canUseDOM()) return
            const resolvedNextTheme =
                typeof nextTheme === 'function' ? nextTheme(getThemeSnapshot()) : nextTheme
            try {
                window.localStorage.setItem(
                    THEME_STORAGE_KEY,
                    resolvedNextTheme === ThemeName.DIM ? ThemeName.DARK : resolvedNextTheme
                )
            } catch {
                // Le thème reste appliqué pour la session.
            }
            applyTheme(resolvedNextTheme)
            notifyThemeChange()
        },
        []
    )

    const toggleTheme = useCallback(() => {
        if (isDevelopment) {
            deprecate(
                'theme.toggleTheme',
                'toggleTheme is deprecated. Use setTheme with an explicit value.'
            )
        }
        setTheme((currentTheme) => {
            const currentResolvedTheme =
                currentTheme === ThemeName.SYSTEM ? getResolvedThemeSnapshot() : currentTheme
            if (currentResolvedTheme === ThemeName.LIGHT) return ThemeName.DARK
            if (currentResolvedTheme === ThemeName.DARK) return ThemeName.OLED
            return ThemeName.LIGHT
        })
    }, [setTheme])

    const value = useMemo<ThemeContextValue>(
        () => ({
            theme,
            resolvedTheme,
            get isDark() {
                warnAboutIsDark()
                return resolvedTheme === ThemeName.DARK || resolvedTheme === ThemeName.OLED
            },
            setTheme,
            toggleTheme,
        }),
        [resolvedTheme, setTheme, theme, toggleTheme]
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
