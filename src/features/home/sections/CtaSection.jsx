import { Button, Input, Section, Text, Title } from '@/components/ui'

export function CtaSection({ content }) {
    return (
        <Section id="cta" spacing="md" surface className="cta stack-s">
            <Title as="h2" size="md">
                {content.title}
            </Title>
            <Text tone="base">{content.description}</Text>
            <form className="cluster cta-form" onSubmit={(event) => event.preventDefault()}>
                <Input
                    label={content.inputLabel}
                    type="email"
                    placeholder={content.inputPlaceholder}
                    hint={content.inputHint}
                    required
                />
                <Button type="submit" className="cta-form__button">
                    {content.actionLabel}
                </Button>
            </form>
        </Section>
    )
}
