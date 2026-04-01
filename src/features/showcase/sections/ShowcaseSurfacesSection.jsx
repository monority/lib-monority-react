import { Badge, Card, Divider, EmptyState, Grid, Section, Stack, Text, Title } from '@/components/ui'

export function ShowcaseSurfacesSection() {
    return (
        <Section id="surfaces" surface className="stack-m">
            <div className="stack-s">
                <Text className="eyebrow" tone="strong">
                    Surfaces
                </Text>
                <Title as="h2" size="md">
                    Cards, etats et separateurs
                </Title>
                <Text tone="base">
                    Les surfaces donnent de la structure sans surcharger visuellement l'interface.
                </Text>
            </div>

            <Grid cols={2} gap="md">
                <Card padding="lg" className="stack-s" interactive>
                    <Badge>Card</Badge>
                    <Title as="h3" size="sm">
                        Surface interactive
                    </Title>
                    <Text tone="base">
                        Exemple de bloc reutilisable pour dashboard, settings ou landing.
                    </Text>
                    <Divider label="Meta" />
                    <Text tone="muted" size="sm">
                        Bordures, ombres et espacements restent coherents avec le systeme.
                    </Text>
                </Card>
                <EmptyState
                    title="Aucun contenu"
                    description="Les etats vides doivent etre elegants et faciles a integrer partout."
                />
            </Grid>
        </Section>
    )
}
