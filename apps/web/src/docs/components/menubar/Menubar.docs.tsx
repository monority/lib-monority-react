import { DocPage, type DocPageData } from '../DocPage'
import {
  MenubarBasicExample,
  MenubarWithIconsExample,
  MenubarDangerExample,
  MenubarDisabledExample,
} from './Menubar.examples'

const docData: DocPageData = {
  title: 'Menubar',
  description: 'A compact application command bar for grouped actions, shortcuts, and destructive flows.',
  importCode: "import { Menubar } from '@monority/ui'",
  usageCode: `const items = [
  {
    label: 'Workspace',
    items: [
      { label: 'New dashboard', shortcut: 'Ctrl+N', onClick: () => {} },
      { label: 'Open workspace', shortcut: 'Ctrl+O', onClick: () => {} },
      { separator: true },
      { label: 'Save view', shortcut: 'Ctrl+S', onClick: () => {} },
    ],
  },
  {
    label: 'View',
    items: [
      { label: 'Compact density', shortcut: 'Alt+1', onClick: () => {} },
      { label: 'Comfortable density', shortcut: 'Alt+2', onClick: () => {} },
    ],
  },
]

<Menubar items={items} />`,
  preview: () => <MenubarBasicExample />,
  examples: [
    { title: 'With icons', content: <MenubarWithIconsExample /> },
    { title: 'Danger variant', content: <MenubarDangerExample /> },
    { title: 'Disabled items', content: <MenubarDisabledExample /> },
  ],
  props: [
    { name: 'items', type: 'MenubarMenu[]', defaultValue: '[]', description: 'Menu group definitions with dropdown items' },
    { name: 'defaultActive', type: 'string', defaultValue: '-', description: 'Initially open menu label' },
  ],
  cssHooks: [
    '.mr-menubar',
    '.mr-menubar__menu-wrapper',
    '.mr-menubar__menu-wrapper--active',
    '.mr-menubar__trigger',
    '.mr-menubar__menu',
    '.mr-menubar__item',
    '.mr-menubar__item--danger',
    '.mr-menubar__item--disabled',
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
    '--mr-text-xs',
    '--mr-text-sm',
    '--mr-fg-muted',
    '--mr-fg-base',
    '--mr-danger',
    '--mr-bg-surface-elevated',
    '--mr-bg-surface-strong',
    '--mr-bg-accent-soft',
    '--mr-border-subtle',
    '--mr-shadow-xs',
    '--mr-shadow-md',
    '--mr-z-dropdown',
    '--mr-accent',
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
