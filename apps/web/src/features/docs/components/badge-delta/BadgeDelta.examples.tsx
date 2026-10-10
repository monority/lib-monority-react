import { BadgeDelta } from '@monority/ui/badge-delta'
import { Card } from '@monority/ui/card'
import { Stack } from '@monority/ui/stack'

export function BadgeDeltaBasicExample() {
    return (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <BadgeDelta deltaType="increase">+24.5%</BadgeDelta>
            <BadgeDelta deltaType="moderate-increase">+6.2%</BadgeDelta>
            <BadgeDelta deltaType="unchanged">0.0%</BadgeDelta>
            <BadgeDelta deltaType="moderate-decrease">-4.1%</BadgeDelta>
            <BadgeDelta deltaType="decrease">-18.7%</BadgeDelta>
        </div>
    )
}

export function BadgeDeltaSizesExample() {
    return (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <BadgeDelta size="sm" deltaType="increase">
                +12%
            </BadgeDelta>
            <BadgeDelta size="md" deltaType="increase">
                +12%
            </BadgeDelta>
            <BadgeDelta size="lg" deltaType="increase">
                +12%
            </BadgeDelta>
        </div>
    )
}

export function BadgeDeltaInvertedExample() {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Metriques de latence reseau</Card.Title>
            </Card.Header>
            <Card.Content>
                <Stack gap="sm">
                    <p style={{ margin: 0 }}>
                        Ici une hausse du temps de reponse represente une degradation :
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <BadgeDelta deltaType="increase" isIncreasePositive={false}>
                            +120ms (degrade)
                        </BadgeDelta>
                        <BadgeDelta deltaType="decrease" isIncreasePositive={false}>
                            -45ms (ameliore)
                        </BadgeDelta>
                    </div>
                </Stack>
            </Card.Content>
        </Card>
    )
}
