import { Badge, Button, Section, Text, Title } from '@/components/ui'
import { showcaseSections } from '../content/showcase-content'

export function ShowcaseHeroSection({ content }) {
    return (
        <Section spacing="lg" className="showcase-hero stack-m">
            <Text className="eyebrow" tone="strong">
                {content.eyebrow}
            </Text>
            <Title as="h1" size="display">
                {content.title}
            </Title>
            <Text tone="base" size="lg">
                {content.description}
            </Text>
            <div className="stack-s content-width">
                {content.quickFacts.map((item) => (
                    <Text key={item} tone="base">
                        {item}
                    </Text>
                ))}
            </div>
            <div className="cluster docs-hero-nav">
                {showcaseSections.map((section) => (
                    <Button key={section.id} as="a" href={`#${section.id}`} variant="subtle" size="sm">
                        {section.label}
                    </Button>
                ))}
            </div>
            <Badge className="docs-chip">Catalogue interactif des primitives et patterns UI</Badge>
        </Section>
    )
}
