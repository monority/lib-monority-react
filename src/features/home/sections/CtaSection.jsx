import { Button, Input, Section, Text, Title } from '@/components/ui'

export function CtaSection({ content }) {
    return (
        <Section id="cta" spacing="md" surface className="cta stack-s">
            <Title as="h2" size="md">
                {content.title}
            </Title>
            <Text tone="base">{content.description}</Text>
            <div className="cluster cta-form">
                <Input
                    label={content.inputLabel}
                    type="email"
                    placeholder={content.inputPlaceholder}
                    hint={content.inputHint}
                    required
                />
                <Button size="lg">{content.actionLabel}</Button>
            </div>
        </Section>
    )
}
