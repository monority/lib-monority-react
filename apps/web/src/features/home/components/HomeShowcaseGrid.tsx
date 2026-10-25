import { docsComponentRegistry } from '@/features/docs/components/registry'
import { useMessages } from '@/shared/i18n'
import {
    Callout,
    Card,
    Grid,
    MetricGrid,
    Section,
    Stack,
    StatCard,
    Text,
    Title,
} from '@monority/ui'

export function HomeShowcaseGrid() {
    const messages = useMessages().home.showcase
    const componentCount = docsComponentRegistry.length

    return (
        <Section aria-labelledby="home-showcase-title" spacing="lg">
            <Stack gap="xs" style={{ marginBottom: 'var(--mr-space-5)' }}>
                <Title id="home-showcase-title" size="lg">
                    {messages.title}
                </Title>
                <Text tone="muted" size="md">
                    {messages.description}
                </Text>
            </Stack>

            <Grid columns={2}>
                <Card padding="md">
                    <Card.Header>
                        <Card.Title>{messages.telemetry.title}</Card.Title>
                        <Card.Description>{messages.telemetry.description}</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <MetricGrid
                            items={[
                                {
                                    key: 'uptime',
                                    label: messages.telemetry.uptime,
                                    value: '99.99%',
                                    trend: '+0.02%',
                                    trendTone: 'success',
                                },
                                {
                                    key: 'latency',
                                    label: messages.telemetry.latency,
                                    value: '18 ms',
                                    trend: '-4 ms',
                                    trendTone: 'success',
                                },
                            ]}
                        />
                    </Card.Content>
                </Card>

                <Card padding="md">
                    <Card.Header>
                        <Card.Title>{messages.feedback.title}</Card.Title>
                        <Card.Description>{messages.feedback.description}</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="sm">
                            <Callout tone="success" title={messages.feedback.calloutTitle}>
                                {messages.feedback.calloutBody(componentCount)}
                            </Callout>
                            <StatCard
                                label={messages.feedback.statLabel}
                                value={messages.feedback.statValue}
                                description={messages.feedback.statDescription}
                            />
                        </Stack>
                    </Card.Content>
                </Card>
            </Grid>
        </Section>
    )
}
