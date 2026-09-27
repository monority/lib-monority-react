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
        >
            {isDark ? 'Light' : 'Dark'}
        </Button>
    )
}
