import { Toast } from '@monority/ui'

export function ToastBasicExample() {
  return (
    <>
      <Toast title="Example" description="This is a basic toast notification." />
    </>
  )
}

export function ToastTonesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Toast title="Info" description="This is a neutral toast." tone="neutral" />
      <Toast title="Success" description="Action completed successfully." tone="success" />
      <Toast title="Error" description="Something went wrong." tone="danger" />
    </div>
  )
}
