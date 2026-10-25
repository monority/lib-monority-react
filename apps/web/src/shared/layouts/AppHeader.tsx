import {
    Badge,
    Banner,
    type CommandItem,
    CommandPalette,
    Popover,
    Separator,
    Stack,
    Text,
    ThemeName,
    type ThemeNameType,
    useTheme,
} from '@monority/ui'
import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { docsComponentRegistry } from '@/features/docs/components/registry'
import { localizePath, useLocale, useMessages, type Messages } from '@/shared/i18n'
import { LocaleSwitcher } from './LocaleSwitcher'
import { MotionToggle } from './MotionToggle'
import { ThemeToggle } from './ThemeToggle'
import './AppHeader.css'

const THEME_COMMAND_KEYS: (keyof Messages['nav']['theme']['commands'])[] = [
    'light',
    'dark',
    'slate',
    'oled',
    'ocean',
    'night',
]

const THEME_BY_COMMAND: Record<(typeof THEME_COMMAND_KEYS)[number], ThemeNameType> = {
    light: ThemeName.LIGHT,
    dark: ThemeName.DARK,
    slate: ThemeName.SLATE,
    oled: ThemeName.OLED,
    ocean: ThemeName.OCEAN,
    night: ThemeName.NIGHT,
}

interface AppHeaderProps {
    homeNav?: boolean
}

export function AppHeader({ homeNav = false }: AppHeaderProps) {
    const navigate = useNavigate()
    const { locale } = useLocale()
    const messages = useMessages().nav
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

    const componentCount = docsComponentRegistry.length

    const commandItems = useMemo<CommandItem[]>(() => {
        const pages: CommandItem[] = [
            {
                value: 'page-intro',
                label: messages.commands.introduction.label,
                description: messages.commands.introduction.description,
                group: messages.commandGroups.pages,
                onSelect: () => {
                    navigate(localizePath('/docs', locale))
                    setSearchOpen(false)
                },
            },
            {
                value: 'page-install',
                label: messages.commands.installation.label,
                description: messages.commands.installation.description,
                group: messages.commandGroups.pages,
                onSelect: () => {
                    navigate(localizePath('/docs/installation', locale))
                    setSearchOpen(false)
                },
            },
            {
                value: 'page-moodboard',
                label: messages.commands.moodboard.label,
                description: messages.commands.moodboard.description,
                group: messages.commandGroups.pages,
                onSelect: () => {
                    navigate(localizePath('/moodboard', locale))
                    setSearchOpen(false)
                },
            },
            {
                value: 'page-home',
                label: messages.commands.home.label,
                description: messages.commands.home.description,
                group: messages.commandGroups.pages,
                onSelect: () => {
                    navigate(localizePath('/', locale))
                    setSearchOpen(false)
                },
            },
        ]

        const components: CommandItem[] = docsComponentRegistry.map((comp) => ({
            value: `comp-${comp.slug}`,
            label: comp.label,
            description: messages.commands.component(comp.category),
            group: messages.commandGroups.components(comp.category),
            keywords: `${comp.slug} ${comp.category}`,
            onSelect: () => {
                navigate(localizePath(comp.path, locale))
                setSearchOpen(false)
            },
        }))

        const themeActions: CommandItem[] = THEME_COMMAND_KEYS.map((key) => ({
            value: `theme-${key}`,
            label: messages.theme.commands[key].label,
            description: messages.theme.commands[key].description,
            group: messages.commandGroups.themes,
            onSelect: () => {
                setTheme(THEME_BY_COMMAND[key])
                setSearchOpen(false)
            },
        }))

        return [...pages, ...components, ...themeActions]
    }, [locale, messages, navigate, setTheme])

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
                        <Banner.Eyebrow>{messages.banner.eyebrow}</Banner.Eyebrow>
                        <Banner.Description>
                            {messages.banner.description(componentCount)}
                        </Banner.Description>
                        <Banner.Actions>
                            <button
                                type="button"
                                className="app-header__announcement-details-btn"
                                onClick={() => setChangelogOpen(true)}
                            >
                                {messages.banner.cta}
                            </button>
                        </Banner.Actions>
                    </Banner>
                </div>
            )}

            <header className={homeNav ? 'app-header app-header--home' : 'app-header'}>
                <div className="app-header__inner">
                    <div className="app-header__start">
                        <Link
                            className="app-header__brand"
                            to={localizePath('/', locale)}
                            aria-label={messages.brand}
                        >
                            <span className="app-header__logo-mark" aria-hidden="true">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true"
                                >
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
                        <nav className="app-header__nav" aria-label={messages.primaryNavigation}>
                            <NavLink
                                to={localizePath('/docs', locale)}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'app-header__link app-header__link--active'
                                        : 'app-header__link'
                                }
                            >
                                {messages.links.docs}
                            </NavLink>
                            <NavLink
                                to={localizePath('/moodboard', locale)}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'app-header__link app-header__link--active'
                                        : 'app-header__link'
                                }
                            >
                                {messages.links.moodboard}
                            </NavLink>
                        </nav>
                    </div>

                    <div className="app-header__center">
                        <button
                            type="button"
                            className="app-header__search-trigger"
                            onClick={() => setSearchOpen(true)}
                            aria-label={messages.search.open}
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
                                {messages.search.placeholder}
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
                                aria-label={messages.changelog.trigger}
                            >
                                <span className="app-header__changes-dot" aria-hidden="true" />
                                <span className="app-header__changes-title">
                                    {messages.changelog.trigger}
                                </span>
                                <span className="app-header__changes-tag">
                                    {messages.changelog.tag}
                                </span>
                            </Popover.Trigger>
                            <Popover.Content className="app-header__changes-popover">
                                <Stack gap="sm">
                                    <Stack direction="horizontal" justify="between" align="center">
                                        <Text.Strong size="sm">
                                            {messages.changelog.title}
                                        </Text.Strong>
                                        <Badge tone="accent" size="sm">
                                            {messages.changelog.badge}
                                        </Badge>
                                    </Stack>
                                    <Separator />
                                    <Stack
                                        gap="xs"
                                        style={{ maxHeight: '280px', overflowY: 'auto' }}
                                    >
                                        {messages.changelog.waves.map((wave) => (
                                            <Stack gap="xs" key={wave.title}>
                                                <Text.Small tone="strong">{wave.title}</Text.Small>
                                                {wave.items.map((item) => (
                                                    <Text.Small tone="muted" key={item}>
                                                        • {item}
                                                    </Text.Small>
                                                ))}
                                                <Separator />
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Popover.Content>
                        </Popover>
                        <LocaleSwitcher className="app-header__locale" />
                        <MotionToggle className="app-header__motion" />
                        <ThemeToggle className="app-header__theme" />
                        <a
                            href="https://github.com/monority/lib-monority-react"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="app-header__github"
                            aria-label={messages.github}
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
                placeholder={messages.search.dialogPlaceholder}
                emptyLabel={messages.search.empty}
            />
        </>
    )
}
