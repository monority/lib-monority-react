import { Badge } from '@monority/ui/badge'
import { Button } from '@monority/ui/button'
import { Card } from '@monority/ui/card'

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
        <div className="sc-pricing">
            {plans.map((plan) => (
                <Card key={plan.name} padding="lg">
                    <div className="sc-pricing__top">
                        <strong>{plan.name}</strong>
                        {plan.badge && <Badge variant={plan.badgeVariant}>{plan.badge}</Badge>}
                    </div>
                    <p className="sc-pricing__price">{plan.price}</p>
                    <p className="sc-pricing__detail">{plan.detail}</p>
                    <Button variant={plan.variant} fullWidth>
                        {plan.cta}
                    </Button>
                </Card>
            ))}
        </div>
    )
}
