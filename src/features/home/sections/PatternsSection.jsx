import { Badge, Card, Grid, Section, Text, Title } from '@/components/ui'

function PatternCard({ item }) {
    return (
        <Card padding="md" className="stack-m home-pattern-card">
            <div className="stack-s">
                <Title as="h3" size="sm">
                    {item.title}
                </Title>
                <Text tone="base">{item.description}</Text>
            </div>
            <div className="cluster home-pattern-card__chips">
                {item.components.map((component) => (
                    <Badge key={component} variant="subtle">
                        {component}
                    </Badge>
                ))}
            </div>
        </Card>
    )
}

export function PatternsSection({ content }) {
    return (
        <Section id="patterns" spacing="md" className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <Grid cols={3} gap="md" className="feature-grid">
                {content.items.map((item) => (
                    <PatternCard key={item.title} item={item} />
                ))}
            </Grid>
        </Section>
    )
}
