import {
    Badge,
    Button,
    Callout,
    Card,
    Checkbox,
    Input,
    MetricGrid,
    PageHeader,
    Progress,
    Select,
    StatCard,
    Switch,
    Table,
    Tabs,
    Textarea,
    Topbar,
    type Column,
} from '@monority/ui'
import { MiniBarChart, type ChartDayItem } from './components/MiniBarChart'
import { TokenSwatchMatrix } from './components/TokenSwatchMatrix'
import { SegmentedControl } from '@monority/ui/segmented-control'
import { Stepper } from '@monority/ui/stepper'
import { Rating } from '@monority/ui/rating'
import { BadgeDelta } from '@monority/ui/badge-delta'

export interface PanelState {
    tab: string
    workspace: string
    region: string
    checked: boolean
    notifications: boolean
    selectedRow: string
}

interface MoodboardPreviewProps {
    state: PanelState
    onState: (next: Partial<PanelState>) => void
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

const tabItems = [
    { value: 'overview', label: 'Overview' },
    { value: 'activity', label: 'Activity' },
    { value: 'settings', label: 'Settings' },
]

const chartData: ChartDayItem[] = [
    { label: 'Mon', values: [65, 45, 30] },
    { label: 'Tue', values: [50, 60, 25] },
    { label: 'Wed', values: [75, 35, 40] },
    { label: 'Thu', values: [40, 55, 35] },
    { label: 'Fri', values: [60, 50, 45] },
    { label: 'Sat', values: [30, 25, 20] },
    { label: 'Sun', values: [20, 15, 15] },
]

const badgeForStatus = (status: string) => {
    if (status === 'Operational') return <Badge variant="success">Operational</Badge>
    if (status === 'Degraded') return <Badge variant="warning">Degraded</Badge>
    return <Badge variant="danger">Delayed</Badge>
}

export function MoodboardPreview({ state, onState }: MoodboardPreviewProps) {
    return (
        <div className="moodboard-preview" data-testid="moodboard-preview">
            {/* Product topbar */}
            <Topbar className="moodboard-topbar" role="group" aria-label="Product navigation">
                <div className="moodboard-brand-lockup">
                    <span className="moodboard-brand-mark" aria-hidden="true">
                        M
                    </span>
                    <span>MONORITY</span>
                </div>
                <nav className="moodboard-compact-nav" aria-label="Compact navigation">
                    <a className="is-active" href="#overview">
                        Overview
                    </a>
                    <a href="#activity">Activity</a>
                    <a href="#settings">Settings</a>
                </nav>
                <div className="moodboard-status">
                    <span className="moodboard-status-dot" aria-hidden="true" />
                    All systems nominal
                </div>
            </Topbar>

            <div className="moodboard-preview__body">
                {/* Page header */}
                <PageHeader className="moodboard-page-header" role="group" aria-label="Page header">
                    <span className="moodboard-kicker">INFRASTRUCTURE / CONTROL PLANE</span>
                    <h2>Release control</h2>
                    <p>One system for shipping observable changes across every environment.</p>
                    <div className="moodboard-actions">
                        <Button variant="primary" size="sm">
                            Deploy
                        </Button>
                        <Button variant="ghost" size="sm">
                            Inspect
                        </Button>
                    </div>
                </PageHeader>

                {/* Metrics */}
                <MetricGrid
                    className="moodboard-metrics"
                    items={[
                        {
                            key: 'requests',
                            label: 'REQUESTS / MIN',
                            value: '98.4%',
                            trend: '+4.8%',
                            trendTone: 'success',
                        },
                        {
                            key: 'latency',
                            label: 'P95 LATENCY',
                            value: '84 ms',
                            trend: '-12 ms',
                            trendTone: 'success',
                        },
                        {
                            key: 'errors',
                            label: 'ERROR RATE',
                            value: '0.02%',
                            trend: '-0.01%',
                            trendTone: 'success',
                        },
                    ]}
                />

                {/* Main content grid */}
                <div className="moodboard-preview__grid">
                    {/* Chart visualization */}
                    <Card className="moodboard-card" padding="md">
                        <div className="moodboard-card__topline">
                            <span className="moodboard-kicker">THROUGHPUT</span>
                            <span className="moodboard-mono">7-DAY TREND</span>
                        </div>
                        <MiniBarChart data={chartData} />
                    </Card>

                    {/* Service health */}
                    <Card className="moodboard-card" padding="md">
                        <div className="moodboard-card__topline">
                            <span className="moodboard-kicker">SERVICE HEALTH</span>
                            <span className="moodboard-mono">{tableRows.length} NODES</span>
                        </div>
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
                                                    onClick={() =>
                                                        onState({ selectedRow: String(value) })
                                                    }
                                                    aria-pressed={
                                                        state.selectedRow === String(value)
                                                    }
                                                >
                                                    {String(value)}
                                                    {String(value) === state.selectedRow
                                                        ? ' ·'
                                                        : ''}
                                                </button>
                                            ),
                                        }
                                      : column
                            )}
                            rows={tableRows}
                            tableClassName="moodboard-table"
                        />
                    </Card>
                </div>

                {/* Form controls */}
                <Card className="moodboard-card" padding="md">
                    <div className="moodboard-card__topline">
                        <div>
                            <span className="moodboard-kicker">CONTROL SURFACE</span>
                            <h3>Component language</h3>
                        </div>
                        <Tabs
                            size="sm"
                            value={state.tab}
                            onChange={(value) => onState({ tab: value })}
                            items={tabItems}
                            aria-label="Preview sections"
                        />
                    </div>
                    <div className="moodboard-form-grid">
                        <Input
                            id="moodboard-workspace"
                            label="Workspace"
                            value={state.workspace}
                            onChange={(event) => onState({ workspace: event.target.value })}
                            size="sm"
                        />
                        <Select
                            id="moodboard-region"
                            label="Region"
                            value={state.region}
                            onChange={(event) => onState({ region: event.target.value })}
                            size="sm"
                        >
                            <option value="eu-west-1">EU West / Ireland</option>
                            <option value="us-east-1">US East / Virginia</option>
                            <option value="ap-south-1">AP South / Mumbai</option>
                        </Select>
                    </div>
                    <Textarea
                        id="moodboard-notes"
                        label="Release notes"
                        defaultValue="Ship the same component language across every atmosphere."
                        rows={2}
                        size="sm"
                    />
                    <div className="moodboard-form-row">
                        <Checkbox
                            id="moodboard-signed"
                            label="Signed builds only"
                            checked={state.checked}
                            onChange={(event) => onState({ checked: event.target.checked })}
                            size="sm"
                        />
                        <Switch
                            id="moodboard-notifications"
                            label="Notifications"
                            checked={state.notifications}
                            onChange={(event) => onState({ notifications: event.target.checked })}
                            size="sm"
                        />
                    </div>
                    <Checkbox
                        id="moodboard-validation"
                        label="Require owner approval"
                        error="Approval is required before deploy."
                        invalid
                        size="sm"
                    />
                </Card>

                {/* States and variants */}
                <div className="moodboard-preview__grid">
                    <Card className="moodboard-card" padding="md">
                        <span className="moodboard-kicker">BUTTON VARIANTS</span>
                        <div className="moodboard-button-row">
                            {(['primary', 'secondary', 'ghost', 'danger'] as const).map(
                                (variant) => (
                                    <Button key={variant} variant={variant} size="sm">
                                        {variant}
                                    </Button>
                                )
                            )}
                            <Button size="sm" disabled>
                                disabled
                            </Button>
                            <Button size="sm" loading>
                                loading
                            </Button>
                        </div>
                        <span className="moodboard-kicker">BADGE VARIANTS</span>
                        <div className="moodboard-badge-row">
                            {(['default', 'primary', 'success', 'warning', 'danger'] as const).map(
                                (variant) => (
                                    <Badge key={variant} variant={variant}>
                                        {variant}
                                    </Badge>
                                )
                            )}
                        </div>
                        <span className="moodboard-kicker">SIZE LADDER</span>
                        <div className="moodboard-size-row">
                            {(['sm', 'md', 'lg'] as const).map((size) => (
                                <Button key={size} size={size}>
                                    Button {size}
                                </Button>
                            ))}
                        </div>
                    </Card>

                    <Card className="moodboard-card" padding="md">
                        <span className="moodboard-kicker">DATA STATES</span>
                        <div className="moodboard-data-grid">
                            <StatCard
                                label="LOADING"
                                value="—"
                                description="Waiting for the next release"
                            />
                            <Callout tone="info" title="No incidents">
                                All regions are inside the error budget.
                            </Callout>
                            <Callout tone="warning" title="Review required">
                                One deploy is waiting for approval.
                            </Callout>
                        </div>
                        <span className="moodboard-kicker">PROGRESS</span>
                        <div className="moodboard-progress-group">
                            <Progress label="Deploy" value={72} showValue tone="neutral" />
                            <Progress label="Migrations" value={45} showValue tone="warning" />
                            <Progress label="Tests" value={98} showValue tone="success" />
                        </div>
                    </Card>
                </div>

                {/* Advanced system primitives */}
                <div className="moodboard-preview__grid">
                    <Card className="moodboard-card" padding="md">
                        <span className="moodboard-kicker">SEQUENCE & CONTROLS</span>
                        <div
                            style={{
                                display: 'grid',
                                gap: 'var(--mr-space-3)',
                                marginTop: 'var(--mr-space-2)',
                            }}
                        >
                            <SegmentedControl
                                size="sm"
                                defaultValue="preview"
                                options={[
                                    { value: 'preview', label: 'Preview' },
                                    { value: 'staging', label: 'Staging' },
                                    { value: 'production', label: 'Production' },
                                ]}
                            />
                            <Stepper
                                activeStep={1}
                                steps={[
                                    { title: 'Validation', description: 'Tests unitaires' },
                                    { title: 'Deploiement', description: 'Propagation edge' },
                                    { title: 'Surveillance', description: 'Observabilite active' },
                                ]}
                            />
                        </div>
                    </Card>

                    <Card className="moodboard-card" padding="md">
                        <span className="moodboard-kicker">RATINGS & PERFORMANCE</span>
                        <div
                            style={{
                                display: 'grid',
                                gap: 'var(--mr-space-3)',
                                marginTop: 'var(--mr-space-2)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 'var(--mr-text-sm)',
                                        color: 'var(--mr-fg-muted)',
                                    }}
                                >
                                    Satisfaction equipe
                                </span>
                                <Rating value={5} readOnly size="sm" />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 'var(--mr-text-sm)',
                                        color: 'var(--mr-fg-muted)',
                                    }}
                                >
                                    Efficacite reseau
                                </span>
                                <BadgeDelta deltaType="moderate-increase">+28.4%</BadgeDelta>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 'var(--mr-text-sm)',
                                        color: 'var(--mr-fg-muted)',
                                    }}
                                >
                                    Temps d execution
                                </span>
                                <BadgeDelta deltaType="moderate-decrease">-42 ms</BadgeDelta>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Token swatches */}
                <Card className="moodboard-card" padding="md">
                    <span className="moodboard-kicker">TOKEN MATRIX</span>
                    <TokenSwatchMatrix />
                </Card>
            </div>
        </div>
    )
}
