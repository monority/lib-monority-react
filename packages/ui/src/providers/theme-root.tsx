import { useTheme } from '../hooks/use-theme'
import { ThemeScope } from './theme-scope'

interface ThemeRootProps {
  children: React.ReactNode
}

/** @deprecated Le script de tête et ThemeProvider gèrent data-theme sur <html>. */
export function ThemeRoot({ children }: ThemeRootProps) {
  const { resolvedTheme } = useTheme()

  return <ThemeScope theme={resolvedTheme}>{children}</ThemeScope>
}
