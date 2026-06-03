import { Link } from 'react-router-dom'

export function HomePage() {
    return (
        <div className="home-page">
            <header className="home-header">
                <Link className="home-brand" to="/" aria-label="Monority">
                    Monority
                </Link>
                <nav className="home-nav" aria-label="Navigation principale">
                    <Link to="/docs">Docs</Link>
                    <Link to="/showcase">Showcase</Link>
                    <Link to="/playground">Playground</Link>
                </nav>
            </header>

            <main className="home-main">
                <div className="home-hero">
                    <p className="home-kicker">React UI library</p>
                    <h1 className="home-title">Monority</h1>
                    <p className="home-subtitle">
                        A component system for precise product interfaces, built around calm
                        tokens, accessible primitives, and documentation that shows the material
                        clearly.
                    </p>
                    <div className="home-actions">
                        <Link className="home-link home-link--primary" to="/docs">
                            Open docs
                        </Link>
                        <Link className="home-link" to="/showcase">
                            View components
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
