import { Link, NavLink } from 'react-router-dom'
import { Button, Container } from '@/components/ui'

function getNavigationLinkClassName({ isActive }) {
    return isActive ? 'app-nav__link is-active' : 'app-nav__link'
}

export function AppShell({ isDark, onToggleTheme, navigationItems = [], children }) {
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

                    <Button variant="ghost" size="sm" onClick={onToggleTheme} aria-pressed={isDark}>
                        {isDark ? 'Light' : 'Dark'}
                    </Button>
                </Container>
            </header>

            <main>{children}</main>
        </div>
    )
}
