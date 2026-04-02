import { Card, Grid, Section, Text, Title } from '@/components/ui'

export function DocsPrinciplesSection({ items }) {
    return (
        <Section id="principles" spacing="md" className="stack-m">
            <div className="stack-s">
                <Title as="h2" size="md">
                    Principes
                </Title>
                <Text tone="base">
                    Les conventions qui rendent la librairie plus facile a maintenir et a etendre.
                </Text>
            </div>
            <Grid cols={3} gap="md">
                {items.map((item) => (
                    <Card key={item.title} padding="md" className="stack-s">
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
