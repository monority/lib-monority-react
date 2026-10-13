import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import './AppHeader.css'

const headerLinks = [
    { label: 'Docs', to: '/docs' },
    { label: 'Moodboard', to: '/moodboard' },
]

interface AppHeaderProps {
    homeNav?: boolean
}

export function AppHeader({ homeNav = false }: AppHeaderProps) {
    return (
        <header className={homeNav ? 'app-header app-header--home' : 'app-header'}>
            <div className="app-header__inner">
                <div className="app-header__start">
                    <Link className="app-header__brand" to="/" aria-label="Monority">
                        <span className="app-header__logo-text">Monority</span>
                        <span className="app-header__logo-badge">UI</span>
                    </Link>
                    <nav className="app-header__nav" aria-label="Navigation principale">
                        {headerLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'app-header__link app-header__link--active'
                                        : 'app-header__link'
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
                <div className="app-header__controls">
                    <ThemeToggle className="app-header__theme" />
                </div>
            </div>
        </header>
    )
}
