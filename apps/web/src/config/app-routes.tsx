import { MoodboardPage } from '@/features/moodboard/MoodboardPage'
import { NotFoundPage } from '@/shared/NotFoundPage'
import { HomePage } from '@/features/home/HomePage'
import type { RouteObject } from 'react-router-dom'

interface AppRouteDefinition {
    key: string
    label: string
    path: string
    includeInPrimaryNavigation?: boolean
}

const appRouteDefinitions: AppRouteDefinition[] = [
    {
        key: 'home',
        label: 'Accueil',
        path: '/',
        includeInPrimaryNavigation: true,
    },
    {
        key: 'docs',
        label: 'Docs',
        path: '/docs/*',
        includeInPrimaryNavigation: true,
    },
    {
        key: 'moodboard',
        label: 'Moodboard',
        path: '/moodboard',
        includeInPrimaryNavigation: true,
    },
    {
        key: 'not-found',
        label: 'Not Found',
        path: '*',
    },
]

export const appRoutes: RouteObject[] = [
    // Home — standalone
    { index: true, element: <HomePage /> },

    // Design Studio / Moodboard
    {
        path: '/moodboard',
        element: <MoodboardPage />,
    },

    // Docs — lazy load avec son propre layout
    {
        path: '/docs/*',
        lazy: async () => {
            const { DocsPage } = await import('@/features/docs/DocsPage')
            return { Component: DocsPage }
        },
    },

    // 404
    { path: '*', element: <NotFoundPage /> },
]

export const primaryNavigationItems = appRouteDefinitions
    .filter((route) => route.includeInPrimaryNavigation)
    .map(({ label, path }) => ({
        label,
        to: path === '/docs/*' ? '/docs' : path,
    }))

export const homeSectionNavigationItems = [
    { label: 'Features', href: '#features' },
    { label: 'Why', href: '#why' },
    { label: 'Tokens', href: '#tokens' },
    { label: 'Proof', href: '#proof' },
    { label: 'Start', href: '#cta' },
    { label: 'Footer', href: '#footer' },
]
