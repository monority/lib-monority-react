import { AppShell } from '@/app/layouts/AppShell'
import { primaryNavigationItems } from '@/app/config/navigation'
import { Container, Divider, Stack, Text } from '@/components/ui'
import { useTheme } from '@/hooks/useTheme'
import { playgroundChecklistItems, playgroundHeroContent } from './content/playground-content'
import { usePlaygroundMetrics } from './hooks/usePlaygroundMetrics'
import { PlaygroundChecklistSection } from './sections/PlaygroundChecklistSection'
import { PlaygroundHeroSection } from './sections/PlaygroundHeroSection'
import { PlaygroundMetricsSection } from './sections/PlaygroundMetricsSection'

export function PlaygroundPage() {
    const { isDark, toggleTheme } = useTheme()
    const { data, error, isError, isLoading } = usePlaygroundMetrics()

    return (
        <AppShell
            isDark={isDark}
            onToggleTheme={toggleTheme}
            navigationItems={primaryNavigationItems}
        >
            <Container size="lg">
                <Stack gap="xl">
                    <PlaygroundHeroSection content={playgroundHeroContent} />
                    <Divider label="Feature blueprint" />
                    <PlaygroundChecklistSection items={playgroundChecklistItems} />
                    <PlaygroundMetricsSection
                        metrics={data}
                        isLoading={isLoading}
                        isError={isError}
                        errorMessage={error}
                    />
                    <SectionNote />
                </Stack>
            </Container>
        </AppShell>
    )
}

function SectionNote() {
    return (
        <Text tone="base" className="content-width">
            Pour une nouvelle feature, reproduis la meme logique: `content/` pour le texte ou les
            donnees, `sections/` pour la composition visuelle et un fichier `Page` pour
            l&apos;orchestration.
        </Text>
    )
}
