import { Badge } from '@monority/ui/badge'
import { Card } from '@monority/ui/card'
import { Grid } from '@monority/ui/grid'
import { Section } from '@monority/ui/section'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { Title } from '@monority/ui/title'

const features = [
    {
        title: '84 Stable Primitives',
        badge: 'Production-ready',
        badgeVariant: 'success' as const,
        description:
            'Every meaningful UI concept is componentized. From simple buttons to rich data tables, overlays and form controls with 100% parity.',
    },
    {
        title: 'CSS @layer Architecture',
        badge: 'Zero collisions',
        badgeVariant: 'primary' as const,
        description:
            'Handcrafted layers (reset, base, tokens, themes, components, utilities). Clean consumer overrides without specificity hacks or !important.',
    },
    {
        title: 'Runtime Design Tokens',
        badge: 'Multi-theme',
        badgeVariant: 'default' as const,
        description:
            'Dynamic themes (light, dark, night, oled), customizable accents, radii and density modes switchable at runtime without CSS recompilation.',
    },
    {
        title: 'Accessibility Contract',
        badge: 'WCAG 2.2 AA',
        badgeVariant: 'primary' as const,
        description:
            'Keyboard navigation, proper ARIA roles, focus management, visible focus rings and screen reader behavior treated as hard contracts.',
    },
]

export function HomeFeatures() {
    return (
        <Section aria-labelledby="home-features-title" spacing="lg">
            <Stack gap="xs" style={{ marginBottom: 'var(--mr-space-5)' }}>
                <Title id="home-features-title" size="lg">
                    Architectural Foundation
                </Title>
                <Text tone="muted" size="md">
                    Built to serve as dependable infrastructure for modern design systems and
                    production web applications.
                </Text>
            </Stack>
            <Grid columns={2}>
                {features.map((feat) => (
                    <Card key={feat.title} padding="lg">
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
                                <Card.Title>{feat.title}</Card.Title>
                                <Badge variant={feat.badgeVariant}>{feat.badge}</Badge>
                            </div>
                        </Card.Header>
                        <Card.Content>
                            <Card.Description>{feat.description}</Card.Description>
                        </Card.Content>
                    </Card>
                ))}
            </Grid>
        </Section>
    )
}
