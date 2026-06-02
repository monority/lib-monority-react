import { Card } from '@monority/ui/card'

export function CardBasicExample() {
    return (
        <Card padding="lg">
            <strong>Project health</strong>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--mr-fg-muted)' }}>
                Stable release candidate, no blocking issues.
            </p>
        </Card>
    )
}

export function CardPaddingExample() {
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            <Card padding="sm" style={{ flex: 1 }}>
                Compact
            </Card>
            <Card padding="md" style={{ flex: 1 }}>
                Default
            </Card>
            <Card padding="lg" style={{ flex: 1 }}>
                Spacious
            </Card>
        </div>
    )
}

export function CardInteractiveExample() {
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            <Card padding="md" interactive>
                Deployment summary
            </Card>
            <Card padding="md">Static notes</Card>
        </div>
    )
}
