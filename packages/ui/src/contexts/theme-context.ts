import { createContext } from 'react'
import type { ResolvedThemeName, ThemeNameType, ThemePreference } from '@/lib/constants'

export interface ThemeContextValue {
  theme: ThemePreference
  resolvedTheme: ResolvedThemeName
  /** @deprecated Utilisez resolvedTheme. */
  readonly isDark: boolean
  setTheme: (theme: ThemeNameType) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
ThemeContext.displayName = 'ThemeContext'
