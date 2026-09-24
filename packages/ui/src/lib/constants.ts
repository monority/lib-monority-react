export const THEME_STORAGE_KEY = 'model-theme'
export const OVERLAY_OFFSET = 6
export const OVERLAY_VIEWPORT_GUTTER = 14
export const OVERLAY_ARROW_PADDING = 14
export const DATEPICKER_MIN_WIDTH = 280

export const ThemeName = {
  LIGHT: 'light',
  DARK: 'dark',
  OLED: 'oled',
  SYSTEM: 'system',
} as const

export type ThemeNameType = (typeof ThemeName)[keyof typeof ThemeName]
