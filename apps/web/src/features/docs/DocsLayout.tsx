import { localizePath, useLocale, useMessages } from '@/shared/i18n'
import { Badge } from '@monority/ui/badge'
import { Input } from '@monority/ui/input'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { docsComponentRegistry } from './components/registry'

interface DocsLayoutProps {
    children?: ReactNode
}

const introductionItem = { path: '/docs', status: 'stable' as const }
const installationItem = {
    path: '/docs/installation',
    status: 'stable' as const,
}

export function DocsLayout({ children }: DocsLayoutProps) {
    const location = useLocation()
    const messages = useMessages().docs
    const [query, setQuery] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const menuButtonRef = useRef<HTMLButtonElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    // Close the mobile navigation and reset the sidebar filter on route change.
    useEffect(() => {
        setMenuOpen(false)
        setQuery('')
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
                <DocsSidebarBody
                    query={query}
                    onQueryChange={setQuery}
                    pathname={location.pathname}
                />
            </aside>
            <div className="docs-mobile-bar">
                <button
                    ref={menuButtonRef}
                    type="button"
                    className="docs-mobile-bar__toggle"
                    aria-expanded={menuOpen}
                    aria-controls="docs-mobile-nav"
                    aria-label={menuOpen ? messages.sidebar.closeMenu : messages.sidebar.openMenu}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span className="docs-mobile-bar__icon" aria-hidden="true" />
                </button>
                <span className="docs-mobile-bar__label">{messages.sidebar.title}</span>
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
                        aria-label={messages.sidebar.mobileNavigation}
                    >
                        <div className="docs-mobile-nav__header">
                            <span className="docs-kicker">{messages.sidebar.kicker}</span>
                            <button
                                ref={closeButtonRef}
                                type="button"
                                className="docs-mobile-nav__close"
                                aria-label={messages.sidebar.closeMenu}
                                onClick={() => {
                                    setMenuOpen(false)
                                    menuButtonRef.current?.focus()
                                }}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="docs-mobile-nav__body">
                            <DocsSidebarBody
                                query={query}
                                onQueryChange={setQuery}
                                pathname={location.pathname}
                                onLinkClick={() => setMenuOpen(false)}
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
    onLinkClick?: () => void
}

function DocsSidebarBody({ query, onQueryChange, pathname, onLinkClick }: DocsSidebarBodyProps) {
    const { locale } = useLocale()
    const docsMessages = useMessages().docs
    const messages = docsMessages.sidebar
    const normalizedQuery = query.trim().toLowerCase().replaceAll('-', '')
    const items = docsComponentRegistry.filter((item) =>
        normalizedQuery
            ? `${item.label} ${item.category} ${item.slug} ${item.path}`
                  .toLowerCase()
                  .replaceAll('-', '')
                  .includes(normalizedQuery)
            : true
    )

    const groupedItems = items.reduce<Record<string, typeof docsComponentRegistry>>(
        (groups, item) => {
            groups[item.category] = [...(groups[item.category] ?? []), item]
            return groups
        },
        {}
    )

    const isActive = (path: string) => pathname === localizePath(path, locale)

    return (
        <>
            <div className="docs-sidebar__header">
                <span className="docs-kicker">{messages.kicker}</span>
                <h2>{messages.title}</h2>
            </div>
            <Input
                className="docs-search"
                type="search"
                size="sm"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') onQueryChange('')
                }}
                placeholder={messages.searchPlaceholder}
                aria-label={messages.searchLabel}
            />
            {normalizedQuery && items.length === 0 ? (
                <p className="docs-nav-empty" role="status">
                    {messages.empty(query.trim())}{' '}
                    <button
                        type="button"
                        className="docs-text-link"
                        onClick={() => onQueryChange('')}
                    >
                        {messages.clearSearch}
                    </button>
                </p>
            ) : null}
            <nav className="docs-nav" aria-label={messages.navigation} onClick={onLinkClick}>
                <Link
                    to={localizePath(introductionItem.path, locale)}
                    className={`docs-nav-link ${isActive(introductionItem.path) ? 'active' : ''}`}
                >
                    <span className="docs-nav-label">{docsMessages.guides.introduction}</span>
                    {introductionItem.status !== 'stable' ? (
                        <Badge
                            size="sm"
                            variant="default"
                            data-status={introductionItem.status}
                            className="docs-nav-badge"
                        >
                            {introductionItem.status}
                        </Badge>
                    ) : null}
                </Link>

                <Link
                    to={localizePath(installationItem.path, locale)}
                    className={`docs-nav-link ${isActive(installationItem.path) ? 'active' : ''}`}
                >
                    <span className="docs-nav-label">{docsMessages.guides.installation}</span>
                    {installationItem.status !== 'stable' ? (
                        <Badge
                            size="sm"
                            variant="default"
                            data-status={installationItem.status}
                            className="docs-nav-badge"
                        >
                            {installationItem.status}
                        </Badge>
                    ) : null}
                </Link>

                {Object.entries(groupedItems).map(([category, categoryItems]) => (
                    <section className="docs-nav-group" key={category}>
                        <h3>{category}</h3>
                        {categoryItems.map((item) => (
                            <Link
                                key={item.path}
                                to={localizePath(item.path, locale)}
                                className={`docs-nav-link ${isActive(item.path) ? 'active' : ''}`}
                            >
                                <span className="docs-nav-label">{item.label}</span>
                                {item.status !== 'stable' ? (
                                    <Badge
                                        size="sm"
                                        variant="default"
                                        data-status={item.status}
                                        className="docs-nav-badge"
                                    >
                                        {item.status}
                                    </Badge>
                                ) : null}
                            </Link>
                        ))}
                    </section>
                ))}
            </nav>
        </>
    )
}
