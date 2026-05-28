import { SidebarLayout } from '@monority/ui'

export function SidebarLayoutBasicExample() {
  return (
    <>
      <SidebarLayout>Example</SidebarLayout>
    </>
  )
}

export function SidebarLayoutWithContentExample() {
  return (
    <SidebarLayout
      sidebar={
        <nav style={{ padding: '1rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Navigation</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--mr-fg-muted)' }}>Dashboard</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--mr-fg-muted)' }}>Settings</div>
        </nav>
      }
    >
      <main style={{ padding: '1rem' }}>
        <h2 style={{ margin: 0 }}>Main content</h2>
        <p style={{ color: 'var(--mr-fg-muted)' }}>Page content goes here.</p>
      </main>
    </SidebarLayout>
  )
}

export function SidebarLayoutWidthsExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <SidebarLayout sidebarWidth="sm" sidebar={<div style={{ padding: '0.5rem' }}>Small</div>}>
        <div style={{ padding: '0.5rem' }}>Main content</div>
      </SidebarLayout>
      <SidebarLayout sidebarWidth="md" sidebar={<div style={{ padding: '0.5rem' }}>Medium</div>}>
        <div style={{ padding: '0.5rem' }}>Main content</div>
      </SidebarLayout>
      <SidebarLayout sidebarWidth="lg" sidebar={<div style={{ padding: '0.5rem' }}>Large</div>}>
        <div style={{ padding: '0.5rem' }}>Main content</div>
      </SidebarLayout>
    </div>
  )
}
