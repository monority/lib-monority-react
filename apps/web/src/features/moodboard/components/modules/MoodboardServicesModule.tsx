import { Badge, Button, Card, type Column, Table, Text } from '@monority/ui'
import { useState } from 'react'

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
                <div>
                    <Card.Title>SERVICE HEALTH</Card.Title>
                    <Card.Description>
                        Distributed services cluster status and edge latencies
                    </Card.Description>
                </div>
                <Badge variant="success" size="sm">
                    4 / 4 Active
                </Badge>
            </Card.Header>

            <Card.Content style={{ flex: 1 }}>
                <Table<ServiceRow>
                    columns={serviceColumns}
                    rows={services}
                    getRowId={(row) => row.id}
                    aria-label="État des services du cluster"
                />
            </Card.Content>

            <Card.Footer>
                <Button
                    variant="secondary"
                    size="sm"
                    loading={isRebalancing}
                    onClick={handleRebalance}
                >
                    Rebalance Cluster
                </Button>
                <Text tone="muted" size="sm">
                    All EU proxies nominal
                </Text>
            </Card.Footer>
        </Card>
    )
}
