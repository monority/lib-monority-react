import { Spinner } from '@monority/ui'

export function SpinnerBasicExample() {
  return <Spinner />
}

export function SpinnerSizesExample() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}

export function SpinnerTonesExample() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Spinner tone="base" />
      <Spinner tone="muted" />
      <div style={{ background: 'var(--mr-fg-base)', padding: '0.5rem', borderRadius: 'var(--mr-radius-md)' }}>
        <Spinner tone="inverse" />
      </div>
    </div>
  )
}

export function SpinnerWithTextExample() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <Spinner size="sm" />
      <span style={{ fontSize: '0.875rem', color: 'var(--mr-fg-muted)' }}>Loading...</span>
    </div>
  )
}
