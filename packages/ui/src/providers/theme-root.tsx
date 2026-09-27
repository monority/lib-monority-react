import { useTheme } from '../hooks/use-theme'
import { ThemeScope } from './theme-scope'
import { deprecate } from '../internal/deprecate'

interface ThemeRootProps {
    children: React.ReactNode
}

/** @deprecated Le script de tête et ThemeProvider gèrent data-theme sur <html>. */
export function ThemeRoot({ children }: ThemeRootProps) {
    deprecate(
        'theme.ThemeRoot',
        'ThemeRoot est déprécié. Le script de tête et ThemeProvider gèrent data-theme sur <html>.'
    )
    const { resolvedTheme } = useTheme()

    return <ThemeScope theme={resolvedTheme}>{children}</ThemeScope>
}
