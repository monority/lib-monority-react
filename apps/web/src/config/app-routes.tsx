import type { RouteObject } from 'react-router-dom'
import { HomePage } from '@/home/HomePage'
import { AppLayout } from '@/app/AppLayout'
import { DashboardPage } from '@/app/pages/DashboardPage'
import { AdminPage } from '@/app/pages/AdminPage'
import { PlaygroundPage } from '@/app/pages/PlaygroundPage'
import { ShowcasePage } from '@/app/pages/ShowcasePage'
import { NotFoundPage } from '@/app/pages/NotFoundPage'

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
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        includeInPrimaryNavigation: true,
    },
    {
        key: 'playground',
        label: 'Playground',
        path: '/playground',
        includeInPrimaryNavigation: true,
    },
    {
        key: 'admin',
        label: 'Admin',
        path: '/admin',
        includeInPrimaryNavigation: true,
    },
    {
        key: 'docs',
        label: 'Docs',
        path: '/docs/*',
        includeInPrimaryNavigation: true,
    },
    {
        key: 'showcase',
        label: 'Showcase',
        path: '/showcase',
        includeInPrimaryNavigation: true,
    },
    {
        key: 'not-found',
        label: 'Not Found',
        path: '*',
    },
]

export const appRoutes: RouteObject[] = [
    // Home — standalone (design unique, pas de AppShell)
    { index: true, element: <HomePage /> },

    // App pages — wrapper par AppShell/AppLayout
    {
        element: <AppLayout />,
        children: [
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'admin', element: <AdminPage /> },
            { path: 'playground', element: <PlaygroundPage /> },
            { path: 'showcase', element: <ShowcasePage /> },
        ],
    },

    // Docs — lazy load avec son propre layout
    {
        path: '/docs/*',
        lazy: async () => {
            const { DocsPage } = await import('@/docs/DocsPage')
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
    { label: 'Notes', href: '#proof-notes' },
    { label: 'Parcours', href: '#entry-points' },
    { label: 'Patterns', href: '#patterns' },
    { label: 'Examples', href: '#examples' },
    { label: 'Prod', href: '#production-readiness' },
    { label: 'Checklist', href: '#checklist' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Explore', href: '#explore' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Start', href: '#cta' },
    { label: 'Footer', href: '#footer' },
]
