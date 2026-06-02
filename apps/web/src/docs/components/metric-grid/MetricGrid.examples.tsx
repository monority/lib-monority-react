import { MetricGrid } from '@monority/ui/metric-grid'

export function MetricGridBasicExample() {
    return (
        <MetricGrid
            items={[
                {
                    key: 'revenue',
                    label: 'Revenue',
                    value: '$12,340',
                    trend: '+12%',
                    trendTone: 'success',
                    description: 'Recognized this month',
                },
                {
                    key: 'users',
                    label: 'Active users',
                    value: '1,234',
                    trend: '+8%',
                    trendTone: 'success',
                    description: 'Last 30 days',
                },
                {
                    key: 'orders',
                    label: 'Orders',
                    value: '456',
                    trend: '-3%',
                    trendTone: 'danger',
                    description: 'Needs attention',
                },
                {
                    key: 'conversion',
                    label: 'Conversion',
                    value: '3.2%',
                    trend: '+0.5%',
                    trendTone: 'success',
                    description: 'Checkout funnel',
                },
            ]}
        />
    )
}

export function MetricGridRevenueExample() {
    return (
        <MetricGrid
            items={[
                {
                    key: 'revenue',
                    label: 'Revenue',
                    value: '$45,678',
                    trend: '+18%',
                    trendTone: 'success',
                    description: 'Net revenue after refunds',
                },
            ]}
        />
    )
}

export function MetricGridRiskExample() {
    return (
        <MetricGrid
            items={[
                {
                    key: 'churn',
                    label: 'Churn risk',
                    value: '2.1%',
                    trend: '+0.3%',
                    trendTone: 'danger',
                    description: 'Accounts requiring follow-up',
                },
            ]}
        />
    )
}

export function MetricGridHealthExample() {
    return (
        <MetricGrid
            items={[
                {
                    key: 'nps',
                    label: 'NPS score',
                    value: '72',
                    trend: '+5',
                    trendTone: 'success',
                    description: 'Latest survey window',
                },
            ]}
        />
    )
}
