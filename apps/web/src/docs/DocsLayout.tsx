import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { docsComponentRegistry } from './components/registry'

interface DocsLayoutProps {
    children?: ReactNode
}

const introductionItem = { label: 'Introduction', path: '/docs', status: 'stable' as const }
const installationItem = {
    label: 'Installation',
    path: '/docs/installation',
    status: 'stable' as const,
}

export function DocsLayout({ children }: DocsLayoutProps) {
    const location = useLocation()
    const [query, setQuery] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const menuButtonRef = useRef<HTMLButtonElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    // Close the mobile navigation on route change and restore the trigger focus.
    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    // Lock background scroll while the mobile navigation is open.
    useEffect(() => {
        if (!menuOpen) return
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        closeButtonRef.current?.focus()
        return () => {
            document.body.style.overflow = previous
        }
    }, [menuOpen])

    useEffect(() => {
        if (!menuOpen) return
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setMenuOpen(false)
                menuButtonRef.current?.focus()
            }
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [menuOpen])

    return (
        <div className="docs-layout">
            <aside className="docs-sidebar docs-sidebar--desktop">
                <DocsSidebarBody query={query} onQueryChange={setQuery} pathname={location.pathname} />
            </aside>
            <div className="docs-mobile-bar">
                <button
                    ref={menuButtonRef}
                    type="button"
                    className="docs-mobile-bar__toggle"
                    aria-expanded={menuOpen}
                    aria-controls="docs-mobile-nav"
                    aria-label={menuOpen ? 'Close documentation menu' : 'Open documentation menu'}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span className="docs-mobile-bar__icon" aria-hidden="true" />
                </button>
                <span className="docs-mobile-bar__label">Docs</span>
            </div>
            {menuOpen ? (
                <div className="docs-mobile-nav" id="docs-mobile-nav">
                    <div
                        className="docs-mobile-nav__backdrop"
                        aria-hidden="true"
                        onClick={() => setMenuOpen(false)}
                    />
                    <div
                        className="docs-mobile-nav__panel"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Documentation navigation"
                    >
                        <div className="docs-mobile-nav__header">
                            <span className="docs-kicker">Monority UI</span>
                            <button
                                ref={closeButtonRef}
                                type="button"
                                className="docs-mobile-nav__close"
                                aria-label="Close documentation menu"
                                onClick={() => {
                                    setMenuOpen(false)
                                    menuButtonRef.current?.focus()
                                }}
                            >
                                <span aria-hidden="true">{'×'}</span>
                            </button>
                        </div>
                        <div className="docs-mobile-nav__body">
                            <DocsSidebarBody
                                query={query}
                                onQueryChange={setQuery}
                                pathname={location.pathname}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
            <main className="docs-content">{children || <Outlet />}</main>
        </div>
    )
}

interface DocsSidebarBodyProps {
    query: string
    onQueryChange: (value: string) => void
    pathname: string
}

function DocsSidebarBody({ query, onQueryChange, pathname }: DocsSidebarBodyProps) {
    const normalizedQuery = query.trim().toLowerCase()
    const items = docsComponentRegistry.filter((item) =>
        normalizedQuery
            ? `${item.label} ${item.category}`.toLowerCase().includes(normalizedQuery)
            : true
    )

    const groupedItems = items.reduce<Record<string, typeof docsComponentRegistry>>(
        (groups, item) => {
            groups[item.category] = [...(groups[item.category] ?? []), item]
            return groups
        },
        {}
    )

    return (
        <>
            <div className="docs-sidebar__header">
                <span className="docs-kicker">Monority UI</span>
                <h2>Docs</h2>
            </div>
            <input
                className="docs-search"
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search components"
                aria-label="Search components"
            />
            <nav className="docs-nav" aria-label="Documentation">
                <Link
                    to={introductionItem.path}
                    className={`docs-nav-link ${pathname === introductionItem.path ? 'active' : ''}`}
                >
                    <span>{introductionItem.label}</span>
                    <span className="docs-status" data-status={introductionItem.status}>
                        {introductionItem.status}
                    </span>
                </Link>

                <Link
                    to={installationItem.path}
                    className={`docs-nav-link ${pathname === installationItem.path ? 'active' : ''}`}
                >
                    <span>{installationItem.label}</span>
                    <span className="docs-status" data-status={installationItem.status}>
                        {installationItem.status}
                    </span>
                </Link>

                {Object.entries(groupedItems).map(([category, categoryItems]) => (
                    <section className="docs-nav-group" key={category}>
                        <h3>{category}</h3>
                        {categoryItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`docs-nav-link ${pathname === item.path ? 'active' : ''}`}
                            >
                                <span>{item.label}</span>
                                <span className="docs-status" data-status={item.status}>
                                    {item.status}
                                </span>
                            </Link>
                        ))}
                    </section>
                ))}
            </nav>
        </>
    )
}
