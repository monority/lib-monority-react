import { AppHeader } from '@/shared/layouts/AppHeader'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { Container, Separator, Stack, Text } from '@monority/ui'
import { Link } from 'react-router-dom'
import { HomeFeatures } from './components/HomeFeatures'
import { HomeHero } from './components/HomeHero'
import { HomeLiveTokens } from './components/HomeLiveTokens'
import { HomeShowcaseGrid } from './components/HomeShowcaseGrid'

export function HomePage() {
    usePageSeo({
        title: 'Home',
        description:
            'Monority UI — A React 19 component system built around calm tokens, accessible primitives, and CSS @layer architecture.',
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
            <AppHeader />

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
                        <HomeLiveTokens />
                        <HomeFeatures />
                        <HomeShowcaseGrid />

                        <Separator />

                        <footer
                            role="contentinfo"
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 'var(--mr-space-4)',
                                paddingBlockStart: 'var(--mr-space-2)',
                            }}
                        >
                            <Text tone="muted" size="sm">
                                Monority UI — MIT License
                            </Text>
                            <nav
                                aria-label="Footer Navigation"
                                style={{ display: 'flex', gap: 'var(--mr-space-4)' }}
                            >
                                <Link
                                    to="/docs"
                                    style={{
                                        color: 'var(--mr-text-secondary)',
                                        textDecoration: 'none',
                                        fontSize: 'var(--mr-font-size-sm)',
                                    }}
                                >
                                    Documentation
                                </Link>
                                <Link
                                    to="/moodboard"
                                    style={{
                                        color: 'var(--mr-text-secondary)',
                                        textDecoration: 'none',
                                        fontSize: 'var(--mr-font-size-sm)',
                                    }}
                                >
                                    Design Studio
                                </Link>
                            </nav>
                        </footer>
                    </Stack>
                </Container>
            </main>
        </div>
    )
}
