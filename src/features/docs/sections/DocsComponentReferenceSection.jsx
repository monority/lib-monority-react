import { Card, Divider, Section, Stack, Text, Title } from '@/components/ui'

function ReferenceCard({ item }) {
    return (
        <Card padding="md" className="stack-m">
            <div className="stack-s">
                <Title as="h3" size="sm">
                    {item.title}
                </Title>
                <Text tone="base">{item.usage}</Text>
            </div>
            <Stack gap="s">
                <Text tone="strong" size="sm">
                    Props utiles
                </Text>
                {item.props.map((prop) => (
                    <Text key={prop} tone="base" size="sm" className="docs-prop-row">
                        {prop}
                    </Text>
                ))}
            </Stack>
            <Divider label="Usage" />
            <Stack gap="s">
                <Text tone="base" size="sm">
                    <strong>Do:</strong> {item.doText}
                </Text>
                <Text tone="base" size="sm">
                    <strong>Don&apos;t:</strong> {item.dontText}
                </Text>
            </Stack>
        </Card>
    )
}

export function DocsComponentReferenceSection({ items }) {
    return (
        <Section id="reference" spacing="md" className="stack-m">
            <div className="stack-s">
                <Title as="h2" size="md">
                    Reference rapide
                </Title>
                <Text tone="base">
                    Une premiere documentation d usage pour les composants les plus structurants.
                </Text>
            </div>
            <div className="stack-m">
                {items.map((item) => (
                    <ReferenceCard key={item.title} item={item} />
                ))}
            </div>
        </Section>
    )
}
