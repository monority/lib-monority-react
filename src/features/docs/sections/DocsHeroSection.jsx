import { Button, Section, Text, Title } from '@/components/ui'

export function DocsHeroSection({ content }) {
    return (
        <Section spacing="lg" className="stack-m">
            <Text className="eyebrow" tone="strong">
                {content.eyebrow}
            </Text>
            <Title as="h1" size="display">
                {content.title}
            </Title>
            <Text tone="base" size="lg" className="content-width">
                {content.description}
            </Text>
            <div className="cluster docs-hero-nav">
                {content.sections.map((section) => (
                    <Button
                        key={section.href}
                        as="a"
                        href={section.href}
                        variant="subtle"
                        size="sm"
                    >
                        {section.label}
                    </Button>
                ))}
            </div>
        </Section>
    )
}
