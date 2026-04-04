import { Badge, Grid, Section, Text, Title } from '@/components/ui'

function ReadinessList({ title, items }) {
    return (
        <div className="roadmap-panel stack-m">
            <Title as="h3" size="sm">
                {title}
            </Title>
            <div className="stack-s">
                {items.map((item, index) => (
                    <div key={item} className="roadmap-item">
                        <Badge className="roadmap-item__badge">{index + 1}</Badge>
                        <Text tone="base">{item}</Text>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function ProductionReadinessSection({ content }) {
    return (
        <Section id="production-readiness" spacing="md" surface className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <Grid cols={2} gap="md" className="token-grid">
                <ReadinessList title="Deja pret" items={content.readyItems} />
                <ReadinessList title="A brancher avant prod" items={content.remainingItems} />
            </Grid>
        </Section>
    )
}
