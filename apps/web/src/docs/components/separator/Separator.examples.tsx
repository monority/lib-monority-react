import { Separator } from '@monority/ui'

export function SeparatorBasicExample() {
  return (
    <div style={{ maxWidth: 300 }}>
      <p>Content above</p>
      <Separator />
      <p>Content below</p>
    </div>
  )
}

export function SeparatorVerticalExample() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: 40 }}>
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  )
}

export function SeparatorDecorativeExample() {
  return (
    <div style={{ maxWidth: 300 }}>
      <p>Decorative separator (no ARIA role)</p>
      <Separator decorative />
      <p>More content</p>
    </div>
  )
}
