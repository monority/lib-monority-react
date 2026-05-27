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
