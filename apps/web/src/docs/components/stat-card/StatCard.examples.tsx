import { StatCard } from '@monority/ui/stat-card'

export function StatCardBasicExample() {
    return (
        <StatCard
            label="Net revenue"
            value="$128,420"
            trend="+8.4% vs last month"
            trendTone="success"
            description="Closed revenue across paid workspaces."
        />
    )
}

export function StatCardTonesExample() {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
                gap: '1rem',
            }}
        >
            <StatCard
                label="Pipeline"
                value="$842k"
                trend="+14 qualified deals"
                trendTone="success"
            />
            <StatCard
                label="Incident rate"
                value="0.18%"
                trend="-0.04 points"
                trendTone="success"
            />
            <StatCard
                label="Overdue tasks"
                value="23"
                trend="+6 since Friday"
                trendTone="warning"
            />
            <StatCard label="Failed jobs" value="17" trend="+3 in 24h" trendTone="danger" />
        </div>
    )
}

export function StatCardWithIconExample() {
    return (
        <StatCard
            label="Active seats"
            value="1,284"
            trend="+72 this week"
            trendTone="success"
            description="Billable seats with activity in the current cycle."
            icon={<span aria-hidden="true">AS</span>}
        />
    )
}

export function StatCardWithFooterExample() {
    return (
        <StatCard
            label="Open reviews"
            value="46"
            description="Pull requests waiting for owner approval."
            footer={
                <span style={{ fontSize: '0.75rem', color: 'var(--mr-fg-muted)' }}>
                    Updated 5 minutes ago
                </span>
            }
        />
    )
}

export function StatCardLongTextExample() {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
                gap: '1rem',
            }}
        >
            <StatCard
                label="Quarterly recognized revenue"
                value="$1,234,567.89"
                trend="+23.5% vs previous quarter"
                trendTone="success"
            />
            <StatCard
                label="Backlog items requiring product decision"
                value="1,472"
                description="Includes requests tagged design review, customer escalation, or compliance."
                trend="+118 added this month"
                trendTone="warning"
            />
        </div>
    )
}
