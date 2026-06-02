import { useState } from 'react'
import { Button, CommandPalette } from '@monority/ui'

export function CommandPaletteBasicExample() {
  const [open, setOpen] = useState(false)

  const items = [
    {
      value: 'components',
      label: 'Open components index',
      description: 'Jump to the full component catalog and recent additions.',
      onSelect: () => setOpen(false),
    },
    {
      value: 'tokens',
      label: 'Inspect design tokens',
      description: 'Browse surface, spacing, and typography foundations.',
      onSelect: () => setOpen(false),
    },
  ]

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open command palette</Button>
      <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />
    </>
  )
}

export function CommandPaletteWithGroupsExample() {
  const [open, setOpen] = useState(false)

  const items = [
    {
      value: 'home',
      label: 'Go to docs home',
      group: 'Navigation',
      description: 'Return to the entry page for foundations and components.',
      onSelect: () => setOpen(false),
    },
    {
      value: 'layout',
      label: 'Open layout recipes',
      group: 'Navigation',
      description: 'Review stack, grid, section, and shell building blocks.',
      onSelect: () => setOpen(false),
    },
    {
      value: 'publish',
      label: 'Publish release notes',
      group: 'Actions',
      description: 'Send the current changelog draft to the docs site.',
      onSelect: () => setOpen(false),
    },
    {
      value: 'audit',
      label: 'Run UI audit',
      group: 'Actions',
      description: 'Check surface consistency, spacing rhythm, and docs coverage.',
      onSelect: () => setOpen(false),
    },
  ]

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open grouped palette</Button>
      <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />
    </>
  )
}

export function CommandPaletteWithShortcutsExample() {
  const [open, setOpen] = useState(false)

  const items = [
    {
      value: 'search',
      label: 'Search all docs',
      description: 'Find APIs, examples, and token references.',
      shortcut: 'Ctrl+K',
      onSelect: () => setOpen(false),
    },
    {
      value: 'copy',
      label: 'Copy install command',
      description: 'Grab the package command for quick onboarding.',
      shortcut: 'Ctrl+C',
      onSelect: () => setOpen(false),
    },
    {
      value: 'undo',
      label: 'Undo last style pass',
      description: 'Return to the previous design iteration.',
      shortcut: 'Ctrl+Z',
      onSelect: () => setOpen(false),
    },
  ]

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open with shortcuts</Button>
      <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />
    </>
  )
}
