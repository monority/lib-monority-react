import { AppShell } from '@/app/layouts/AppShell'
import { Container, Stack } from '@/components/ui'
import { useTheme } from '@/hooks/useTheme'

export function AppPage({
    navigationItems,
    containerSize = 'lg',
    stackGap = 'xl',
    children,
}) {
    const { isDark, theme, toggleTheme } = useTheme()

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
