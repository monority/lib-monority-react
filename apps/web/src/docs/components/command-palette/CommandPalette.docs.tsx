import { DocPage, type DocPageData } from '../DocPage'
import {
  CommandPaletteBasicExample,
  CommandPaletteWithGroupsExample,
  CommandPaletteWithShortcutsExample,
} from './CommandPalette.examples'

const docData: DocPageData = {
  title: 'CommandPalette',
  description: "Cmd+K style command palette for quick actions and navigation.",
  importCode: "import { CommandPalette } from '@monority/ui'",
  usageCode: `<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  items={[
    { value: 'home', label: 'Go to Home' },
    { value: 'settings', label: 'Open Settings' },
  ]}
/>`,
  preview: () => <CommandPaletteBasicExample />,
  examples: [
    { title: 'With groups', content: <CommandPaletteWithGroupsExample /> },
    { title: 'With shortcuts', content: <CommandPaletteWithShortcutsExample /> },
  ],
  props: [
    { name: 'open', type: `boolean`, defaultValue: "-", description: "Controls open state." },
    { name: 'onClose', type: `() => void`, defaultValue: "-", description: "Close callback." },
    { name: 'items', type: `{ value: string; label: string; description?: string; keywords?: string; group?: string; shortcut?: string; onSelect?: () => void }[]`, defaultValue: "[]", description: "Command items." },
    { name: 'title', type: `string`, defaultValue: "-", description: "Palette title." },
    { name: 'placeholder', type: `string`, defaultValue: "-", description: "Search placeholder." },
    { name: 'emptyLabel', type: `string`, defaultValue: "-", description: "Empty results message." }
  ],
  cssHooks: [
    '.mr-command-palette', '.mr-command-palette__input', '.mr-command-palette__list', '.mr-command-palette__item',
    '[data-open]', '[data-selected]',
  ],
  tokens: [
    '--mr-bg-surface-elevated', '--mr-shadow-xl', '--mr-radius-lg',
    '--mr-bg-overlay', '--mr-text-sm', '--mr-space-*',
  ],
  a11y: [
    'Combobox ARIA pattern.',
    'role="dialog" with aria-modal.',
    'Keyboard navigation (arrows, enter, escape).',
    'aria-activedescendant for active option.',
  ],
}

export function CommandPaletteDocs() {
  return <DocPage doc={docData} />
}
