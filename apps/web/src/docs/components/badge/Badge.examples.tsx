import { Badge } from '@monority/ui/badge'

export function BadgeDefaultExample() {
  return <Badge>Default</Badge>
}

export function BadgePrimaryExample() {
  return <Badge variant="primary">Primary</Badge>
}

export function BadgeSuccessExample() {
  return <Badge variant="success">Success</Badge>
}

export function BadgeDangerExample() {
  return <Badge variant="danger">Danger</Badge>
}

export function BadgeVariantsExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
      <Badge>Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  )
}
