import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
    Badge,
    Banner,
    CommandPalette,
    Popover,
    Separator,
    Stack,
    Text,
    ThemeName,
    type CommandItem,
    useTheme,
} from '@monority/ui'

import { docsComponentRegistry } from '@/features/docs/components/registry'
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
    const navigate = useNavigate()
    const { setTheme } = useTheme()
    const [searchOpen, setSearchOpen] = useState(false)
    const [changelogOpen, setChangelogOpen] = useState(false)
    const [showBanner, setShowBanner] = useState(true)

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setSearchOpen((prev) => !prev)
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    const commandItems = useMemo<CommandItem[]>(() => {
        const pages: CommandItem[] = [
            {
                value: 'page-intro',
                label: 'Introduction',
                description: 'Principes fondateurs, architecture CSS et installation',
                group: 'Guides & Vues',
                onSelect: () => {
                    navigate('/docs')
                    setSearchOpen(false)
                },
            },
            {
                value: 'page-install',
                label: 'Installation',
                description: 'Configuration du package npm et des couches CSS',
                group: 'Guides & Vues',
                onSelect: () => {
                    navigate('/docs/installation')
                    setSearchOpen(false)
                },
            },
            {
                value: 'page-moodboard',
                label: 'Moodboard (Studio)',
                description: 'Tableau de bord interactif et bac à sable de personnalisation',
                group: 'Guides & Vues',
                onSelect: () => {
                    navigate('/moodboard')
                    setSearchOpen(false)
                },
            },
            {
                value: 'page-home',
                label: 'Accueil Monority UI',
                description: "Page d'accueil et manifeste de la bibliothèque",
                group: 'Guides & Vues',
                onSelect: () => {
                    navigate('/')
                    setSearchOpen(false)
                },
            },
        ]

        const components: CommandItem[] = docsComponentRegistry.map((comp) => ({
            value: `comp-${comp.slug}`,
            label: comp.label,
            description: `Composant ${comp.category}`,
            group: `Composants (${comp.category})`,
            keywords: `${comp.slug} ${comp.category}`,
            onSelect: () => {
                navigate(comp.path)
                setSearchOpen(false)
            },
        }))

        const themeActions: CommandItem[] = [
            {
                value: 'theme-light',
                label: 'Thème Clair (Light)',
                description: 'Bascule vers le thème clair pur',
                group: 'Thèmes & Atmosphères',
                onSelect: () => {
                    setTheme(ThemeName.LIGHT)
                    setSearchOpen(false)
                },
            },
            {
                value: 'theme-dark',
                label: 'Thème Sombre (Dark)',
                description: 'Bascule vers le thème sombre neutre',
                group: 'Thèmes & Atmosphères',
                onSelect: () => {
                    setTheme(ThemeName.DARK)
                    setSearchOpen(false)
                },
            },
            {
                value: 'theme-slate',
                label: 'Thème Ardoise (Slate)',
                description: 'Bascule vers le thème bleuté technique',
                group: 'Thèmes & Atmosphères',
                onSelect: () => {
                    setTheme(ThemeName.SLATE)
                    setSearchOpen(false)
                },
            },
            {
                value: 'theme-oled',
                label: 'Thème OLED (Noir absolu)',
                description: 'Bascule vers le contraste infini 0 nit',
                group: 'Thèmes & Atmosphères',
                onSelect: () => {
                    setTheme(ThemeName.OLED)
                    setSearchOpen(false)
                },
            },
            {
                value: 'theme-ocean',
                label: 'Thème Océan (Deep blue)',
                description: 'Bascule vers le thème aquatique',
                group: 'Thèmes & Atmosphères',
                onSelect: () => {
                    setTheme(ThemeName.OCEAN)
                    setSearchOpen(false)
                },
            },
            {
                value: 'theme-night',
                label: 'Thème Nuit (Warm violet)',
                description: 'Bascule vers le thème nocturne chaleureux',
                group: 'Thèmes & Atmosphères',
                onSelect: () => {
                    setTheme(ThemeName.NIGHT)
                    setSearchOpen(false)
                },
            },
        ]

        return [...pages, ...components, ...themeActions]
    }, [navigate, setTheme])

    return (
        <>
            {showBanner && (
                <div className="app-header__announcement">
                    <Banner
                        tone="accent"
                        dismissible
                        onDismiss={() => setShowBanner(false)}
                        className="app-header__announcement-banner"
                    >
                        <Banner.Eyebrow>Vague 7</Banner.Eyebrow>
                        <Banner.Description>
                            Système de mouvement, focus rings calibrés, documentation interactive
                            sur 72 composants et conformité WCAG 2.1 AA.
                        </Banner.Description>
                        <Banner.Actions>
                            <button
                                type="button"
                                className="app-header__announcement-details-btn"
                                onClick={() => setChangelogOpen(true)}
                            >
                                Voir le journal
                            </button>
                        </Banner.Actions>
                    </Banner>
                </div>
            )}

            <header
                className={homeNav ? 'app-header app-header--home' : 'app-header'}
                role="banner"
            >
                <div className="app-header__inner">
                    <div className="app-header__start">
                        <Link className="app-header__brand" to="/" aria-label="Monority">
                            <span className="app-header__logo-mark" aria-hidden="true">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12 2L2 7L12 12L22 7L12 2Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M2 17L12 22L22 17"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M2 12L12 17L22 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <span className="app-header__logo-text">Monority</span>
                            <span className="app-header__logo-badge">v0.1</span>
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

                    <div className="app-header__center">
                        <button
                            type="button"
                            className="app-header__search-trigger"
                            onClick={() => setSearchOpen(true)}
                            aria-label="Rechercher des composants ou actions (Ctrl+K)"
                        >
                            <svg
                                className="app-header__search-icon"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <span className="app-header__search-placeholder">
                                Rechercher des composants…
                            </span>
                            <kbd className="app-header__search-shortcut">
                                <span className="app-header__search-modifier">⌘</span>K
                            </kbd>
                        </button>
                    </div>

                    <div className="app-header__controls">
                        <Popover
                            open={changelogOpen}
                            onOpenChange={setChangelogOpen}
                            align="end"
                            side="bottom"
                        >
                            <Popover.Trigger
                                className="app-header__changes-btn"
                                aria-label="Journal des derniers changements"
                            >
                                <span className="app-header__changes-dot" aria-hidden="true" />
                                <span className="app-header__changes-title">Log</span>
                                <span className="app-header__changes-tag">V7</span>
                            </Popover.Trigger>
                            <Popover.Content className="app-header__changes-popover">
                                <Stack gap="sm">
                                    <Stack direction="horizontal" justify="between" align="center">
                                        <Text.Strong size="sm">
                                            Journal des modifications
                                        </Text.Strong>
                                        <Badge tone="accent" size="sm">
                                            Vague 7
                                        </Badge>
                                    </Stack>
                                    <Separator />
                                    <Stack
                                        gap="xs"
                                        style={{ maxHeight: '280px', overflowY: 'auto' }}
                                    >
                                        <Text.Small tone="strong">
                                            Vague 7 — Mouvement, Focus & Documentation :
                                        </Text.Small>
                                        <Text.Small tone="muted">
                                            • Playgrounds interactifs dynamiques sur 72 composants
                                        </Text.Small>
                                        <Text.Small tone="muted">
                                            • Système de mouvement tokenisé et anneaux de focus
                                            calibrés
                                        </Text.Small>
                                        <Text.Small tone="muted">
                                            • Certification accessibilité WCAG 2.1 AA (0 violation
                                            Axe)
                                        </Text.Small>
                                        <Separator />
                                        <Text.Small tone="strong">
                                            Vague 6 — Composants avancés & Qualité :
                                        </Text.Small>
                                        <Text.Small tone="muted">
                                            • CommandPalette, FileUpload, SidebarLayout, Combobox
                                            compound
                                        </Text.Small>
                                        <Text.Small tone="muted">
                                            • Composition déclarative et rétro-compatibilité totale
                                        </Text.Small>
                                        <Text.Small tone="muted">
                                            • Purge intégrale des emojis Unicode dans tout le dépôt
                                        </Text.Small>
                                        <Text.Small tone="muted">
                                            • AppHeader : intégration Banner compound
                                        </Text.Small>
                                        <Separator />
                                        <Text.Small tone="strong">
                                            Vague 5 — Fenêtres modales & Tiroirs :
                                        </Text.Small>
                                        <Text.Small tone="muted">
                                            • Modal, Dialog, Sheet, Drawer : architecture compound
                                        </Text.Small>
                                        <Separator />
                                        <Text.Small tone="strong">
                                            Vague 4 — Données & Collections :
                                        </Text.Small>
                                        <Text.Small tone="muted">
                                            • Table, Tabs, Pagination : architecture compound
                                        </Text.Small>
                                        <Separator />
                                        <Text.Small tone="strong">
                                            Vague 3 — Overlays & Dynamique :
                                        </Text.Small>
                                        <Text.Small tone="muted">
                                            • Calendar, Popover, HoverCard, Tooltip, Collapsible,
                                            Avatar, Carousel compound
                                        </Text.Small>
                                        <Separator />
                                        <Text.Small tone="strong">
                                            Vague 2 — Menus & Navigation :
                                        </Text.Small>
                                        <Text.Small tone="muted">
                                            • NavigationMenu, Menubar et Stepper compound
                                        </Text.Small>
                                        <Separator />
                                        <Text.Small tone="strong">
                                            Vague 1 — Formulaires & Données :
                                        </Text.Small>
                                        <Text.Small tone="muted">
                                            • Select, DropdownMenu, ContextMenu, Accordion compound
                                        </Text.Small>
                                    </Stack>
                                </Stack>
                            </Popover.Content>
                        </Popover>
                        <ThemeToggle className="app-header__theme" />
                        <a
                            href="https://github.com/monority/lib-monority-react"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="app-header__github"
                            aria-label="GitHub Repository"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </header>

            <CommandPalette
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
                items={commandItems}
                placeholder="Rechercher un composant, un guide, un thème…"
                emptyLabel="Aucun composant ou action ne correspond à votre recherche."
            />
        </>
    )
}
