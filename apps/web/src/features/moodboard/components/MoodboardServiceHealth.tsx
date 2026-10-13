import { Badge } from '@monority/ui/badge'
import { Card } from '@monority/ui/card'
import { Table, type Column } from '@monority/ui/table'

export interface MoodboardServiceHealthProps {
    selectedRow: string
    onSelectRow: (service: string) => void
}

const tableColumns: Column[] = [
    { key: 'service', label: 'Service' },
    { key: 'region', label: 'Region' },
    { key: 'status', label: 'Status' },
    { key: 'latency', label: 'Latency', className: 'moodboard-table__number' },
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
        <Card className="moodboard-card" padding="md">
            <Card.Header className="moodboard-card__topline">
                <span className="moodboard-kicker">SERVICE HEALTH</span>
                <span className="moodboard-mono">{tableRows.length} NODES</span>
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
                                            className="moodboard-row-button"
                                            type="button"
                                            onClick={() => onSelectRow(String(value))}
                                            aria-pressed={selectedRow === String(value)}
                                        >
                                            {String(value)}
                                            {String(value) === selectedRow ? ' ·' : ''}
                                        </button>
                                    ),
                                }
                              : column
                    )}
                    rows={tableRows}
                    tableClassName="moodboard-table"
                />
            </Card.Content>
        </Card>
    )
}
