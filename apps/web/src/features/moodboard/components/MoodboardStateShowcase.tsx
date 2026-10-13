import { Callout, Card, Grid, Progress, Stack, StatCard, Text } from '@monority/ui'

export function MoodboardStateShowcase() {
    return (
        <Card padding="md">
            <Card.Header>
                <Text size="sm" tone="muted">
                    DATA STATES
                </Text>
            </Card.Header>
            <Card.Content>
                <Stack gap="md">
                    <Grid columns={2}>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <StatCard
                                label="LOADING"
                                value="—"
                                description="Waiting for the next release"
                            />
                        </div>
                        <Callout tone="info" title="No incidents">
                            All regions are inside the error budget.
                        </Callout>
                        <Callout tone="warning" title="Review required">
                            One deploy is waiting for approval.
                        </Callout>
                    </Grid>

                    <Text size="sm" tone="muted">
                        PROGRESS
                    </Text>
                    <Stack gap="sm">
                        <Progress label="Deploy" value={72} showValue tone="neutral" />
                        <Progress label="Migrations" value={45} showValue tone="warning" />
                        <Progress label="Tests" value={98} showValue tone="success" />
                    </Stack>
                </Stack>
            </Card.Content>
        </Card>
    )
}
