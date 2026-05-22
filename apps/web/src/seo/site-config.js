export const siteConfig = {
    name: 'Model Starter',
    defaultTitle: 'Model Starter | React + Vite starter senior dev',
    titleSuffix: 'Model Starter',
    defaultDescription:
        'Starter React + Vite oriente senior dev avec design system, composants UI, dark mode, tests et architecture feature-first.',
    defaultImage: '/favicon.svg',
    locale: 'fr_FR',
    type: 'website',
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
