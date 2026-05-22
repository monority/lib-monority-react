import { useEffect } from 'react'
import { useTheme } from '../hooks/use-theme'

interface ThemeRootProps {
  children: React.ReactNode
}

export function ThemeRoot({ children }: ThemeRootProps) {
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
    <div className="monority-theme-root" data-theme={resolvedTheme} style={{ colorScheme: resolvedTheme }}>
      {children}
    </div>
  )
}
