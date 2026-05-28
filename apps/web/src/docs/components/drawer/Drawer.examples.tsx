import { Drawer } from '@monority/ui'
import { useState } from 'react'
import { Button } from '@monority/ui'

export function DrawerBasicExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} title="Details" onClose={() => setOpen(false)}>
        <p>Drawer content</p>
      </Drawer>
    </>
  )
}

export function DrawerSidesExample() {
  const [left, setLeft] = useState(false)
  const [right, setRight] = useState(false)

  return (
    <>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button onClick={() => setLeft(true)}>Left</Button>
        <Button onClick={() => setRight(true)}>Right</Button>
      </div>
      <Drawer open={left} title="Left drawer" side="left" onClose={() => setLeft(false)}>
        <p>Content from the left</p>
      </Drawer>
      <Drawer open={right} title="Right drawer" side="right" onClose={() => setRight(false)}>
        <p>Content from the right</p>
      </Drawer>
    </>
  )
}

export function DrawerWithFooterExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open with footer</Button>
      <Drawer open={open} title="Settings" onClose={() => setOpen(false)}>
        <p>Drawer settings content</p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </div>
      </Drawer>
    </>
  )
}
