import { Button, Section, Text, Title } from '@/components/ui'

export function HeroSection({ content, onOpenModal }) {
    return (
        <Section id="top" spacing="lg" className="hero-split">
            <div className="hero hero-content stack-m">
                <Text className="eyebrow" tone="strong">
                    {content.eyebrow}
                </Text>
                <Title as="h1" size="display">
                    {content.title}
                </Title>
                <Text as="p" tone="base" size="lg">
                    {content.description}
                </Text>
                <Text as="p" tone="base" className="hero-supporting-copy">
                    {content.supportingCopy}
                </Text>
                <div className="cluster hero-actions">
                    <Button as="a" href="#cta" size="lg">
                        {content.primaryActionLabel}
                    </Button>
                    <Button variant="ghost" size="lg" onClick={onOpenModal}>
                        {content.secondaryActionLabel}
                    </Button>
                </div>
            </div>

            <aside className="surface hero-spotlight stack-m" aria-label={content.spotlight.eyebrow}>
                <Text className="eyebrow" tone="strong">
                    {content.spotlight.eyebrow}
                </Text>
                <Title as="h2" size="md">
                    {content.spotlight.title}
                </Title>
                <Text tone="base">{content.spotlight.description}</Text>
                <div className="hero-spotlight__list stack-s">
                    {content.spotlight.items.map((item) => (
                        <div key={item} className="hero-spotlight__item">
                            <span className="hero-spotlight__dot" aria-hidden="true" />
                            <Text tone="base">{item}</Text>
                        </div>
                    ))}
                </div>
            </aside>
        </Section>
    )
}
