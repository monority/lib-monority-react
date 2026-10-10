import { Callout, Card, Grid, MetricGrid, StatCard } from '@monority/ui'

export function HomeShowcaseGrid() {
    return (
        <section aria-labelledby="home-showcase-title">
            <h2 id="home-showcase-title" className="home-section-title">
                Component Ecosystem
            </h2>
            <p className="home-section-desc">
                From high-density operational telemetry dashboards to calm, accessible configuration
                forms.
            </p>

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
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--mr-space-3)',
                            }}
                        >
                            <Callout tone="success" title="All systems operational">
                                75 components tested and passing across the verification matrix.
                            </Callout>
                            <StatCard
                                label="PRODUCTION BUNDLE"
                                value="Tree-shakable"
                                description="Modular entrypoints and zero unnecessary side-effects."
                            />
                        </div>
                    </Card.Content>
                </Card>
            </Grid>
        </section>
    )
}
