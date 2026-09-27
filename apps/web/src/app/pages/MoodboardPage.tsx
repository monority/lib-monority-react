import { useEffect, useState } from 'react'
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
    ThemeScope,
    ToggleGroup,
    Topbar,
    DesignProvider,
    DESIGN_PRESETS,
    DEFAULT_DESIGN_CONFIG,
    resolveDesignConfig,
    sanitizeDesignConfig,
    type Column,
    designConfigToJSON,
    type DesignConfig,
} from '@monority/ui'
import { usePageSeo } from '@/seo/usePageSeo'
import { AppHeader } from '@/layouts/AppHeader'
import './moodboard.css'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type DensityName = 'comfortable' | 'compact'

interface PanelState {
    tab: string
    workspace: string
    region: string
    checked: boolean
    notifications: boolean
    selectedRow: string
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const initialState: PanelState = {
    tab: 'overview',
    workspace: 'monority-prod',
    region: 'eu-west-1',
    checked: true,
    notifications: false,
    selectedRow: 'edge-router',
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

const chartVars = ['var(--mr-chart-1)', 'var(--mr-chart-2)', 'var(--mr-chart-3)'] as const

const chartData = [
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

/* ------------------------------------------------------------------ */
/*  Config panel                                                       */
/* ------------------------------------------------------------------ */

function ConfigPanel({
    config,
    onConfig,
    onReset,
    onCopy,
    copied,
}: {
    config: DesignConfig
    onConfig: <K extends keyof DesignConfig>(key: K, value: DesignConfig[K]) => void
    onReset: () => void
    onCopy: () => void
    copied: boolean
}) {
    const onValue = (key: keyof DesignConfig) => (value: string | string[]) => {
        const v = Array.isArray(value) ? (value[0] ?? '') : String(value)
        if (v === '') return /* ignore deselect in single mode */
        onConfig(key, v as DesignConfig[typeof key])
    }

    return (
        <aside className="moodboard-sidebar" aria-label="Design configuration">
            <div className="moodboard-sidebar__header">
                <div className="moodboard-sidebar__title">
                    <span className="moodboard-kicker">MONORITY UI</span>
                    <strong>Design Studio</strong>
                </div>
                <div className="moodboard-sidebar__actions">
                    <Button variant="ghost" size="sm" onClick={onCopy} data-testid="moodboard-copy">
                        {copied ? 'Copied' : 'Copy'}
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onReset}
                        data-testid="moodboard-reset"
                    >
                        Reset
                    </Button>
                </div>
            </div>

            <div className="moodboard-sidebar__axes">
                <div className="moodboard-axis">
                    <span className="moodboard-kicker">Theme</span>
                    <ToggleGroup
                        value={config.theme}
                        onValueChange={onValue('theme')}
                        items={DESIGN_PRESETS.themes}
                        aria-label="Theme axis"
                    />
                </div>

                <div className="moodboard-axis">
                    <span className="moodboard-kicker">Brand</span>
                    <ToggleGroup
                        value={config.brand}
                        onValueChange={onValue('brand')}
                        items={DESIGN_PRESETS.brands}
                        aria-label="Brand axis"
                    />
                </div>

                <div className="moodboard-axis">
                    <span className="moodboard-kicker">Accent</span>
                    <ToggleGroup
                        value={config.accent}
                        onValueChange={onValue('accent')}
                        items={DESIGN_PRESETS.accents}
                        aria-label="Accent axis"
                    />
                </div>

                <div className="moodboard-axis">
                    <span className="moodboard-kicker">Components</span>
                    <ToggleGroup
                        value={config.componentColor}
                        onValueChange={onValue('componentColor')}
                        items={DESIGN_PRESETS.componentColors}
                        aria-label="Component color axis"
                    />
                </div>

                <div className="moodboard-axis">
                    <span className="moodboard-kicker">Charts</span>
                    <ToggleGroup
                        value={config.chartPalette}
                        onValueChange={onValue('chartPalette')}
                        items={DESIGN_PRESETS.chartPalettes}
                        aria-label="Chart palette axis"
                    />
                </div>

                <div className="moodboard-axis">
                    <span className="moodboard-kicker">Radius</span>
                    <ToggleGroup
                        value={config.radius}
                        onValueChange={onValue('radius')}
                        items={DESIGN_PRESETS.radii}
                        aria-label="Radius axis"
                    />
                </div>

                <div className="moodboard-axis">
                    <span className="moodboard-kicker">Spacing</span>
                    <ToggleGroup
                        value={config.spacing}
                        onValueChange={onValue('spacing')}
                        items={DESIGN_PRESETS.spacings}
                        aria-label="Spacing axis"
                    />
                </div>

                <div className="moodboard-axis">
                    <span className="moodboard-kicker">Layout</span>
                    <ToggleGroup
                        value={config.density}
                        onValueChange={onValue('density')}
                        items={DESIGN_PRESETS.densities}
                        aria-label="Layout density axis"
                    />
                </div>
            </div>

            <details className="moodboard-sidebar__tokens">
                <summary className="moodboard-kicker">Token Details</summary>
                <pre className="moodboard-sidebar__json">{designConfigToJSON(config)}</pre>
            </details>
        </aside>
    )
}

/* ------------------------------------------------------------------ */
/*  Live preview                                                       */
/* ------------------------------------------------------------------ */

function LivePreview({
    state,
    onState,
}: { state: PanelState; onState: (next: Partial<PanelState>) => void }) {
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
                        <div
                            className="moodboard-chart"
                            data-testid="moodboard-chart"
                            aria-label="Bar chart visualization"
                        >
                            {chartData.map((day) => (
                                <div key={day.label} className="moodboard-chart__bar-group">
                                    <div className="moodboard-chart__bars">
                                        {day.values.map((v, i) => (
                                            <div
                                                key={i}
                                                className="moodboard-chart__segment"
                                                style={{
                                                    height: `${v}%`,
                                                    backgroundColor: chartVars[i],
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <span className="moodboard-chart__label">{day.label}</span>
                                </div>
                            ))}
                        </div>
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
                                    <Button
                                        key={variant}
                                        variant={variant}
                                        size="sm"
                                        data-mr-preview="hover"
                                    >
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

                {/* Token swatches - compact */}
                <Card className="moodboard-card" padding="md">
                    <span className="moodboard-kicker">TOKEN MATRIX</span>
                    <div className="moodboard-token-matrix">
                        <div className="moodboard-token-row">
                            <span className="moodboard-token-label">Surfaces</span>
                            <div className="moodboard-swatches">
                                <i style={{ background: 'var(--mr-bg-canvas)' }} />
                                <i style={{ background: 'var(--mr-bg-surface)' }} />
                                <i style={{ background: 'var(--mr-bg-raised)' }} />
                                <i style={{ background: 'var(--mr-bg-sunken)' }} />
                            </div>
                        </div>
                        <div className="moodboard-token-row">
                            <span className="moodboard-token-label">Accent</span>
                            <div className="moodboard-swatches">
                                <i style={{ background: 'var(--mr-accent)' }} />
                                <i style={{ background: 'var(--mr-accent-hover)' }} />
                                <i style={{ background: 'var(--mr-accent-active)' }} />
                                <i style={{ background: 'var(--mr-accent-subtle)' }} />
                            </div>
                        </div>
                        <div className="moodboard-token-row">
                            <span className="moodboard-token-label">Status</span>
                            <div className="moodboard-swatches">
                                <i style={{ background: 'var(--mr-success-text)' }} />
                                <i style={{ background: 'var(--mr-warning-text)' }} />
                                <i style={{ background: 'var(--mr-danger-text)' }} />
                                <i style={{ background: 'var(--mr-info-text)' }} />
                            </div>
                        </div>
                        <div className="moodboard-token-row">
                            <span className="moodboard-token-label">Charts</span>
                            <div className="moodboard-swatches">
                                <i style={{ background: 'var(--mr-chart-1)' }} />
                                <i style={{ background: 'var(--mr-chart-2)' }} />
                                <i style={{ background: 'var(--mr-chart-3)' }} />
                                <i style={{ background: 'var(--mr-chart-4)' }} />
                                <i style={{ background: 'var(--mr-chart-5)' }} />
                            </div>
                        </div>
                        <div className="moodboard-token-row">
                            <span className="moodboard-token-label">Geometry</span>
                            <div className="moodboard-geometry-samples">
                                <i style={{ borderRadius: 'var(--mr-radius-inline)' }} />
                                <i style={{ borderRadius: 'var(--mr-radius-control)' }} />
                                <i style={{ borderRadius: 'var(--mr-radius-card)' }} />
                            </div>
                        </div>
                        <div className="moodboard-token-row">
                            <span className="moodboard-kicker">Typography</span>
                            <div className="moodboard-typography-strip">
                                <span style={{ font: 'var(--mr-type-display)' }}>Display</span>
                                <span style={{ font: 'var(--mr-type-h2)' }}>Heading</span>
                                <span style={{ font: 'var(--mr-type-body)' }}>Body text</span>
                                <span style={{ font: 'var(--mr-type-code)' }}>code</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function MoodboardPage() {
    usePageSeo({
        title: 'Design Studio',
        description:
            'Monority UI design system — one interface, one configuration, one live preview.',
    })

    const [config, setConfig] = useState<DesignConfig>(() => {
        if (typeof window === 'undefined') return DEFAULT_DESIGN_CONFIG
        try {
            const stored = localStorage.getItem('monority-design-config')
            /* sanitize, not spread: a stored config predating an axis change can hold
               values the current presets no longer accept, and resolveDesignConfig
               indexes those values directly. */
            return stored ? sanitizeDesignConfig(JSON.parse(stored)) : DEFAULT_DESIGN_CONFIG
        } catch {
            return DEFAULT_DESIGN_CONFIG
        }
    })

    const [state, setState] = useState<PanelState>(initialState)
    const [copied, setCopied] = useState(false)

    const updateState = (next: Partial<PanelState>) =>
        setState((current) => ({ ...current, ...next }))

    const updateConfig = <K extends keyof DesignConfig>(key: K, value: DesignConfig[K]) => {
        setConfig((current) => ({ ...current, [key]: value }))
    }

    const handleReset = () => {
        setConfig(DEFAULT_DESIGN_CONFIG)
        setState(initialState)
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(designConfigToJSON(config))
        setCopied(true)
    }

    /* Persist to localStorage */
    useEffect(() => {
        try {
            localStorage.setItem('monority-design-config', designConfigToJSON(config))
        } catch {
            /* noop */
        }
    }, [config])

    /* Reset copied flag */
    useEffect(() => {
        if (!copied) return
        const timer = setTimeout(() => setCopied(false), 2000)
        return () => clearTimeout(timer)
    }, [copied])

    const density: DensityName = config.density === 'compact' ? 'compact' : 'comfortable'
    const resolved = resolveDesignConfig(config)

    return (
        <>
            <AppHeader />
            <DesignProvider config={config} className="moodboard-design-root">
                <div className="moodboard-page" data-testid="moodboard-page">
                    <ConfigPanel
                        config={config}
                        onConfig={updateConfig}
                        onReset={handleReset}
                        onCopy={handleCopy}
                        copied={copied}
                    />
                    <ThemeScope
                        theme={config.theme}
                        density={density}
                        brand={config.brand === 'studio' ? 'studio' : undefined}
                        className="moodboard-preview-scope"
                        style={resolved.style}
                        data-testid="moodboard-preview-scope"
                        data-design-theme={config.theme}
                        data-design-accent={config.accent}
                        data-design-component-color={config.componentColor}
                        data-design-chart-palette={config.chartPalette}
                        data-design-radius={config.radius}
                        data-design-spacing={config.spacing}
                        data-design-density={config.density}
                    >
                        <LivePreview state={state} onState={updateState} />
                    </ThemeScope>
                </div>
            </DesignProvider>
        </>
    )
}
