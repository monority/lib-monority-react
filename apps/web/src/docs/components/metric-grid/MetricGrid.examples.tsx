import { MetricGrid } from '@monority/ui'

export function MetricGridBasicExample() {
  return (
    <MetricGrid
      items={[
        { key: 'revenue', label: 'Revenue', value: '$12,340', trend: '+12%', trendTone: 'success' },
        { key: 'users', label: 'Users', value: '1,234', trend: '+8%', trendTone: 'success' },
        { key: 'orders', label: 'Orders', value: '456', trend: '-3%', trendTone: 'danger' },
        { key: 'conversion', label: 'Conversion', value: '3.2%', trend: '+0.5%', trendTone: 'success' },
      ]}
    />
  )
}

export function MetricGridWithColorsExample() {
  return (
    <MetricGrid
      items={[
        { key: 'revenue', label: 'Revenue', value: '$45,678', trend: '+18%', trendTone: 'success' },
        { key: 'churn', label: 'Churn Rate', value: '2.1%', trend: '+0.3%', trendTone: 'danger' },
        { key: 'nps', label: 'NPS Score', value: '72', trend: '+5', trendTone: 'success' },
      ]}
    />
  )
}

export function MetricGridWithDescriptionExample() {
  return (
    <MetricGrid
      items={[
        { key: 'users', label: 'Active Users', value: '12,345', trend: '+8%', trendTone: 'success', description: 'Last 30 days' },
        { key: 'sessions', label: 'Sessions', value: '45,678', trend: '+12%', trendTone: 'success', description: 'Last 30 days' },
        { key: 'bounce', label: 'Bounce Rate', value: '32%', trend: '-2%', trendTone: 'danger', description: 'Last 30 days' },
      ]}
    />
  )
}
