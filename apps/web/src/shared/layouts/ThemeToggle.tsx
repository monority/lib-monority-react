import {
    Button,
    DropdownMenu,
    type DropdownMenuItemData,
    ThemeName,
    type ThemeNameType,
    useTheme,
} from '@monority/ui'
import { useMessages, type Messages } from '../i18n'

type ThemeLabelKey = keyof Messages['nav']['theme']['names']

const THEME_LABEL_KEYS: Record<ThemeNameType, ThemeLabelKey> = {
    [ThemeName.LIGHT]: 'light',
    [ThemeName.DARK]: 'dark',
    [ThemeName.DIM]: 'dark',
    [ThemeName.SLATE]: 'slate',
    [ThemeName.OCEAN]: 'ocean',
    [ThemeName.NIGHT]: 'night',
    [ThemeName.OLED]: 'oled',
    [ThemeName.HIGH_CONTRAST]: 'highContrast',
    [ThemeName.SYSTEM]: 'system',
}

function getThemeIcon(theme: string) {
    if (theme === ThemeName.LIGHT) {
        return (
            <svg
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
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
        )
    }

    if (theme === ThemeName.HIGH_CONTRAST) {
        return (
            <svg
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
            </svg>
        )
    }

    if (theme === ThemeName.SYSTEM) {
        return (
            <svg
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
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        )
    }

    return (
        <svg
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
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, resolvedTheme, setTheme } = useTheme()
    const messages = useMessages().nav.theme

    const labelFor = (value: ThemeNameType) => messages.names[THEME_LABEL_KEYS[value]]

    const activeTheme = theme === ThemeName.SYSTEM ? ThemeName.SYSTEM : resolvedTheme
    const currentLabel = labelFor(activeTheme)

    const isCurrent = (value: ThemeNameType) => {
        if (theme === ThemeName.SYSTEM) return value === ThemeName.SYSTEM
        return resolvedTheme === value
    }

    const item = (value: ThemeNameType): DropdownMenuItemData => ({
        value,
        label: labelFor(value),
        icon: getThemeIcon(value),
        shortcut: isCurrent(value) ? messages.active : undefined,
        onSelect: () => setTheme(value),
    })

    const items: DropdownMenuItemData[] = [
        item(ThemeName.LIGHT),
        item(ThemeName.DARK),
        { value: 'sep-1', label: '', type: 'separator' },
        item(ThemeName.SLATE),
        item(ThemeName.OCEAN),
        item(ThemeName.NIGHT),
        item(ThemeName.OLED),
        { value: 'sep-2', label: '', type: 'separator' },
        item(ThemeName.HIGH_CONTRAST),
        item(ThemeName.SYSTEM),
    ]

    return (
        <DropdownMenu
            align="end"
            side="bottom"
            trigger={
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className={className}
                    aria-label={messages.current(currentLabel)}
                    iconLeading={getThemeIcon(activeTheme)}
                    iconTrailing={
                        <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    }
                >
                    {currentLabel}
                </Button>
            }
            items={items}
        />
    )
}
