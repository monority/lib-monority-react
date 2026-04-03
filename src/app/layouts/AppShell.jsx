import { Link, NavLink } from 'react-router-dom'
import { Button, Container } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { useErrorToast } from '@/hooks/useErrorToast'
import { useToast } from '@/hooks/useToast'

function getNavigationLinkClassName({ isActive }) {
    return isActive ? 'app-nav__link is-active' : 'app-nav__link'
}

export function AppShell({ isDark, theme, onToggleTheme, navigationItems = [], children }) {
    const { user, workspace, isAuthenticated, isLoading, signOut, errorMessage } = useAuth()
    const { pushToast } = useToast()
    const nextThemeLabel = theme === 'system' ? 'dark' : isDark ? 'light' : 'dark'
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
                        {navigationItems.map((item) =>
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
                    </nav>

                    <div className="cluster app-header__controls">
                        {isLoading ? (
                            <span className="app-session-chip">Session...</span>
                        ) : isAuthenticated ? (
                            <div className="cluster app-session">
                                <span className="app-session-chip">
                                    {workspace?.name} · {workspace?.plan}
                                </span>
                                <span className="app-session-chip">
                                    {user?.name} · {user?.role}
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
