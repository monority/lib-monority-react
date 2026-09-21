import { useMemo, useState, type ReactNode } from 'react'
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

    const groupedItems = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        const items = docsComponentRegistry.filter((item) =>
            normalizedQuery
                ? `${item.label} ${item.category}`.toLowerCase().includes(normalizedQuery)
                : true
        )

        return items.reduce<Record<string, typeof docsComponentRegistry>>((groups, item) => {
            groups[item.category] = [...(groups[item.category] ?? []), item]
            return groups
        }, {})
    }, [query])

    return (
        <div className="docs-layout">
            <aside className="docs-sidebar">
                <div className="docs-sidebar__header">
                    <span className="docs-kicker">Monority UI</span>
                    <h2>Docs</h2>
                </div>
                <input
                    className="docs-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search components"
                    aria-label="Search components"
                />
                <nav className="docs-nav" aria-label="Documentation">
                    <Link
                        to={introductionItem.path}
                        className={`docs-nav-link ${location.pathname === introductionItem.path ? 'active' : ''}`}
                    >
                        <span>{introductionItem.label}</span>
                        <span className="docs-status" data-status={introductionItem.status}>
                            {introductionItem.status}
                        </span>
                    </Link>

                    <Link
                        to={installationItem.path}
                        className={`docs-nav-link ${location.pathname === installationItem.path ? 'active' : ''}`}
                    >
                        <span>{installationItem.label}</span>
                        <span className="docs-status" data-status={installationItem.status}>
                            {installationItem.status}
                        </span>
                    </Link>

                    {Object.entries(groupedItems).map(([category, items]) => (
                        <section className="docs-nav-group" key={category}>
                            <h3>{category}</h3>
                            {items.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`docs-nav-link ${location.pathname === item.path ? 'active' : ''}`}
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
            </aside>
            <main className="docs-content">{children || <Outlet />}</main>
        </div>
    )
}
