import {
    Callout,
    Card,
    Grid,
    MetricGrid,
    Section,
    Stack,
    StatCard,
    Text,
    Title,
} from '@monority/ui'

export function HomeShowcaseGrid() {
    return (
        <Section aria-labelledby="home-showcase-title" spacing="lg">
            <Stack gap="xs" style={{ marginBottom: 'var(--mr-space-5)' }}>
                <Title id="home-showcase-title" size="lg">
                    Component Ecosystem
                </Title>
                <Text tone="muted" size="md">
                    From high-density operational telemetry dashboards to calm, accessible
                    configuration forms.
                </Text>
            </Stack>

            <Grid columns={2}>
                <Card padding="md">
                    <Card.Header>
                        <Card.Title>Live Telemetry</Card.Title>
                        <Card.Description>
                            MetricGrid and StatCard primitives in action
                        </Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <MetricGrid
                            items={[
                                {
                                    key: 'uptime',
                                    label: 'UPTIME (30D)',
                                    value: '99.99%',
                                    trend: '+0.02%',
                                    trendTone: 'success',
                                },
                                {
                                    key: 'latency',
                                    label: 'P99 LATENCY',
                                    value: '18 ms',
                                    trend: '-4 ms',
                                    trendTone: 'success',
                                },
                            ]}
                        />
                    </Card.Content>
                </Card>

                <Card padding="md">
                    <Card.Header>
                        <Card.Title>Feedback & Notices</Card.Title>
                        <Card.Description>Callout and status feedback</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="sm">
                            <Callout tone="success" title="All systems operational">
                                84 components tested and passing across the verification matrix.
                            </Callout>
                            <StatCard
                                label="PRODUCTION BUNDLE"
                                value="Tree-shakable"
                                description="Modular entrypoints and zero unnecessary side-effects."
                            />
                        </Stack>
                    </Card.Content>
                </Card>
            </Grid>
        </Section>
    )
}
