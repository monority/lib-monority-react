import { Badge, BadgeDelta, Card, SegmentedControl, Text, Title } from '@monority/ui'

export function MoodboardTelemetryChart() {
    return (
        <Card padding="md" data-testid="moodboard-chart">
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
                            <Title as="h3" size="sm">
                                Network Throughput & Edge Telemetry
                            </Title>
                            <Badge variant="success" size="sm">
                                Live Feed
                            </Badge>
                        </div>
                        <Text tone="muted" size="sm">
                            Bidirectional packet stream across 14 regional edge points of presence
                        </Text>
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
                                    backgroundColor: 'var(--mr-chart-1)',
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
                        <BadgeDelta deltaType="increase" size="sm">
                            +18.4%
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
                            }}
                        >
                            142.8 GB/s
                        </span>
                        <Text tone="muted" size="sm">
                            Peak: 156.4 GB/s at 15:40 UTC
                        </Text>
                    </div>

                    <SegmentedControl
                        size="sm"
                        defaultValue="1h"
                        options={[
                            { value: '15m', label: '15m' },
                            { value: '1h', label: '1h' },
                            { value: '24h', label: '24h' },
                            { value: '7d', label: '7d' },
                        ]}
                    />
                </div>
            </Card.Header>

            <Card.Content>
                <div style={{ width: '100%', overflowX: 'hidden' }}>
                    <svg
                        viewBox="0 0 800 220"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            overflow: 'visible',
                        }}
                        aria-label="Network telemetry area chart"
                        role="img"
                    >
                        <defs>
                            <linearGradient id="mr-chart-grad-ingress" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="var(--mr-chart-1)"
                                    stopOpacity="0.45"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="var(--mr-chart-1)"
                                    stopOpacity="0.0"
                                />
                            </linearGradient>
                            <linearGradient id="mr-chart-grad-egress" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="var(--mr-chart-2)"
                                    stopOpacity="0.30"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="var(--mr-chart-2)"
                                    stopOpacity="0.0"
                                />
                            </linearGradient>
                        </defs>

                        {/* Horizontal Grid lines and Y labels */}
                        <g opacity="0.7">
                            <line
                                x1="40"
                                y1="35"
                                x2="790"
                                y2="35"
                                stroke="var(--mr-border-subtle)"
                                strokeDasharray="4 4"
                            />
                            <text
                                x="35"
                                y="38"
                                textAnchor="end"
                                fontSize="11"
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
                                strokeDasharray="4 4"
                            />
                            <text
                                x="35"
                                y="83"
                                textAnchor="end"
                                fontSize="11"
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
                                strokeDasharray="4 4"
                            />
                            <text
                                x="35"
                                y="128"
                                textAnchor="end"
                                fontSize="11"
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
                                stroke="var(--mr-border-subtle)"
                            />
                            <text
                                x="35"
                                y="173"
                                textAnchor="end"
                                fontSize="11"
                                fill="var(--mr-text-tertiary)"
                                fontFamily="var(--mr-font-family-mono)"
                            >
                                0G
                            </text>
                        </g>

                        {/* Egress Series (secondary, dashed curve) */}
                        <path
                            d="M 50,165 C 100,160 140,170 200,150 C 260,130 300,140 360,120 C 420,100 460,125 520,105 C 580,90 620,110 680,85 C 720,75 750,90 790,70 L 790,170 L 50,170 Z"
                            fill="url(#mr-chart-grad-egress)"
                        />
                        <path
                            d="M 50,165 C 100,160 140,170 200,150 C 260,130 300,140 360,120 C 420,100 460,125 520,105 C 580,90 620,110 680,85 C 720,75 750,90 790,70"
                            fill="none"
                            stroke="var(--mr-chart-2)"
                            strokeWidth="2"
                            strokeDasharray="4 3"
                        />

                        {/* Ingress Series (primary, smooth area curve) */}
                        <path
                            d="M 50,145 C 100,135 140,155 200,115 C 260,75 300,100 360,65 C 420,30 460,75 520,45 C 580,18 620,55 680,32 C 720,18 750,35 790,26 L 790,170 L 50,170 Z"
                            fill="url(#mr-chart-grad-ingress)"
                        />
                        <path
                            d="M 50,145 C 100,135 140,155 200,115 C 260,75 300,100 360,65 C 420,30 460,75 520,45 C 580,18 620,55 680,32 C 720,18 750,35 790,26"
                            fill="none"
                            stroke="var(--mr-chart-1)"
                            strokeWidth="2.5"
                        />

                        {/* Active Data Point marker at x=680, y=32 */}
                        <line
                            x1="680"
                            y1="22"
                            x2="680"
                            y2="170"
                            stroke="var(--mr-border-default)"
                            strokeDasharray="3 3"
                        />
                        <circle
                            cx="680"
                            cy="32"
                            r="8"
                            fill="var(--mr-chart-1)"
                            fillOpacity="0.25"
                        />
                        <circle
                            cx="680"
                            cy="32"
                            r="4.5"
                            fill="var(--mr-chart-1)"
                            stroke="var(--mr-bg-surface)"
                            strokeWidth="2"
                        />

                        {/* Sleek Tooltip Pin */}
                        <g transform="translate(610, 6)">
                            <rect
                                x="0"
                                y="0"
                                width="140"
                                height="24"
                                rx="4"
                                fill="var(--mr-bg-surface)"
                                stroke="var(--mr-border-subtle)"
                            />
                            <text
                                x="70"
                                y="16"
                                textAnchor="middle"
                                fontSize="11"
                                fontWeight="600"
                                fill="var(--mr-text-primary)"
                                fontFamily="var(--mr-font-family-mono)"
                            >
                                15:40 — 142.8 GB/s
                            </text>
                        </g>

                        {/* X-axis Timestamps */}
                        <g
                            fontSize="11"
                            fill="var(--mr-text-tertiary)"
                            fontFamily="var(--mr-font-family-mono)"
                        >
                            <text x="50" y="194" textAnchor="middle">
                                14:00
                            </text>
                            <text x="155" y="194" textAnchor="middle">
                                14:20
                            </text>
                            <text x="260" y="194" textAnchor="middle">
                                14:40
                            </text>
                            <text x="365" y="194" textAnchor="middle">
                                15:00
                            </text>
                            <text x="470" y="194" textAnchor="middle">
                                15:20
                            </text>
                            <text x="575" y="194" textAnchor="middle">
                                15:40
                            </text>
                            <text x="680" y="194" textAnchor="middle">
                                16:00
                            </text>
                            <text x="785" y="194" textAnchor="end">
                                Live
                            </text>
                        </g>
                    </svg>
                </div>
            </Card.Content>
        </Card>
    )
}
