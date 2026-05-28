import { Topbar } from '@monority/ui'
import { Button } from '@monority/ui'

export function TopbarBasicExample() {
  return (
    <>
      <Topbar>Example</Topbar>
    </>
  )
}

export function TopbarWithContentExample() {
  return (
    <Topbar>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0.5rem 0' }}>
        <span style={{ fontWeight: 600 }}>My App</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button size="sm" variant="ghost">Profile</Button>
          <Button size="sm">Sign out</Button>
        </div>
      </div>
    </Topbar>
  )
}
