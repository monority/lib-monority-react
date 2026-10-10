import { Badge } from '@monority/ui/badge'
import { BadgeDelta } from '@monority/ui/badge-delta'
import { Button } from '@monority/ui/button'
import { Card } from '@monority/ui/card'
import { Grid } from '@monority/ui/grid'
import { Rating } from '@monority/ui/rating'
import { Stack } from '@monority/ui/stack'

const plans = [
    {
        name: 'Starter',
        price: '$0',
        detail: 'Pour tester et evaluer sur projets personnels.',
        cta: 'Commencer gratuitement',
        variant: 'secondary' as const,
        badge: null as string | null,
        badgeVariant: 'default' as const,
        delta: null,
    },
    {
        name: 'Team',
        price: '$24',
        detail: 'Pour les equipes produit livrant chaque semaine.',
        cta: 'Essai gratuit 14 jours',
        variant: 'primary' as const,
        badge: 'Plus populaire',
        badgeVariant: 'primary' as const,
        delta: '-20% en annuel',
    },
    {
        name: 'Enterprise',
        price: 'Sur mesure',
        detail: 'Pour les organisations a haute echelle et securite.',
        cta: 'Nous contacter',
        variant: 'secondary' as const,
        badge: null as string | null,
        badgeVariant: 'default' as const,
        delta: 'SLA garanti',
    },
]

export function PricingComposition() {
    return (
        <Stack gap="md">
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Rating value={5} readOnly size="sm" />
                    <span
                        style={{
                            fontSize: 'var(--mr-text-sm)',
                            fontWeight: 'var(--mr-font-weight-semibold)',
                        }}
                    >
                        4.9 / 5 evalue par plus de 350 equipes
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)' }}>
                        Facturation annuelle :
                    </span>
                    <BadgeDelta deltaType="increase" size="sm">
                        2 mois offerts
                    </BadgeDelta>
                </div>
            </div>

            <Grid columns={3} className="sc-pricing">
                {plans.map((plan) => (
                    <Card key={plan.name} padding="lg">
                        <Card.Header>
                            <div className="sc-pricing__top">
                                <Card.Title>{plan.name}</Card.Title>
                                {plan.badge && (
                                    <Badge variant={plan.badgeVariant}>{plan.badge}</Badge>
                                )}
                            </div>
                        </Card.Header>
                        <Card.Content>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    justifyContent: 'space-between',
                                    gap: '0.5rem',
                                }}
                            >
                                <p className="sc-pricing__price">{plan.price}</p>
                                {plan.delta && (
                                    <BadgeDelta deltaType="moderate-increase" size="sm">
                                        {plan.delta}
                                    </BadgeDelta>
                                )}
                            </div>
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
        </Stack>
    )
}
