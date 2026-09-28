import { DocPage, type DocPageData } from '../DocPage'
import {
    CommandPaletteBasicExample,
    CommandPaletteWithGroupsExample,
    CommandPaletteWithShortcutsExample,
} from './CommandPalette.examples'

const docData: DocPageData = {
    title: 'CommandPalette',
    description:
        'Keyboard-first action palette for jumping, searching, and triggering common product tasks.',
    importCode: "import { CommandPalette } from '@monority/ui'",
    usageCode: `<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  items={[
    { value: 'components', label: 'Open components index' },
    { value: 'tokens', label: 'Inspect design tokens' },
  ]}
/>`,
    preview: () => <CommandPaletteBasicExample />,
    examples: [
        { title: 'With groups', content: <CommandPaletteWithGroupsExample /> },
        { title: 'With shortcuts', content: <CommandPaletteWithShortcutsExample /> },
    ],
    props: [
        { name: 'open', type: `boolean`, defaultValue: '-', description: 'Controls open state.' },
        { name: 'onClose', type: `() => void`, defaultValue: '-', description: 'Close callback.' },
        {
            name: 'items',
            type: `{ value: string; label: string; description?: string; keywords?: string; group?: string; shortcut?: string; onSelect?: () => void }[]`,
            defaultValue: '[]',
            description: 'Command items.',
        },
        { name: 'title', type: `string`, defaultValue: '-', description: 'Palette title.' },
        {
            name: 'placeholder',
            type: `string`,
            defaultValue: '-',
            description: 'Search placeholder.',
        },
        {
            name: 'emptyLabel',
            type: `string`,
            defaultValue: '-',
            description: 'Empty results message.',
        },
    ],
    cssHooks: [
        '.mr-command-palette',
        '.mr-command-palette__panel',
        '.mr-command',
        '.mr-command__layout',
        '.mr-command__header',
        '.mr-command__heading',
        '.mr-command__input',
        '.mr-command__list',
        '.mr-command__item',
        '.mr-command__item-group',
        '.mr-command__item-label',
        '.mr-command__item-description',
        '.mr-command__shortcut',
        '.mr-command__empty',
        '[data-open]',
    ],
    tokens: [
        '--mr-bg-surface-elevated',
        '--mr-bg-surface',
        '--mr-bg-control',
        '--mr-border-subtle',
        '--mr-border-strong',
        '--mr-radius-md',
    ],
    a11y: [
        'The palette is presented as a modal dialog.',
        'Results expose listbox and option roles for keyboard selection.',
        'Arrow keys move the active item, Enter selects it, and Escape closes the palette.',
    ],
}

export function CommandPaletteDocs() {
    return <DocPage doc={docData} />
}
