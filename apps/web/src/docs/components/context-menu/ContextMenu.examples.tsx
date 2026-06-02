import { ContextMenu } from '@monority/ui/context-menu'

function TriggerSurface({ label }: { label: string }) {
    return (
        <div
            style={{
                padding: '1rem',
                border: '1px solid var(--mr-border-subtle)',
                borderRadius: 'var(--mr-radius-md)',
                background: 'var(--mr-bg-surface-elevated)',
                color: 'var(--mr-fg-muted)',
                textAlign: 'center',
                minWidth: '16rem',
            }}
        >
            {label}
        </div>
    )
}

export function ContextMenuBasicExample() {
    const items = [
        { value: 'open', label: 'Open record' },
        { value: 'duplicate', label: 'Duplicate view' },
        { value: 'delete', label: 'Delete', danger: true },
    ]

    return (
        <ContextMenu trigger={<TriggerSurface label="Right-click this canvas" />} items={items} />
    )
}

export function ContextMenuWithDangerExample() {
    const items = [
        { value: 'archive', label: 'Archive' },
        { value: 'separator-1', label: '', type: 'separator' as const },
        { value: 'delete', label: 'Delete permanently', danger: true },
    ]

    return (
        <ContextMenu
            trigger={<TriggerSurface label="Right-click this workspace" />}
            items={items}
        />
    )
}

export function ContextMenuWithDisabledExample() {
    const items = [
        { value: 'rename', label: 'Rename' },
        { value: 'share', label: 'Share snapshot', disabled: true },
        { value: 'delete', label: 'Delete', danger: true },
    ]

    return <ContextMenu trigger={<TriggerSurface label="Right-click this draft" />} items={items} />
}

export function ContextMenuWithSeparatorExample() {
    const items = [
        { value: 'cut', label: 'Cut' },
        { value: 'copy', label: 'Copy' },
        { value: 'paste', label: 'Paste' },
        { value: 'separator-1', label: '', type: 'separator' as const },
        { value: 'select-all', label: 'Select all' },
    ]

    return (
        <ContextMenu
            trigger={<TriggerSurface label="Right-click this text block" />}
            items={items}
        />
    )
}
