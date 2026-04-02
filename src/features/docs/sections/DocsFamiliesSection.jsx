import { Badge, Card, Grid, Section, Stack, Text, Title } from '@/components/ui'

function FamilyCard({ item }) {
    return (
        <Card padding="md" className="stack-m docs-family-card">
            <div className="stack-s">
                <Title as="h3" size="sm">
                    {item.title}
                </Title>
                <Text tone="base">{item.description}</Text>
            </div>
            <div className="cluster docs-family-card__chips">
                {item.components.map((component) => (
                    <Badge key={component} variant="subtle" className="docs-chip">
                        {component}
                    </Badge>
                ))}
            </div>
            <Stack gap="s">
                <Text tone="strong" size="sm">
                    Recommendation
                </Text>
                <Text tone="base" size="sm">
                    {item.recommendation}
                </Text>
            </Stack>
        </Card>
    )
}

export function DocsFamiliesSection({ items }) {
    return (
        <Section id="families" spacing="md" className="stack-m">
            <div className="stack-s">
                <Title as="h2" size="md">
                    Composants par famille
                </Title>
                <Text tone="base">
                    Une lecture plus pratique pour choisir rapidement le bon composant selon l intention du produit.
                </Text>
            </div>
            <Grid cols={2} gap="md">
                {items.map((item) => (
                    <FamilyCard key={item.title} item={item} />
                ))}
            </Grid>
        </Section>
    )
}
