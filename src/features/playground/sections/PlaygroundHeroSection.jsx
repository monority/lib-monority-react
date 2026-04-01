import { Section, Text, Title } from '@/components/ui'

export function PlaygroundHeroSection({ content }) {
    return (
        <Section spacing="lg" className="stack-m">
            <Text className="eyebrow" tone="strong">
                {content.eyebrow}
            </Text>
            <Title as="h1" size="lg">
                {content.title}
            </Title>
            <Text tone="base" size="lg">
                {content.description}
            </Text>
        </Section>
    )
}
