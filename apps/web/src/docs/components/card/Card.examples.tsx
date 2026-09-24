import { Card } from '@monority/ui/card'

export function CardBasicExample() {
    return (
        <Card padding="lg">
            <div className="mr-card__header">
                <strong className="mr-card__title">Project health</strong>
                <span>Live</span>
            </div>
            <p className="mr-card__description">
                Stable release candidate, no blocking issues.
            </p>
        </Card>
    )
}

export function CardPaddingExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-5)', flexWrap: 'wrap' }}>
            <Card padding="sm" style={{ flex: '1 1 10rem' }}>
                Compact
            </Card>
            <Card padding="md" style={{ flex: '1 1 10rem' }}>
                Default
            </Card>
            <Card padding="lg" style={{ flex: '1 1 10rem' }}>
                Spacious
            </Card>
        </div>
    )
}

export function CardInteractiveExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-5)', flexWrap: 'wrap' }}>
            <Card padding="md" interactive style={{ flex: '1 1 12rem' }}>
                Deployment summary
            </Card>
            <Card padding="md" style={{ flex: '1 1 12rem' }}>Static notes</Card>
        </div>
    )
}
