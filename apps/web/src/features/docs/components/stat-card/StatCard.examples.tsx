import { Grid } from '@monority/ui/grid'
import { StatCard } from '@monority/ui/stat-card'
import { Text } from '@monority/ui/text'

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
        <Grid columns="auto-fit" gap="md">
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
        </Grid>
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
            icon={<Text.Span aria-hidden="true">AS</Text.Span>}
        />
    )
}

export function StatCardWithFooterExample() {
    return (
        <StatCard
            label="Open reviews"
            value="46"
            description="Pull requests waiting for owner approval."
            footer={<Text.Small>Updated 5 minutes ago</Text.Small>}
        />
    )
}

export function StatCardLongTextExample() {
    return (
        <Grid columns="auto-fit" gap="md">
            <StatCard
                data-testid="stat-card-long-title"
                label="Quarterly recognized revenue"
                value="$1,234,567.89"
                trend="+23.5% vs previous quarter"
                trendTone="success"
                icon={<Text.Span>QR</Text.Span>}
            />
            <StatCard
                label="Backlog items requiring product decision"
                value="1,472"
                description="Includes requests tagged design review, customer escalation, or compliance."
                trend="+118 added this month"
                trendTone="warning"
            />
        </Grid>
    )
}

export function StatCardCompoundExample() {
    return (
        <StatCard>
            <StatCard.Header>
                <StatCard.Label>Cloud Spend</StatCard.Label>
                <StatCard.HeaderEnd>
                    <StatCard.Trend tone="danger">+24%</StatCard.Trend>
                </StatCard.HeaderEnd>
            </StatCard.Header>
            <StatCard.Metric>
                <StatCard.Value>$4,820</StatCard.Value>
            </StatCard.Metric>
            <StatCard.Description>
                Actual infrastructure compute for the current cycle
            </StatCard.Description>
            <StatCard.Footer>
                <Text.Small tone="muted">Refreshed automatically</Text.Small>
            </StatCard.Footer>
        </StatCard>
    )
}
