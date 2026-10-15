import { Badge } from '@monority/ui/badge'
import { Card } from '@monority/ui/card'
import { Text } from '@monority/ui/text'

export function CardBasicExample() {
    return (
        <Card padding="lg">
            <Card.Header>
                <Card.Title>Project health</Card.Title>
                <Badge variant="default">Live</Badge>
            </Card.Header>
            <Card.Description>Stable release candidate, no blocking issues.</Card.Description>
            <Card.Footer>
                <Text tone="muted" size="sm">
                    Updated 5 minutes ago
                </Text>
            </Card.Footer>
        </Card>
    )
}

export function CardPaddingExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-5)', flexWrap: 'wrap' }}>
            <Card padding="sm" style={{ flex: '1 1 10rem' }}>
                <Card.Title>Compact</Card.Title>
                <Card.Description>Padding sm</Card.Description>
            </Card>
            <Card padding="md" style={{ flex: '1 1 10rem' }}>
                <Card.Title>Default</Card.Title>
                <Card.Description>Padding md</Card.Description>
            </Card>
            <Card padding="lg" style={{ flex: '1 1 10rem' }}>
                <Card.Title>Spacious</Card.Title>
                <Card.Description>Padding lg</Card.Description>
            </Card>
        </div>
    )
}

export function CardInteractiveExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-5)', flexWrap: 'wrap' }}>
            <Card padding="md" interactive style={{ flex: '1 1 12rem' }}>
                <Card.Title>Deployment summary</Card.Title>
                <Card.Description>Interactive clickable card</Card.Description>
            </Card>
            <Card padding="md" style={{ flex: '1 1 12rem' }}>
                <Card.Title>Static notes</Card.Title>
                <Card.Description>Static view only</Card.Description>
            </Card>
        </div>
    )
}
