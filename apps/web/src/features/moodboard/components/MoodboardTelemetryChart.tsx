import {
    Badge,
    BadgeDelta,
    type BadgeDeltaType,
    Button,
    Card,
    SegmentedControl,
    Text,
} from '@monority/ui'
import { useEffect, useRef, useState } from 'react'

type PeriodKey = '15m' | '1h' | '24h' | '7d'

interface ChartPoint {
    time: string
    ingress: number
    egress: number
    x: number
    ingressY: number
    egressY: number
}

interface PeriodData {
    period: PeriodKey
    metric: string
    peak: string
    delta: string
    deltaType: BadgeDeltaType
    points: ChartPoint[]
    xLabels: { x: number; text: string }[]
}

const toY = (val: number) => Math.round(170 - (val / 200) * 145)

function createPoints(
    timeLabels: string[],
    ingressVals: number[],
    egressVals: number[]
): ChartPoint[] {
    const xMin = 50
    const xMax = 790
    const count = timeLabels.length
    return timeLabels.map((time, i) => {
        const x = Math.round(xMin + (i / (count - 1)) * (xMax - xMin))
        const ingress = ingressVals[i] ?? 100
        const egress = egressVals[i] ?? 60
        return {
            time,
            ingress,
            egress,
            x,
            ingressY: toY(ingress),
            egressY: toY(egress),
        }
    })
}

function createSmoothPath(pts: { x: number; y: number }[]): string {
    if (pts.length === 0) return ''
    const p0 = pts[0]
    if (!p0) return ''
    if (pts.length === 1) return `M ${p0.x},${p0.y}`

    let d = `M ${p0.x},${p0.y}`
    for (let i = 0; i < pts.length - 1; i++) {
        const curr = pts[i]
        const next = pts[i + 1]
        if (!curr || !next) continue

        const prev = pts[i - 1] ?? curr
        const afterNext = pts[i + 2] ?? next

        const cp1x = curr.x + (next.x - prev.x) / 6
        const cp1y = curr.y + (next.y - prev.y) / 6
        const cp2x = next.x - (afterNext.x - curr.x) / 6
        const cp2y = next.y - (afterNext.y - curr.y) / 6

        d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${next.x.toFixed(1)},${next.y.toFixed(1)}`
    }
    return d
}

const telemetryDatasets: Record<PeriodKey, PeriodData> = {
    '15m': {
        period: '15m',
        metric: '158.4 GB/s',
        peak: 'Peak: 164.2 GB/s at 15:41 UTC',
        delta: '+6.2%',
        deltaType: 'increase',
        points: createPoints(
            ['15:30', '15:32', '15:34', '15:36', '15:38', '15:40', '15:42', '15:44', '15:45'],
            [138, 142, 148, 155, 152, 164, 160, 156, 158],
            [88, 92, 95, 102, 98, 108, 105, 101, 104]
        ),
        xLabels: [
            { x: 50, text: '15:30' },
            { x: 235, text: '15:34' },
            { x: 420, text: '15:38' },
            { x: 605, text: '15:42' },
            { x: 790, text: 'Live' },
        ],
    },
    '1h': {
        period: '1h',
        metric: '142.8 GB/s',
        peak: 'Peak: 156.4 GB/s at 15:40 UTC',
        delta: '+18.4%',
        deltaType: 'increase',
        points: createPoints(
            ['14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00'],
            [112, 125, 118, 134, 145, 138, 156, 148, 142],
            [70, 78, 74, 86, 94, 88, 102, 95, 90]
        ),
        xLabels: [
            { x: 50, text: '14:00' },
            { x: 235, text: '14:30' },
            { x: 420, text: '15:00' },
            { x: 605, text: '15:30' },
            { x: 790, text: 'Live' },
        ],
    },
    '24h': {
        period: '24h',
        metric: '119.5 GB/s',
        peak: 'Peak: 182.1 GB/s at 14:15 UTC',
        delta: '+4.1%',
        deltaType: 'moderate-increase',
        points: createPoints(
            ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
            [78, 65, 82, 140, 165, 182, 154, 128, 119],
            [48, 40, 52, 90, 105, 118, 98, 80, 75]
        ),
        xLabels: [
            { x: 50, text: '00:00' },
            { x: 235, text: '06:00' },
            { x: 420, text: '12:00' },
            { x: 605, text: '18:00' },
            { x: 790, text: '24:00' },
        ],
    },
    '7d': {
        period: '7d',
        metric: '128.2 GB/s',
        peak: 'Peak: 194.8 GB/s on Thu',
        delta: '+12.8%',
        deltaType: 'increase',
        points: createPoints(
            ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            [115, 130, 148, 194, 162, 105, 128],
            [72, 84, 96, 124, 102, 68, 82]
        ),
        xLabels: [
            { x: 50, text: 'Mon' },
            { x: 173, text: 'Tue' },
            { x: 296, text: 'Wed' },
            { x: 420, text: 'Thu' },
            { x: 543, text: 'Fri' },
            { x: 666, text: 'Sat' },
            { x: 790, text: 'Sun' },
        ],
    },
}

export function MoodboardTelemetryChart() {
    const [period, setPeriod] = useState<PeriodKey>('1h')
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [isStreaming, setIsStreaming] = useState(false)
    const [currentDatasets, setCurrentDatasets] = useState(telemetryDatasets)
    const svgRef = useRef<SVGSVGElement>(null)

    const dataset = currentDatasets[period]
    const defaultIndex = Math.max(0, dataset.points.length - 2)
    const activeIndex = hoverIndex !== null ? hoverIndex : defaultIndex
    const activePoint: ChartPoint = dataset.points[activeIndex] ??
        dataset.points[0] ?? {
            time: 'Live',
            ingress: 142,
            egress: 90,
            x: 790,
            ingressY: toY(142),
            egressY: toY(90),
        }

    // Optional streaming animation
    useEffect(() => {
        if (!isStreaming) return
        const interval = setInterval(() => {
            setCurrentDatasets((prev) => {
                const targetDataset = prev[period]
                const currentPts = [...targetDataset.points]
                const lastIdx = currentPts.length - 1
                const lastPt = currentPts[lastIdx]
                if (!lastPt) return prev

                const delta = (Math.random() - 0.48) * 4
                const newIngress = Math.round(Math.max(100, Math.min(190, lastPt.ingress + delta)))
                const newEgress = Math.round(newIngress * 0.62)
                currentPts[lastIdx] = {
                    ...lastPt,
                    ingress: newIngress,
                    egress: newEgress,
                    ingressY: toY(newIngress),
                    egressY: toY(newEgress),
                }
                return {
                    ...prev,
                    [period]: {
                        ...targetDataset,
                        metric: `${newIngress.toFixed(1)} GB/s`,
                        points: currentPts,
                    },
                }
            })
        }, 1800)
        return () => clearInterval(interval)
    }, [isStreaming, period])

    const ingressCurve = createSmoothPath(dataset.points.map((p) => ({ x: p.x, y: p.ingressY })))
    const egressCurve = createSmoothPath(dataset.points.map((p) => ({ x: p.x, y: p.egressY })))

    const firstPt = dataset.points[0]
    const lastPt = dataset.points[dataset.points.length - 1]
    const ingressArea =
        firstPt && lastPt ? `${ingressCurve} L ${lastPt.x},170 L ${firstPt.x},170 Z` : ''
    const egressArea =
        firstPt && lastPt ? `${egressCurve} L ${lastPt.x},170 L ${firstPt.x},170 Z` : ''

    const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
        if (!svgRef.current) return
        const rect = svgRef.current.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const svgX = (mouseX / rect.width) * 800

        let closestIdx = 0
        let minDiff = Number.POSITIVE_INFINITY
        dataset.points.forEach((pt, i) => {
            const diff = Math.abs(pt.x - svgX)
            if (diff < minDiff) {
                minDiff = diff
                closestIdx = i
            }
        })
        setHoverIndex(closestIdx)
    }

    const handlePointerLeave = () => {
        setHoverIndex(null)
    }

    const tooltipX = Math.max(85, Math.min(715, activePoint.x))
    const tooltipY = Math.max(22, activePoint.ingressY - 14)

    return (
        <Card padding="lg" data-testid="moodboard-chart">
            <Card.Header>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: 'var(--mr-space-3)',
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--mr-space-2)',
                            }}
                        >
                            <Card.Title>Network Throughput & Edge Telemetry</Card.Title>
                            <Badge variant="success" size="sm">
                                <span
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 'var(--mr-space-1)',
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: 'currentColor',
                                            display: 'inline-block',
                                        }}
                                    />
                                    Live Feed
                                </span>
                            </Badge>
                        </div>
                        <Card.Description>
                            Bidirectional packet stream across 14 regional edge points of presence
                        </Card.Description>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--mr-space-3)',
                            flexWrap: 'wrap',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--mr-space-1)',
                                fontSize: '0.8125rem',
                                color: 'var(--mr-text-secondary)',
                            }}
                        >
                            <span
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--mr-chart-1, var(--mr-accent-solid))',
                                    display: 'inline-block',
                                }}
                            />
                            Ingress
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--mr-space-1)',
                                fontSize: '0.8125rem',
                                color: 'var(--mr-text-secondary)',
                            }}
                        >
                            <span
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--mr-chart-2)',
                                    display: 'inline-block',
                                }}
                            />
                            Egress
                        </div>
                        <BadgeDelta deltaType={dataset.deltaType} size="sm">
                            {dataset.delta}
                        </BadgeDelta>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 'var(--mr-space-2)',
                        marginTop: 'var(--mr-space-3)',
                        paddingTop: 'var(--mr-space-3)',
                        borderTop: '1px solid var(--mr-border-subtle)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 'var(--mr-space-2)',
                        }}
                    >
                        <span
                            style={{
                                fontFamily: 'var(--mr-font-family-mono)',
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: 'var(--mr-text-primary)',
                                letterSpacing: '-0.02em',
                                fontVariantNumeric: 'tabular-nums',
                            }}
                        >
                            {dataset.metric}
                        </span>
                        <Text tone="muted" size="sm">
                            {dataset.peak}
                        </Text>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--mr-space-2)',
                        }}
                    >
                        <Button
                            variant={isStreaming ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setIsStreaming(!isStreaming)}
                        >
                            {isStreaming ? 'Pause Stream' : 'Live Stream'}
                        </Button>
                        <SegmentedControl
                            size="sm"
                            value={period}
                            onChange={(val) => setPeriod(val as PeriodKey)}
                            options={[
                                { value: '15m', label: '15m' },
                                { value: '1h', label: '1h' },
                                { value: '24h', label: '24h' },
                                { value: '7d', label: '7d' },
                            ]}
                        />
                    </div>
                </div>
            </Card.Header>

            <Card.Content>
                <div style={{ width: '100%', overflowX: 'hidden' }}>
                    <svg
                        ref={svgRef}
                        viewBox="0 0 800 220"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            overflow: 'visible',
                            cursor: 'crosshair',
                            touchAction: 'none',
                        }}
                        aria-label="Network telemetry area chart"
                        role="img"
                        onPointerMove={handlePointerMove}
                        onPointerLeave={handlePointerLeave}
                    >
                        <defs>
                            <style>{`
                                @keyframes mr-chart-fade {
                                    from { opacity: 0.35; }
                                    to { opacity: 1; }
                                }
                                .mr-chart-series-group {
                                    animation: mr-chart-fade 0.28s ease-out;
                                }
                            `}</style>
                            <linearGradient id="mr-chart-grad-ingress" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="var(--mr-chart-1, var(--mr-accent-solid))"
                                    stopOpacity="0.25"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="var(--mr-chart-1, var(--mr-accent-solid))"
                                    stopOpacity="0.0"
                                />
                            </linearGradient>
                            <linearGradient id="mr-chart-grad-egress" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="var(--mr-chart-2)"
                                    stopOpacity="0.12"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="var(--mr-chart-2)"
                                    stopOpacity="0.0"
                                />
                            </linearGradient>
                        </defs>

                        {/* Horizontal Grid lines and Y labels */}
                        <g>
                            <line
                                x1="40"
                                y1="35"
                                x2="790"
                                y2="35"
                                stroke="var(--mr-border-subtle)"
                                strokeOpacity="0.25"
                                strokeDasharray="2 3"
                                strokeWidth="1"
                            />
                            <text
                                x="35"
                                y="39"
                                textAnchor="end"
                                fontSize="10"
                                fill="var(--mr-text-tertiary)"
                                fontFamily="var(--mr-font-family-mono)"
                            >
                                150G
                            </text>

                            <line
                                x1="40"
                                y1="80"
                                x2="790"
                                y2="80"
                                stroke="var(--mr-border-subtle)"
                                strokeOpacity="0.25"
                                strokeDasharray="2 3"
                                strokeWidth="1"
                            />
                            <text
                                x="35"
                                y="84"
                                textAnchor="end"
                                fontSize="10"
                                fill="var(--mr-text-tertiary)"
                                fontFamily="var(--mr-font-family-mono)"
                            >
                                100G
                            </text>

                            <line
                                x1="40"
                                y1="125"
                                x2="790"
                                y2="125"
                                stroke="var(--mr-border-subtle)"
                                strokeOpacity="0.25"
                                strokeDasharray="2 3"
                                strokeWidth="1"
                            />
                            <text
                                x="35"
                                y="129"
                                textAnchor="end"
                                fontSize="10"
                                fill="var(--mr-text-tertiary)"
                                fontFamily="var(--mr-font-family-mono)"
                            >
                                50G
                            </text>

                            <line
                                x1="40"
                                y1="170"
                                x2="790"
                                y2="170"
                                stroke="var(--mr-border-default)"
                                strokeOpacity="0.4"
                                strokeWidth="1"
                            />
                            <text
                                x="35"
                                y="174"
                                textAnchor="end"
                                fontSize="10"
                                fill="var(--mr-text-tertiary)"
                                fontFamily="var(--mr-font-family-mono)"
                            >
                                0G
                            </text>
                        </g>

                        {/* Series Curves Group keyed by period for smooth animated entry */}
                        <g key={period} className="mr-chart-series-group">
                            {/* Egress Series (secondary, dashed curve) */}
                            {egressArea && (
                                <path
                                    d={egressArea}
                                    fill="url(#mr-chart-grad-egress)"
                                />
                            )}
                            {egressCurve && (
                                <path
                                    d={egressCurve}
                                    fill="none"
                                    stroke="var(--mr-chart-2)"
                                    strokeWidth="1.75"
                                    strokeDasharray="4 3"
                                />
                            )}

                            {/* Ingress Series (primary, smooth area curve) */}
                            {ingressArea && (
                                <path
                                    d={ingressArea}
                                    fill="url(#mr-chart-grad-ingress)"
                                />
                            )}
                            {ingressCurve && (
                                <path
                                    d={ingressCurve}
                                    fill="none"
                                    stroke="var(--mr-chart-1, var(--mr-accent-solid))"
                                    strokeWidth="2"
                                />
                            )}
                        </g>

                        {/* Active Scrubber Marker */}
                        <line
                            x1={activePoint.x}
                            y1="22"
                            x2={activePoint.x}
                            y2="170"
                            stroke="var(--mr-border-default)"
                            strokeOpacity="0.5"
                            strokeDasharray="3 3"
                        />
                        {/* Egress Marker dot */}
                        <circle
                            cx={activePoint.x}
                            cy={activePoint.egressY}
                            r="5"
                            fill="var(--mr-chart-2)"
                            fillOpacity="0.25"
                        />
                        <circle
                            cx={activePoint.x}
                            cy={activePoint.egressY}
                            r="3"
                            fill="var(--mr-chart-2)"
                            stroke="var(--mr-bg-surface)"
                            strokeWidth="1.5"
                        />
                        {/* Ingress Marker dot */}
                        <circle
                            cx={activePoint.x}
                            cy={activePoint.ingressY}
                            r="7"
                            fill="var(--mr-chart-1, var(--mr-accent-solid))"
                            fillOpacity="0.25"
                        />
                        <circle
                            cx={activePoint.x}
                            cy={activePoint.ingressY}
                            r="4"
                            fill="var(--mr-chart-1, var(--mr-accent-solid))"
                            stroke="var(--mr-bg-surface)"
                            strokeWidth="2"
                        />

                        {/* Interactive Tooltip Pin */}
                        <g transform={`translate(${tooltipX - 75}, ${tooltipY - 26})`}>
                            <rect
                                x="0"
                                y="0"
                                width="150"
                                height="24"
                                rx="4"
                                fill="var(--mr-bg-overlay)"
                                stroke="var(--mr-border-default)"
                                strokeWidth="1"
                            />
                            <text
                                x="75"
                                y="16"
                                textAnchor="middle"
                                fontSize="11"
                                fontWeight="600"
                                fill="var(--mr-text-primary)"
                                fontFamily="var(--mr-font-family-mono)"
                            >
                                {activePoint.time} · {activePoint.ingress} GB/s
                            </text>
                        </g>

                        {/* X-axis Timestamps */}
                        <g
                            fontSize="11"
                            fill="var(--mr-text-tertiary)"
                            fontFamily="var(--mr-font-family-mono)"
                        >
                            {dataset.xLabels.map((lbl, idx) => (
                                <text
                                    key={lbl.text}
                                    x={lbl.x}
                                    y="194"
                                    textAnchor={
                                        idx === 0
                                            ? 'start'
                                            : idx === dataset.xLabels.length - 1
                                              ? 'end'
                                              : 'middle'
                                    }
                                >
                                    {lbl.text}
                                </text>
                            ))}
                        </g>
                    </svg>
                </div>
            </Card.Content>
        </Card>
    )
}
