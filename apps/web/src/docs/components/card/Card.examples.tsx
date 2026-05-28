import { Card } from '@monority/ui/card'

export function CardBasicExample() {
  return (
    <Card padding="lg" interactive>
      Project health
    </Card>
  )
}

export function CardPaddingExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Card padding="sm" style={{ flex: 1 }}>Small padding</Card>
      <Card padding="md" style={{ flex: 1 }}>Medium padding</Card>
      <Card padding="lg" style={{ flex: 1 }}>Large padding</Card>
    </div>
  )
}

export function CardInteractiveExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Card padding="md" interactive onClick={() => alert('Clicked!')}>
        Clickable card
      </Card>
      <Card padding="md">
        Static card
      </Card>
    </div>
  )
}
