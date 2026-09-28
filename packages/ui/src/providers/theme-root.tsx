import { useTheme } from '../hooks/use-theme'
import { ThemeScope } from './theme-scope'
import { deprecate } from '../internal/deprecate'
import { isDevelopment } from '../internal/env'

interface ThemeRootProps {
    children: React.ReactNode
}

/** @deprecated Le script de tête et ThemeProvider gèrent data-theme sur <html>. */
export function ThemeRoot({ children }: ThemeRootProps) {
    if (isDevelopment) {
        deprecate(
            'theme.ThemeRoot',
            'ThemeRoot is deprecated. The head script and ThemeProvider handle data-theme on <html>.'
        )
    }
    const { resolvedTheme } = useTheme()

    return <ThemeScope theme={resolvedTheme}>{children}</ThemeScope>
}
