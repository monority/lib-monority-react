import { Menubar } from '@monority/ui'

export function MenubarBasicExample() {
  const items = [
    {
      label: 'File',
      items: [
        { label: 'New', shortcut: 'Ctrl+N' },
        { label: 'Open', shortcut: 'Ctrl+O' },
        { separator: true } as const,
        { label: 'Save', shortcut: 'Ctrl+S' },
        { label: 'Save As...', shortcut: 'Ctrl+Shift+S' },
        { separator: true } as const,
        { label: 'Exit' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: 'Ctrl+Z' },
        { label: 'Redo', shortcut: 'Ctrl+Y' },
        { separator: true } as const,
        { label: 'Cut', shortcut: 'Ctrl+X' },
        { label: 'Copy', shortcut: 'Ctrl+C' },
        { label: 'Paste', shortcut: 'Ctrl+V' },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Zoom In', shortcut: 'Ctrl++' },
        { label: 'Zoom Out', shortcut: 'Ctrl+-' },
        { label: 'Reset Zoom', shortcut: 'Ctrl+0' },
        { separator: true } as const,
        { label: 'Toggle Sidebar', shortcut: 'Ctrl+B' },
      ],
    },
    {
      label: 'Help',
      items: [
        { label: 'Documentation' },
        { label: 'Keyboard Shortcuts', shortcut: 'Ctrl+?' },
        { separator: true } as const,
        { label: 'About' },
      ],
    },
  ]
  return <Menubar items={items} />
}

export function MenubarWithIconsExample() {
  const items = [
    {
      label: 'File',
      items: [
        { label: 'New File', icon: <span>📄</span>, shortcut: 'Ctrl+N' },
        { label: 'Open Folder', icon: <span>📂</span>, shortcut: 'Ctrl+O' },
        { separator: true } as const,
        { label: 'Save', icon: <span>💾</span>, shortcut: 'Ctrl+S' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', icon: <span>↩️</span>, shortcut: 'Ctrl+Z' },
        { label: 'Redo', icon: <span>↪️</span>, shortcut: 'Ctrl+Y' },
      ],
    },
  ]
  return <Menubar items={items} />
}

export function MenubarDangerExample() {
  const items = [
    {
      label: 'File',
      items: [
        { label: 'New', shortcut: 'Ctrl+N' },
        { label: 'Open', shortcut: 'Ctrl+O' },
        { separator: true } as const,
        { label: 'Delete Project', variant: 'danger' as const },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Clear All', variant: 'danger' as const, shortcut: 'Ctrl+Shift+Del' },
      ],
    },
  ]
  return <Menubar items={items} />
}

export function MenubarDisabledExample() {
  const items = [
    {
      label: 'File',
      items: [
        { label: 'New', shortcut: 'Ctrl+N' },
        { label: 'Open', shortcut: 'Ctrl+O' },
        { separator: true } as const,
        { label: 'Save', shortcut: 'Ctrl+S', disabled: true },
        { label: 'Save As...', shortcut: 'Ctrl+Shift+S', disabled: true },
      ],
    },
    {
      label: 'Edit',
      disabled: true,
      items: [
        { label: 'Undo', shortcut: 'Ctrl+Z' },
        { label: 'Redo', shortcut: 'Ctrl+Y' },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Zoom In', shortcut: 'Ctrl++' },
        { label: 'Zoom Out', shortcut: 'Ctrl+-' },
      ],
    },
  ]
  return <Menubar items={items} />
}
