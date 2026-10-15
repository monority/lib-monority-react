import { DocPage, type DocPageData } from '../DocPage'
import {
    MenubarBasicExample,
    MenubarWithIconsExample,
    MenubarDangerExample,
    MenubarDisabledExample,
} from './Menubar.examples'

const docData: DocPageData = {
    title: 'Menubar',
    description:
        'A compact application command bar for grouped actions, shortcuts, and destructive flows.',
    importCode: "import { Menubar } from '@monority/ui/menubar'",
    usageCode: `<Menubar>
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
</Menubar>`,
    preview: () => <MenubarBasicExample />,
    examples: [
        {
            title: 'With icons',
            content: <MenubarWithIconsExample />,
            code: `const items = [
  {
    label: 'Create',
    items: [
      { label: 'New page', icon: <Text.Span>+</Text.Span>, shortcut: 'Ctrl+N' },
      { label: 'New collection', icon: <Text.Span>#</Text.Span>, shortcut: 'Ctrl+Shift+N' },
      { separator: true },
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

<Menubar items={items} />`,
        },
        {
            title: 'Danger variant',
            content: <MenubarDangerExample />,
            code: `const items = [
  {
    label: 'Workspace',
    items: [
      { label: 'New dashboard', shortcut: 'Ctrl+N' },
      { label: 'Open workspace', shortcut: 'Ctrl+O' },
      { separator: true },
      { label: 'Delete workspace', variant: 'danger' },
    ],
  },
  {
    label: 'Records',
    items: [
      { label: 'Purge archive', variant: 'danger', shortcut: 'Ctrl+Shift+Del' },
    ],
  },
]

<Menubar items={items} />`,
        },
        {
            title: 'Disabled items',
            content: <MenubarDisabledExample />,
            code: `const items = [
  {
    label: 'Workspace',
    items: [
      { label: 'New dashboard', shortcut: 'Ctrl+N' },
      { label: 'Open workspace', shortcut: 'Ctrl+O' },
      { separator: true },
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

<Menubar items={items} />`,
        },
    ],
    props: [
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description:
                'Compound subcomponents: Menu, Trigger, Content, Item, Separator, Shortcut',
        },
        {
            name: 'items',
            type: 'MenubarMenu[]',
            defaultValue: '-',
            description: 'Optional shorthand menu group definitions with dropdown items',
        },
        {
            name: 'defaultActive',
            type: 'string',
            defaultValue: '-',
            description: 'Initially open menu label or value',
        },
        {
            name: 'value',
            type: 'string',
            defaultValue: '-',
            description: 'Controlled active menu value',
        },
        {
            name: 'onValueChange',
            type: '(value: string | null) => void',
            defaultValue: '-',
            description: 'Callback when active menu changes',
        },
    ],
    cssHooks: [
        '.mr-menubar',
        '.mr-menubar__menu-wrapper',
        '.mr-menubar__menu-wrapper--active',
        '.mr-menubar__trigger',
        '.mr-menubar__menu',
        '.mr-menubar__item',
        '.mr-menubar__item-icon',
        '.mr-menubar__item-label',
        '.mr-menubar__shortcut',
        '.mr-menubar__separator',
        '[data-active]',
    ],
    tokens: [
        '--mr-space-1',
        '--mr-space-2',
        '--mr-space-3',
        '--mr-space-4',
        '--mr-radius-sm',
        '--mr-radius-md',
        '--mr-font-size-xs',
        '--mr-font-size-sm',
        '--mr-text-secondary',
        '--mr-text-primary',
        '--mr-danger',
        '--mr-bg-raised',
        '--mr-bg-surface-strong',
        '--mr-accent-subtle',
        '--mr-border-subtle',
        '--mr-shadow-xs',
        '--mr-shadow-md',
        '--mr-z-dropdown',
        '--mr-accent-solid',
        '--mr-font-mono',
    ],
    a11y: [
        'Root uses role="menubar".',
        'Trigger buttons use role="menuitem" with aria-haspopup="true" and aria-expanded.',
        'Dropdown menus use role="menu" with aria-label.',
        'Menu items use role="menuitem".',
        'Separators use role="separator".',
        'Disabled items have disabled attribute and are not interactive.',
        'Escape key closes open menus.',
        'Click outside closes open menus.',
        'Focus-visible outlines are provided for keyboard navigation.',
    ],
}

export function MenubarDocs() {
    return <DocPage doc={docData} />
}
