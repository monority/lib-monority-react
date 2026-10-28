import { AppHeader } from '@/shared/layouts/AppHeader'
import { useMessages } from '@/shared/i18n'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { Container, Stack } from '@monority/ui'
import { Home3DMatrix } from './components/Home3DMatrix'
import { HomeCodeExperience } from './components/HomeCodeExperience'
import { HomeFooter } from './components/HomeFooter'
import { HomeFrameworksStrip } from './components/HomeFrameworksStrip'
import { HomeHero } from './components/HomeHero'
import { HomePillars } from './components/HomePillars'

export function HomePage() {
    const messages = useMessages()

    usePageSeo({
        title: messages.home.seo.title,
        description: messages.home.seo.description,
    })

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'var(--mr-bg-canvas)',
                color: 'var(--mr-text-primary)',
            }}
        >
            <AppHeader homeNav />

            <main
                id="main-content"
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingBlock: 'var(--mr-space-6) var(--mr-space-8)',
                }}
            >
                <Container size="xl">
                    <Stack gap="xl">
                        <HomeHero />
                        <Home3DMatrix />
                        <HomeFrameworksStrip />
                        <HomePillars />
                        <HomeCodeExperience />
                        <HomeFooter />
                    </Stack>
                </Container>
            </main>
        </div>
    )
}
