import { AppPage } from '@/app/layouts/AppPage'
import { primaryNavigationItems } from '@/app/config/navigation'
import { Divider, Text } from '@/components/ui'
import { playgroundChecklistItems, playgroundHeroContent } from './content/playground-content'
import { usePlaygroundMetrics } from './hooks/usePlaygroundMetrics'
import { PlaygroundChecklistSection } from './sections/PlaygroundChecklistSection'
import { PlaygroundHeroSection } from './sections/PlaygroundHeroSection'
import { PlaygroundMetricsSection } from './sections/PlaygroundMetricsSection'

export function PlaygroundPage() {
    const { data, errorMessage, isError, isLoading } = usePlaygroundMetrics()

    return (
        <AppPage navigationItems={primaryNavigationItems}>
            <PlaygroundHeroSection content={playgroundHeroContent} />
            <Divider label="Feature blueprint" />
            <PlaygroundChecklistSection items={playgroundChecklistItems} />
            <PlaygroundMetricsSection
                metrics={data}
                isLoading={isLoading}
                isError={isError}
                errorMessage={errorMessage}
            />
            <SectionNote />
        </AppPage>
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
