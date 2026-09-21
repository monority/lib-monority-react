import { Link } from 'react-router-dom'
import { AppHeader } from '@/layouts/AppHeader'

export function HomePage() {
    return (
        <div className="home-page">
            <AppHeader homeNav />

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
