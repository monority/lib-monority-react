import { Toast } from '@monority/ui'

export function ToastBasicExample() {
  return (
    <Toast
      title="Release draft saved"
      description="Your component docs changes were stored locally and are ready for review."
    />
  )
}

export function ToastTonesExample() {
  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Toast
        title="Review queued"
        description="The next documentation batch is waiting for approval."
        tone="neutral"
      />
      <Toast
        title="Publish complete"
        description="Design tokens and docs pages were shipped successfully."
        tone="success"
      />
      <Toast
        title="Publish failed"
        description="A build error blocked the release. Check the failing page import."
        tone="danger"
      />
    </div>
  )
}
