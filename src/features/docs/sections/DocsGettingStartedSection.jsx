import { Badge, Card, Grid, Section, Text, Title } from '@/components/ui'

export function DocsGettingStartedSection({ content }) {
    return (
        <Section spacing="md" surface className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <Grid cols={3} gap="md">
                {content.items.map((item) => (
                    <Card key={item.title} padding="md" className="stack-s docs-guideline-card">
                        <Title as="h3" size="sm">
                            {item.title}
                        </Title>
                        <Text tone="base">{item.description}</Text>
                    </Card>
                ))}
            </Grid>
        </Section>
    )
}
