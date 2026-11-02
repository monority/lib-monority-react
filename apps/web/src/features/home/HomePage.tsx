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
                position: 'relative',
                overflowX: 'hidden',
            }}
        >
            {/* Halo volumétrique d'ambiance synchronisé avec --mr-accent-solid */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    maxWidth: '85rem',
                    height: '850px',
                    background:
                        'radial-gradient(ellipse 75% 55% at 50% 25%, color-mix(in oklch, var(--mr-accent-solid) 14%, transparent) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    transition: 'background var(--mr-duration-state) ease',
                }}
            />

            {/* Trame architecturale masquée par un dégradé radial doux */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '850px',
                    backgroundImage:
                        'linear-gradient(var(--mr-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--mr-border-subtle) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    maskImage:
                        'radial-gradient(ellipse 65% 50% at 50% 28%, black 20%, transparent 75%)',
                    WebkitMaskImage:
                        'radial-gradient(ellipse 65% 50% at 50% 28%, black 20%, transparent 75%)',
                    opacity: 0.35,
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            <AppHeader homeNav />

            <main
                id="main-content"
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingBlock: 'var(--mr-space-6) var(--mr-space-8)',
                    position: 'relative',
                    zIndex: 1,
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
