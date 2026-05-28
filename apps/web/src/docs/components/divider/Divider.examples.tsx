import { Divider } from '@monority/ui'

export function DividerBasicExample() {
  return (
    <>
      <Divider>Example</Divider>
    </>
  )
}

export function DividerWithLabelExample() {
  return (
    <div style={{ maxWidth: 300 }}>
      <p>Content above</p>
      <Divider>OR</Divider>
      <p>Content below</p>
    </div>
  )
}

export function DividerVerticalExample() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: 40 }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  )
}
