import { Badge } from '@monority/ui/badge'
import { Card } from '@monority/ui/card'
import { Grid } from '@monority/ui/grid'

const features = [
    {
        title: '75 Stable Primitives',
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
        <section aria-labelledby="home-features-title">
            <h2 id="home-features-title" className="home-section-title">
                Architectural Foundation
            </h2>
            <p className="home-section-desc">
                Built to serve as dependable infrastructure for modern design systems and production
                web applications.
            </p>
            <Grid columns={2}>
                {features.map((feat) => (
                    <Card key={feat.title} padding="lg" className="home-feature-card">
                        <Card.Header>
                            <div className="home-feature-header">
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
        </section>
    )
}
