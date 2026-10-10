import { ButtonLink } from '@monority/ui/button-link'
import { HeroHeader } from '@/shared/components/HeroHeader'

export function HomeHero() {
    return (
        <section className="home-hero-section" aria-label="Introduction Monority UI">
            <HeroHeader
                kicker="React 19 Component Library"
                title="Monority UI"
                description="A precision component system for modern web products. Driven by CSS @layer architecture, runtime design tokens, strict contracts and accessible primitives."
                align="center"
                size="lg"
                actions={
                    <>
                        <ButtonLink href="/docs" variant="primary" size="md">
                            Documentation (75 Components)
                        </ButtonLink>
                        <ButtonLink href="/showcase" variant="secondary" size="md">
                            Showcase Compositions
                        </ButtonLink>
                        <ButtonLink href="/playground" variant="ghost" size="md">
                            Interactive Playground
                        </ButtonLink>
                    </>
                }
            />
        </section>
    )
}
