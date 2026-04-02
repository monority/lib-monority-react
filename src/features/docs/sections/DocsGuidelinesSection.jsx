import { Card, Grid, Section, Text, Title } from '@/components/ui'

function GuidelineCard({ item }) {
    return (
        <Card padding="md" className="stack-m docs-guideline-card">
            <Title as="h3" size="sm">
                {item.title}
            </Title>
            <div className="stack-s">
                <Text tone="base" size="sm">
                    <strong>Do:</strong> {item.doText}
                </Text>
                <Text tone="base" size="sm">
                    <strong>Don&apos;t:</strong> {item.dontText}
                </Text>
            </div>
        </Card>
    )
}

export function DocsGuidelinesSection({ items }) {
    return (
        <Section id="guidelines" spacing="md" surface className="stack-m">
            <div className="stack-s">
                <Title as="h2" size="md">
                    Do / Don&apos;t par pattern
                </Title>
                <Text tone="base">
                    Des regles simples pour garder des interfaces nettes, hierarchisees et faciles a faire evoluer.
                </Text>
            </div>
            <Grid cols={2} gap="md">
                {items.map((item) => (
                    <GuidelineCard key={item.title} item={item} />
                ))}
            </Grid>
        </Section>
    )
}
