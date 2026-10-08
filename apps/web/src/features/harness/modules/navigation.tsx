import { useState } from 'react'
import {
    Breadcrumb,
    Button,
    FilterBar,
    Input,
    Menubar,
    NavigationMenu,
    Pagination,
    SidebarLayout,
    Tabs,
    Topbar,
} from '@monority/ui'
import { Sample } from '../Sample'

export function TabsHarness() {
    const [selected, setSelected] = useState('tab1')
    const items = [
        { value: 'tab1', label: 'Overview' },
        { value: 'tab2', label: 'Analytics' },
        { value: 'tab3', label: 'Settings' },
        { value: 'tab4', label: 'Disabled', disabled: true },
    ]

    return (
        <>
            <Sample label="Tabs Neutral">
                <Tabs items={items} value={selected} onChange={setSelected} tone="neutral" />
            </Sample>
            <Sample label="Tabs Accent">
                <Tabs items={items} value={selected} onChange={setSelected} tone="accent" />
            </Sample>
            <Sample label="Tabs Danger">
                <Tabs items={items} value={selected} onChange={setSelected} tone="danger" />
            </Sample>
            <Sample label="Tabs Sizes">
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-spacing-4)' }}
                >
                    <Tabs items={items} value={selected} onChange={setSelected} size="sm" />
                    <Tabs items={items} value={selected} onChange={setSelected} size="md" />
                    <Tabs items={items} value={selected} onChange={setSelected} size="lg" />
                </div>
            </Sample>
            <Sample label="Tabs Full Width">
                <div style={{ width: '100%' }}>
                    <Tabs items={items} value={selected} onChange={setSelected} fullWidth />
                </div>
            </Sample>
        </>
    )
}

export function BreadcrumbHarness() {
    const items = [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Monority UI', href: '/projects/monority' },
        { label: 'Components' },
    ]

    return (
        <>
            <Sample label="Basic Breadcrumb">
                <Breadcrumb items={items} />
            </Sample>
        </>
    )
}

export function PaginationHarness() {
    const [page, setPage] = useState(1)

    return (
        <>
            <Sample label="Pagination">
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-spacing-2)' }}
                >
                    <Pagination page={page} totalPages={10} onPageChange={setPage} />
                    <span
                        style={{
                            fontSize: 'var(--mr-type-small-size)',
                            color: 'var(--mr-text-secondary)',
                        }}
                    >
                        Current page: {page}
                    </span>
                </div>
            </Sample>
        </>
    )
}

export function TopbarHarness() {
    return (
        <>
            <Sample label="Topbar">
                <Topbar>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '0 var(--mr-spacing-4)',
                        }}
                    >
                        <strong>Acme Corp</strong>
                        <div style={{ display: 'flex', gap: 'var(--mr-spacing-2)' }}>
                            <Button variant="ghost" size="sm">
                                Docs
                            </Button>
                            <Button variant="ghost" size="sm">
                                Support
                            </Button>
                            <Button size="sm">Sign In</Button>
                        </div>
                    </div>
                </Topbar>
            </Sample>
        </>
    )
}

export function SidebarLayoutHarness() {
    return (
        <>
            <Sample label="Sidebar Layout">
                <div
                    style={{
                        height: 300,
                        border: '1px solid var(--mr-border-default)',
                        borderRadius: 'var(--mr-radius-md)',
                        overflow: 'hidden',
                    }}
                >
                    <SidebarLayout
                        sidebar={
                            <div style={{ padding: 'var(--mr-spacing-3)' }}>
                                <div
                                    style={{
                                        fontWeight: 'var(--mr-weight-semibold)',
                                        marginBottom: 'var(--mr-spacing-2)',
                                    }}
                                >
                                    Sidebar
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 'var(--mr-spacing-1)',
                                    }}
                                >
                                    <Button variant="ghost" size="sm">
                                        Dashboard
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        Settings
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        Team
                                    </Button>
                                </div>
                            </div>
                        }
                        header={
                            <div
                                style={{
                                    padding: 'var(--mr-spacing-2) var(--mr-spacing-3)',
                                    borderBottom: '1px solid var(--mr-border-default)',
                                }}
                            >
                                Header
                            </div>
                        }
                    >
                        <div style={{ padding: 'var(--mr-spacing-4)' }}>
                            <p>Main content area inside the sidebar layout.</p>
                        </div>
                    </SidebarLayout>
                </div>
            </Sample>
        </>
    )
}

export function FilterBarHarness() {
    return (
        <>
            <Sample label="Filter Bar">
                <FilterBar>
                    <div
                        style={{
                            display: 'flex',
                            gap: 'var(--mr-spacing-2)',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Input
                            placeholder="Filter records..."
                            size="sm"
                            style={{ maxWidth: 240 }}
                        />
                        <Button variant="secondary" size="sm">
                            Status: All
                        </Button>
                        <Button variant="secondary" size="sm">
                            Role: Any
                        </Button>
                        <Button variant="ghost" size="sm">
                            Reset
                        </Button>
                    </div>
                </FilterBar>
            </Sample>
        </>
    )
}

export function MenubarHarness() {
    const menus = [
        {
            label: 'File',
            items: [
                { label: 'New File', shortcut: 'Cmd+N' },
                { label: 'Open...', shortcut: 'Cmd+O' },
                { label: 'Save', shortcut: 'Cmd+S' },
                { label: 'sep-1', separator: true },
                { label: 'Exit', variant: 'danger' as const },
            ],
        },
        {
            label: 'Edit',
            items: [
                { label: 'Undo', shortcut: 'Cmd+Z' },
                { label: 'Redo', shortcut: 'Cmd+Shift+Z' },
                { label: 'Cut', shortcut: 'Cmd+X' },
                { label: 'Copy', shortcut: 'Cmd+C' },
                { label: 'Paste', shortcut: 'Cmd+V' },
            ],
        },
        {
            label: 'View',
            items: [
                { label: 'Reload', shortcut: 'Cmd+R' },
                { label: 'Toggle Fullscreen', shortcut: 'F11' },
            ],
        },
    ]

    return (
        <>
            <Sample label="Menubar">
                <Menubar items={menus} />
            </Sample>
        </>
    )
}

export function NavigationMenuHarness() {
    const items = [
        {
            label: 'Products',
            items: [
                {
                    label: 'Monority UI',
                    href: '#ui',
                    description: 'React 19 design token component library',
                },
                {
                    label: 'Monority Icons',
                    href: '#icons',
                    description: 'Accessible vector iconography',
                },
            ],
        },
        {
            label: 'Resources',
            items: [
                {
                    label: 'Documentation',
                    href: '#docs',
                    description: 'Getting started guide and component API',
                },
                {
                    label: 'Playground',
                    href: '#play',
                    description: 'Test components in the browser',
                },
            ],
        },
        {
            label: 'Pricing',
            href: '#pricing',
        },
    ]

    return (
        <>
            <Sample label="Navigation Menu">
                <NavigationMenu items={items} />
            </Sample>
        </>
    )
}
