import { AppShell } from './AppShell'
import { usePageSeo } from '@/seo/usePageSeo'
import { Container, Stack } from '@monority/ui'
import { ThemeName, useTheme } from '@monority/ui'

interface AppPageProps {
    navigationItems?: any[]
    seo?: Record<string, any>
    containerSize?: 'sm' | 'md' | 'lg' | 'xl'
    stackGap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    children?: React.ReactNode
}

export function AppPage({
    navigationItems,
    seo,
    containerSize = 'lg',
    stackGap = 'xl',
    children,
}: AppPageProps) {
    const { resolvedTheme, setTheme, theme } = useTheme()
    const isDark = resolvedTheme === ThemeName.DARK || resolvedTheme === ThemeName.OLED
    const toggleTheme = () => {
        setTheme(isDark ? ThemeName.LIGHT : ThemeName.DARK)
    }
    usePageSeo(seo ?? {})

    return (
        <AppShell
            isDark={isDark}
            theme={theme}
            onToggleTheme={toggleTheme}
            navigationItems={navigationItems}
        >
            <Container size={containerSize}>
                <Stack gap={stackGap}>{children}</Stack>
            </Container>
        </AppShell>
    )
}
