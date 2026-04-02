import { Badge, Card, Grid, Section, Text, Title } from '@/components/ui'

function WhyCard({ item }) {
    return (
        <Card padding="md" className="stack-s home-why-card">
            <Title as="h3" size="sm">
                {item.title}
            </Title>
            <Text tone="base">{item.description}</Text>
        </Card>
    )
}

export function WhySection({ content }) {
    return (
        <Section id="why" spacing="md" surface className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <Grid cols={3} gap="md" className="feature-grid">
                {content.items.map((item) => (
                    <WhyCard key={item.title} item={item} />
                ))}
            </Grid>
        </Section>
    )
}
