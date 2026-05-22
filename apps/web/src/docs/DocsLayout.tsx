import { Outlet, useLocation } from 'react-router-dom'

const docsNav = [
    { label: 'Introduction', path: '/docs' },
    { label: 'Button', path: '/docs/button' },
    { label: 'Input', path: '/docs/input' },
    { label: 'Card', path: '/docs/card' },
    { label: 'Modal', path: '/docs/modal' },
    { label: 'Toast', path: '/docs/toast' },
    { label: 'Badge', path: '/docs/badge' },
    { label: 'Avatar', path: '/docs/avatar' },
    { label: 'Table', path: '/docs/table' },
    { label: 'Select', path: '/docs/select' },
    { label: 'Checkbox', path: '/docs/checkbox' },
    { label: 'Tabs', path: '/docs/tabs' },
    { label: 'Spinner', path: '/docs/spinner' },
]

interface DocsLayoutProps {
    children?: React.ReactNode
}

export function DocsLayout({ children }: DocsLayoutProps) {
    const location = useLocation()

    return (
        <div className="docs-layout">
            <aside className="docs-sidebar">
                <nav className="docs-nav">
                    {docsNav.map((item) => (
                        <a
                            key={item.path}
                            href={item.path}
                            className={`docs-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </aside>
            <main className="docs-content">
                {children || <Outlet />}
            </main>
        </div>
    )
}
