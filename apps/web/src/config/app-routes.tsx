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

function createDocsPage() {
    return function DocsPage() {
        return (
            <section style={{ padding: '2rem' }}>
                <h1>Documentation</h1>
                <p>Documentation des composants.</p>
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
const DocsPage = createDocsPage()
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
        path: '/docs',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { Introduction } = await import('@/docs/Introduction')
            return { Component: () => <DocsLayout><Introduction /></DocsLayout> }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'docs-button',
        label: 'Button Docs',
        path: '/docs/button',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { ButtonDocs } = await import('@/docs/components/ButtonDocs')
            return { Component: () => <DocsLayout><ButtonDocs /></DocsLayout> }
        },
    },
    {
        key: 'docs-input',
        label: 'Input Docs',
        path: '/docs/input',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { InputDocs } = await import('@/docs/components/InputDocs')
            return { Component: () => <DocsLayout><InputDocs /></DocsLayout> }
        },
    },
    {
        key: 'docs-card',
        label: 'Card Docs',
        path: '/docs/card',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { CardDocs } = await import('@/docs/components/CardDocs')
            return { Component: () => <DocsLayout><CardDocs /></DocsLayout> }
        },
    },
    {
        key: 'docs-modal',
        label: 'Modal Docs',
        path: '/docs/modal',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { ModalDocs } = await import('@/docs/components/ModalDocs')
            return { Component: () => <DocsLayout><ModalDocs /></DocsLayout> }
        },
    },
    {
        key: 'docs-toast',
        label: 'Toast Docs',
        path: '/docs/toast',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { ToastDocs } = await import('@/docs/components/ToastDocs')
            return { Component: () => <DocsLayout><ToastDocs /></DocsLayout> }
        },
    },
    {
        key: 'docs-badge',
        label: 'Badge Docs',
        path: '/docs/badge',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { BadgeDocs } = await import('@/docs/components/BadgeDocs')
            return { Component: () => <DocsLayout><BadgeDocs /></DocsLayout> }
        },
    },
    {
        key: 'docs-avatar',
        label: 'Avatar Docs',
        path: '/docs/avatar',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { AvatarDocs } = await import('@/docs/components/AvatarDocs')
            return { Component: () => <DocsLayout><AvatarDocs /></DocsLayout> }
        },
    },
    {
        key: 'docs-table',
        label: 'Table Docs',
        path: '/docs/table',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { TableDocs } = await import('@/docs/components/TableDocs')
            return { Component: () => <DocsLayout><TableDocs /></DocsLayout> }
        },
    },
    {
        key: 'docs-select',
        label: 'Select Docs',
        path: '/docs/select',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { SelectDocs } = await import('@/docs/components/SelectDocs')
            return { Component: () => <DocsLayout><SelectDocs /></DocsLayout> }
        },
    },
    {
        key: 'docs-checkbox',
        label: 'Checkbox Docs',
        path: '/docs/checkbox',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { CheckboxDocs } = await import('@/docs/components/CheckboxDocs')
            return { Component: () => <DocsLayout><CheckboxDocs /></DocsLayout> }
        },
    },
    {
        key: 'docs-tabs',
        label: 'Tabs Docs',
        path: '/docs/tabs',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { TabsDocs } = await import('@/docs/components/TabsDocs')
            return { Component: () => <DocsLayout><TabsDocs /></DocsLayout> }
        },
    },
    {
        key: 'docs-spinner',
        label: 'Spinner Docs',
        path: '/docs/spinner',
        lazy: async () => {
            const { DocsLayout } = await import('@/docs/DocsLayout')
            const { SpinnerDocs } = await import('@/docs/components/SpinnerDocs')
            return { Component: () => <DocsLayout><SpinnerDocs /></DocsLayout> }
        },
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
        to: path,
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
