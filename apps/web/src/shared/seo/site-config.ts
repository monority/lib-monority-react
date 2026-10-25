import type { Locale } from '@/shared/i18n/locales'

export const siteConfig = {
    name: 'Monority UI',
    defaultTitle: 'Monority UI | React component library',
    titleSuffix: 'Monority UI',
    defaultDescription:
        'Monority UI is a React 19 component library driven by CSS design tokens, with runtime themes, accessible primitives and a layered CSS foundation.',
    defaultImage: '/favicon.svg',
    type: 'website',
}

export const ogLocales: Record<Locale, string> = {
    en: 'en_US',
    fr: 'fr_FR',
}

export function getSiteUrl() {
    const configuredSiteUrl = import.meta.env.VITE_SITE_URL

    if (configuredSiteUrl) {
        return configuredSiteUrl.replace(/\/$/, '')
    }

    if (typeof window !== 'undefined') {
        return window.location.origin
    }

    return 'http://localhost:5173'
}

export function buildAbsoluteUrl(pathname = '/') {
    const baseUrl = getSiteUrl()
    const normalizedPath = pathname === '/' ? '' : pathname

    return `${baseUrl}${normalizedPath}`
}
