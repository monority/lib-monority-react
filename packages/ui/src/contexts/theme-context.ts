import { createContext } from 'react'
import type { ThemeNameType } from '@/lib/constants'

export interface ThemeContextValue {
  theme: ThemeNameType
  resolvedTheme: string
  isDark: boolean
  setTheme: React.Dispatch<React.SetStateAction<ThemeNameType>>
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
ThemeContext.displayName = 'ThemeContext'
