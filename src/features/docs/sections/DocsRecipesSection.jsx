import { Badge, Card, Grid, Section, Text, Title } from '@/components/ui'

function RecipeCard({ item }) {
    return (
        <Card padding="md" className="stack-m docs-recipe-card">
            <div className="stack-s">
                <Title as="h3" size="sm">
                    {item.title}
                </Title>
                <Text tone="base" size="sm">
                    {item.why}
                </Text>
            </div>
            <div className="cluster docs-recipe-card__chips">
                {item.composition.map((component) => (
                    <Badge key={component} variant="subtle" className="docs-chip">
                        {component}
                    </Badge>
                ))}
            </div>
        </Card>
    )
}

export function DocsRecipesSection({ items }) {
    return (
        <Section id="recipes" spacing="md" className="stack-m">
            <div className="stack-s">
                <Title as="h2" size="md">
                    Recettes d assemblage
                </Title>
                <Text tone="base">
                    Quelques compositions types pour accelerer le demarrage d une page sans repartir de zero.
                </Text>
            </div>
            <Grid cols={3} gap="md">
                {items.map((item) => (
                    <RecipeCard key={item.title} item={item} />
                ))}
            </Grid>
        </Section>
    )
}
