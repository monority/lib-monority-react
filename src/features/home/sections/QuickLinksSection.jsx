import { Link } from 'react-router-dom'
import { Badge, Button, Card, Grid, Section, Text, Title } from '@/components/ui'

function QuickLinkCard({ item }) {
    return (
        <Card padding="md" className="stack-m home-quick-link-card" interactive>
            <div className="stack-s">
                <Title as="h3" size="sm">
                    {item.title}
                </Title>
                <Text tone="base">{item.description}</Text>
            </div>
            <div>
                <Button as={Link} to={item.to} size="sm" variant="ghost">
                    {item.actionLabel}
                </Button>
            </div>
        </Card>
    )
}

export function QuickLinksSection({ content }) {
    return (
        <Section id="explore" spacing="md" className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <Grid cols={3} gap="md" className="feature-grid">
                {content.items.map((item) => (
                    <QuickLinkCard key={item.title} item={item} />
                ))}
            </Grid>
        </Section>
    )
}
