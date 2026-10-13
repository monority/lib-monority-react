import {
    Accordion,
    Avatar,
    Badge,
    Banner,
    Breadcrumb,
    Button,
    Callout,
    Card,
    Grid,
    InlineAlert,
    InputOTP,
    Kbd,
    NumberInput,
    Progress,
    Rating,
    SegmentedControl,
    Select,
    Slider,
    Stack,
    Text,
    Title,
} from '@monority/ui'

const teamMembers = [
    {
        name: 'Sofia Davis',
        email: 'sofia.davis@monority.dev',
        role: 'owner',
        status: 'online' as const,
    },
    {
        name: 'Jackson Lee',
        email: 'jackson.lee@monority.dev',
        role: 'developer',
        status: 'online' as const,
    },
    {
        name: 'Isabella Nguyen',
        email: 'isabella.n@monority.dev',
        role: 'viewer',
        status: 'offline' as const,
    },
]

const roleOptions = [
    { value: 'owner', label: 'Owner' },
    { value: 'developer', label: 'Developer' },
    { value: 'billing', label: 'Billing' },
    { value: 'viewer', label: 'Viewer' },
]

const accordionItems = [
    {
        value: 'runtime-tokens',
        title: 'How does runtime token switching work?',
        content:
            'Tokens are compiled to pure CSS custom properties scoped within ThemeScope or DesignProvider, allowing instant client rebranding and dark mode with zero CSS-in-JS overhead.',
    },
    {
        value: 'density-scale',
        title: 'What layout density and spacing modes are supported?',
        content:
            'Monority UI features independent compact and comfortable density scales, responsive container primitives, accessible roving tabindexes, and strict ARIA compliance across all interactive surfaces.',
    },
    {
        value: 'react19-contract',
        title: 'Are design contracts compatible with React 19?',
        content:
            'All components use native React 19 direct ref props without forwardRef wrappers, support server rendering hydration without flash, and eliminate dev-mode warnings in production builds.',
    },
]

export function MoodboardShowcaseCards() {
    return (
        <Stack gap="xl">
            <Stack gap="xs">
                <Text
                    tone="muted"
                    size="sm"
                    style={{
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontSize: '0.6875rem',
                    }}
                >
                    COMPONENT ECOSYSTEM
                </Text>
                <Title as="h2" size="md">
                    Component Primitives & Compositions
                </Title>
                <Text tone="muted" size="sm">
                    Interactive controls, team rosters, resource gauges, and disclosure components
                    reacting in real time to the active design tokens.
                </Text>
            </Stack>

            <Grid columns={2}>
                {/* Card 1: Team & Access Management */}
                <Card padding="md">
                    <Card.Header>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                            }}
                        >
                            <div>
                                <Title as="h3" size="sm">
                                    Team & Permissions
                                </Title>
                                <Text tone="muted" size="sm">
                                    Manage workspace members and security privileges
                                </Text>
                            </div>
                            <Badge tone="neutral" size="sm">
                                3 Members
                            </Badge>
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="md">
                            {teamMembers.map((member) => (
                                <div
                                    key={member.email}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 'var(--mr-space-3)',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--mr-space-3)',
                                            minWidth: 0,
                                        }}
                                    >
                                        <Avatar
                                            name={member.name}
                                            status={member.status}
                                            size="md"
                                        />
                                        <div style={{ minWidth: 0 }}>
                                            <Text
                                                size="sm"
                                                style={{
                                                    fontWeight: 600,
                                                    display: 'block',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {member.name}
                                            </Text>
                                            <Text
                                                tone="muted"
                                                size="sm"
                                                style={{
                                                    display: 'block',
                                                    fontSize: '0.75rem',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {member.email}
                                            </Text>
                                        </div>
                                    </div>

                                    <div style={{ width: '8.5rem', flexShrink: 0 }}>
                                        <Select
                                            size="sm"
                                            defaultValue={member.role}
                                            options={roleOptions}
                                            aria-label={`Role for ${member.name}`}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div
                                style={{
                                    display: 'flex',
                                    gap: 'var(--mr-space-2)',
                                    paddingTop: 'var(--mr-space-2)',
                                    borderTop: '1px solid var(--mr-border-subtle)',
                                }}
                            >
                                <Button variant="secondary" size="sm" style={{ flex: 1 }}>
                                    Invite Member
                                </Button>
                                <Button variant="ghost" size="sm">
                                    Audit Policy
                                </Button>
                            </div>
                        </Stack>
                    </Card.Content>
                </Card>

                {/* Card 2: Interactive Controls & Form Primitives */}
                <Card padding="md">
                    <Card.Header>
                        <Title as="h3" size="sm">
                            Control & Input Primitives
                        </Title>
                        <Text tone="muted" size="sm">
                            Sliders, numeric steppers, and multi-factor authentication
                        </Text>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="md">
                            <Slider
                                label="CPU Throttling Threshold"
                                defaultValue={68}
                                showValue
                                size="sm"
                            />

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: 'var(--mr-space-4)',
                                }}
                            >
                                <div>
                                    <Text size="sm" style={{ fontWeight: 600, display: 'block' }}>
                                        Cluster Stability Score
                                    </Text>
                                    <Text
                                        tone="muted"
                                        size="sm"
                                        style={{ fontSize: '0.75rem', display: 'block' }}
                                    >
                                        Assessed via 90-day SLA performance
                                    </Text>
                                </div>
                                <Rating defaultValue={4} size="sm" name="cluster-stability" />
                            </div>

                            <Grid columns={2}>
                                <div>
                                    <Text
                                        size="sm"
                                        tone="muted"
                                        style={{
                                            fontWeight: 600,
                                            fontSize: '0.75rem',
                                            display: 'block',
                                            marginBottom: 'var(--mr-space-1)',
                                        }}
                                    >
                                        Target Fleet
                                    </Text>
                                    <SegmentedControl
                                        size="sm"
                                        defaultValue="stage"
                                        fullWidth
                                        options={[
                                            { value: 'dev', label: 'Dev' },
                                            { value: 'stage', label: 'Stage' },
                                            { value: 'prod', label: 'Prod' },
                                        ]}
                                    />
                                </div>

                                <NumberInput
                                    label="Replication Factor"
                                    defaultValue={3}
                                    min={1}
                                    max={12}
                                    size="sm"
                                />
                            </Grid>

                            <div>
                                <Text
                                    size="sm"
                                    tone="muted"
                                    style={{
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        display: 'block',
                                        marginBottom: 'var(--mr-space-1)',
                                    }}
                                >
                                    2FA Security Token
                                </Text>
                                <InputOTP defaultValue="582194" maxLength={6}>
                                    <InputOTP.Group>
                                        <InputOTP.Slot index={0} />
                                        <InputOTP.Slot index={1} />
                                        <InputOTP.Slot index={2} />
                                    </InputOTP.Group>
                                    <InputOTP.Separator />
                                    <InputOTP.Group>
                                        <InputOTP.Slot index={3} />
                                        <InputOTP.Slot index={4} />
                                        <InputOTP.Slot index={5} />
                                    </InputOTP.Group>
                                </InputOTP>
                            </div>
                        </Stack>
                    </Card.Content>
                </Card>

                {/* Card 3: Compute Quotas & Resource Limits */}
                <Card padding="md">
                    <Card.Header>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                            }}
                        >
                            <div>
                                <Title as="h3" size="sm">
                                    Resource Quotas & Capacity
                                </Title>
                                <Text tone="muted" size="sm">
                                    Current monthly infrastructure consumption
                                </Text>
                            </div>
                            <Badge variant="primary" size="sm">
                                Enterprise Tier
                            </Badge>
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="md">
                            <Progress
                                label="Bandwidth Allocation (7.8 / 10 TB)"
                                value={78}
                                showValue
                                tone="neutral"
                            />
                            <Progress
                                label="Worker Memory Headroom (82%)"
                                value={82}
                                showValue
                                tone="warning"
                            />
                            <Progress
                                label="NVMe Storage Volume (34%)"
                                value={34}
                                showValue
                                tone="success"
                            />

                            <Callout tone="accent" title="Auto-scaling Active">
                                Burst capacity is enabled for the upcoming release window.
                            </Callout>

                            <div
                                style={{
                                    display: 'flex',
                                    gap: 'var(--mr-space-2)',
                                    paddingTop: 'var(--mr-space-2)',
                                    borderTop: '1px solid var(--mr-border-subtle)',
                                }}
                            >
                                <Button variant="primary" size="sm" style={{ flex: 1 }}>
                                    Upgrade Quota
                                </Button>
                                <Button variant="secondary" size="sm">
                                    View Invoices
                                </Button>
                            </div>
                        </Stack>
                    </Card.Content>
                </Card>

                {/* Card 4: System Feedback & Alerting */}
                <Card padding="md">
                    <Card.Header>
                        <Title as="h3" size="sm">
                            System Feedback & Signals
                        </Title>
                        <Text tone="muted" size="sm">
                            Multichannel alerts, operational banners, and status chips
                        </Text>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="md">
                            <Banner tone="info" title="Scheduled Maintenance">
                                Node rebalancing tonight at 02:00 UTC across EMEA edge proxies.
                            </Banner>

                            <InlineAlert tone="success" title="Zero CVE Vulnerabilities">
                                All base container images pass automated provenance checks.
                            </InlineAlert>

                            <InlineAlert tone="warning" title="Memory Warning">
                                Node worker-eu-1b exceeded the 80% usage watermark.
                            </InlineAlert>

                            <div>
                                <Text
                                    tone="muted"
                                    size="sm"
                                    style={{
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        display: 'block',
                                        marginBottom: 'var(--mr-space-2)',
                                    }}
                                >
                                    STATUS BADGES
                                </Text>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 'var(--mr-space-2)',
                                    }}
                                >
                                    <Badge variant="default" size="sm">
                                        cluster-live
                                    </Badge>
                                    <Badge tone="neutral" size="sm">
                                        standby
                                    </Badge>
                                    <Badge variant="success" size="sm">
                                        healthy
                                    </Badge>
                                    <Badge variant="warning" size="sm">
                                        rebalancing
                                    </Badge>
                                    <Badge variant="danger" size="sm">
                                        critical
                                    </Badge>
                                    <Badge tone="info" size="sm">
                                        canary
                                    </Badge>
                                </div>
                            </div>
                        </Stack>
                    </Card.Content>
                </Card>
            </Grid>

            {/* Card 5: Navigation & Disclosure (Full-width card) */}
            <Card padding="md">
                <Card.Header>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 'var(--mr-space-2)',
                        }}
                    >
                        <div>
                            <Title as="h3" size="sm">
                                Navigation, Disclosure & Shortcuts
                            </Title>
                            <Text tone="muted" size="sm">
                                Semantic breadcrumbs, accessible accordions, and keyboard hints
                            </Text>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--mr-space-2)',
                            }}
                        >
                            <span
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 'var(--mr-space-1)',
                                    fontSize: '0.8125rem',
                                    color: 'var(--mr-text-secondary)',
                                }}
                            >
                                <Kbd keys={['⌘', 'K']} size="sm" /> Search
                            </span>
                            <span
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 'var(--mr-space-1)',
                                    fontSize: '0.8125rem',
                                    color: 'var(--mr-text-secondary)',
                                }}
                            >
                                <Kbd keys={['⇧', 'D']} size="sm" /> Deploy
                            </span>
                        </div>
                    </div>
                </Card.Header>
                <Card.Content>
                    <Stack gap="md">
                        <Breadcrumb
                            items={[
                                { label: 'Clusters', href: '#clusters' },
                                { label: 'eu-west-1', href: '#region' },
                                { label: 'production-fleet' },
                            ]}
                        />

                        <Accordion items={accordionItems} defaultValue={['runtime-tokens']} />
                    </Stack>
                </Card.Content>
            </Card>
        </Stack>
    )
}
