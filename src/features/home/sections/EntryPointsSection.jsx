import { Link } from 'react-router-dom'
import { Badge, Button, Card, Grid, Section, Text, Title } from '@/components/ui'

function EntryPointCard({ item }) {
    return (
        <Card padding="md" className="stack-m home-entry-card">
            <div className="stack-s">
                <Title as="h3" size="sm">
                    {item.title}
                </Title>
                <Text tone="base">{item.description}</Text>
            </div>
            <div>
                <Button as={Link} to={item.destination} size="sm" variant="ghost">
                    {item.actionLabel}
                </Button>
            </div>
        </Card>
    )
}

export function EntryPointsSection({ content }) {
    return (
        <Section id="entry-points" spacing="md" surface className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <Grid cols={2} gap="md" className="token-grid">
                {content.items.map((item) => (
                    <EntryPointCard key={item.title} item={item} />
                ))}
            </Grid>
        </Section>
    )
}
