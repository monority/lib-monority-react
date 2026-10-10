import { Badge } from '@monority/ui/badge'
import { Button } from '@monority/ui/button'
import { Card } from '@monority/ui/card'
import { Grid } from '@monority/ui/grid'

const plans = [
    {
        name: 'Starter',
        price: '$0',
        detail: 'For side projects and evaluation.',
        cta: 'Start for free',
        variant: 'secondary' as const,
        badge: null as string | null,
        badgeVariant: 'default' as const,
    },
    {
        name: 'Team',
        price: '$24',
        detail: 'For product teams shipping every week.',
        cta: 'Start trial',
        variant: 'primary' as const,
        badge: 'Most popular',
        badgeVariant: 'primary' as const,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        detail: 'For design systems at scale.',
        cta: 'Talk to us',
        variant: 'secondary' as const,
        badge: null as string | null,
        badgeVariant: 'default' as const,
    },
]

export function PricingComposition() {
    return (
        <Grid columns={3} className="sc-pricing">
            {plans.map((plan) => (
                <Card key={plan.name} padding="lg">
                    <Card.Header>
                        <div className="sc-pricing__top">
                            <Card.Title>{plan.name}</Card.Title>
                            {plan.badge && <Badge variant={plan.badgeVariant}>{plan.badge}</Badge>}
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <p className="sc-pricing__price">{plan.price}</p>
                        <Card.Description className="sc-pricing__detail">
                            {plan.detail}
                        </Card.Description>
                    </Card.Content>
                    <Card.Footer>
                        <Button variant={plan.variant} fullWidth>
                            {plan.cta}
                        </Button>
                    </Card.Footer>
                </Card>
            ))}
        </Grid>
    )
}
