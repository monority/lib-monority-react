import { DropdownMenu, Button } from '@monority/ui'

export function DropdownMenuBasicExample() {
  const items = [
    { value: 'edit', label: 'Edit' },
    { value: 'duplicate', label: 'Duplicate' },
    { value: '', label: '', type: 'separator' as const },
    { value: 'delete', label: 'Delete', danger: true },
  ]
  return <DropdownMenu trigger={<Button>Actions</Button>} items={items} />
}

export function DropdownMenuWithDisabledExample() {
  const items = [
    { value: 'edit', label: 'Edit' },
    { value: 'share', label: 'Share', disabled: true },
    { value: '', label: '', type: 'separator' as const },
    { value: 'delete', label: 'Delete', danger: true },
  ]
  return <DropdownMenu trigger={<Button>Menu</Button>} items={items} />
}

export function DropdownMenuWithCallbacksExample() {
  const items = [
    { value: 'copy', label: 'Copy link', onSelect: (v) => alert(`Selected: ${v}`) },
    { value: 'share', label: 'Share', onSelect: (v) => alert(`Selected: ${v}`) },
    { value: '', label: '', type: 'separator' as const },
    { value: 'report', label: 'Report', onSelect: (v) => alert(`Selected: ${v}`) },
  ]
  return <DropdownMenu trigger={<Button variant="secondary">Options</Button>} items={items} />
}
