import { Button } from '@monority/ui/button'
import { DropdownMenu } from '@monority/ui/dropdown-menu'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { dropdownMenuI18n } from './DropdownMenu.messages'
import {
    DropdownMenuBasicExample,
    DropdownMenuWithCallbacksExample,
    DropdownMenuWithDisabledExample,
} from './DropdownMenu.examples'

function DropdownMenuPlaygroundDemo(props: {
    align: 'start' | 'center' | 'end'
    side: 'top' | 'bottom' | 'left' | 'right'
    triggerLabel: string
    includeDanger: boolean
}) {
    const items = [
        { value: 'preview', label: 'Preview project' },
        { value: 'export', label: 'Export to PDF' },
        { value: 'share', label: 'Share link' },
        ...(props.includeDanger
            ? [
                  { value: 'sep-1', label: '', type: 'separator' as const },
                  { value: 'delete', label: 'Delete permanently', danger: true },
              ]
            : []),
    ]

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: 'var(--mr-space-8) var(--mr-space-4)',
            }}
        >
            <DropdownMenu
                align={props.align}
                side={props.side}
                trigger={<Button variant="secondary">{props.triggerLabel}</Button>}
                items={items}
            />
        </div>
    )
}

const dropdownMenuPlayground = (
    <ComponentPlayground<{
        align: 'start' | 'center' | 'end'
        side: 'top' | 'bottom' | 'left' | 'right'
        triggerLabel: string
        includeDanger: boolean
    }>
        componentName="DropdownMenu"
        importCode="import { DropdownMenu } from '@monority/ui/dropdown-menu'"
        getCode={(p) => {
            const dangerItem = p.includeDanger
                ? `\n    { value: 'sep-1', label: '', type: 'separator' as const },\n    { value: 'delete', label: 'Delete permanently', danger: true }`
                : ''
            return `import { Button } from '@monority/ui/button'\nimport { DropdownMenu } from '@monority/ui/dropdown-menu'\n\n<DropdownMenu\n  align="${p.align}"\n  side="${p.side}"\n  trigger={<Button variant="secondary">${p.triggerLabel}</Button>}\n  items={[\n    { value: 'preview', label: 'Preview project' },\n    { value: 'export', label: 'Export to PDF' },\n    { value: 'share', label: 'Share link' },${dangerItem}\n  ]}\n/>`
        }}
        controls={[
            {
                name: 'align',
                type: 'select',
                label: 'Alignment',
                defaultValue: 'end',
                options: [
                    { value: 'start', label: 'Start' },
                    { value: 'center', label: 'Center' },
                    { value: 'end', label: 'End' },
                ],
            },
            {
                name: 'side',
                type: 'select',
                label: 'Side',
                defaultValue: 'bottom',
                options: [
                    { value: 'bottom', label: 'Bottom' },
                    { value: 'top', label: 'Top' },
                    { value: 'left', label: 'Left' },
                    { value: 'right', label: 'Right' },
                ],
            },
            {
                name: 'triggerLabel',
                type: 'text',
                label: 'Trigger text',
                defaultValue: 'Actions',
            },
            {
                name: 'includeDanger',
                type: 'boolean',
                label: 'Include destructive action',
                defaultValue: true,
            },
        ]}
        render={(props) => <DropdownMenuPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'DropdownMenu',
    description:
        'A compact action menu for contextual commands, grouped items, and destructive actions.',
    importCode: "import { DropdownMenu } from '@monority/ui/dropdown-menu'",
    usageCode: `<DropdownMenu
  trigger={<Button>Actions</Button>}
  items={[
    { value: 'open', label: 'Open record' },
    { value: 'duplicate', label: 'Duplicate view' },
    { value: 'separator-1', label: '', type: 'separator' as const },
    { value: 'archive', label: 'Archive', danger: true }
  ]}
/>`,
    preview: () => <DropdownMenuBasicExample />,
    playground: dropdownMenuPlayground,
    examples: [
        { title: 'With disabled items', content: <DropdownMenuWithDisabledExample /> },
        { title: 'With callbacks', content: <DropdownMenuWithCallbacksExample /> },
    ],
    props: [
        {
            name: 'trigger',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Element that opens the menu.',
        },
        {
            name: 'items',
            type: `{ value: string; label: string; type?: 'item' | 'separator'; disabled?: boolean; danger?: boolean; onSelect?: (value: string) => void }[]`,
            defaultValue: '[]',
            description: 'Menu items.',
        },
        { name: 'open', type: `boolean`, defaultValue: '-', description: 'Controlled open state.' },
        {
            name: 'defaultOpen',
            type: `boolean`,
            defaultValue: '-',
            description: 'Default open state.',
        },
        {
            name: 'onOpenChange',
            type: `(open: boolean) => void`,
            defaultValue: '-',
            description: 'Open state change callback.',
        },
        {
            name: 'align',
            type: `'start' | 'center' | 'end'`,
            defaultValue: "'end'",
            description: 'Alignment relative to trigger.',
        },
        {
            name: 'side',
            type: `'top' | 'bottom' | 'left' | 'right'`,
            defaultValue: "'bottom'",
            description: 'Side to render the menu.',
        },
    ],
    cssHooks: [
        '.mr-dropdown',
        '.mr-dropdown__content',
        '.mr-dropdown__item',
        '.mr-dropdown__separator',
        '[data-open]',
        '[data-align]',
        '[data-side]',
        '[data-value]',
    ],
    tokens: [
        '--mr-z-popover',
        '--mr-radius-md',
        '--mr-radius-sm',
        '--mr-bg-raised',
        '--mr-bg-surface-strong',
        '--mr-shadow-md',
        '--mr-border-subtle',
        '--mr-space-*',
        '--mr-font-size-sm',
        '--mr-text-primary',
        '--mr-danger',
    ],
    keyboardNavigation: [
        {
            key: ['Enter', 'Space'],
            action: 'Opens the menu when focus is on the trigger, or activates the targeted menu item.',
            context: 'Trigger or menu item',
        },
        {
            key: 'ArrowDown',
            action: 'Moves focus to the next menuitem. Opens the menu from the trigger.',
            context: 'Trigger or open menu',
        },
        {
            key: 'ArrowUp',
            action: 'Moves focus to the previous menuitem. Opens the menu from the trigger.',
            context: 'Trigger or open menu',
        },
        {
            key: 'Home',
            action: 'Moves focus to the first interactive menuitem.',
            context: 'Menu open',
        },
        {
            key: 'End',
            action: 'Moves focus to the last interactive menuitem.',
            context: 'Menu open',
        },
        {
            key: 'Escape',
            action: 'Closes the menu and returns focus to the trigger.',
            context: 'Menu open',
        },
        {
            key: 'Tab',
            action: 'Closes the menu and moves focus to the next element in tab order.',
            context: 'Menu open',
        },
    ],
    a11y: [
        'Trigger sets aria-expanded, aria-haspopup="menu", and aria-controls.',
        'Menu content uses role="menu" with aria-orientation="vertical".',
        'Items use role="menuitem", separators use role="separator".',
        'ArrowDown/ArrowUp navigates between menu items.',
        'Home focuses the first item, End focuses the last item.',
        'Escape closes the menu and returns focus to the trigger.',
        'Clicking outside closes the menu.',
    ],
    i18n: dropdownMenuI18n,
}

export function DropdownMenuDocs() {
    return <DocPage doc={docData} />
}
