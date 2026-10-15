import { useState } from 'react'
import {
    Badge,
    Button,
    Drawer,
    Grid,
    InlineAlert,
    Modal,
    PageHeader,
    Stack,
    StatCard,
    Toast,
    Topbar,
} from '@monority/ui'
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
    const [isDeployModalOpen, setIsDeployModalOpen] = useState(false)
    const [isInspectDrawerOpen, setIsInspectDrawerOpen] = useState(false)
    const [isDeploying, setIsDeploying] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)

    const handleConfirmDeploy = () => {
        setIsDeploying(true)
        setTimeout(() => {
            setIsDeploying(false)
            setIsDeployModalOpen(false)
            setToastMessage('Déploiement v1.4.2 amorcé avec succès sur 24 nœuds périphériques.')
        }, 700)
    }

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
                        role="img"
                        aria-label="Monority logo"
                    >
                        <title>Monority logo</title>
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
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            setToastMessage('Panneau de configuration du cluster opérationnel.')
                        }
                    >
                        Settings
                    </Button>
                </Topbar.Actions>
            </Topbar>

            {/* Page Header */}
            <PageHeader aria-label="Page header">
                <PageHeader.Kicker>INFRASTRUCTURE / CONTROL PLANE</PageHeader.Kicker>
                <PageHeader.Title as="h2">Release control</PageHeader.Title>
                <PageHeader.Description>
                    One system for shipping observable changes across every environment.
                </PageHeader.Description>
                <PageHeader.Actions>
                    <Button variant="primary" size="sm" onClick={() => setIsDeployModalOpen(true)}>
                        Deploy
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsInspectDrawerOpen(true)}>
                        Inspect
                    </Button>
                </PageHeader.Actions>
            </PageHeader>

            {/* Executive KPIs */}
            <Grid columns={4} gap="lg">
                <StatCard
                    label="REQUESTS / MIN"
                    value="14,820"
                    trend="+12.4%"
                    trendTone="success"
                    description="vs last hour"
                />
                <StatCard
                    label="SERVICE AVAILABILITY"
                    value="99.99%"
                    trend="+0.02%"
                    trendTone="success"
                    description="Error budget healthy"
                />
                <StatCard
                    label="P95 LATENCY"
                    value="18 ms"
                    trend="-3 ms"
                    trendTone="success"
                    description="vs baseline"
                />
                <StatCard
                    label="HEALTHY NODES"
                    value="98.4%"
                    trend="64/65"
                    trendTone="neutral"
                    description="active pods"
                />
            </Grid>

            {/* Full-width High-resolution Animated & Interactive Telemetry Chart */}
            <MoodboardTelemetryChart />

            {/* Harmonized 2-Column Grid of 10 Homogeneous Operational & Everyday Web App Modules */}
            <Grid columns={2} gap="lg">
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

            {/* Simulated Production Overlays */}
            <Modal
                open={isDeployModalOpen}
                title="Deploy Release v1.4.2"
                description="Ship target build to 24 edge nodes across all global regions."
                onClose={() => setIsDeployModalOpen(false)}
                footer={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 'var(--mr-space-3)',
                        }}
                    >
                        <Button variant="ghost" onClick={() => setIsDeployModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            loading={isDeploying}
                            onClick={handleConfirmDeploy}
                        >
                            Confirm Deployment
                        </Button>
                    </div>
                }
            >
                <Stack gap="md">
                    <InlineAlert tone="info">
                        All 14 pre-flight integration tests and security scans passed.
                    </InlineAlert>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 'var(--mr-space-3)',
                        }}
                    >
                        <div>
                            <span
                                style={{
                                    fontSize: 'var(--mr-font-size-xs)',
                                    color: 'var(--mr-text-secondary)',
                                }}
                            >
                                TARGET CLUSTER
                            </span>
                            <div
                                style={{
                                    fontWeight: 'var(--mr-font-weight-medium)',
                                    fontSize: 'var(--mr-font-size-sm)',
                                }}
                            >
                                production-edge-fleet
                            </div>
                        </div>
                        <div>
                            <span
                                style={{
                                    fontSize: 'var(--mr-font-size-xs)',
                                    color: 'var(--mr-text-secondary)',
                                }}
                            >
                                COMMIT SHA
                            </span>
                            <div
                                style={{
                                    fontFamily: 'var(--mr-font-family-mono)',
                                    fontSize: 'var(--mr-font-size-sm)',
                                }}
                            >
                                4fa91ce2 (main)
                            </div>
                        </div>
                    </div>
                </Stack>
            </Modal>

            <Drawer
                open={isInspectDrawerOpen}
                side="right"
                title="Node Diagnostics & Telemetry"
                onClose={() => setIsInspectDrawerOpen(false)}
            >
                <Stack gap="lg" style={{ paddingBlock: 'var(--mr-space-4)' }}>
                    <InlineAlert tone="success">
                        All 64 operational nodes reporting latency within SLA (&lt; 25ms).
                    </InlineAlert>
                    <Stack gap="sm">
                        <div
                            style={{
                                fontSize: 'var(--mr-font-size-xs)',
                                color: 'var(--mr-text-secondary)',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                            }}
                        >
                            CLUSTER WORKLOAD
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <span>CPU Allocation</span>
                            <Badge tone="success">42% utilized</Badge>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <span>Memory Footprint</span>
                            <Badge tone="success">1.8 GB / 4.0 GB</Badge>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <span>Active WebSockets</span>
                            <span style={{ fontFamily: 'var(--mr-font-family-mono)' }}>
                                14,820 live
                            </span>
                        </div>
                    </Stack>
                    <Button variant="secondary" onClick={() => setIsInspectDrawerOpen(false)}>
                        Fermer l'inspecteur
                    </Button>
                </Stack>
            </Drawer>

            {toastMessage ? (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 'var(--mr-space-6)',
                        right: 'var(--mr-space-6)',
                        zIndex: 'var(--mr-z-toast)',
                    }}
                >
                    <Toast
                        tone="success"
                        title="Action système"
                        description={toastMessage}
                        onClose={() => setToastMessage(null)}
                    />
                </div>
            ) : null}
        </Stack>
    )
}
