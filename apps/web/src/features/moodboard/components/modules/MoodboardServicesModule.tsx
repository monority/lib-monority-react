import { useState } from 'react'
import { Badge, Button, Card, Table, Text, Title, type Column } from '@monority/ui'

interface ServiceRow extends Record<string, unknown> {
    id: string
    name: string
    zone: string
    status: 'operational' | 'syncing' | 'degraded'
    latency: string
}

const serviceColumns: Column<ServiceRow>[] = [
    {
        key: 'name',
        label: 'Service',
        render: (_val, row) => (
            <span style={{ fontFamily: 'var(--mr-font-family-mono)', fontWeight: 600 }}>
                {row.name}
            </span>
        ),
    },
    {
        key: 'zone',
        label: 'Zone',
        render: (_val, row) => (
            <span style={{ color: 'var(--mr-text-secondary)', fontSize: '0.8125rem' }}>
                {row.zone}
            </span>
        ),
    },
    {
        key: 'status',
        label: 'Status',
        render: (_val, row) => (
            <Badge variant={row.status === 'operational' ? 'success' : 'warning'} size="sm">
                {row.status}
            </Badge>
        ),
    },
    {
        key: 'latency',
        label: 'Latency',
        render: (_val, row) => (
            <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.8125rem' }}>
                {row.latency}
            </span>
        ),
    },
]

const initialServices: ServiceRow[] = [
    {
        id: 'edge-router',
        name: 'edge-router',
        zone: 'eu-west-1a',
        status: 'operational',
        latency: '12 ms',
    },
    {
        id: 'auth-service',
        name: 'auth-service',
        zone: 'eu-west-1b',
        status: 'operational',
        latency: '18 ms',
    },
    {
        id: 'billing-worker',
        name: 'billing-worker',
        zone: 'eu-west-1c',
        status: 'syncing',
        latency: '45 ms',
    },
    {
        id: 'db-cluster',
        name: 'database-cluster',
        zone: 'eu-central-1',
        status: 'operational',
        latency: '8 ms',
    },
]

export function MoodboardServicesModule() {
    const [services, setServices] = useState<ServiceRow[]>(initialServices)
    const [isRebalancing, setIsRebalancing] = useState(false)

    const handleRebalance = () => {
        setIsRebalancing(true)
        setTimeout(() => {
            setServices((prev) =>
                prev.map((s) => ({
                    ...s,
                    status: 'operational',
                    latency: `${Math.floor(8 + Math.random() * 15)} ms`,
                }))
            )
            setIsRebalancing(false)
        }, 600)
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
                            SERVICE HEALTH
                        </Title>
                        <Text tone="muted" size="sm">
                            Distributed services cluster status and edge latencies
                        </Text>
                    </div>
                    <Badge variant="success" size="sm">
                        4 / 4 Active
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
                <Table<ServiceRow>
                    columns={serviceColumns}
                    rows={services}
                    getRowId={(row) => row.id}
                />

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
                    <Button
                        variant="secondary"
                        size="sm"
                        loading={isRebalancing}
                        onClick={handleRebalance}
                    >
                        Rebalance Cluster
                    </Button>
                    <Text tone="muted" size="sm" style={{ fontSize: '0.75rem' }}>
                        All EU proxies nominal
                    </Text>
                </div>
            </Card.Content>
        </Card>
    )
}
