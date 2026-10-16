import { DocPage, type DocPageData } from '../DocPage'
import {
    CommandPaletteBasicExample,
    CommandPaletteCompoundExample,
    CommandPaletteWithGroupsExample,
    CommandPaletteWithShortcutsExample,
} from './CommandPalette.examples'

const docData: DocPageData = {
    title: 'CommandPalette',
    description:
        'Keyboard-first action palette for jumping, searching, and triggering common product tasks.',
    importCode: "import { CommandPalette } from '@monority/ui'",
    usageCode: `const [open, setOpen] = useState(false)

const items = [
  {
    value: 'components',
    label: 'Open components index',
    description: 'Jump to the full component catalog and recent additions.',
    onSelect: () => setOpen(false),
  },
  {
    value: 'tokens',
    label: 'Inspect design tokens',
    description: 'Browse surface, spacing, and typography foundations.',
    onSelect: () => setOpen(false),
  },
]

return (
  <>
    <Button onClick={() => setOpen(true)}>Open command palette</Button>
    <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />
  </>
)`,
    preview: () => <CommandPaletteBasicExample />,
    examples: [
        {
            title: 'Compound composition',
            content: <CommandPaletteCompoundExample />,
            code: `<CommandPalette open={open} onClose={() => setOpen(false)}>
  <CommandPalette.Header>
    <CommandPalette.Input placeholder="Tapez une commande ou recherchez..." />
  </CommandPalette.Header>
  <CommandPalette.List>
    <CommandPalette.Group heading="Navigation">
      <CommandPalette.Item value="docs" onSelect={() => setOpen(false)}>
        <CommandPalette.ItemLabel>Documentation</CommandPalette.ItemLabel>
        <CommandPalette.ItemDescription>Consulter les guides et composants</CommandPalette.ItemDescription>
        <CommandPalette.Shortcut>Ctrl+D</CommandPalette.Shortcut>
      </CommandPalette.Item>
      <CommandPalette.Item value="moodboard" onSelect={() => setOpen(false)}>
        <CommandPalette.ItemLabel>Moodboard Studio</CommandPalette.ItemLabel>
        <CommandPalette.ItemDescription>Personnalisation et thèmes</CommandPalette.ItemDescription>
        <CommandPalette.Shortcut>Ctrl+M</CommandPalette.Shortcut>
      </CommandPalette.Item>
    </CommandPalette.Group>
    <CommandPalette.Separator />
    <CommandPalette.Group heading="Actions">
      <CommandPalette.Item value="theme" onSelect={() => setOpen(false)}>
        <CommandPalette.ItemLabel>Changer de thème</CommandPalette.ItemLabel>
        <CommandPalette.ItemDescription>Bascule rapide entre thèmes clair et sombre</CommandPalette.ItemDescription>
        <CommandPalette.Shortcut>Ctrl+T</CommandPalette.Shortcut>
      </CommandPalette.Item>
    </CommandPalette.Group>
  </CommandPalette.List>
</CommandPalette>`,
        },
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
        '--mr-bg-raised',
        '--mr-bg-surface',
        '--mr-bg-surface',
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
