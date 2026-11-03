export const SUPPORTED_LOCALES = ['en', 'fr'] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_STORAGE_KEY = 'monority-locale'

const LOCALE_PREFIX: Record<Locale, string> = {
    en: '',
    fr: '/fr',
}

export function isLocale(value: unknown): value is Locale {
    return value === 'en' || value === 'fr'
}

export function getLocaleFromPath(pathname: string): Locale {
    return pathname === LOCALE_PREFIX.fr || pathname.startsWith(`${LOCALE_PREFIX.fr}/`)
        ? 'fr'
        : 'en'
}

export function stripLocaleFromPath(pathname: string): string {
    if (pathname === LOCALE_PREFIX.fr) return '/'
    if (pathname.startsWith(`${LOCALE_PREFIX.fr}/`)) return pathname.slice(LOCALE_PREFIX.fr.length)
    return pathname
}

export function localizePath(pathname: string, locale: Locale): string {
    const basePath = stripLocaleFromPath(pathname)
    if (locale === DEFAULT_LOCALE) return basePath
    return basePath === '/' ? LOCALE_PREFIX[locale] : `${LOCALE_PREFIX[locale]}${basePath}`
}

export function localizeHref(pathname: string, locale: Locale, search = '', hash = ''): string {
    return `${localizePath(pathname, locale)}${search}${hash}`
}

export function readStoredLocale(): Locale | null {
    if (typeof window === 'undefined') return null
    try {
        const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
        return isLocale(stored) ? stored : null
    } catch {
        return null
    }
}

export function persistLocale(locale: Locale): void {
    if (typeof window === 'undefined') return
    try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
        // Storage can be unavailable (private mode); the URL remains the source of truth.
    }
}

export function getBrowserLocale(): Locale {
    if (typeof navigator === 'undefined') return DEFAULT_LOCALE
    return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : DEFAULT_LOCALE
}

export function resolveInitialLocale(): Locale {
    return readStoredLocale() ?? getBrowserLocale()
}
