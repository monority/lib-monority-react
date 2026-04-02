import { Badge, Card, DataList, Section, Table, Text, Title } from '@/components/ui'

function AdminStatusBadge({ status }) {
    const className =
        status === 'Active'
            ? 'admin-status admin-status--active'
            : status === 'Pending'
              ? 'admin-status admin-status--pending'
              : 'admin-status admin-status--suspended'

    return <span className={className}>{status}</span>
}

export function AdminOverviewSection({ columns, rows, sidebarData }) {
    const enhancedColumns = columns.map((column) =>
        column.key === 'status'
            ? {
                  ...column,
                  render: (value) => <AdminStatusBadge status={value} />,
              }
            : column,
    )

    return (
        <Section spacing="md" className="stack-m">
            <div className="dashboard-grid">
                <Card padding="md" className="stack-m dashboard-grid__main">
                    <div className="stack-s">
                        <Title as="h2" size="sm">
                            Membres recents
                        </Title>
                        <Text tone="base" size="sm">
                            Exemple de page admin composee avec `PageHeader`, `Toolbar`,
                            `FilterBar` et `Table`.
                        </Text>
                    </div>
                    <Table columns={enhancedColumns} rows={rows} />
                </Card>

                <div className="stack-m dashboard-grid__side">
                    <Card padding="md" className="stack-m">
                        <Title as="h2" size="sm">
                            Repartition rapide
                        </Title>
                        <DataList items={sidebarData.summary} columns="split" />
                    </Card>

                    <Card padding="md" className="stack-m">
                        <Title as="h2" size="sm">
                            Controles a faire
                        </Title>
                        <div className="stack-s">
                            {sidebarData.actions.map((item) => (
                                <div key={item} className="dashboard-task">
                                    <span className="dashboard-task__dot" aria-hidden="true" />
                                    <Text tone="base" size="sm">
                                        {item}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Section>
    )
}
