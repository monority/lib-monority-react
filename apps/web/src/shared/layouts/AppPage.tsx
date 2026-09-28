import { AppShell } from './AppShell'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { Container, Stack } from '@monority/ui'

interface AppPageProps {
    seo?: Record<string, any>
    containerSize?: 'sm' | 'md' | 'lg' | 'xl'
    stackGap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    children?: React.ReactNode
}

export function AppPage({ seo, containerSize = 'lg', stackGap = 'xl', children }: AppPageProps) {
    usePageSeo(seo ?? {})

    return (
        <AppShell>
            <Container size={containerSize}>
                <Stack gap={stackGap}>{children}</Stack>
            </Container>
        </AppShell>
    )
}
