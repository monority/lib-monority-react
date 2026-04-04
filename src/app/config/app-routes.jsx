const appRouteDefinitions = [
    {
        key: 'home',
        label: 'Accueil',
        path: '/',
        lazy: async () => {
            const module = await import('@/features/home/HomePage')

            return { Component: module.HomePage }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        lazy: async () => {
            const module = await import('@/features/dashboard/DashboardPage')

            return { Component: module.DashboardPage }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'admin',
        label: 'Admin',
        path: '/admin',
        lazy: async () => {
            const module = await import('@/features/admin/AdminPage')

            return { Component: module.AdminPage }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'playground',
        label: 'Playground',
        path: '/playground',
        lazy: async () => {
            const module = await import('@/features/playground/PlaygroundPage')

            return { Component: module.PlaygroundPage }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'showcase',
        label: 'Showcase',
        path: '/showcase',
        lazy: async () => {
            const module = await import('@/features/showcase/ShowcasePage')

            return { Component: module.ShowcasePage }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'docs',
        label: 'Docs',
        path: '/docs',
        lazy: async () => {
            const module = await import('@/features/docs/DocsPage')

            return { Component: module.DocsPage }
        },
        includeInPrimaryNavigation: true,
    },
    {
        key: 'not-found',
        path: '*',
        lazy: async () => {
            const module = await import('@/features/not-found/NotFoundPage')

            return { Component: module.NotFoundPage }
        },
    },
]

export const appRoutes = appRouteDefinitions.map(({ path, lazy }) => ({
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
    { label: 'Checklist', href: '#checklist' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Explore', href: '#explore' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Start', href: '#cta' },
    { label: 'Footer', href: '#footer' },
]
