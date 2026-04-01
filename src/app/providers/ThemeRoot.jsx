import { useTheme } from '@/hooks/useTheme'

export function ThemeRoot({ children }) {
    const { resolvedTheme } = useTheme()

    return (
        <div className="app-theme" data-theme={resolvedTheme} style={{ colorScheme: resolvedTheme }}>
            {children}
        </div>
    )
}
