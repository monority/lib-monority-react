import { useState } from 'react'
import { Badge, Button, Card, Progress, Rating, Slider, Stack, Text, Title } from '@monority/ui'

export function MoodboardQuotasModule() {
    const [cpuThreshold, setCpuThreshold] = useState(68)
    const [stabilityScore, setStabilityScore] = useState(4)

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
                            Resource Quotas & Capacity
                        </Title>
                        <Text tone="muted" size="sm">
                            Current monthly infrastructure consumption and scaling limits
                        </Text>
                    </div>
                    <Badge variant="primary" size="sm">
                        Enterprise Tier
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
                    <Slider
                        label="CPU Throttling Threshold"
                        value={cpuThreshold}
                        onChange={(e) => setCpuThreshold(Number(e.target.value))}
                        showValue
                        size="sm"
                    />

                    <Progress
                        label="Bandwidth Allocation (7.8 / 10 TB)"
                        value={78}
                        showValue
                        tone="neutral"
                    />

                    <Progress label="Worker Memory Headroom" value={82} showValue tone="warning" />

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 'var(--mr-space-1) 0',
                        }}
                    >
                        <div>
                            <Text size="sm" style={{ fontWeight: 600, display: 'block' }}>
                                Cluster SLA Stability
                            </Text>
                            <Text
                                tone="muted"
                                size="sm"
                                style={{ fontSize: '0.75rem', display: 'block' }}
                            >
                                99.98% evaluated over 90 days
                            </Text>
                        </div>
                        <Rating
                            value={stabilityScore}
                            onChange={setStabilityScore}
                            size="sm"
                            name="sla-stability"
                        />
                    </div>
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
                        <Button variant="secondary" size="sm">
                            Upgrade Quota
                        </Button>
                        <Button variant="ghost" size="sm">
                            Invoices
                        </Button>
                    </div>
                    <Text tone="muted" size="sm" style={{ fontSize: '0.75rem' }}>
                        Burst quota active
                    </Text>
                </div>
            </Card.Content>
        </Card>
    )
}
