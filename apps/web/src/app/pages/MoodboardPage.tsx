import { useMemo, useState } from 'react'
import {
    Badge,
    Button,
    Callout,
    Card,
    Checkbox,
    Input,
    MetricGrid,
    PageHeader,
    Select,
    StatCard,
    Switch,
    Table,
    Tabs,
    Textarea,
    ThemeScope,
    Toggle,
    ToggleGroup,
    Tooltip,
    Topbar,
    type Column,
} from '@monority/ui'
import { usePageSeo } from '@/seo/usePageSeo'
import './moodboard.css'

type ThemeName = 'dark' | 'light' | 'oled' | 'ocean' | 'night'
type BrandName = 'monority' | 'studio'
type DensityName = 'comfortable' | 'compact'
type PanelState = {
    tab: string
    region: string
    workspace: string
    checked: boolean
    notifications: boolean
    selectedRow: string
}

type ThemeDefinition = {
    id: ThemeName
    label: string
    description: string
}

const themeDefinitions: ThemeDefinition[] = [
    { id: 'dark', label: 'Dark', description: 'Charcoal depth, clear strata' },
    { id: 'light', label: 'Light', description: 'Cool paper, quiet contrast' },
    { id: 'oled', label: 'OLED', description: 'Black canvas, near-black surfaces' },
    { id: 'ocean', label: 'Ocean', description: 'Deep water, restrained turquoise' },
    { id: 'night', label: 'Night', description: 'Navy atmosphere, indigo accent' },
]

const initialState: PanelState = {
    tab: 'overview',
    region: 'eu-west-1',
    workspace: 'monority-prod',
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

const badgeForStatus = (status: string) => {
    if (status === 'Operational') return <Badge variant="success">Operational</Badge>
    if (status === 'Degraded') return <Badge variant="warning">Degraded</Badge>
    return <Badge variant="danger">Delayed</Badge>
}

function SharedPanel({
    definition,
    density,
    brand,
    state,
    onState,
}: {
    definition: ThemeDefinition
    density: DensityName
    brand: BrandName
    state: PanelState
    onState: (next: Partial<PanelState>) => void
}) {
    const id = `moodboard-${definition.id}`
    const brandProps = brand === 'studio' ? { brand: 'studio' as const } : {}
    return (
        <ThemeScope
            theme={definition.id}
            density={density}
            {...brandProps}
            className="moodboard-panel"
            data-testid={`moodboard-panel-${definition.id}`}
            data-moodboard-theme={definition.id}
            aria-label={`${definition.label} theme panel`}
        >
            <div className="moodboard-panel__meta">
                <span>0{themeDefinitions.indexOf(definition) + 1} / {definition.label}</span>
                <span>{definition.description}</span>
            </div>
            <Topbar className="moodboard-topbar" role="group" aria-label={`${definition.label} product navigation`}>
                <div className="moodboard-brand-lockup">
                    <span className="moodboard-brand-mark" aria-hidden="true">M</span>
                    <span>MONORITY UI</span>
                </div>
                <nav className="moodboard-compact-nav" aria-label="Compact navigation">
                    <a className="is-active" href="#overview">Overview</a>
                    <a href="#activity">Activity</a>
                    <a href="#settings">Settings</a>
                </nav>
                <div className="moodboard-status">
                    <span className="moodboard-status-dot" aria-hidden="true" />
                    Operational
                </div>
            </Topbar>
            <div className="moodboard-interface" id="overview">
                <PageHeader className="moodboard-page-header" role="group" aria-label={`${definition.label} release control`}>
                    <span className="moodboard-kicker">INFRASTRUCTURE / CONTROL PLANE</span>
                    <h2>Release control</h2>
                    <p>One system for shipping observable changes.</p>
                    <div className="moodboard-actions">
                        <Button variant="primary" size="sm">Deploy</Button>
                        <Button variant="ghost" size="sm">Inspect</Button>
                    </div>
                </PageHeader>
                <MetricGrid
                    className="moodboard-metrics"
                    items={[
                        { key: 'requests', label: 'REQUESTS / MIN', value: '98.4%', trend: '+4.8%', trendTone: 'success' },
                        { key: 'latency', label: 'P95 LATENCY', value: '84 ms', trend: '-12 ms', trendTone: 'success' },
                    ]}
                />
                <Card className="moodboard-card moodboard-settings" padding="md">
                    <div className="moodboard-card__topline">
                        <span className="moodboard-kicker">POLICY</span>
                        <span className="moodboard-mono">GUARDRAILS</span>
                    </div>
                    <div className="moodboard-setting-row">
                        <Checkbox
                            id={`${id}-signed`}
                            label="Signed builds only"
                            checked={state.checked}
                            onChange={(event) => onState({ checked: event.target.checked })}
                            size="sm"
                        />
                        <Switch
                            id={`${id}-notifications`}
                            label="Notifications"
                            checked={state.notifications}
                            onChange={(event) => onState({ notifications: event.target.checked })}
                            size="sm"
                        />
                    </div>
                </Card>
                <Card className="moodboard-card moodboard-table-card" padding="md">
                    <div className="moodboard-card__topline">
                        <span className="moodboard-kicker">SERVICE HEALTH</span>
                        <span className="moodboard-mono">{tableRows.length} NODES</span>
                    </div>
                    <Table
                        columns={tableColumns.map((column) =>
                            column.key === 'status'
                                ? { ...column, render: (value) => badgeForStatus(String(value)) }
                                : column.key === 'service'
                                  ? {
                                        ...column,
                                        render: (value, row) => (
                                            <button
                                                className="moodboard-row-button"
                                                type="button"
                                                onClick={() => onState({ selectedRow: String(value) })}
                                                aria-pressed={state.selectedRow === String(value)}
                                            >
                                                {String(value)}{row.service === state.selectedRow ? ' ·' : ''}
                                            </button>
                                        ),
                                    }
                                  : column,
                        )}
                        rows={tableRows}
                        tableClassName="moodboard-table"
                    />
                </Card>
                <Card className="moodboard-card moodboard-form-card" padding="md">
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
                            aria-label="Moodboard sections"
                        />
                    </div>
                    <div className="moodboard-form-grid">
                        <Input
                            id={`${id}-workspace`}
                            label="Workspace"
                            value={state.workspace}
                            onChange={(event) => onState({ workspace: event.target.value })}
                            size="sm"
                        />
                        <Select
                            id={`${id}-region`}
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
                        id={`${id}-notes`}
                        label="Release notes"
                        defaultValue="Ship the same component language across every atmosphere."
                        rows={2}
                        size="sm"
                    />
                    <Checkbox
                        id={`${id}-validation`}
                        label="Require owner approval"
                        error="Approval is required before deploy."
                        invalid
                        size="sm"
                    />
                    <ToggleGroup
                        size="sm"
                        value={state.tab}
                        onValueChange={(value) => onState({ tab: String(value) })}
                        items={tabItems}
                        aria-label="Shared tab state"
                    />
                </Card>
                <Card className="moodboard-card moodboard-states" padding="md">
                    <span className="moodboard-kicker">STATE MATRIX</span>
                    <div className="moodboard-button-row">
                        {(['primary', 'secondary', 'ghost', 'danger'] as const).map((variant) => (
                            <Button key={variant} variant={variant} size="sm" data-mr-preview="hover">{variant}</Button>
                        ))}
                        <Button size="sm" disabled>disabled</Button>
                        <Button size="sm" loading>loading</Button>
                    </div>
                    <div className="moodboard-badge-row">
                        {(['default', 'primary', 'success', 'warning', 'danger'] as const).map((variant) => (
                            <Badge key={variant} variant={variant}>{variant}</Badge>
                        ))}
                    </div>
                </Card>
                <Card className="moodboard-card moodboard-sizes" padding="md">
                    <span className="moodboard-kicker">SIZE LADDER</span>
                    <div className="moodboard-size-row">
                        {(['sm', 'md', 'lg'] as const).map((size) => (
                            <Button key={size} size={size}>Button {size}</Button>
                        ))}
                        {(['sm', 'md', 'lg'] as const).map((size) => (
                            <Input key={size} aria-label={`Input ${size}`} size={size} placeholder={`Input ${size}`} />
                        ))}
                    </div>
                </Card>
                <Card className="moodboard-card moodboard-data-states" padding="md">
                    <span className="moodboard-kicker">DATA STATES</span>
                    <div className="moodboard-data-grid">
                        <StatCard label="LOADING" value="—" description="Waiting for the next release" />
                        <Callout tone="info" title="No incidents">All regions are inside the error budget.</Callout>
                        <Callout tone="warning" title="Review required">One deploy is waiting for approval.</Callout>
                    </div>
                </Card>
                <div className="moodboard-token-strip" data-testid={`moodboard-${definition.id}-tokens`}>
                    <div className="moodboard-token-strip__header">
                        <span>TOKEN STRIP</span>
                        <span>shared geometry / semantic color</span>
                    </div>
                    <div className="moodboard-token-groups">
                        <div className="moodboard-token-group"><span className="moodboard-token-label">Surface</span><div className="moodboard-swatches"><i /><i /><i /><i /><i /></div></div>
                        <div className="moodboard-token-group"><span className="moodboard-token-label">Text</span><div className="moodboard-text-samples"><i /><i /><i /><i /></div></div>
                        <div className="moodboard-token-group"><span className="moodboard-token-label">Accent</span><div className="moodboard-accent-samples"><i /><i /><i /><i /><i /><i /><i /></div></div>
                        <div className="moodboard-token-group"><span className="moodboard-token-label">Status</span><div className="moodboard-status-samples"><i /><i /><i /><i /></div></div>
                        <div className="moodboard-token-group"><span className="moodboard-token-label">Geometry</span><div className="moodboard-geometry-samples"><i /><i /><i /></div></div>
                    </div>
                    <div className="moodboard-typography-strip"><span>Aa display</span><span>Aa heading</span><span>Aa body</span><span>code</span></div>
                </div>
            </div>
        </ThemeScope>
    )
}

export function MoodboardPage() {
    usePageSeo({ title: 'Moodboard', description: 'Monority UI visual system across five atmospheres.' })
    const [density, setDensity] = useState<DensityName>('comfortable')
    const [brand, setBrand] = useState<BrandName>('monority')
    const [state, setState] = useState<PanelState>(initialState)
    const updateState = (next: Partial<PanelState>) => setState((current) => ({ ...current, ...next }))
    const controls = useMemo(() => [
        { name: 'density', type: 'single' as const, value: density, setValue: setDensity },
        { name: 'brand', type: 'single' as const, value: brand, setValue: setBrand },
    ], [brand, density])

    return (
        <div className="moodboard-page" data-testid="moodboard-page">
            <header className="moodboard-control">
                <div className="moodboard-control__title"><span>MONORITY UI / THEMES</span><strong>One language, five atmospheres.</strong></div>
                <div className="moodboard-control__actions">
                    {controls[0] && <ToggleGroup
                        size="sm"
                        value={density}
                        onValueChange={(value) => setDensity(String(value) as DensityName)}
                        items={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]}
                        aria-label="Theme density"
                    />}
                    <ToggleGroup
                        size="sm"
                        value={brand}
                        onValueChange={(value) => setBrand(String(value) as BrandName)}
                        items={[{ value: 'monority', label: 'Monority' }, { value: 'studio', label: 'Studio' }]}
                        aria-label="Brand"
                    />
                    <Button variant="secondary" size="sm" onClick={() => { setDensity('comfortable'); setBrand('monority'); setState(initialState) }}>Réinitialiser l’état</Button>
                </div>
            </header>
            <div className="moodboard-page__grid" data-testid="moodboard-theme-grid">
                {themeDefinitions.map((definition) => (
                    <SharedPanel key={definition.id} definition={definition} density={density} brand={brand} state={state} onState={updateState} />
                ))}
            </div>
        </div>
    )
}
