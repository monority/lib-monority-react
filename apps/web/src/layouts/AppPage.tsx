import { AppShell } from './AppShell'
import { usePageSeo } from '@/seo/usePageSeo'
import { Container, Stack } from '@monority/ui'
import { useTheme } from '@monority/ui'

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
    const { isDark, theme, toggleTheme } = useTheme()
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
