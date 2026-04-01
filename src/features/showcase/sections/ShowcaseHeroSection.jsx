import { Section, Text, Title } from '@/components/ui'

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
        </Section>
    )
}
