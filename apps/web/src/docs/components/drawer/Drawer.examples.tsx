import { useState } from 'react'
import { Button, Drawer, Input } from '@monority/ui'

export function DrawerBasicExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open details panel</Button>
      <Drawer open={open} title="Deployment details" onClose={() => setOpen(false)}>
        <div style={{ display: 'grid', gap: '0.875rem', lineHeight: 1.6 }}>
          <p style={{ margin: 0 }}>
            Use a drawer when the user should stay anchored to the current page
            while inspecting or editing adjacent information.
          </p>
          <p style={{ margin: 0 }}>
            This works well for records, filters, history panels, and quick
            configuration tasks.
          </p>
        </div>
      </Drawer>
    </>
  )
}

export function DrawerSidesExample() {
  const [left, setLeft] = useState(false)
  const [right, setRight] = useState(false)

  return (
    <>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button variant="secondary" onClick={() => setLeft(true)}>
          Open left rail
        </Button>
        <Button onClick={() => setRight(true)}>Open right inspector</Button>
      </div>
      <Drawer open={left} title="Navigation shortcuts" side="left" onClose={() => setLeft(false)}>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Left-side drawers are useful for supplemental navigation, saved views,
          and workspace-level tools.
        </p>
      </Drawer>
      <Drawer open={right} title="Component inspector" side="right" onClose={() => setRight(false)}>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Right-side drawers are ideal for metadata, audit trails, or property
          editing next to the primary canvas.
        </p>
      </Drawer>
    </>
  )
}

export function DrawerWithFooterExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open settings drawer</Button>
      <Drawer open={open} title="Publish settings" onClose={() => setOpen(false)}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'grid', gap: '0.375rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 560 }}>Audience</span>
            <Input placeholder="Design system consumers" />
          </label>
          <label style={{ display: 'grid', gap: '0.375rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 560 }}>Announcement title</span>
            <Input placeholder="June component refresh" />
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save settings</Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}
