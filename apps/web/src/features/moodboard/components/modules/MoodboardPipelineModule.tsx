import { useState } from 'react'
import { Badge, Button, Callout, Card, Progress, Stack, Text, Title } from '@monority/ui'

export function MoodboardPipelineModule() {
    const [rolloutPercent, setRolloutPercent] = useState(78)
    const [isAdvancing, setIsAdvancing] = useState(false)

    const handleAdvance = () => {
        setIsAdvancing(true)
        setTimeout(() => {
            setRolloutPercent((prev) => (prev >= 100 ? 50 : Math.min(100, prev + 11)))
            setIsAdvancing(false)
        }, 500)
    }

    return (
        <Card padding="md" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Card.Header>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <div>
                        <Title as="h3" size="sm">
                            Release Pipeline
                        </Title>
                        <Text tone="muted" size="sm">
                            Automatic canary and progressive verification progress
                        </Text>
                    </div>
                    <Badge variant="primary" size="sm">
                        Stage 3 / 4
                    </Badge>
                </div>
            </Card.Header>

            <Card.Content
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 'var(--mr-space-3)',
                }}
            >
                <Stack gap="sm">
                    <Progress label="Migrations" value={100} showValue tone="success" />
                    <Progress label="Tests" value={100} showValue tone="success" />
                    <Progress
                        label="Edge rollout"
                        value={rolloutPercent}
                        showValue
                        tone={rolloutPercent === 100 ? 'success' : 'accent'}
                    />

                    <Callout tone="info" title="Canary analysis active">
                        All edge proxies operating within baseline error budget.
                    </Callout>
                </Stack>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'var(--mr-space-2)',
                        paddingTop: 'var(--mr-space-2)',
                        borderTop: '1px solid var(--mr-border-subtle)',
                    }}
                >
                    <div style={{ display: 'flex', gap: 'var(--mr-space-2)' }}>
                        <Button
                            variant="primary"
                            size="sm"
                            loading={isAdvancing}
                            onClick={handleAdvance}
                        >
                            {rolloutPercent >= 100 ? 'Restart Cycle' : 'Advance Traffic'}
                        </Button>
                        <Button variant="ghost" size="sm">
                            Canary Metrics
                        </Button>
                    </div>
                    <Text tone="muted" size="sm" style={{ fontSize: '0.75rem' }}>
                        {rolloutPercent}% routed to v2.4.1
                    </Text>
                </div>
            </Card.Content>
        </Card>
    )
}
