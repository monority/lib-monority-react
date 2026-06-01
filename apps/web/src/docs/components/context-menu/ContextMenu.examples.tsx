import { ContextMenu } from '@monority/ui'

export function ContextMenuBasicExample() {
  const items = [
    { value: 'edit', label: 'Edit' },
    { value: 'duplicate', label: 'Duplicate' },
    { value: 'delete', label: 'Delete', danger: true },
  ]
  return (
    <ContextMenu
      trigger={<div style={{ padding: '1rem', border: '1px dashed var(--mr-border-subtle)', borderRadius: 'var(--mr-radius-md)', textAlign: 'center' }}>Right-click here</div>}
      items={items}
    />
  )
}

export function ContextMenuWithDangerExample() {
  const items = [
    { value: 'archive', label: 'Archive' },
    { value: '', label: '', type: 'separator' as const },
    { value: 'delete', label: 'Delete permanently', danger: true },
  ]
  return (
    <ContextMenu
      trigger={<div style={{ padding: '1rem', border: '1px dashed var(--mr-border-subtle)', borderRadius: 'var(--mr-radius-md)', textAlign: 'center' }}>Right-click here</div>}
      items={items}
    />
  )
}

export function ContextMenuWithDisabledExample() {
  const items = [
    { value: 'edit', label: 'Edit' },
    { value: 'share', label: 'Share', disabled: true },
    { value: 'delete', label: 'Delete', danger: true },
  ]
  return (
    <ContextMenu
      trigger={<div style={{ padding: '1rem', border: '1px dashed var(--mr-border-subtle)', borderRadius: 'var(--mr-radius-md)', textAlign: 'center' }}>Right-click here</div>}
      items={items}
    />
  )
}

export function ContextMenuWithSeparatorExample() {
  const items = [
    { value: 'cut', label: 'Cut' },
    { value: 'copy', label: 'Copy' },
    { value: 'paste', label: 'Paste' },
    { value: '', label: '', type: 'separator' as const },
    { value: 'select-all', label: 'Select all' },
  ]
  return (
    <ContextMenu
      trigger={<div style={{ padding: '1rem', border: '1px dashed var(--mr-border-subtle)', borderRadius: 'var(--mr-radius-md)', textAlign: 'center' }}>Right-click here</div>}
      items={items}
    />
  )
}
