import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import './AppHeader.css'

const headerLinks = [
    { label: 'Docs', to: '/docs' },
    { label: 'Showcase', to: '/showcase' },
    { label: 'Playground', to: '/playground' },
    { label: 'Moodboard', to: '/moodboard' },
]

interface AppHeaderProps {
    homeNav?: boolean
}

export function AppHeader({ homeNav = false }: AppHeaderProps) {
    return (
        <header className={homeNav ? 'app-header app-header--home' : 'app-header'}>
            <div className="app-header__inner">
                <Link className="app-header__brand" to="/" aria-label="Monority">
                    Monority
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
                <div className="app-header__controls">
                    <ThemeToggle className="app-header__theme" />
                </div>
            </div>
        </header>
    )
}

