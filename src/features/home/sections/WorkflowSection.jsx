import { Badge, Card, Grid, Section, Text, Title } from '@/components/ui'

function WorkflowCard({ item }) {
    return (
        <Card padding="md" className="stack-s home-workflow-card">
            <Title as="h3" size="sm">
                {item.title}
            </Title>
            <Text tone="base">{item.description}</Text>
        </Card>
    )
}

export function WorkflowSection({ content }) {
    return (
        <Section id="workflow" spacing="md" className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <Grid cols={3} gap="md" className="feature-grid">
                {content.steps.map((item) => (
                    <WorkflowCard key={item.title} item={item} />
                ))}
            </Grid>
        </Section>
    )
}
