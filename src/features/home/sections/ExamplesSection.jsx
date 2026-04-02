import { Badge, Card, Grid, Section, Text, Title } from '@/components/ui'

function ExampleCard({ item }) {
    return (
        <Card padding="md" className="stack-m home-example-card">
            <div className="stack-s">
                <Title as="h3" size="sm">
                    {item.title}
                </Title>
                <Text tone="base">{item.description}</Text>
            </div>
            <div className="cluster home-example-card__chips">
                {item.composition.map((component) => (
                    <Badge key={component} variant="subtle">
                        {component}
                    </Badge>
                ))}
            </div>
        </Card>
    )
}

export function ExamplesSection({ content }) {
    return (
        <Section id="examples" spacing="md" surface className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <Grid cols={3} gap="md" className="feature-grid">
                {content.items.map((item) => (
                    <ExampleCard key={item.title} item={item} />
                ))}
            </Grid>
        </Section>
    )
}
