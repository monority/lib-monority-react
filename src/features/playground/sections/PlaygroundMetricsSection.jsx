import { AsyncStateNotice, Card, Grid, Section, Text, Title } from '@/components/ui'

export function PlaygroundMetricsSection({ metrics, isLoading, isError, errorMessage }) {
    return (
        <Section surface className="stack-m">
            <Title as="h2" size="md">
                Exemple de data flow
            </Title>
            <Text tone="base">
                Cette section montre comment une feature peut charger des donnees sans melanger la
                logique reseau, l&apos;etat async et le rendu.
            </Text>

            <AsyncStateNotice
                isLoading={isLoading}
                isError={isError}
                loadingMessage="Chargement des metriques de demonstration..."
                errorMessage={errorMessage}
            />

            {metrics?.length ? (
                <Grid cols={3} gap="md">
                    {metrics.map((metric) => (
                        <Card key={metric.id} padding="sm" className="stack-s">
                            <Text tone="strong" size="sm">
                                {metric.label}
                            </Text>
                            <Title as="h3" size="sm">
                                {metric.value}
                            </Title>
                            <Text tone="base">{metric.detail}</Text>
                        </Card>
                    ))}
                </Grid>
            ) : null}
        </Section>
    )
}
