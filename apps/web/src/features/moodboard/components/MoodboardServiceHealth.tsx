import { Badge, Card, Stack, Table, Text, type Column } from '@monority/ui'

export interface MoodboardServiceHealthProps {
    selectedRow: string
    onSelectRow: (service: string) => void
}

const tableColumns: Column[] = [
    { key: 'service', label: 'Service' },
    { key: 'region', label: 'Region' },
    { key: 'status', label: 'Status' },
    { key: 'latency', label: 'Latency' },
]

const tableRows = [
    { service: 'edge-router', region: 'eu-west-1', status: 'Operational', latency: '42 ms' },
    { service: 'asset-cache', region: 'us-east-1', status: 'Degraded', latency: '118 ms' },
    { service: 'telemetry', region: 'ap-south-1', status: 'Operational', latency: '67 ms' },
    { service: 'audit-stream', region: 'eu-west-1', status: 'Delayed', latency: '204 ms' },
]

const badgeForStatus = (status: string) => {
    if (status === 'Operational') return <Badge variant="success">Operational</Badge>
    if (status === 'Degraded') return <Badge variant="warning">Degraded</Badge>
    return <Badge variant="danger">Delayed</Badge>
}

export function MoodboardServiceHealth({ selectedRow, onSelectRow }: MoodboardServiceHealthProps) {
    return (
        <Card padding="md">
            <Card.Header>
                <Stack direction="horizontal" justify="between" align="center">
                    <Text size="sm" tone="muted">
                        SERVICE HEALTH
                    </Text>
                    <Text size="sm" tone="muted">
                        {tableRows.length} NODES
                    </Text>
                </Stack>
            </Card.Header>
            <Card.Content>
                <Table
                    columns={tableColumns.map((column) =>
                        column.key === 'status'
                            ? {
                                  ...column,
                                  render: (value) => badgeForStatus(String(value)),
                              }
                            : column.key === 'service'
                              ? {
                                    ...column,
                                    render: (value) => (
                                        <button
                                            type="button"
                                            onClick={() => onSelectRow(String(value))}
                                            aria-pressed={selectedRow === String(value)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                padding: 0,
                                                font: 'inherit',
                                                color:
                                                    selectedRow === String(value)
                                                        ? 'var(--mr-text-primary)'
                                                        : 'var(--mr-accent)',
                                                cursor: 'pointer',
                                                textDecoration:
                                                    selectedRow === String(value)
                                                        ? 'underline'
                                                        : 'none',
                                                textUnderlineOffset: 'var(--mr-space-1)',
                                            }}
                                        >
                                            {String(value)}
                                            {String(value) === selectedRow ? ' ·' : ''}
                                        </button>
                                    ),
                                }
                              : column
                    )}
                    rows={tableRows}
                />
            </Card.Content>
        </Card>
    )
}
