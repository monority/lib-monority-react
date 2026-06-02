import { Badge } from '@monority/ui/badge'

export function BadgeDefaultExample() {
    return <Badge>Draft</Badge>
}

export function BadgePrimaryExample() {
    return <Badge variant="primary">Active</Badge>
}

export function BadgeSuccessExample() {
    return <Badge variant="success">Synced</Badge>
}

export function BadgeDangerExample() {
    return <Badge variant="danger">Blocked</Badge>
}

export function BadgeWarningExample() {
    return <Badge variant="warning">Review</Badge>
}

export function BadgeVariantsExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
            <Badge>Draft</Badge>
            <Badge variant="primary">Active</Badge>
            <Badge variant="success">Synced</Badge>
            <Badge variant="warning">Review</Badge>
            <Badge variant="danger">Blocked</Badge>
        </div>
    )
}
