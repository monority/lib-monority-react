import { InlineAlert } from '@monority/ui'

export function InlineAlertBasicExample() {
  return <InlineAlert>Your changes have been saved.</InlineAlert>
}

export function InlineAlertTonesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InlineAlert tone="info" title="Info" description="This is an informational alert." />
      <InlineAlert tone="success" title="Success" description="Your changes have been saved." />
      <InlineAlert tone="warning" title="Warning" description="Please review before proceeding." />
      <InlineAlert tone="danger" title="Error" description="Something went wrong." />
    </div>
  )
}

export function InlineAlertWithActionExample() {
  return (
    <InlineAlert
      tone="warning"
      title="Storage almost full"
      description="You have used 90% of your storage."
      actionLabel="Upgrade plan"
      onAction={() => alert('Upgrade clicked')}
    />
  )
}
