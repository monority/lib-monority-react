import { StatCard } from '@monority/ui'

export function StatCardBasicExample() {
  return <StatCard label="Revenue" value="$12,340" trend="+12%" trendTone="success" />
}

export function StatCardTonesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <StatCard label="Revenue" value="$12,340" trend="+12%" trendTone="success" />
      <StatCard label="Churn" value="2.1%" trend="+0.3%" trendTone="danger" />
      <StatCard label="Stable" value="1,234" trend="0%" trendTone="neutral" />
    </div>
  )
}

export function StatCardWithIconExample() {
  return (
    <StatCard
      label="Users"
      value="1,234"
      trend="+8%"
      trendTone="success"
      icon={<span style={{ fontSize: '1.5rem' }}>{'\uD83D\uDC65'}</span>}
    />
  )
}

export function StatCardWithFooterExample() {
  return (
    <StatCard
      label="Orders"
      value="456"
      description="Last 30 days"
      footer={<span style={{ fontSize: '0.75rem', color: 'var(--mr-fg-muted)' }}>Updated 5 min ago</span>}
    />
  )
}

export function StatCardLongTextExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <StatCard
        label="Total Revenue Generated This Quarter"
        value="$1,234,567.89"
        trend="+23.5% compared to last quarter"
        trendTone="success"
      />
      <StatCard
        label="Active Subscriptions"
        value="98,765"
        description="Includes trial and paid plans across all regions"
        trend="+1,234 this month"
        trendTone="success"
      />
    </div>
  )
}
