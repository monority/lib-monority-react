import { DocPage, type DocPageData } from '../DocPage'
import {
  ContextMenuBasicExample,
  ContextMenuWithDangerExample,
  ContextMenuWithDisabledExample,
  ContextMenuWithSeparatorExample,
} from './ContextMenu.examples'

const docData: DocPageData = {
  title: 'ContextMenu',
  description: 'Right-click context menu positioned at cursor with keyboard navigation.',
  importCode: "import { ContextMenu } from '@monority/ui'",
  usageCode: `<ContextMenu
  trigger={<div>Right-click me</div>}
  items={[
    { value: 'edit', label: 'Edit' },
    { value: '', label: '', type: 'separator' as const },
    { value: 'delete', label: 'Delete', danger: true },
  ]}
/>`,
  preview: () => <ContextMenuBasicExample />,
  examples: [
    { title: 'With danger item', content: <ContextMenuWithDangerExample /> },
    { title: 'With disabled item', content: <ContextMenuWithDisabledExample /> },
    { title: 'With separator', content: <ContextMenuWithSeparatorExample /> },
  ],
  props: [
    { name: 'trigger', type: 'ReactNode', defaultValue: '-', description: 'Element that opens the menu on right-click.' },
    { name: 'items', type: `{ value: string; label: ReactNode; type?: 'item' | 'separator'; disabled?: boolean; danger?: boolean; onSelect?: (value: string) => void }[]`, defaultValue: '[]', description: 'Menu items.' },
    { name: 'open', type: 'boolean', defaultValue: '-', description: 'Controlled open state.' },
    { name: 'defaultOpen', type: 'boolean', defaultValue: '-', description: 'Default open state.' },
    { name: 'onOpenChange', type: '(open: boolean) => void', defaultValue: '-', description: 'Open state change callback.' },
    { name: 'contentClassName', type: 'string', defaultValue: '-', description: 'Additional class for the content panel.' }
  ],
  cssHooks: [
    '.mr-context-menu', '.mr-context-menu__trigger', '.mr-context-menu__content',
    '.mr-context-menu__item', '.mr-context-menu__item.is-danger', '.mr-context-menu__separator',
    '[data-open]', '[data-value]'
  ],
  tokens: [
    '--mr-z-overlay', '--mr-radius-md', '--mr-radius-sm',
    '--mr-bg-surface-elevated', '--mr-bg-surface-strong', '--mr-shadow-md', '--mr-border-subtle',
    '--mr-space-*', '--mr-text-sm', '--mr-fg-base', '--mr-fg-strong', '--mr-bg-control', '--mr-danger'
  ],
  a11y: [
    'Trigger sets role="button", tabindex="0", aria-expanded, and aria-haspopup="menu".',
    'Menu content uses role="menu" with aria-orientation="vertical".',
    'Items use role="menuitem", separators use role="separator".',
    'ArrowDown/ArrowUp navigates between menu items.',
    'Home focuses the first item, End focuses the last item.',
    'Escape closes the menu and returns focus to the trigger.',
    'Clicking outside closes the menu.',
    'Menu is positioned at cursor coordinates on right-click.'
  ],
}

export function ContextMenuDocs() {
  return <DocPage doc={docData} />
}
