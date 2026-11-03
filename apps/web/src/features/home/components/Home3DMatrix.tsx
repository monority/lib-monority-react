import { useMessages } from '@/shared/i18n'
import {
    Badge,
    Button,
    Card,
    Input,
    Progress,
    SegmentedControl,
    Slider,
    StatCard,
    Switch,
    ThemeScope,
    type ThemeScopeDensity,
    type ThemeScopeTheme,
    useTheme,
} from '@monority/ui'
import { useState } from 'react'
import './Home3DMatrix.css'

type ShowcaseSelectableTheme = 'dark' | 'slate' | 'ocean' | 'night' | 'light'
type ShowcaseSelectableDensity = 'compact' | 'comfortable' | 'spacious'
type RoutingStrategy = 'balanced' | 'latency' | 'failover'

const DEFAULT_REGION_ID = 'fra-01'
const DEFAULT_STRATEGY: RoutingStrategy = 'balanced'
const DEFAULT_CONCURRENCY = 512
const DEFAULT_EDGE_CACHE = true
const DEFAULT_ISOLATION = true

function SearchIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
        </svg>
    )
}

export function Home3DMatrix() {
    const messages = useMessages()
    const heroMessages = messages.home.hero
    const matrix = messages.home.matrix
    const { resolvedTheme } = useTheme()

    const [prevResolvedTheme, setPrevResolvedTheme] = useState<ThemeScopeTheme>(resolvedTheme)
    const [themeOverride, setThemeOverride] = useState<ShowcaseSelectableTheme | null>(null)
    if (prevResolvedTheme !== resolvedTheme) {
        setPrevResolvedTheme(resolvedTheme)
        setThemeOverride(null)
    }

    const stageTheme: ThemeScopeTheme = themeOverride ?? resolvedTheme

    const [density, setDensity] = useState<ShowcaseSelectableDensity>('comfortable')
    const [selectedRegionId, setSelectedRegionId] = useState<string>(DEFAULT_REGION_ID)
    const [regionQuery, setRegionQuery] = useState<string>('')
    const [strategy, setStrategy] = useState<RoutingStrategy>(DEFAULT_STRATEGY)
    const [concurrency, setConcurrency] = useState<number>(DEFAULT_CONCURRENCY)
    const [edgeCache, setEdgeCache] = useState<boolean>(DEFAULT_EDGE_CACHE)
    const [strictIsolation, setStrictIsolation] = useState<boolean>(DEFAULT_ISOLATION)
    const [synced, setSynced] = useState<boolean>(false)

    const themeOptions = [
        { value: 'dark', label: matrix.themes.dark },
        { value: 'slate', label: matrix.themes.slate },
        { value: 'ocean', label: matrix.themes.ocean },
        { value: 'night', label: matrix.themes.night },
        { value: 'light', label: matrix.themes.light },
    ]

    const densityOptions = [
        { value: 'compact', label: matrix.densities.compact },
        { value: 'comfortable', label: matrix.densities.comfortable },
        { value: 'spacious', label: matrix.densities.spacious },
    ]

    const strategyOptions = [
        { value: 'balanced', label: matrix.policy.strategies.balanced },
        { value: 'latency', label: matrix.policy.strategies.latency },
        { value: 'failover', label: matrix.policy.strategies.failover },
    ]

    const normalizedQuery = regionQuery.trim().toLowerCase()
    const filteredRegions = matrix.telemetry.regions.filter((region) => {
        if (!normalizedQuery) return true
        return (
            region.code.toLowerCase().includes(normalizedQuery) ||
            region.city.toLowerCase().includes(normalizedQuery) ||
            region.zone.toLowerCase().includes(normalizedQuery)
        )
    })

    const fallbackRegion = {
        id: DEFAULT_REGION_ID,
        code: 'fra-01',
        city: 'Frankfurt',
        zone: 'eu-central',
        baseLoad: 64,
        baseLatency: 11.4,
        baseRps: 48.2,
    }

    const activeRegion =
        matrix.telemetry.regions.find((region) => region.id === selectedRegionId) ??
        matrix.telemetry.regions[0] ??
        fallbackRegion

    const strategyThroughputFactor =
        strategy === 'balanced' ? 1 : strategy === 'latency' ? 0.94 : 0.87
    const concurrencyFactor = 0.78 + (concurrency / 1024) * 0.44
    const computedThroughput = (
        activeRegion.baseRps *
        strategyThroughputFactor *
        concurrencyFactor
    ).toFixed(1)

    const strategyLatencyDelta = strategy === 'latency' ? -1.8 : strategy === 'failover' ? 1.4 : 0
    const cachePenalty = edgeCache ? 0 : 6.4
    const computedLatency = Math.max(
        4.2,
        activeRegion.baseLatency + strategyLatencyDelta + cachePenalty
    ).toFixed(1)

    const throughputTrend =
        concurrency >= 512 ? `+${((concurrency / 512) * 12.4 - 4.2).toFixed(1)}%` : '-3.1%'
    const latencyTrend = edgeCache ? '-3.8 ms' : '+6.4 ms'
    const latencyTrendTone = edgeCache ? 'success' : 'warning'

    const isDefaultState =
        selectedRegionId === DEFAULT_REGION_ID &&
        regionQuery === '' &&
        strategy === DEFAULT_STRATEGY &&
        concurrency === DEFAULT_CONCURRENCY &&
        edgeCache === DEFAULT_EDGE_CACHE &&
        strictIsolation === DEFAULT_ISOLATION

    const handleReset = () => {
        setSelectedRegionId(DEFAULT_REGION_ID)
        setRegionQuery('')
        setStrategy(DEFAULT_STRATEGY)
        setConcurrency(DEFAULT_CONCURRENCY)
        setEdgeCache(DEFAULT_EDGE_CACHE)
        setStrictIsolation(DEFAULT_ISOLATION)
        setSynced(false)
    }

    const resolvedDensityAttr: ThemeScopeDensity = density

    return (
        <figure className="mr-showcase" aria-label={heroMessages.matrixAriaLabel}>
            <ThemeScope
                className="mr-showcase__surface"
                theme={stageTheme}
                density={resolvedDensityAttr}
            >
                {/* Barre supérieure : contrôle en direct du sous-arbre <ThemeScope> */}
                <div className="mr-showcase__toolbar">
                    <div className="mr-showcase__scope-meta">
                        <span className="mr-showcase__scope-badge">
                            <span className="mr-showcase__scope-dot" aria-hidden="true" />
                            <span className="mr-showcase__scope-tag">
                                &lt;{matrix.scopeLabel} /&gt;
                            </span>
                        </span>
                        <span className="mr-showcase__scope-sep" aria-hidden="true">
                            ·
                        </span>
                        <span className="mr-showcase__scope-attrs">
                            {stageTheme} / {density}
                        </span>
                    </div>

                    <div className="mr-showcase__controls">
                        <SegmentedControl
                            size="sm"
                            aria-label={matrix.themeGroupAria}
                            value={stageTheme}
                            options={themeOptions}
                            onChange={(val) => setThemeOverride(val as ShowcaseSelectableTheme)}
                        />
                        <SegmentedControl
                            size="sm"
                            aria-label={matrix.densityGroupAria}
                            value={density}
                            options={densityOptions}
                            onChange={(val) => setDensity(val as ShowcaseSelectableDensity)}
                        />
                    </div>
                </div>

                {/* Scène à 2 panneaux composée exclusivement de vraies primitives @monority/ui */}
                <div className="mr-showcase__grid">
                    {/* Panneau gauche : télémétrie cluster, StatCard et filtrage de régions */}
                    <Card padding="md" className="mr-showcase__panel">
                        <Card.Header>
                            <div className="mr-showcase__card-heading">
                                <Card.Title>{matrix.telemetry.title}</Card.Title>
                                <Card.Description>{matrix.telemetry.subtitle}</Card.Description>
                            </div>
                            <Badge tone="success" size="sm" dot>
                                {matrix.telemetry.status}
                            </Badge>
                        </Card.Header>

                        <Card.Content>
                            <div className="mr-showcase__stats">
                                <StatCard
                                    className="mr-showcase__stat"
                                    label={matrix.telemetry.throughputLabel}
                                    value={`${computedThroughput}k/s`}
                                    trend={throughputTrend}
                                    trendTone={concurrency >= 512 ? 'success' : 'neutral'}
                                />
                                <StatCard
                                    className="mr-showcase__stat"
                                    label={matrix.telemetry.latencyLabel}
                                    value={`${computedLatency} ms`}
                                    trend={latencyTrend}
                                    trendTone={latencyTrendTone}
                                />
                            </div>

                            <Input
                                size="sm"
                                value={regionQuery}
                                onChange={(e) => setRegionQuery(e.target.value)}
                                clearable
                                onClear={() => setRegionQuery('')}
                                clearAriaLabel={matrix.telemetry.clearFilter}
                                aria-label={matrix.telemetry.filterAria}
                                placeholder={matrix.telemetry.filterPlaceholder}
                                iconLeading={<SearchIcon />}
                            />

                            <div className="mr-showcase__regions">
                                {filteredRegions.length === 0 ? (
                                    <div className="mr-showcase__empty">
                                        {matrix.telemetry.emptyRegions}
                                    </div>
                                ) : (
                                    filteredRegions.map((region) => {
                                        const isSelected = region.id === activeRegion.id
                                        const regionLoad = Math.min(
                                            96,
                                            Math.max(
                                                12,
                                                Math.round(
                                                    region.baseLoad *
                                                        (0.75 + (concurrency / 1024) * 0.5)
                                                )
                                            )
                                        )
                                        const regionLatency = Math.max(
                                            4,
                                            Math.round(
                                                region.baseLatency +
                                                    strategyLatencyDelta +
                                                    cachePenalty
                                            )
                                        )

                                        return (
                                            <button
                                                key={region.id}
                                                type="button"
                                                className="mr-showcase__region-row"
                                                aria-pressed={isSelected}
                                                data-active={isSelected ? 'true' : 'false'}
                                                onClick={() => {
                                                    setSelectedRegionId(region.id)
                                                    setSynced(false)
                                                }}
                                            >
                                                <span className="mr-showcase__region-id">
                                                    <span className="mr-showcase__region-code">
                                                        {region.code}
                                                    </span>
                                                    <span className="mr-showcase__region-city">
                                                        {region.city}
                                                    </span>
                                                </span>

                                                <Progress
                                                    className="mr-showcase__region-progress"
                                                    value={regionLoad}
                                                    max={100}
                                                    showValue={false}
                                                    tone={isSelected ? 'accent' : 'neutral'}
                                                    aria-label={matrix.telemetry.loadAria(
                                                        region.code
                                                    )}
                                                />

                                                <span className="mr-showcase__region-latency">
                                                    {regionLatency} ms
                                                </span>
                                            </button>
                                        )
                                    })
                                )}
                            </div>
                        </Card.Content>
                    </Card>

                    {/* Panneau droit : politique interactive (SegmentedControl, Slider, Switch, Button) */}
                    <Card padding="md" className="mr-showcase__panel">
                        <Card.Header>
                            <div className="mr-showcase__card-heading">
                                <Card.Title>{matrix.policy.title}</Card.Title>
                                <Card.Description>{matrix.policy.subtitle}</Card.Description>
                            </div>
                            <Badge tone="neutral" size="sm">
                                {matrix.policy.badge}
                            </Badge>
                        </Card.Header>

                        <Card.Content>
                            <div className="mr-showcase__field-group">
                                <span className="mr-showcase__field-label">
                                    {matrix.policy.strategyLabel}
                                </span>
                                <SegmentedControl
                                    size="sm"
                                    fullWidth
                                    aria-label={matrix.policy.strategyLabel}
                                    value={strategy}
                                    options={strategyOptions}
                                    onChange={(val) => {
                                        setStrategy(val as RoutingStrategy)
                                        setSynced(false)
                                    }}
                                />
                            </div>

                            <Slider
                                size="sm"
                                tone="accent"
                                label={matrix.policy.concurrencyLabel}
                                min={128}
                                max={1024}
                                step={64}
                                value={concurrency}
                                onValueChange={(val: number) => {
                                    setConcurrency(val)
                                    setSynced(false)
                                }}
                                showValue
                            />

                            <hr className="mr-showcase__divider" />

                            <div className="mr-showcase__switches">
                                <Switch
                                    size="sm"
                                    tone="accent"
                                    label={matrix.policy.cacheLabel}
                                    hint={matrix.policy.cacheHint}
                                    checked={edgeCache}
                                    onChange={(e) => {
                                        setEdgeCache(e.target.checked)
                                        setSynced(false)
                                    }}
                                />
                                <Switch
                                    size="sm"
                                    tone="accent"
                                    label={matrix.policy.isolationLabel}
                                    hint={matrix.policy.isolationHint}
                                    checked={strictIsolation}
                                    onChange={(e) => {
                                        setStrictIsolation(e.target.checked)
                                        setSynced(false)
                                    }}
                                />
                            </div>
                        </Card.Content>

                        <Card.Footer>
                            <output className="mr-showcase__footer-status" aria-live="polite">
                                <span
                                    className="mr-showcase__footer-dot"
                                    data-synced={synced ? 'true' : 'false'}
                                    aria-hidden="true"
                                />
                                <span>
                                    {synced
                                        ? matrix.policy.statusSynced
                                        : matrix.policy.statusReady}
                                </span>
                            </output>

                            <div className="mr-showcase__footer-actions">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={isDefaultState && !synced}
                                    onClick={handleReset}
                                >
                                    {matrix.policy.reset}
                                </Button>
                                <Button variant="primary" size="sm" onClick={() => setSynced(true)}>
                                    {synced ? matrix.policy.applied : matrix.policy.apply}
                                </Button>
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
            </ThemeScope>

            <figcaption className="mr-showcase__sr-only">{matrix.figcaption}</figcaption>
        </figure>
    )
}
