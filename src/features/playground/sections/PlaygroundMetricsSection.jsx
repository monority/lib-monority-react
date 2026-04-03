import { AsyncStateNotice, Card, Grid, Section, Skeleton, Text, Title } from '@/components/ui'

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
                loadingContent={<PlaygroundMetricsSkeleton />}
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

function PlaygroundMetricsSkeleton() {
    return (
        <Grid cols={3} gap="md" aria-hidden="true">
            {Array.from({ length: 3 }, (_, index) => (
                <Card key={`playground-skeleton-${index}`} padding="sm" className="stack-s">
                    <Skeleton style={{ width: '8rem', height: '1rem' }} />
                    <Skeleton style={{ width: '6rem', height: '1.75rem' }} />
                    <Skeleton style={{ width: '100%', height: '1rem' }} />
                    <Skeleton style={{ width: '80%', height: '1rem' }} />
                </Card>
            ))}
        </Grid>
    )
}
