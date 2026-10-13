import { MetricGrid } from '@monority/ui'

const metricsData = [
    {
        key: 'requests',
        label: 'REQUESTS / MIN',
        value: '98.4%',
        trend: '+4.8%',
        trendTone: 'success' as const,
    },
    {
        key: 'latency',
        label: 'P95 LATENCY',
        value: '84 ms',
        trend: '-12 ms',
        trendTone: 'success' as const,
    },
    {
        key: 'errors',
        label: 'ERROR RATE',
        value: '0.02%',
        trend: '-0.01%',
        trendTone: 'success' as const,
    },
]

export function MoodboardMetricOverview() {
    return <MetricGrid className="moodboard-metrics" items={metricsData} />
}
