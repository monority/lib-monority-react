import { CommandPalette } from '@monority/ui'
import { useState } from 'react'
import { Button } from '@monority/ui'

export function CommandPaletteBasicExample() {
  const [open, setOpen] = useState(false)
  const items = [
    { value: 'home', label: 'Go to Home', onSelect: () => setOpen(false) },
    { value: 'settings', label: 'Open Settings', onSelect: () => setOpen(false) },
  ]
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open palette</Button>
      <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />
    </>
  )
}
