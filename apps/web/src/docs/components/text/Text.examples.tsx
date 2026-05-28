import { Text } from '@monority/ui'

export function TextBasicExample() {
  return (
    <>
      <Text>Example</Text>
    </>
  )
}

export function TextTonesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text tone="base">Base text (default)</Text>
      <Text tone="muted">Muted text (secondary)</Text>
      <Text tone="strong">Strong text (emphasis)</Text>
    </div>
  )
}

export function TextSizesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text size="sm">Small text</Text>
      <Text size="md">Medium text</Text>
      <Text size="lg">Large text</Text>
    </div>
  )
}

export function TextAsExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text as="p">Rendered as paragraph</Text>
      <Text as="span">Rendered as span (inline)</Text>
      <Text as="div">Rendered as div (block)</Text>
    </div>
  )
}
