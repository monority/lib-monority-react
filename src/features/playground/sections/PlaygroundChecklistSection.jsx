import { Card, Grid, Section, Text, Title } from '@/components/ui'

export function PlaygroundChecklistSection({ items }) {
    return (
        <Section surface className="stack-m">
            <Title as="h2" size="md">
                Pattern de feature conseille
            </Title>
            <Grid cols={2} gap="md">
                {items.map((item) => (
                    <Card key={item} padding="sm" className="stack-s">
                        <Text tone="strong" size="sm">
                            Bonne pratique
                        </Text>
                        <Text tone="base">{item}</Text>
                    </Card>
                ))}
            </Grid>
        </Section>
    )
}
