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
    { label: 'Tokens', href: '#tokens' },
    { label: 'Start', href: '#cta' },
]
