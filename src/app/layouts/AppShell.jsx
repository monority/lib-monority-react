import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button, Container } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { useErrorToast } from '@/hooks/useErrorToast'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/cn'

function getNavigationLinkClassName({ isActive }) {
    return isActive ? 'app-nav__link is-active' : 'app-nav__link'
}

const navigationGroupDefinitions = [
    {
        label: 'Produit',
        itemLabels: ['Dashboard', 'Admin', 'Playground'],
    },
    {
        label: 'Ressources',
        itemLabels: ['Showcase', 'Docs'],
    },
]

function buildNavigationStructure(navigationItems) {
    const homeItem = navigationItems.find((item) => item.to === '/')
    const anchorItems = navigationItems.filter((item) => item.href?.startsWith('#'))
    const routeItems = navigationItems.filter((item) => item.to && item.to !== '/')
    const groupedLabelSet = new Set(navigationGroupDefinitions.flatMap((group) => group.itemLabels))

    const groupedItems = navigationGroupDefinitions
        .map((group) => ({
            label: group.label,
            items: routeItems.filter((item) => group.itemLabels.includes(item.label)),
        }))
        .filter((group) => group.items.length > 0)

    const directItems = [
        ...(homeItem ? [homeItem] : []),
        ...routeItems.filter((item) => !groupedLabelSet.has(item.label)),
    ]

    if (anchorItems.length > 0) {
        groupedItems.push({
            label: 'Sections',
            items: anchorItems,
        })
    }

    return { directItems, groupedItems }
}

function isGroupActive(groupItems, location) {
    return groupItems.some((item) => {
        if (item.to) {
            return location.pathname === item.to
        }

        return location.pathname === '/' && location.hash === item.href
    })
}

export function AppShell({ isDark, theme, onToggleTheme, navigationItems = [], children }) {
    const { user, workspace, isAuthenticated, isLoading, signOut, errorMessage } = useAuth()
    const { pushToast } = useToast()
    const location = useLocation()
    const nextThemeLabel = theme === 'system' ? 'dark' : isDark ? 'light' : 'dark'
    const { directItems, groupedItems } = buildNavigationStructure(navigationItems)

    useErrorToast({
        title: 'Session demo indisponible',
        errorMessage,
    })

    async function handleSignOut() {
        try {
            await signOut()
            pushToast({
                title: 'Session fermee',
                description: 'La deconnexion de demonstration a ete effectuee.',
                tone: 'success',
            })
        } catch (error) {
            pushToast({
                title: 'Deconnexion impossible',
                description: error?.message ?? 'Une erreur est survenue pendant la deconnexion.',
                tone: 'danger',
            })
        }
    }

    return (
        <div className="app-shell">
            <header className="app-header">
                <Container size="lg" className="cluster between app-header__inner">
                    <Link className="brand" to="/" aria-label="Model starter">
                        Model Starter
                    </Link>

                    <nav className="cluster app-nav" aria-label="Navigation principale">
                        <div className="cluster app-nav__direct">
                            {directItems.map((item) =>
                                item.to ? (
                                    <NavLink key={item.label} to={item.to} className={getNavigationLinkClassName}>
                                        {item.label}
                                    </NavLink>
                                ) : (
                                    <a key={item.label} className="app-nav__link" href={item.href}>
                                        {item.label}
                                    </a>
                                ),
                            )}
                        </div>

                        {groupedItems.map((group) => (
                            <details
                                key={group.label}
                                className={cn(
                                    'app-nav__dropdown',
                                    isGroupActive(group.items, location) && 'is-active',
                                )}
                            >
                                <summary className="app-nav__trigger">
                                    <span>{group.label}</span>
                                    <span className="app-nav__caret" aria-hidden="true">
                                        v
                                    </span>
                                </summary>

                                <div className="app-nav__menu">
                                    {group.items.map((item) =>
                                        item.to ? (
                                            <NavLink
                                                key={item.label}
                                                to={item.to}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? 'app-nav__menu-link is-active'
                                                        : 'app-nav__menu-link'
                                                }
                                            >
                                                {item.label}
                                            </NavLink>
                                        ) : (
                                            <a
                                                key={item.label}
                                                className={cn(
                                                    'app-nav__menu-link',
                                                    location.pathname === '/' &&
                                                        location.hash === item.href &&
                                                        'is-active',
                                                )}
                                                href={item.href}
                                                onClick={(event) => {
                                                    event.currentTarget
                                                        .closest('details')
                                                        ?.removeAttribute('open')
                                                }}
                                            >
                                                {item.label}
                                            </a>
                                        ),
                                    )}
                                </div>
                            </details>
                        ))}
                    </nav>

                    <div className="cluster app-header__controls">
                        {isLoading ? (
                            <span className="app-session-chip">Session...</span>
                        ) : isAuthenticated ? (
                            <div className="cluster app-session">
                                <span className="app-session-chip">
                                    {workspace?.name} / {workspace?.plan}
                                </span>
                                <span className="app-session-chip">
                                    {user?.name} / {user?.role}
                                </span>
                                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                                    Sign out
                                </Button>
                            </div>
                        ) : (
                            <span className="app-session-chip">
                                {errorMessage ? 'Mode demo indisponible' : 'Mode demo'}
                            </span>
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onToggleTheme}
                            aria-label={`Theme: ${theme === 'system' ? 'System' : isDark ? 'Dark' : 'Light'} - activer le theme ${nextThemeLabel}`}
                            aria-pressed={isDark}
                        >
                            Theme: {theme === 'system' ? 'System' : isDark ? 'Dark' : 'Light'}
                        </Button>
                    </div>
                </Container>
            </header>

            <main>{children}</main>
        </div>
    )
}
