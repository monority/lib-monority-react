import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button, Container, Drawer } from '@/components/ui'
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
    const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false)
    const [openGroup, setOpenGroup] = useState(null)
    const navRef = useRef(null)
    const nextThemeLabel = theme === 'system' ? 'dark' : isDark ? 'light' : 'dark'
    const { directItems, groupedItems } = buildNavigationStructure(navigationItems)
    const closeMobileNavigation = () => setIsMobileNavigationOpen(false)

    useErrorToast({
        title: 'Session demo indisponible',
        errorMessage,
    })

    useEffect(() => {
        function handlePointerDown(event) {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setOpenGroup(null)
            }
        }
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setOpenGroup(null)
            }
        }
        document.addEventListener('pointerdown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useEffect(() => {
        setOpenGroup(null)
    }, [location.pathname, location.hash])

    useEffect(() => {
        setIsMobileNavigationOpen(false)
    }, [location.pathname, location.hash])

    function toggleGroup(label) {
        setOpenGroup((prev) => (prev === label ? null : label))
    }

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
            <a className="app-skip-link" href="#main-content">
                Aller au contenu principal
            </a>

            <header className="app-header">
                <Container size="lg" className="cluster between app-header__inner">
                    <Link className="brand" to="/" aria-label="Model starter">
                        Model Starter
                    </Link>

                    <nav ref={navRef} className="cluster app-nav" aria-label="Navigation principale">
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
                            <div
                                key={group.label}
                                className={cn(
                                    'app-nav__dropdown',
                                    openGroup === group.label && 'is-open',
                                    isGroupActive(group.items, location) && 'is-active',
                                )}
                            >
                                <button
                                    className="app-nav__trigger"
                                    onClick={() => toggleGroup(group.label)}
                                    aria-expanded={openGroup === group.label}
                                    aria-haspopup="true"
                                >
                                    <span>{group.label}</span>
                                    <span className="app-nav__count">{group.items.length}</span>
                                    <svg
                                        className="app-nav__caret"
                                        aria-hidden="true"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <path
                                            d="M2.5 4.5L6 8L9.5 4.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                {openGroup === group.label && (
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
                                                    onClick={() => setOpenGroup(null)}
                                                >
                                                    {item.label}
                                                </a>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="app-nav-toggle"
                        onClick={() => setIsMobileNavigationOpen((prev) => !prev)}
                        aria-label={isMobileNavigationOpen ? 'Fermer le menu principal' : 'Ouvrir le menu principal'}
                        aria-expanded={isMobileNavigationOpen}
                    >
                        Menu
                    </Button>

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
                                    Se deconnecter
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
                            aria-label={`Theme: ${theme === 'system' ? 'Systeme' : isDark ? 'Sombre' : 'Clair'} - activer le theme ${nextThemeLabel === 'dark' ? 'sombre' : 'clair'}`}
                            aria-pressed={isDark}
                        >
                            Theme: {theme === 'system' ? 'Systeme' : isDark ? 'Sombre' : 'Clair'}
                        </Button>
                    </div>
                </Container>
            </header>

            <Drawer
                open={isMobileNavigationOpen}
                title="Navigation"
                onClose={closeMobileNavigation}
            >
                <div className="stack-m">
                    <div className="stack-xs">
                        <span className="app-mobile-nav__eyebrow">Navigation</span>
                        {directItems.map((item) =>
                            item.to ? (
                                <NavLink
                                    key={item.label}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'app-mobile-nav__link is-active'
                                            : 'app-mobile-nav__link'
                                    }
                                    onClick={closeMobileNavigation}
                                >
                                    {item.label}
                                </NavLink>
                            ) : (
                                <a
                                    key={item.label}
                                    className="app-mobile-nav__link"
                                    href={item.href}
                                    onClick={closeMobileNavigation}
                                >
                                    {item.label}
                                </a>
                            ),
                        )}
                    </div>

                    {groupedItems.map((group) => (
                        <div key={group.label} className="stack-xs app-mobile-nav__group">
                            <div className="cluster between app-mobile-nav__group-header">
                                <span className="app-mobile-nav__eyebrow">{group.label}</span>
                                <span className="app-mobile-nav__count">{group.items.length}</span>
                            </div>
                            <div className="stack-xs">
                                {group.items.map((item) =>
                                    item.to ? (
                                        <NavLink
                                            key={item.label}
                                            to={item.to}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'app-mobile-nav__link is-active'
                                                    : 'app-mobile-nav__link'
                                            }
                                            onClick={() => setIsMobileNavigationOpen(false)}
                                        >
                                            {item.label}
                                        </NavLink>
                                    ) : (
                                        <a
                                            key={item.label}
                                            className={cn(
                                                'app-mobile-nav__link',
                                                location.pathname === '/' &&
                                                    location.hash === item.href &&
                                                    'is-active',
                                            )}
                                            href={item.href}
                                            onClick={() => setIsMobileNavigationOpen(false)}
                                        >
                                            {item.label}
                                        </a>
                                    ),
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="stack-xs app-mobile-nav__group app-mobile-nav__actions">
                        <span className="app-mobile-nav__eyebrow">Compte</span>

                        {isLoading ? (
                            <span className="app-session-chip">Session...</span>
                        ) : isAuthenticated ? (
                            <div className="stack-xs">
                                <span className="app-session-chip">
                                    {workspace?.name} / {workspace?.plan}
                                </span>
                                <span className="app-session-chip">
                                    {user?.name} / {user?.role}
                                </span>
                                <Button variant="ghost" size="sm" onClick={handleSignOut} className="app-mobile-nav__button">
                                    Se deconnecter
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
                            aria-label={`Theme: ${theme === 'system' ? 'Systeme' : isDark ? 'Sombre' : 'Clair'} - activer le theme ${nextThemeLabel === 'dark' ? 'sombre' : 'clair'}`}
                            aria-pressed={isDark}
                            className="app-mobile-nav__button"
                        >
                            Theme: {theme === 'system' ? 'Systeme' : isDark ? 'Sombre' : 'Clair'}
                        </Button>
                    </div>
                </div>
            </Drawer>

            <main id="main-content" tabIndex={-1}>
                {children}
            </main>
        </div>
    )
}
