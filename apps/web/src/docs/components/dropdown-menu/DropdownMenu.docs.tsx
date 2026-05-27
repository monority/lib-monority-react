import { DocPage, type DocPageData } from '../DocPage'
import { DropdownMenu } from '@monority/ui'
import { DropdownMenuBasicExample } from './DropdownMenu.examples'

const docData: DocPageData = {
  title: 'DropdownMenu',
  description: "Menu dropdown with keyboard navigation and item variants.",
  importCode: "import { DropdownMenu } from '@monority/ui'",
  usageCode: `<DropdownMenu
  trigger={<Button>Actions</Button>}
  items={[
    { value: 'edit', label: 'Edit' },
    { value: '', label: '', type: 'separator' as const },
    { value: 'delete', label: 'Delete', danger: true },
  ]}
/>`,
  preview: () => <DropdownMenuBasicExample />,
  props: [
    { name: 'trigger', type: `ReactNode`, defaultValue: "-", description: "Element that opens the menu." },
    { name: 'items', type: `{ value: string; label: string; type?: 'item' | 'separator'; disabled?: boolean; danger?: boolean; onSelect?: (value: string) => void }[]`, defaultValue: "[]", description: "Menu items." },
    { name: 'open', type: `boolean`, defaultValue: "-", description: "Controlled open state." },
    { name: 'defaultOpen', type: `boolean`, defaultValue: "-", description: "Default open state." },
    { name: 'onOpenChange', type: `(open: boolean) => void`, defaultValue: "-", description: "Open state change callback." },
    { name: 'align', type: `'start' | 'center' | 'end'`, defaultValue: "'end'", description: "Alignment relative to trigger." },
    { name: 'side', type: `'top' | 'bottom' | 'left' | 'right'`, defaultValue: "'bottom'", description: "Side to render the menu." }
  ],
  cssHooks: [
    '.mr-dropdown', '.mr-dropdown__content', '.mr-dropdown__content--top',
    '.mr-dropdown__content--bottom', '.mr-dropdown__content--left', '.mr-dropdown__content--right',
    '.mr-dropdown__item', '.mr-dropdown__separator',
    '[data-open]', '[data-align]', '[data-side]', '[data-value]', '[data-danger]', '[data-disabled]', '[data-active]'
  ],
  tokens: [
    '--mr-z-overlay', '--mr-radius-md', '--mr-radius-sm',
    '--mr-bg-surface-elevated', '--mr-shadow-md', '--mr-border-subtle',
    '--mr-space-*', '--mr-text-sm', '--mr-fg-base', '--mr-bg-control', '--mr-danger'
  ],
  a11y: [
    'Trigger sets aria-expanded, aria-haspopup="menu", and aria-controls.',
    'Menu content uses role="menu" with aria-orientation="vertical".',
    'Items use role="menuitem", separators use role="separator".',
    'ArrowDown/ArrowUp navigates between menu items.',
    'Home focuses the first item, End focuses the last item.',
    'Escape closes the menu and returns focus to the trigger.',
    'Clicking outside closes the menu.'
  ],
}

export function DropdownMenuDocs() {
  return <DocPage doc={docData} />
}
