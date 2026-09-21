import { Link } from 'react-router-dom'
import './AppHeader.css'

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
                    <Link to="/docs">Docs</Link>
                    <Link to="/showcase">Showcase</Link>
                    <Link to="/playground">Playground</Link>
                </nav>
            </div>
        </header>
    )
}
