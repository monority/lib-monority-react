import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@monority/ui'

export function ResizableHorizontalExample() {
  return (
    <div style={{ height: '200px', border: '1px solid var(--mr-border-subtle)' }}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30}>
          <div style={{ padding: '1rem', background: 'var(--mr-bg-control)' }}>
            Left panel (30%)
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <div style={{ padding: '1rem' }}>
            Right panel (70%)
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export function ResizableVerticalExample() {
  return (
    <div style={{ height: '300px', border: '1px solid var(--mr-border-subtle)' }}>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={40}>
          <div style={{ padding: '1rem', background: 'var(--mr-bg-control)' }}>
            Top panel (40%)
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>
          <div style={{ padding: '1rem' }}>
            Bottom panel (60%)
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export function ResizableWithHandleExample() {
  return (
    <div style={{ height: '200px', border: '1px solid var(--mr-border-subtle)' }}>
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={50}>
          <div style={{ padding: '1rem', background: 'var(--mr-bg-control)' }}>
            Left panel
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div style={{ padding: '1rem' }}>
            Right panel
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export function ResizableThreePanelsExample() {
  return (
    <div style={{ height: '200px', border: '1px solid var(--mr-border-subtle)' }}>
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={25} minSize={15}>
          <div style={{ padding: '1rem', background: 'var(--mr-bg-control)' }}>
            Sidebar (25%)
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={20}>
          <div style={{ padding: '1rem' }}>
            Main content (50%)
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} minSize={15}>
          <div style={{ padding: '1rem', background: 'var(--mr-bg-control)' }}>
            Details (25%)
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
