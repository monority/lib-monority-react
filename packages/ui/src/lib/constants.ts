export const THEME_STORAGE_KEY = 'model-theme'

export const ThemeName = {
  LIGHT: 'light',
  DARK: 'dark',
  OLED: 'oled',
  SYSTEM: 'system',
} as const

export type ThemeNameType = (typeof ThemeName)[keyof typeof ThemeName]
