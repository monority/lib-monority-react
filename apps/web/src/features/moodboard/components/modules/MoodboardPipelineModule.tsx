import { useState } from 'react'
import { Badge, Button, Callout, Card, Progress, Stack, Text, Toolbar } from '@monority/ui'

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
                <div>
                    <Card.Title>Release Pipeline</Card.Title>
                    <Card.Description>
                        Automatic canary and progressive verification progress
                    </Card.Description>
                </div>
                <Badge variant="primary" size="sm">
                    Stage 3 / 4
                </Badge>
            </Card.Header>

            <Card.Content
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 'var(--mr-space-4)',
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
            </Card.Content>

            <Card.Footer>
                <Toolbar>
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
                </Toolbar>
                <Text tone="muted" size="sm">
                    {rolloutPercent}% routed to v2.4.1
                </Text>
            </Card.Footer>
        </Card>
    )
}
