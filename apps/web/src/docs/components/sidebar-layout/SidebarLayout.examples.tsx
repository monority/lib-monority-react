import { SidebarLayout } from '@monority/ui'

export function SidebarLayoutBasicExample() {
  return (
    <SidebarLayout
      sidebar={
        <nav aria-label="Project navigation">
          <div style={{ fontSize: '0.75rem', color: 'var(--mr-fg-muted)', marginBottom: '0.75rem' }}>Workspace</div>
          <div style={{ fontWeight: 650 }}>Overview</div>
          <div style={{ marginTop: '0.5rem', color: 'var(--mr-fg-muted)' }}>Releases</div>
          <div style={{ marginTop: '0.5rem', color: 'var(--mr-fg-muted)' }}>Settings</div>
        </nav>
      }
      header={<strong>Project shell</strong>}
    >
      <div>
        <h3 style={{ margin: 0 }}>Main area</h3>
        <p style={{ margin: '0.5rem 0 0', color: 'var(--mr-fg-muted)' }}>Sidebar stays contextual, content stays readable.</p>
      </div>
    </SidebarLayout>
  )
}

export function SidebarLayoutWithContentExample() {
  return (
    <SidebarLayout
      sidebar={
        <nav aria-label="Dashboard navigation">
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Navigation</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--mr-fg-muted)' }}>Dashboard</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--mr-fg-muted)' }}>Settings</div>
        </nav>
      }
      header={
        <>
          <strong>Analytics workspace</strong>
          <span style={{ color: 'var(--mr-fg-muted)', fontSize: 'var(--mr-text-sm)' }}>Updated 5 min ago</span>
        </>
      }
    >
      <main>
        <h2 style={{ margin: 0 }}>Main content</h2>
        <p style={{ color: 'var(--mr-fg-muted)' }}>Page content goes here.</p>
      </main>
    </SidebarLayout>
  )
}

export function SidebarLayoutWidthsExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <SidebarLayout sidebarWidth="sm" sidebar={<div>Small rail</div>}>
        <div>Main content</div>
      </SidebarLayout>
      <SidebarLayout sidebarWidth="md" sidebar={<div>Medium rail</div>}>
        <div>Main content</div>
      </SidebarLayout>
      <SidebarLayout sidebarWidth="lg" sidebar={<div>Large rail</div>}>
        <div>Main content</div>
      </SidebarLayout>
    </div>
  )
}
