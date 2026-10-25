import { docsComponentRegistry } from '@/features/docs/components/registry'
import { useMessages } from '@/shared/i18n'
import { Badge } from '@monority/ui/badge'
import { Card } from '@monority/ui/card'
import { Grid } from '@monority/ui/grid'
import { Section } from '@monority/ui/section'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { Title } from '@monority/ui/title'

export function HomeFeatures() {
    const messages = useMessages().home.features
    const componentCount = docsComponentRegistry.length

    return (
        <Section aria-labelledby="home-features-title" spacing="lg">
            <Stack gap="xs" style={{ marginBottom: 'var(--mr-space-5)' }}>
                <Title id="home-features-title" size="lg">
                    {messages.title}
                </Title>
                <Text tone="muted" size="md">
                    {messages.description}
                </Text>
            </Stack>
            <Grid columns={2}>
                {messages.items.map((feat) => {
                    const title =
                        typeof feat.title === 'function' ? feat.title(componentCount) : feat.title
                    return (
                        <Card key={title} padding="lg">
                            <Card.Header>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 'var(--mr-space-2)',
                                        marginBottom: 'var(--mr-space-2)',
                                    }}
                                >
                                    <Card.Title>{title}</Card.Title>
                                    <Badge variant={feat.badgeVariant}>{feat.badge}</Badge>
                                </div>
                            </Card.Header>
                            <Card.Content>
                                <Card.Description>{feat.description}</Card.Description>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Grid>
        </Section>
    )
}
