import {
    Card,
    DataList,
    Grid,
    InlineAlert,
    MetricGrid,
    Section,
    Table,
    Text,
    Title,
} from '@/components/ui'

export function DashboardOverviewSection({
    metrics,
    alert,
    tableColumns,
    tableRows,
    sidebarData,
}) {
    return (
        <Section spacing="md" className="stack-m">
            <MetricGrid items={metrics} />
            <InlineAlert
                tone="success"
                title={alert.title}
                description={alert.description}
                actionLabel={alert.actionLabel}
            />
            <Grid cols={3} gap="md" className="dashboard-grid">
                <Card padding="md" className="stack-m dashboard-grid__main">
                    <div className="stack-s">
                        <Title as="h2" size="sm">
                            Revenus recents
                        </Title>
                        <Text tone="base" size="sm">
                            Exemple de liste admin compacte branchee sur les primitives de table du starter.
                        </Text>
                    </div>
                    <Table columns={tableColumns} rows={tableRows} />
                </Card>

                <div className="stack-m dashboard-grid__side">
                    <Card padding="md" className="stack-m">
                        <Title as="h2" size="sm">
                            Points clefs
                        </Title>
                        <DataList items={sidebarData.highlights} columns="split" />
                    </Card>

                    <Card padding="md" className="stack-m">
                        <Title as="h2" size="sm">
                            Prochaines actions
                        </Title>
                        <div className="stack-s">
                            {sidebarData.tasks.map((task) => (
                                <div key={task} className="dashboard-task">
                                    <span className="dashboard-task__dot" aria-hidden="true" />
                                    <Text tone="base" size="sm">
                                        {task}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </Grid>
        </Section>
    )
}
