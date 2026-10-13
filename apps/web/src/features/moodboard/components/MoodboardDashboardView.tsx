import {
    Badge,
    Button,
    Callout,
    Card,
    Checkbox,
    Grid,
    Input,
    PageHeader,
    Progress,
    Select,
    Stack,
    StatCard,
    Switch,
    Table,
    Text,
    Textarea,
    Title,
    Topbar,
    type Column,
} from '@monority/ui'
import { MoodboardTelemetryChart } from './MoodboardTelemetryChart'

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

const services: ServiceRow[] = [
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

export function MoodboardDashboardView() {
    return (
        <Stack gap="xl">
            {/* Topbar */}
            <Topbar>
                <Topbar.BrandMark>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                    </svg>
                </Topbar.BrandMark>
                <Topbar.Brand>Monority Control Plane</Topbar.Brand>
                <Topbar.Nav aria-label="Navigation application">
                    <Topbar.Link href="#overview" active>
                        Overview
                    </Topbar.Link>
                    <Topbar.Link href="#services">Services</Topbar.Link>
                    <Topbar.Link href="#deployments">Deployments</Topbar.Link>
                    <Topbar.Link href="#audit">Audit</Topbar.Link>
                </Topbar.Nav>
                <Topbar.Status tone="success">Operational</Topbar.Status>
                <Topbar.Actions>
                    <Button variant="ghost" size="sm">
                        Settings
                    </Button>
                </Topbar.Actions>
            </Topbar>

            {/* Page Header */}
            <PageHeader role="group" aria-label="Page header">
                <PageHeader.Kicker>INFRASTRUCTURE / CONTROL PLANE</PageHeader.Kicker>
                <PageHeader.Title as="h2">Release control</PageHeader.Title>
                <PageHeader.Description>
                    One system for shipping observable changes across every environment.
                </PageHeader.Description>
                <PageHeader.Actions>
                    <Button variant="primary" size="sm">
                        Deploy
                    </Button>
                    <Button variant="ghost" size="sm">
                        Inspect
                    </Button>
                </PageHeader.Actions>
            </PageHeader>

            {/* Executive KPIs */}
            <Grid columns={4}>
                <StatCard label="REQUESTS / MIN" value="14,820" description="+12.4% vs last hour" />
                <StatCard
                    label="SERVICE AVAILABILITY"
                    value="99.99%"
                    description="Error budget healthy"
                />
                <StatCard label="P95 LATENCY" value="18 ms" description="-3 ms vs baseline" />
                <StatCard label="HEALTHY NODES" value="98.4%" description="64 / 65 active pods" />
            </Grid>

            {/* High-resolution SVG Telemetry Chart */}
            <MoodboardTelemetryChart />

            {/* Main 2-column Operational Workspace */}
            <Grid columns={2}>
                {/* Services Table */}
                <Card padding="md">
                    <Card.Header>
                        <Title as="h3" size="sm">
                            SERVICE HEALTH
                        </Title>
                        <Text tone="muted" size="sm">
                            Distributed services cluster status and latencies
                        </Text>
                    </Card.Header>
                    <Card.Content>
                        <Table<ServiceRow>
                            columns={serviceColumns}
                            rows={services}
                            getRowId={(row) => row.id}
                        />
                    </Card.Content>
                </Card>

                {/* Operations & Pipeline Controls */}
                <Stack gap="md">
                    <Card padding="md">
                        <Card.Header>
                            <Title as="h3" size="sm">
                                Deployment Trigger
                            </Title>
                            <Text tone="muted" size="sm">
                                Configure target environment and rollout criteria
                            </Text>
                        </Card.Header>
                        <Card.Content>
                            <Stack gap="md">
                                <Grid columns={2}>
                                    <Input
                                        id="moodboard-workspace"
                                        label="Workspace"
                                        defaultValue="monority-prod"
                                        size="sm"
                                    />
                                    <Select
                                        id="moodboard-region"
                                        label="Region"
                                        defaultValue="eu-west-1"
                                        size="sm"
                                    >
                                        <option value="eu-west-1">EU West (Ireland)</option>
                                        <option value="us-east-1">US East (Virginia)</option>
                                        <option value="ap-south-1">AP South (Mumbai)</option>
                                    </Select>
                                </Grid>
                                <Textarea
                                    id="moodboard-notes"
                                    label="Release notes"
                                    defaultValue="Production rollout with calm tokens"
                                    rows={2}
                                    size="sm"
                                />
                                <Grid columns={2}>
                                    <Checkbox
                                        id="moodboard-signed"
                                        label="Signed builds only"
                                        defaultChecked
                                        size="sm"
                                    />
                                    <Switch
                                        id="moodboard-notifications"
                                        label="Notifications"
                                        defaultChecked
                                        size="sm"
                                    />
                                </Grid>
                            </Stack>
                        </Card.Content>
                    </Card>

                    <Card padding="md">
                        <Card.Header>
                            <Title as="h3" size="sm">
                                Release Pipeline
                            </Title>
                            <Text tone="muted" size="sm">
                                Automatic canary and verification progress
                            </Text>
                        </Card.Header>
                        <Card.Content>
                            <Stack gap="sm">
                                <Progress label="Migrations" value={100} showValue tone="success" />
                                <Progress label="Tests" value={100} showValue tone="success" />
                                <Progress
                                    label="Edge rollout"
                                    value={78}
                                    showValue
                                    tone="neutral"
                                />
                                <Callout tone="info" title="Canary analysis active">
                                    All edge proxies operating within error budget.
                                </Callout>
                            </Stack>
                        </Card.Content>
                    </Card>
                </Stack>
            </Grid>
        </Stack>
    )
}
