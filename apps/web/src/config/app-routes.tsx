import { HomePage } from '@/features/home/HomePage'
import { NotFoundPage } from '@/shared/NotFoundPage'
import { getBrowserLocale, LocaleProvider, readStoredLocale } from '@/shared/i18n'
import { Outlet, Navigate, type RouteObject } from 'react-router-dom'

function LocaleRoot() {
    return (
        <LocaleProvider>
            <Outlet />
        </LocaleProvider>
    )
}

function EnglishHomeRoute() {
    const shouldRedirectToFrench = !readStoredLocale() && getBrowserLocale() === 'fr'
    if (shouldRedirectToFrench) {
        return <Navigate to="/fr" replace />
    }
    return <HomePage />
}

function createLocaleRoutes(prefix: '' | '/fr'): RouteObject[] {
    const path = (routePath: string) =>
        routePath === '/' ? prefix || '/' : `${prefix}${routePath}`

    return [
        {
            path: path('/'),
            element: prefix ? <HomePage /> : <EnglishHomeRoute />,
        },
        {
            path: path('/moodboard'),
            lazy: async () => {
                const { MoodboardPage } = await import('@/features/moodboard/MoodboardPage')
                return { Component: MoodboardPage }
            },
        },
        {
            path: path('/docs/*'),
            lazy: async () => {
                const { DocsPage } = await import('@/features/docs/DocsPage')
                return { Component: DocsPage }
            },
        },
        {
            path: path('/*'),
            element: <NotFoundPage />,
        },
    ]
}

export const appRoutes: RouteObject[] = [
    {
        element: <LocaleRoot />,
        children: [...createLocaleRoutes(''), ...createLocaleRoutes('/fr')],
    },
]
