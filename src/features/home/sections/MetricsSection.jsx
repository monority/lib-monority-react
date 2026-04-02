import { Badge, MetricGrid, Section, Text, Title } from '@/components/ui'

export function MetricsSection({ content }) {
    return (
        <Section id="proof" spacing="md" surface className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <MetricGrid items={content.items} />
        </Section>
    )
}
