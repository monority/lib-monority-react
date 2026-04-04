import { Badge, Card, Grid, Section, Text, Title } from '@/components/ui'

function ReleaseNoteCard({ item }) {
    return (
        <Card padding="md" className="stack-s home-release-card">
            <div className="cluster between">
                <Title as="h3" size="sm">
                    {item.title}
                </Title>
                <Badge>{item.version}</Badge>
            </div>
            <Text tone="base">{item.summary}</Text>
        </Card>
    )
}

export function ReleaseNotesSection({ content }) {
    return (
        <Section id="proof-notes" spacing="md" className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <Grid cols={3} gap="md" className="feature-grid">
                {content.items.map((item) => (
                    <ReleaseNoteCard key={item.version} item={item} />
                ))}
            </Grid>
        </Section>
    )
}
