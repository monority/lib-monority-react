import { Button, Section, Text, Title } from '@/components/ui'

export function HeroSection({ content, onOpenModal }) {
    return (
        <Section id="top" spacing="lg" className="hero stack-m">
            <Text className="eyebrow" tone="strong">
                {content.eyebrow}
            </Text>
            <Title as="h1" size="display">
                {content.title}
            </Title>
            <Text as="p" tone="base" size="lg">
                {content.description}
            </Text>
            <div className="cluster hero-actions">
                <Button as="a" href="#cta" size="lg">
                    {content.primaryActionLabel}
                </Button>
                <Button variant="ghost" size="lg" onClick={onOpenModal}>
                    {content.secondaryActionLabel}
                </Button>
            </div>
        </Section>
    )
}
