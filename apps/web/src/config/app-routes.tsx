import type { ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'

function createHomePage() {
    return function HomePage() {
        return (
            <section style={{ padding: '2rem' }}>
                <h1>Accueil</h1>
                <p>Page d&apos;accueil du starter.</p>
            </section>
        )
    }
}

function createDashboardPage() {
    return function DashboardPage() {
        return (
            <section style={{ padding: '2rem' }}>
                <h1>Dashboard</h1>
                <p>Vue d&apos;ensemble du tableau de bord.</p>
            </section>
        )
    }
}

function createPlaygroundPage() {
    return function PlaygroundPage() {
        return (
            <section style={{ padding: '2rem' }}>
                <h1>Playground</h1>
                <p>Zone d&apos;experimentation des composants.</p>
            </section>
        )
    }
}

function createAdminPage() {
    return function AdminPage() {
        return (
            <section style={{ padding: '2rem' }}>
                <h1>Admin</h1>
                <p>Panneau d&apos;administration.</p>
            </section>
        )
    }
}

function createShowcasePage() {
    return function ShowcasePage() {
        return (
            <section style={{ padding: '2rem' }}>
                <h1>Showcase</h1>
                <p>Vitrine des composants disponibles.</p>
            </section>
        )
    }
}

function createNotFoundPage() {
    return function NotFoundPage() {
        return (
            <section style={{ padding: '2rem' }}>
                <h1>404</h1>
                <p>Page non trouvee.</p>
            </section>
        )
    }
}

const HomePage = createHomePage()
const DashboardPage = createDashboardPage()
const PlaygroundPage = createPlaygroundPage()
const AdminPage = createAdminPage()
const ShowcasePage = createShowcasePage()
const NotFoundPage = createNotFoundPage()

interface AppRouteDefinition {
    key: string
    label: string
    path: string
    lazy: () => Promise<{ Component: React.ComponentType }>
    includeInPrimaryNavigation?: boolean
}

const appRouteDefinitions: AppRouteDefinition[] = [
    {
        key: 'home',
        label: 'Accueil',
        path: '/',
        lazy: async () => {
            return { Component: HomePage }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        lazy: async () => {
            return { Component: DashboardPage }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'playground',
        label: 'Playground',
        path: '/playground',
        lazy: async () => {
            return { Component: PlaygroundPage }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'admin',
        label: 'Admin',
        path: '/admin',
        lazy: async () => {
            return { Component: AdminPage }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'docs',
        label: 'Docs',
        path: '/docs/*',
        lazy: async () => {
            const { DocsPage } = await import('@/docs/DocsPage')
            return { Component: DocsPage }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'showcase',
        label: 'Showcase',
        path: '/showcase',
        lazy: async () => {
            return { Component: ShowcasePage }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'not-found',
        label: 'Not Found',
        path: '*',
        lazy: async () => {
            return { Component: NotFoundPage }
        },
    },
]

export const appRoutes: RouteObject[] = appRouteDefinitions.map(({ path, lazy }) => ({
    path,
    lazy,
}))

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
