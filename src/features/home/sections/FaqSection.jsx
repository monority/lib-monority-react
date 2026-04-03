import { Accordion, Badge, Section, Text, Title } from '@/components/ui'

export function FaqSection({ content }) {
    return (
        <Section id="faq" spacing="md" surface className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <Accordion
                items={content.items.map((item) => ({
                    value: item.value,
                    label: item.question,
                    content: <Text tone="base">{item.answer}</Text>,
                }))}
                defaultValue={content.items[0]?.value}
            />
        </Section>
    )
}
