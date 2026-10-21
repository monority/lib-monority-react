import {
    Button,
    DropdownMenu,
    type DropdownMenuItemData,
    ThemeName,
    type ThemeNameType,
    useTheme,
} from '@monority/ui'

interface ThemeDefinition {
    value: ThemeNameType
    label: string
}

const THEME_OPTIONS: ThemeDefinition[] = [
    { value: ThemeName.LIGHT, label: 'Clair' },
    { value: ThemeName.DARK, label: 'Sombre' },
    { value: ThemeName.SLATE, label: 'Slate' },
    { value: ThemeName.OCEAN, label: 'Océan' },
    { value: ThemeName.NIGHT, label: 'Night (Tokyo)' },
    { value: ThemeName.OLED, label: 'OLED (Noir pur)' },
    { value: ThemeName.HIGH_CONTRAST, label: 'Contraste élevé' },
    { value: ThemeName.SYSTEM, label: 'Système' },
]

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

    const currentMatch =
        theme === ThemeName.SYSTEM
            ? THEME_OPTIONS.find((t) => t.value === ThemeName.SYSTEM)
            : THEME_OPTIONS.find((t) => t.value === resolvedTheme)
    const currentLabel = currentMatch ? currentMatch.label : 'Thème'

    const isCurrent = (val: ThemeNameType) => {
        if (theme === ThemeName.SYSTEM) return val === ThemeName.SYSTEM
        return resolvedTheme === val
    }

    const items: DropdownMenuItemData[] = [
        {
            value: ThemeName.LIGHT,
            label: 'Clair',
            icon: getThemeIcon(ThemeName.LIGHT),
            shortcut: isCurrent(ThemeName.LIGHT) ? 'Actif' : undefined,
            onSelect: () => setTheme(ThemeName.LIGHT),
        },
        {
            value: ThemeName.DARK,
            label: 'Sombre',
            icon: getThemeIcon(ThemeName.DARK),
            shortcut: isCurrent(ThemeName.DARK) ? 'Actif' : undefined,
            onSelect: () => setTheme(ThemeName.DARK),
        },
        { value: 'sep-1', label: '', type: 'separator' },
        {
            value: ThemeName.SLATE,
            label: 'Slate',
            icon: getThemeIcon(ThemeName.SLATE),
            shortcut: isCurrent(ThemeName.SLATE) ? 'Actif' : undefined,
            onSelect: () => setTheme(ThemeName.SLATE),
        },
        {
            value: ThemeName.OCEAN,
            label: 'Océan',
            icon: getThemeIcon(ThemeName.OCEAN),
            shortcut: isCurrent(ThemeName.OCEAN) ? 'Actif' : undefined,
            onSelect: () => setTheme(ThemeName.OCEAN),
        },
        {
            value: ThemeName.NIGHT,
            label: 'Night (Tokyo)',
            icon: getThemeIcon(ThemeName.NIGHT),
            shortcut: isCurrent(ThemeName.NIGHT) ? 'Actif' : undefined,
            onSelect: () => setTheme(ThemeName.NIGHT),
        },
        {
            value: ThemeName.OLED,
            label: 'OLED (Noir pur)',
            icon: getThemeIcon(ThemeName.OLED),
            shortcut: isCurrent(ThemeName.OLED) ? 'Actif' : undefined,
            onSelect: () => setTheme(ThemeName.OLED),
        },
        { value: 'sep-2', label: '', type: 'separator' },
        {
            value: ThemeName.HIGH_CONTRAST,
            label: 'Contraste élevé (AAA)',
            icon: getThemeIcon(ThemeName.HIGH_CONTRAST),
            shortcut: isCurrent(ThemeName.HIGH_CONTRAST) ? 'Actif' : undefined,
            onSelect: () => setTheme(ThemeName.HIGH_CONTRAST),
        },
        {
            value: ThemeName.SYSTEM,
            label: 'Système',
            icon: getThemeIcon(ThemeName.SYSTEM),
            shortcut: isCurrent(ThemeName.SYSTEM) ? 'Actif' : undefined,
            onSelect: () => setTheme(ThemeName.SYSTEM),
        },
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
                    aria-label={`Thème : ${currentLabel}`}
                    iconLeading={getThemeIcon(
                        theme === ThemeName.SYSTEM ? ThemeName.SYSTEM : resolvedTheme
                    )}
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
