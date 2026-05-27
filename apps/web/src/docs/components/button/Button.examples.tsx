import { Button } from '@monority/ui/button'

export function ButtonBasicPreview() {
  return <Button>Button</Button>
}

export function ButtonVariantsExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="muted">Muted</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="danger">Danger</Button>
    </div>
  )
}

export function ButtonSizesExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--mr-space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}

export function ButtonLoadingExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
      <Button loading>Loading</Button>
      <Button loading variant="danger">Deleting</Button>
    </div>
  )
}

export function ButtonIconsExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
      <Button iconLeading={<span>{'\u2713'}</span>}>Done</Button>
      <Button iconTrailing={<span>{'\u2192'}</span>}>Next</Button>
    </div>
  )
}

export function ButtonCopyExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button copyValue="Hello World" />
      <Button copyValue="Custom" copiedLabel="Done!" duration={3000}>Labeled</Button>
    </div>
  )
}

export function ButtonIconOnlyExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
      <Button iconOnly aria-label="Close"><span>{'\u2715'}</span></Button>
      <Button iconOnly variant="ghost" aria-label="Edit"><span>{'\u270E'}</span></Button>
      <Button iconOnly variant="danger" aria-label="Delete"><span>{'\u2715'}</span></Button>
    </div>
  )
}

export function ButtonFullWidthExample() {
  return <Button fullWidth>Full Width Button</Button>
}
