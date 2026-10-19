import { HeroHeader } from '@/shared/components/HeroHeader'
import { ButtonLink } from '@monority/ui/button-link'
import { Section } from '@monority/ui/section'

export function HomeHero() {
    return (
        <Section spacing="lg" aria-label="Introduction Monority UI">
            <HeroHeader
                kicker="React 19 Component Library"
                title="Monority UI"
                description="A precision component system for modern web products. Driven by CSS @layer architecture, runtime design tokens, strict contracts and accessible primitives."
                align="center"
                size="lg"
                actions={
                    <>
                        <ButtonLink href="/docs" variant="primary" size="md">
                            Documentation (84 Composants)
                        </ButtonLink>
                        <ButtonLink href="/moodboard" variant="secondary" size="md">
                            Design Studio
                        </ButtonLink>
                        <ButtonLink href="/docs/installation" variant="ghost" size="md">
                            Installation
                        </ButtonLink>
                    </>
                }
            />
        </Section>
    )
}
