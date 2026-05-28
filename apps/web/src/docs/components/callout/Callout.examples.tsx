import { Callout } from '@monority/ui'

export function CalloutBasicExample() {
  return <Callout>This feature is deprecated.</Callout>
}

export function CalloutTonesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Callout title="Note" tone="neutral">This is a neutral callout.</Callout>
      <Callout title="Info" tone="info">This is an informational callout.</Callout>
      <Callout title="Success" tone="success">Operation completed successfully.</Callout>
      <Callout title="Warning" tone="warning">Please review before proceeding.</Callout>
      <Callout title="Error" tone="danger">Something went wrong.</Callout>
    </div>
  )
}

export function CalloutWithChildrenExample() {
  return (
    <Callout title="Tip" tone="info">
      <p>You can use <strong>keyboard shortcuts</strong> to navigate faster.</p>
      <p style={{ marginTop: '0.5rem' }}>Press <code>Ctrl+K</code> to open the command palette.</p>
    </Callout>
  )
}
