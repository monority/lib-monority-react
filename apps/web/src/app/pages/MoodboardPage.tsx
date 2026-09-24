import { usePageSeo } from '@/seo/usePageSeo'
import {
    Badge,
    Button,
    Card,
    Checkbox,
    type Column,
    Input,
    Select,
    Table,
    Tabs,
    Toggle,
    Tooltip,
    Topbar,
} from '@monority/ui'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './moodboard.css'

type MoodboardTheme = 'light' | 'dark' | 'oled'

type ThemeDefinition = {
    id: MoodboardTheme
    label: string
    code: string
    description: string
}

const themeDefinitions: ThemeDefinition[] = [
    {
        id: 'light',
        label: 'Light',
        code: '01',
        description: 'Cool paper, quiet contrast',
    },
    {
        id: 'dark',
        label: 'Dark',
        code: '02',
        description: 'Charcoal depth, clear strata',
    },
    {
        id: 'oled',
        label: 'OLED',
        code: '03',
        description: 'Black canvas, near-black surfaces',
    },
]

const serviceColumns: Column[] = [
    { key: 'service', label: 'Service' },
    { key: 'region', label: 'Region' },
    { key: 'status', label: 'Status' },
]

const serviceRows: Record<string, unknown>[] = [
    { service: 'edge-router', region: 'eu-west-1', status: 'Operational' },
    { service: 'artifact-cache', region: 'us-east-1', status: 'Operational' },
    { service: 'telemetry', region: 'ap-south-1', status: 'Degraded' },
]

const tabItems = [
    { value: 'overview', label: 'Overview' },
    { value: 'activity', label: 'Activity' },
    { value: 'settings', label: 'Settings' },
]

function MoodboardPanel({ theme }: { theme: ThemeDefinition }) {
    const [tab, setTab] = useState('overview')
    const idPrefix = `moodboard-${theme.id}`

    return (
        <section
            className="moodboard-panel"
            data-moodboard-theme={theme.id}
            data-testid={`moodboard-panel-${theme.id}`}
            aria-label={`${theme.label} theme moodboard`}
        >
            <div className="moodboard-panel__meta">
                <span>
                    {theme.code} / {theme.label}
                </span>
                <span>{theme.description}</span>
            </div>

            <Topbar className="moodboard-topbar" aria-label={`${theme.label} product navigation`}>
                <div className="moodboard-brand-lockup">
                    <span className="moodboard-brand-mark" aria-hidden="true">
                        M
                    </span>
                    <span>MONORITY UI</span>
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
                    Operational
                </div>
            </Topbar>

            <div className="moodboard-interface" id="overview">
                <div className="moodboard-interface__eyebrow">
                    <span>INFRASTRUCTURE / CONTROL PLANE</span>
                    <span className="moodboard-interface__timestamp">07:42:18 UTC</span>
                </div>
                <div className="moodboard-interface__heading">
                    <div>
                        <h2>Release control</h2>
                        <p>One system for shipping observable changes.</p>
                    </div>
                    <div className="moodboard-interface__actions">
                        <Button variant="primary" size="sm">
                            Deploy
                        </Button>
                        <Button variant="ghost" size="sm">
                            Inspect
                        </Button>
                    </div>
                </div>

                <div className="moodboard-card-grid">
                    <Card className="moodboard-card moodboard-card--standard" padding="md">
                        <div className="moodboard-card__topline">
                            <span className="moodboard-card__kicker">SERVICE HEALTH</span>
                            <Badge variant="success">Stable</Badge>
                        </div>
                        <h3>Edge control plane</h3>
                        <p>All routes are inside the declared error budget.</p>
                        <div className="moodboard-card__footer">
                            <span>Updated 18s ago</span>
                            <span className="moodboard-mono">v2.14.0</span>
                        </div>
                    </Card>

                    <Card className="moodboard-card moodboard-card--metric" padding="md">
                        <div className="moodboard-card__topline">
                            <span className="moodboard-card__kicker">REQUESTS / MIN</span>
                            <Badge variant="primary">+4.8%</Badge>
                        </div>
                        <div className="moodboard-metric-value">
                            98.4<span>%</span>
                        </div>
                        <p>Successful delivery rate</p>
                        <div className="moodboard-sparkline" aria-label="Delivery rate trend">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                    </Card>

                    <Card className="moodboard-card moodboard-card--settings" padding="md">
                        <div className="moodboard-card__topline">
                            <div>
                                <span className="moodboard-card__kicker">POLICY</span>
                                <h3>Guardrails</h3>
                            </div>
                            <Toggle size="sm" defaultPressed>
                                Strict
                            </Toggle>
                        </div>
                        <div className="moodboard-setting-row">
                            <Checkbox
                                id={`${idPrefix}-signed-builds`}
                                label="Signed builds only"
                                defaultChecked
                                size="sm"
                            />
                            <span>Block unsigned artifacts</span>
                        </div>
                        <div className="moodboard-setting-row">
                            <Checkbox id={`${idPrefix}-canary`} label="Canary release" size="sm" />
                            <span>Use progressive delivery</span>
                        </div>
                    </Card>

                    <Card className="moodboard-card moodboard-card--compact" padding="sm">
                        <div className="moodboard-card__topline">
                            <span className="moodboard-card__kicker">COMPACT DATA</span>
                            <span className="moodboard-mono">03 NODES</span>
                        </div>
                        <Table
                            columns={serviceColumns}
                            rows={serviceRows}
                            tableClassName="moodboard-table"
                        />
                    </Card>
                </div>

                <Card className="moodboard-card moodboard-card--controls" padding="md">
                    <div className="moodboard-card__topline">
                        <div>
                            <span className="moodboard-card__kicker">CONTROL SURFACE</span>
                            <h3>Component language</h3>
                        </div>
                        <Tabs
                            size="sm"
                            value={tab}
                            onChange={setTab}
                            items={tabItems}
                            aria-label="Moodboard sections"
                        />
                    </div>

                    <div className="moodboard-form-grid">
                        <Input
                            id={`${idPrefix}-workspace`}
                            label="Workspace"
                            defaultValue="monority-prod"
                            size="sm"
                        />
                        <Select
                            id={`${idPrefix}-region`}
                            label="Region"
                            defaultValue="eu-west-1"
                            size="sm"
                        >
                            <option value="eu-west-1">EU West / Ireland</option>
                            <option value="us-east-1">US East / Virginia</option>
                            <option value="ap-south-1">AP South / Mumbai</option>
                        </Select>
                    </div>

                    <div className="moodboard-validation-row">
                        <Checkbox
                            id={`${idPrefix}-validation`}
                            label="Require owner approval"
                            error="Approval is required before deploy."
                            size="sm"
                        />
                        <Tooltip content="Command K opens the command surface.">
                            <Button variant="secondary" size="sm">
                                Shortcuts
                            </Button>
                        </Tooltip>
                    </div>
                </Card>

                <div className="moodboard-button-specimen" aria-label="Button variants">
                    <span className="moodboard-card__kicker">BUTTON LADDER</span>
                    <div className="moodboard-button-row">
                        <Button size="sm">Primary</Button>
                        <Button variant="secondary" size="sm">
                            Secondary
                        </Button>
                        <Button variant="ghost" size="sm">
                            Ghost
                        </Button>
                        <Button variant="danger" size="sm">
                            Destructive
                        </Button>
                        <Button size="sm" disabled>
                            Disabled
                        </Button>
                        <Button size="sm" loading>
                            Loading
                        </Button>
                    </div>
                </div>

                <div className="moodboard-token-strip" data-testid={`${idPrefix}-tokens`}>
                    <div className="moodboard-token-strip__header">
                        <span>TOKEN STRIP</span>
                        <span>shared geometry / semantic color</span>
                    </div>
                    <div className="moodboard-token-groups">
                        <div className="moodboard-token-group">
                            <span className="moodboard-token-label">Surface</span>
                            <div className="moodboard-swatches" aria-label="Surface levels">
                                <i style={{ background: 'var(--mr-bg-canvas)' }} />
                                <i style={{ background: 'var(--mr-bg-surface)' }} />
                                <i style={{ background: 'var(--mr-bg-surface-elevated)' }} />
                            </div>
                        </div>
                        <div className="moodboard-token-group">
                            <span className="moodboard-token-label">Border</span>
                            <div className="moodboard-border-levels" aria-label="Border levels">
                                <i />
                                <i />
                                <i />
                            </div>
                        </div>
                        <div className="moodboard-token-group">
                            <span className="moodboard-token-label">Spacing</span>
                            <div className="moodboard-spacing-scale" aria-label="Spacing scale">
                                <i style={{ blockSize: 'var(--mr-space-2)' }} />
                                <i style={{ blockSize: 'var(--mr-space-3)' }} />
                                <i style={{ blockSize: 'var(--mr-space-4)' }} />
                                <i style={{ blockSize: 'var(--mr-space-5)' }} />
                            </div>
                        </div>
                        <div className="moodboard-token-group">
                            <span className="moodboard-token-label">Radius</span>
                            <div className="moodboard-radius-swatch" aria-hidden="true">
                                <i style={{ borderRadius: 'var(--mr-radius-xs)' }} />
                                <i style={{ borderRadius: 'var(--mr-radius-sm)' }} />
                                <i style={{ borderRadius: 'var(--mr-radius-md)' }} />
                                <i style={{ borderRadius: 'var(--mr-radius-lg)' }} />
                            </div>
                        </div>
                        <div className="moodboard-token-group">
                            <span className="moodboard-token-label">Control</span>
                            <div className="moodboard-control-swatch" aria-label="Control heights">
                                <i style={{ blockSize: 'var(--mr-control-size-sm)' }}>32</i>
                                <i style={{ blockSize: 'var(--mr-control-size-md)' }}>40</i>
                                <i style={{ blockSize: 'var(--mr-control-size-lg)' }}>48</i>
                            </div>
                        </div>
                        <div className="moodboard-token-group">
                            <span className="moodboard-token-label">Accent</span>
                            <div className="moodboard-color-values">
                                <span style={{ color: 'var(--mr-accent)' }}>cyan</span>
                                <span style={{ color: 'var(--mr-success)' }}>pass</span>
                                <span style={{ color: 'var(--mr-warning)' }}>warn</span>
                                <span style={{ color: 'var(--mr-danger)' }}>fail</span>
                            </div>
                        </div>
                    </div>
                    <div className="moodboard-typography-strip">
                        <span className="moodboard-display-sample">Aa</span>
                        <span className="moodboard-heading-sample">Heading / 18</span>
                        <span className="moodboard-body-sample">Body / 14</span>
                        <span className="moodboard-mono">mono / 12</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function MoodboardPage() {
    usePageSeo({
        title: 'Moodboard',
        description: 'Monority UI visual system moodboard across light, dark, and OLED themes.',
    })

    return (
        <div className="moodboard-page" data-testid="moodboard-page">
            <header className="moodboard-page__header">
                <div className="moodboard-page__brand">
                    <span className="moodboard-page__mark" aria-hidden="true">
                        M
                    </span>
                    <span>MONORITY UI</span>
                    <span className="moodboard-page__version">/ VISUAL SYSTEM 01</span>
                </div>
                <div className="moodboard-page__intro">
                    <span className="moodboard-page__eyebrow">DESIGN MOODBOARD / 1440</span>
                    <h1>
                        One language.
                        <br />
                        Three atmospheres.
                    </h1>
                    <p>
                        A calm, technical interface system for infrastructure teams. Same
                        primitives, deliberate atmosphere.
                    </p>
                </div>
                <div className="moodboard-page__footerline">
                    <div>
                        <span>03 THEMES</span>
                        <span>12 TOKENS</span>
                        <span>24 COMPONENTS</span>
                    </div>
                    <Link to="/" className="moodboard-back-link">
                        Back to library <span aria-hidden="true">↗</span>
                    </Link>
                </div>
            </header>

            <div className="moodboard-page__grid" data-testid="moodboard-theme-grid">
                {themeDefinitions.map((theme) => (
                    <MoodboardPanel key={theme.id} theme={theme} />
                ))}
            </div>
        </div>
    )
}
