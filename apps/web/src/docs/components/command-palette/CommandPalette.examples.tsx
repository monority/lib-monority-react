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

export function CommandPaletteWithGroupsExample() {
  const [open, setOpen] = useState(false)
  const items = [
    { value: 'home', label: 'Home', group: 'Navigation', onSelect: () => setOpen(false) },
    { value: 'settings', label: 'Settings', group: 'Navigation', onSelect: () => setOpen(false) },
    { value: 'new-file', label: 'New File', group: 'Actions', onSelect: () => setOpen(false) },
    { value: 'delete', label: 'Delete', group: 'Actions', onSelect: () => setOpen(false) },
  ]
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open grouped</Button>
      <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />
    </>
  )
}

export function CommandPaletteWithShortcutsExample() {
  const [open, setOpen] = useState(false)
  const items = [
    { value: 'search', label: 'Search', shortcut: 'Ctrl+K', onSelect: () => setOpen(false) },
    { value: 'copy', label: 'Copy', shortcut: 'Ctrl+C', onSelect: () => setOpen(false) },
    { value: 'undo', label: 'Undo', shortcut: 'Ctrl+Z', onSelect: () => setOpen(false) },
  ]
  return (
    <>
      <Button onClick={() => setOpen(true)}>With shortcuts</Button>
      <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />
    </>
  )
}
