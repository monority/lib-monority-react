import { useState } from 'react'
import {
    AlertDialog,
    Button,
    CommandPalette,
    ContextMenu,
    Drawer,
    DropdownMenu,
    HoverCard,
    Modal,
    Popover,
    Tooltip,
} from '@monority/ui'
import { Sample } from '../Sample'

export function ModalHarness() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Sample label="Basic Modal">
                <Button onClick={() => setOpen(true)}>Open Modal</Button>
                <Modal open={open} onClose={() => setOpen(false)} title="Account Settings">
                    <div style={{ padding: 'var(--mr-spacing-4) 0' }}>
                        <p>Manage your account preferences and security credentials.</p>
                        <div
                            style={{
                                marginTop: 'var(--mr-spacing-4)',
                                display: 'flex',
                                gap: 'var(--mr-spacing-2)',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button variant="secondary" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setOpen(false)}>Save changes</Button>
                        </div>
                    </div>
                </Modal>
            </Sample>
        </>
    )
}

export function AlertDialogHarness() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Sample label="Alert Dialog Danger">
                <Button variant="danger" onClick={() => setOpen(true)}>
                    Delete Project
                </Button>
                <AlertDialog
                    open={open}
                    tone="danger"
                    title="Are you absolutely sure?"
                    description="This action cannot be undone. This will permanently delete your project and remove all associated data."
                    confirmLabel="Delete project"
                    cancelLabel="Cancel"
                    onConfirm={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </Sample>
        </>
    )
}

export function DrawerHarness() {
    const [open, setOpen] = useState(false)
    const [side, setSide] = useState<'left' | 'right' | 'top' | 'bottom'>('right')

    return (
        <>
            <Sample label="Side Drawer">
                <div style={{ display: 'flex', gap: 'var(--mr-spacing-2)' }}>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setSide('left')
                            setOpen(true)
                        }}
                    >
                        Left
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setSide('right')
                            setOpen(true)
                        }}
                    >
                        Right
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setSide('top')
                            setOpen(true)
                        }}
                    >
                        Top
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setSide('bottom')
                            setOpen(true)
                        }}
                    >
                        Bottom
                    </Button>
                </div>
                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    side={side}
                    title={`Drawer (${side})`}
                >
                    <p style={{ marginTop: 'var(--mr-spacing-2)' }}>
                        Drawer panel content sliding from {side}.
                    </p>
                </Drawer>
            </Sample>
        </>
    )
}

export function TooltipHarness() {
    return (
        <>
            <Sample label="Tooltip Placements & Arrow">
                <div style={{ display: 'flex', gap: 'var(--mr-spacing-3)', flexWrap: 'wrap' }}>
                    <Tooltip content="Tooltip on top" side="top" arrow>
                        <Button variant="secondary">Top (arrow)</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip on bottom" side="bottom" arrow>
                        <Button variant="secondary">Bottom (arrow)</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip on left" side="left" arrow>
                        <Button variant="secondary">Left (arrow)</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip on right" side="right" arrow>
                        <Button variant="secondary">Right (arrow)</Button>
                    </Tooltip>
                    <Tooltip content="Delayed tooltip by 300ms" delayMs={300}>
                        <Button variant="ghost">Delayed 300ms</Button>
                    </Tooltip>
                </div>
            </Sample>
        </>
    )
}

export function PopoverHarness() {
    return (
        <>
            <Sample label="Basic Popover">
                <Popover trigger={<Button variant="secondary">Open Popover</Button>}>
                    <div style={{ padding: 'var(--mr-spacing-3)', maxWidth: 260 }}>
                        <h4 style={{ margin: 0, fontWeight: 'var(--mr-weight-semibold)' }}>
                            Dimensions
                        </h4>
                        <p
                            style={{
                                margin: 'var(--mr-spacing-1) 0 0',
                                color: 'var(--mr-text-secondary)',
                                fontSize: 'var(--mr-type-small-size)',
                            }}
                        >
                            Set the dimensions for the layer.
                        </p>
                    </div>
                </Popover>
            </Sample>
        </>
    )
}

export function DropdownMenuHarness() {
    const items = [
        { value: 'profile', label: 'Profile', shortcut: '⇧⌘P' },
        { value: 'billing', label: 'Billing', shortcut: '⌘B' },
        { value: 'settings', label: 'Settings', shortcut: '⌘,' },
        { value: 'sep-1', label: '', type: 'separator' as const },
        { value: 'logout', label: 'Sign out', danger: true, shortcut: '⌥⇧Q' },
    ]

    return (
        <>
            <Sample label="Dropdown Menu with Shortcuts">
                <DropdownMenu
                    trigger={<Button variant="secondary">Options ▾</Button>}
                    items={items}
                />
            </Sample>
        </>
    )
}

export function ContextMenuHarness() {
    const items = [
        { value: 'cut', label: 'Cut', shortcut: '⌘X' },
        { value: 'copy', label: 'Copy', shortcut: '⌘C' },
        { value: 'paste', label: 'Paste', shortcut: '⌘V' },
        { value: 'sep-1', label: '', type: 'separator' as const },
        { value: 'delete', label: 'Delete', danger: true, shortcut: '⌫' },
    ]

    return (
        <>
            <Sample label="Context Menu with Shortcuts">
                <ContextMenu
                    trigger={
                        <div
                            style={{
                                padding: 'var(--mr-spacing-8)',
                                border: '1px dashed var(--mr-border-default)',
                                borderRadius: 'var(--mr-radius-md)',
                                textAlign: 'center',
                                color: 'var(--mr-text-secondary)',
                            }}
                        >
                            Right-click inside this area
                        </div>
                    }
                    items={items}
                />
            </Sample>
        </>
    )
}

export function HoverCardHarness() {
    return (
        <>
            <Sample label="Hover Card">
                <HoverCard
                    content={
                        <div style={{ padding: 'var(--mr-spacing-3)', maxWidth: 280 }}>
                            <div style={{ fontWeight: 'var(--mr-weight-semibold)' }}>@monority</div>
                            <p
                                style={{
                                    margin: 'var(--mr-spacing-1) 0 0',
                                    fontSize: 'var(--mr-type-small-size)',
                                    color: 'var(--mr-text-secondary)',
                                }}
                            >
                                The design-token driven React 19 component library.
                            </p>
                        </div>
                    }
                >
                    <Button variant="ghost">Hover @monority</Button>
                </HoverCard>
            </Sample>
        </>
    )
}

export function CommandPaletteHarness() {
    const [open, setOpen] = useState(false)
    const items = [
        { value: 'home', label: 'Home', group: 'Navigation' },
        { value: 'docs', label: 'Documentation', group: 'Navigation' },
        { value: 'settings', label: 'User Settings', group: 'Account' },
        { value: 'logout', label: 'Sign out', group: 'Account' },
    ]

    return (
        <>
            <Sample label="Command Palette">
                <Button onClick={() => setOpen(true)}>Open Command Palette (Cmd+K)</Button>
                <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />
            </Sample>
        </>
    )
}
