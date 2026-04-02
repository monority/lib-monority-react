import { Badge, Section, Text, Title } from '@/components/ui'

export function DocsPatternsSection({ items }) {
    return (
        <Section id="patterns" spacing="md" surface className="stack-m">
            <div className="stack-s">
                <Title as="h2" size="md">
                    Patterns d API
                </Title>
                <Text tone="base">
                    Quelques regles simples pour garder une API homogène a travers les composants.
                </Text>
            </div>
            <div className="cluster">
                {items.map((item) => (
                    <Badge key={item} className="docs-chip">
                        {item}
                    </Badge>
                ))}
            </div>
        </Section>
    )
}
