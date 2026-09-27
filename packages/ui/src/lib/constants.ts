export const THEME_STORAGE_KEY = 'model-theme'
export const BRAND_ACCENT_STORAGE_KEY = 'monority-brand-accent'
export const OVERLAY_OFFSET = 6
export const OVERLAY_VIEWPORT_GUTTER = 14
export const OVERLAY_ARROW_PADDING = 14
export const DATEPICKER_MIN_WIDTH = 280

export const ThemeName = {
    LIGHT: 'light',
    DARK: 'dark',
    /** Variante bleue du thème dark de base. Le thème dark lui-même est un gris pur. */
    SLATE: 'slate',
    OLED: 'oled',
    OCEAN: 'ocean',
    NIGHT: 'night',
    HIGH_CONTRAST: 'high-contrast',
    SYSTEM: 'system',
    /** @deprecated Alias migré automatiquement vers dark. */
    DIM: 'dim',
} as const

export type ThemeNameType = (typeof ThemeName)[keyof typeof ThemeName]
export type ThemePreference = Exclude<ThemeNameType, 'dim'>
export type ResolvedThemeName = Exclude<ThemeNameType, 'system' | 'dim'>
