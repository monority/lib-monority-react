import { Link } from 'react-router-dom'
import { AppHeader } from '@/shared/layouts/AppHeader'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { HomeHero } from './components/HomeHero'
import { HomeFeatures } from './components/HomeFeatures'
import { HomeLiveTokens } from './components/HomeLiveTokens'
import { HomeShowcaseGrid } from './components/HomeShowcaseGrid'
import './home.css'

export function HomePage() {
    usePageSeo({
        title: 'Home',
        description:
            'Monority UI — A React 19 component system built around calm tokens, accessible primitives, and CSS @layer architecture.',
    })

    return (
        <div className="home-page">
            <AppHeader />

            <main className="home-container" id="main-content">
                <HomeHero />
                <HomeLiveTokens />
                <HomeFeatures />
                <HomeShowcaseGrid />

                <footer className="home-footer" role="contentinfo">
                    <span>Monority UI — MIT License</span>
                    <div style={{ display: 'flex', gap: 'var(--mr-space-4)' }}>
                        <Link to="/docs">Docs</Link>
                        <Link to="/showcase">Showcase</Link>
                        <Link to="/playground">Playground</Link>
                        <Link to="/moodboard">Design Studio</Link>
                    </div>
                </footer>
            </main>
        </div>
    )
}
