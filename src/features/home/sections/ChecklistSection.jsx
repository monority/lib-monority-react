import { Badge, Card, Grid, Section, Text, Title } from '@/components/ui'

function getStatusClassName(status) {
    return status === 'Ready'
        ? 'home-checklist-card__status--ready'
        : 'home-checklist-card__status--pending'
}

function ChecklistCard({ item }) {
    return (
        <Card padding="md" className="stack-m home-checklist-card">
            <div className="cluster between">
                <Title as="h3" size="sm">
                    {item.title}
                </Title>
                <Badge className={getStatusClassName(item.status)}>{item.status}</Badge>
            </div>
            <Text tone="base">{item.description}</Text>
        </Card>
    )
}

export function ChecklistSection({ content }) {
    return (
        <Section id="checklist" spacing="md" className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <Grid cols={2} gap="md" className="token-grid">
                {content.items.map((item) => (
                    <ChecklistCard key={item.title} item={item} />
                ))}
            </Grid>
        </Section>
    )
}
