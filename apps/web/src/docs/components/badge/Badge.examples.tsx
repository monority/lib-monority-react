import { Badge } from '@monority/ui/badge'

export function BadgeBasicExample() {
  return <Badge>Draft</Badge>
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
