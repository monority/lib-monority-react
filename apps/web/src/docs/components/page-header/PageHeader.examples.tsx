import { PageHeader } from '@monority/ui'
import { Button } from '@monority/ui'

export function PageHeaderBasicExample() {
  return (
    <>
      <PageHeader>Example</PageHeader>
    </>
  )
}

export function PageHeaderWithTitleExample() {
  return (
    <PageHeader>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Dashboard</h1>
      <p style={{ margin: '0.25rem 0 0', color: 'var(--mr-fg-muted)' }}>Welcome back, John</p>
    </PageHeader>
  )
}

export function PageHeaderWithActionsExample() {
  return (
    <PageHeader>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Projects</h1>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--mr-fg-muted)' }}>Manage your projects</p>
        </div>
        <Button>New project</Button>
      </div>
    </PageHeader>
  )
}
