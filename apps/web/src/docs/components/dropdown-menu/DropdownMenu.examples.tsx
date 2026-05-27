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
