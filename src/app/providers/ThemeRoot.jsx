import { useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'

export function ThemeRoot({ children }) {
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        if (typeof document === 'undefined') {
            return undefined
        }

        document.documentElement.dataset.theme = resolvedTheme
        document.documentElement.style.colorScheme = resolvedTheme

        return () => {
            delete document.documentElement.dataset.theme
            document.documentElement.style.colorScheme = ''
        }
    }, [resolvedTheme])

    return (
        <div className="app-theme" data-theme={resolvedTheme} style={{ colorScheme: resolvedTheme }}>
            {children}
        </div>
    )
}
