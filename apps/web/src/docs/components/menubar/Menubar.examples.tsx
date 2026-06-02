import { Menubar } from '@monority/ui/menubar'

export function MenubarBasicExample() {
    const items = [
        {
            label: 'Workspace',
            items: [
                { label: 'New dashboard', shortcut: 'Ctrl+N' },
                { label: 'Open workspace', shortcut: 'Ctrl+O' },
                { separator: true } as const,
                { label: 'Save view', shortcut: 'Ctrl+S' },
                { label: 'Duplicate view', shortcut: 'Ctrl+Shift+S' },
                { separator: true } as const,
                { label: 'Close workspace' },
            ],
        },
        {
            label: 'Edit',
            items: [
                { label: 'Undo', shortcut: 'Ctrl+Z' },
                { label: 'Redo', shortcut: 'Ctrl+Y' },
                { separator: true } as const,
                { label: 'Rename section', shortcut: 'Ctrl+R' },
                { label: 'Duplicate block', shortcut: 'Ctrl+D' },
                { label: 'Archive selection', shortcut: 'Ctrl+Shift+A' },
            ],
        },
        {
            label: 'View',
            items: [
                { label: 'Compact density', shortcut: 'Alt+1' },
                { label: 'Comfortable density', shortcut: 'Alt+2' },
                { label: 'Reset layout', shortcut: 'Ctrl+0' },
                { separator: true } as const,
                { label: 'Toggle sidebar', shortcut: 'Ctrl+B' },
            ],
        },
        {
            label: 'Share',
            items: [
                { label: 'Copy link' },
                { label: 'Invite reviewers', shortcut: 'Ctrl+I' },
                { separator: true } as const,
                { label: 'Export snapshot' },
            ],
        },
    ]

    return <Menubar items={items} />
}

export function MenubarWithIconsExample() {
    const items = [
        {
            label: 'Create',
            items: [
                { label: 'New page', icon: <span>+</span>, shortcut: 'Ctrl+N' },
                { label: 'New collection', icon: <span>#</span>, shortcut: 'Ctrl+Shift+N' },
                { separator: true } as const,
                { label: 'Save draft', icon: <span>S</span>, shortcut: 'Ctrl+S' },
            ],
        },
        {
            label: 'History',
            items: [
                { label: 'Undo change', icon: <span>U</span>, shortcut: 'Ctrl+Z' },
                { label: 'Restore revision', icon: <span>R</span>, shortcut: 'Ctrl+Y' },
            ],
        },
    ]

    return <Menubar items={items} />
}

export function MenubarDangerExample() {
    const items = [
        {
            label: 'Workspace',
            items: [
                { label: 'New dashboard', shortcut: 'Ctrl+N' },
                { label: 'Open workspace', shortcut: 'Ctrl+O' },
                { separator: true } as const,
                { label: 'Delete workspace', variant: 'danger' as const },
            ],
        },
        {
            label: 'Records',
            items: [
                { label: 'Purge archive', variant: 'danger' as const, shortcut: 'Ctrl+Shift+Del' },
            ],
        },
    ]

    return <Menubar items={items} />
}

export function MenubarDisabledExample() {
    const items = [
        {
            label: 'Workspace',
            items: [
                { label: 'New dashboard', shortcut: 'Ctrl+N' },
                { label: 'Open workspace', shortcut: 'Ctrl+O' },
                { separator: true } as const,
                { label: 'Save view', shortcut: 'Ctrl+S', disabled: true },
                { label: 'Duplicate view', shortcut: 'Ctrl+Shift+S', disabled: true },
            ],
        },
        {
            label: 'Share',
            disabled: true,
            items: [
                { label: 'Invite reviewers', shortcut: 'Ctrl+I' },
                { label: 'Publish snapshot', shortcut: 'Ctrl+Shift+P' },
            ],
        },
        {
            label: 'View',
            items: [
                { label: 'Compact density', shortcut: 'Alt+1' },
                { label: 'Comfortable density', shortcut: 'Alt+2' },
            ],
        },
    ]

    return <Menubar items={items} />
}
