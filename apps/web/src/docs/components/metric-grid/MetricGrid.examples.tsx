import { MetricGrid } from '@monority/ui'

export function MetricGridBasicExample() {
  return (
    <>
      <MetricGrid>Example</MetricGrid>
    </>
  )
}

export function MetricGridWithItemsExample() {
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
