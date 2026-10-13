import { Button, Grid, PageHeader, Stack, StatCard, Topbar } from '@monority/ui'
import { MoodboardTelemetryChart } from './MoodboardTelemetryChart'
import {
    MoodboardActivityModule,
    MoodboardChatModule,
    MoodboardDeploymentModule,
    MoodboardPaymentModule,
    MoodboardPipelineModule,
    MoodboardQuotasModule,
    MoodboardServicesModule,
    MoodboardTasksModule,
    MoodboardTeamModule,
    MoodboardTokensModule,
} from './modules'

export function MoodboardDashboardView() {
    return (
        <Stack gap="xl">
            {/* Topbar */}
            <Topbar>
                <Topbar.BrandMark>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                    </svg>
                </Topbar.BrandMark>
                <Topbar.Brand>Monority Control Plane</Topbar.Brand>
                <Topbar.Nav aria-label="Navigation application">
                    <Topbar.Link href="#overview" active>
                        Overview
                    </Topbar.Link>
                    <Topbar.Link href="#services">Services</Topbar.Link>
                    <Topbar.Link href="#deployments">Deployments</Topbar.Link>
                    <Topbar.Link href="#audit">Audit</Topbar.Link>
                </Topbar.Nav>
                <Topbar.Status tone="success">Operational</Topbar.Status>
                <Topbar.Actions>
                    <Button variant="ghost" size="sm">
                        Settings
                    </Button>
                </Topbar.Actions>
            </Topbar>

            {/* Page Header */}
            <PageHeader role="group" aria-label="Page header">
                <PageHeader.Kicker>INFRASTRUCTURE / CONTROL PLANE</PageHeader.Kicker>
                <PageHeader.Title as="h2">Release control</PageHeader.Title>
                <PageHeader.Description>
                    One system for shipping observable changes across every environment.
                </PageHeader.Description>
                <PageHeader.Actions>
                    <Button variant="primary" size="sm">
                        Deploy
                    </Button>
                    <Button variant="ghost" size="sm">
                        Inspect
                    </Button>
                </PageHeader.Actions>
            </PageHeader>

            {/* Executive KPIs */}
            <Grid columns={4}>
                <StatCard label="REQUESTS / MIN" value="14,820" description="+12.4% vs last hour" />
                <StatCard
                    label="SERVICE AVAILABILITY"
                    value="99.99%"
                    description="Error budget healthy"
                />
                <StatCard label="P95 LATENCY" value="18 ms" description="-3 ms vs baseline" />
                <StatCard label="HEALTHY NODES" value="98.4%" description="64 / 65 active pods" />
            </Grid>

            {/* Full-width High-resolution Animated & Interactive Telemetry Chart */}
            <MoodboardTelemetryChart />

            {/* Harmonized 2-Column Grid of 10 Homogeneous Operational & Everyday Web App Modules */}
            <Grid columns={2}>
                <MoodboardServicesModule />
                <MoodboardDeploymentModule />
                <MoodboardPipelineModule />
                <MoodboardActivityModule />
                <MoodboardTeamModule />
                <MoodboardTasksModule />
                <MoodboardPaymentModule />
                <MoodboardChatModule />
                <MoodboardQuotasModule />
                <MoodboardTokensModule />
            </Grid>
        </Stack>
    )
}
