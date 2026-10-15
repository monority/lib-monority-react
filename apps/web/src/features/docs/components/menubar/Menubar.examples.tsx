import { Menubar } from '@monority/ui/menubar'
import { Text } from '@monority/ui/text'

export function MenubarBasicExample() {
    return (
        <Menubar>
            <Menubar.Menu value="workspace">
                <Menubar.Trigger>Workspace</Menubar.Trigger>
                <Menubar.Content>
                    <Menubar.Item shortcut="Ctrl+N">New dashboard</Menubar.Item>
                    <Menubar.Item shortcut="Ctrl+O">Open workspace</Menubar.Item>
                    <Menubar.Separator />
                    <Menubar.Item shortcut="Ctrl+S">Save view</Menubar.Item>
                </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu value="view">
                <Menubar.Trigger>View</Menubar.Trigger>
                <Menubar.Content>
                    <Menubar.Item shortcut="Alt+1">Compact density</Menubar.Item>
                    <Menubar.Item shortcut="Alt+2">Comfortable density</Menubar.Item>
                </Menubar.Content>
            </Menubar.Menu>
        </Menubar>
    )
}

export function MenubarWithIconsExample() {
    const items = [
        {
            label: 'Create',
            items: [
                { label: 'New page', icon: <Text.Span>+</Text.Span>, shortcut: 'Ctrl+N' },
                {
                    label: 'New collection',
                    icon: <Text.Span>#</Text.Span>,
                    shortcut: 'Ctrl+Shift+N',
                },
                { label: '', separator: true },
                { label: 'Save draft', icon: <Text.Span>S</Text.Span>, shortcut: 'Ctrl+S' },
            ],
        },
        {
            label: 'History',
            items: [
                { label: 'Undo change', icon: <Text.Span>U</Text.Span>, shortcut: 'Ctrl+Z' },
                { label: 'Restore revision', icon: <Text.Span>R</Text.Span>, shortcut: 'Ctrl+Y' },
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
                { label: '', separator: true },
                { label: 'Delete workspace', variant: 'danger' as const },
            ],
        },
        {
            label: 'Records',
            items: [
                {
                    label: 'Purge archive',
                    variant: 'danger' as const,
                    shortcut: 'Ctrl+Shift+Del',
                },
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
                { label: '', separator: true },
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
