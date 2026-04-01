import { Card, Grid, Text, Title } from '@/components/ui'

export function FeaturesSection({ items }) {
    return (
        <Grid cols={3} gap="md" id="features" className="feature-grid">
            {items.map((item) => (
                <Card key={item.title} className="feature-card stack-s" interactive padding="lg">
                    <Title as="h2" size="sm">
                        {item.title}
                    </Title>
                    <Text tone="base">{item.description}</Text>
                </Card>
            ))}
        </Grid>
    )
}
