import { Button, ThemeName, useTheme } from '@monority/ui'

/** Atmospheres all sit on one of the two bases, so the header only ever offers those. */
const DARK_THEMES = new Set<string>([
    ThemeName.DARK,
    ThemeName.SLATE,
    ThemeName.OLED,
    ThemeName.OCEAN,
    ThemeName.NIGHT,
    ThemeName.HIGH_CONTRAST,
])

/**
 * Single-button Light/Dark toggle. Atmospheres resolve to their base, so the
 * header only ever flips between `light` and `dark`.
 */
export function ThemeToggle({ className }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme()
    const isDark = DARK_THEMES.has(resolvedTheme)

    return (
        <Button
            type="button"
            size="sm"
            variant="ghost"
            className={className}
            onClick={() => setTheme(isDark ? ThemeName.LIGHT : ThemeName.DARK)}
            aria-label={isDark ? 'Passer en thème clair' : 'Passer en thème sombre'}
            iconLeading={
                isDark ? (
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
                ) : (
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
        >
            {isDark ? 'Light' : 'Dark'}
        </Button>
    )
}
