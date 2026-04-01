import { Card, Grid, Section, Stack, Text, Title } from '@/components/ui'

export function ShowcaseTypographySection() {
    return (
        <Section id="typography" surface className="stack-m">
            <div className="stack-s">
                <Text className="eyebrow" tone="strong">
                    Typography
                </Text>
                <Title as="h2" size="md">
                    Titres et texte
                </Title>
                <Text tone="base">
                    Le systeme typographique doit rester lisible, calme et coherent entre landing,
                    dashboards et ecrans produit.
                </Text>
            </div>

            <Grid cols={2} gap="md">
                <Card padding="md" className="stack-s">
                    <Title as="h3" size="display">
                        Display
                    </Title>
                    <Title as="h3" size="lg">
                        Large heading
                    </Title>
                    <Title as="h3" size="md">
                        Section heading
                    </Title>
                    <Title as="h3" size="sm">
                        Small heading
                    </Title>
                </Card>
                <Card padding="md" className="stack-s">
                    <Text tone="strong" size="lg">
                        Texte fort
                    </Text>
                    <Text tone="base">
                        Texte courant pour les explications et descriptions de composants.
                    </Text>
                    <Text tone="muted" size="sm">
                        Texte secondaire, aides contextuelles et meta-informations.
                    </Text>
                </Card>
            </Grid>
        </Section>
    )
}
