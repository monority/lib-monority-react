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
            className="moodboard-chart"
            data-testid="moodboard-chart"
            aria-label="Bar chart visualization"
        >
            {data.map((day) => (
                <div key={day.label} className="moodboard-chart__bar-group">
                    <div className="moodboard-chart__bars">
                        {day.values.map((v, i) => (
                            <div
                                key={i}
                                className="moodboard-chart__segment"
                                style={{
                                    height: `${v}%`,
                                    backgroundColor: palette[i % palette.length],
                                }}
                            />
                        ))}
                    </div>
                    <span className="moodboard-chart__label">{day.label}</span>
                </div>
            ))}
        </div>
    )
}
