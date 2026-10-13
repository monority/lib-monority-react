export interface ChartDayItem {
    label: string
    values: number[]
}

export interface MiniBarChartProps {
    data: ChartDayItem[]
    palette?: readonly string[]
}

const defaultPalette = ['var(--mr-chart-1)', 'var(--mr-chart-2)', 'var(--mr-chart-3)'] as const

export function MiniBarChart({ data, palette = defaultPalette }: MiniBarChartProps) {
    return (
        <div
            data-testid="moodboard-chart"
            aria-label="Bar chart visualization"
            style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 'var(--mr-space-2)',
                minInlineSize: 0,
                blockSize: '160px',
            }}
        >
            {data.map((day) => (
                <div
                    key={day.label}
                    style={{
                        display: 'grid',
                        gap: 'var(--mr-space-1)',
                        flex: '1 1 0',
                        minInlineSize: 0,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: '2px',
                            minInlineSize: 0,
                            blockSize: '140px',
                        }}
                    >
                        {day.values.map((v, i) => (
                            <div
                                key={i}
                                style={{
                                    flex: '1 1 0',
                                    minInlineSize: '2px',
                                    minBlockSize: '2px',
                                    height: `${v}%`,
                                    backgroundColor: palette[i % palette.length],
                                    borderRadius: 'var(--mr-radius-sm)',
                                    transition: 'height var(--mr-duration-state, 150ms) ease',
                                }}
                            />
                        ))}
                    </div>
                    <span
                        style={{
                            overflow: 'hidden',
                            color: 'var(--mr-text-secondary)',
                            fontSize: 'var(--mr-font-size-xs)',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {day.label}
                    </span>
                </div>
            ))}
        </div>
    )
}
