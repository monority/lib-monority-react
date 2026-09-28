import { Button } from '@monority/ui/button'
import { DropdownMenu } from '@monority/ui/dropdown-menu'

export function DropdownMenuBasicExample() {
    const items = [
        { value: 'open', label: 'Open record' },
        { value: 'duplicate', label: 'Duplicate view' },
        { value: 'separator-1', label: '', type: 'separator' as const },
        { value: 'archive', label: 'Archive', danger: true },
    ]

    return <DropdownMenu trigger={<Button>Actions</Button>} items={items} />
}

export function DropdownMenuWithDisabledExample() {
    const items = [
        { value: 'rename', label: 'Rename' },
        { value: 'share', label: 'Share snapshot', disabled: true },
        { value: 'separator-1', label: '', type: 'separator' as const },
        { value: 'delete', label: 'Delete workspace', danger: true },
    ]

    return <DropdownMenu trigger={<Button>Workspace</Button>} items={items} />
}

export function DropdownMenuWithCallbacksExample() {
    const items = [
        { value: 'copy-link', label: 'Copy link', onSelect: () => {} },
        { value: 'export-csv', label: 'Export CSV', onSelect: () => {} },
        { value: 'separator-1', label: '', type: 'separator' as const },
        { value: 'notify', label: 'Notify reviewers', onSelect: () => {} },
    ]

    return <DropdownMenu trigger={<Button variant="secondary">More</Button>} items={items} />
}
