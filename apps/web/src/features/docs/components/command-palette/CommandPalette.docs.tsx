import { Button } from '@monority/ui/button'
import { CommandPalette } from '@monority/ui/command-palette'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { commandPaletteI18n } from './CommandPalette.messages'
import {
    CommandPaletteBasicExample,
    CommandPaletteCompoundExample,
    CommandPaletteWithGroupsExample,
    CommandPaletteWithShortcutsExample,
} from './CommandPalette.examples'

function CommandPalettePlaygroundDemo(props: {
    title: string
    placeholder: string
    emptyLabel: string
}) {
    const [open, setOpen] = useState(false)
    const items = [
        {
            value: 'docs',
            label: 'Browse documentation',
            description: 'Browse the 75 components and WAI-ARIA guides',
            shortcut: 'Ctrl+D',
            onSelect: () => setOpen(false),
        },
        {
            value: 'tokens',
            label: 'Inspect CSS tokens',
            description: 'Colors, spacing, radii, transitions, and focus rings',
            shortcut: 'Ctrl+T',
            onSelect: () => setOpen(false),
        },
        {
            value: 'a11y',
            label: 'WCAG 2.1 AA accessibility audit',
            description: 'axe-core checks and keyboard navigation',
            shortcut: 'Ctrl+A',
            onSelect: () => setOpen(false),
        },
    ]

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--mr-space-3)',
            }}
        >
            <Button onClick={() => setOpen(true)} variant="primary">
                Open the command palette
            </Button>
            <span style={{ fontSize: 'var(--mr-font-size-xs)', color: 'var(--mr-text-secondary)' }}>
                Keyboard shortcut demo available at any time
            </span>
            <CommandPalette
                open={open}
                onClose={() => setOpen(false)}
                items={items}
                title={props.title}
                placeholder={props.placeholder}
                emptyLabel={props.emptyLabel}
            />
        </div>
    )
}

const commandPalettePlayground = (
    <ComponentPlayground<{
        title: string
        placeholder: string
        emptyLabel: string
    }>
        componentName="CommandPalette"
        importCode="import { CommandPalette } from '@monority/ui/command-palette'"
        getCode={(p) => {
            return `import { useState } from 'react'\nimport { Button } from '@monority/ui/button'\nimport { CommandPalette } from '@monority/ui/command-palette'\n\nconst [open, setOpen] = useState(false)\nconst items = [\n  {\n    value: 'docs',\n    label: 'Browse documentation',\n    description: 'Browse the 75 components and WAI-ARIA guides',\n    shortcut: 'Ctrl+D',\n    onSelect: () => setOpen(false),\n  },\n  {\n    value: 'tokens',\n    label: 'Inspect CSS tokens',\n    description: 'Colors, spacing, radii, transitions, and focus rings',\n    shortcut: 'Ctrl+T',\n    onSelect: () => setOpen(false),\n  },\n]\n\n<>\n  <Button onClick={() => setOpen(true)}>Open the command palette</Button>\n  <CommandPalette\n    open={open}\n    onClose={() => setOpen(false)}\n    items={items}\n    title="${p.title}"\n    placeholder="${p.placeholder}"\n    emptyLabel="${p.emptyLabel}"\n  />\n</>`
        }}
        controls={[
            {
                name: 'title',
                type: 'text',
                label: 'Palette title',
                defaultValue: 'Quick navigation',
            },
            {
                name: 'placeholder',
                type: 'text',
                label: 'Search placeholder',
                defaultValue: 'Search for an action or a page...',
            },
            {
                name: 'emptyLabel',
                type: 'text',
                label: 'Empty results message',
                defaultValue: 'No matching command.',
            },
        ]}
        render={(props) => <CommandPalettePlaygroundDemo {...props} />}
    />
)

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
    playground: commandPalettePlayground,
    examples: [
        {
            title: 'Compound composition',
            content: <CommandPaletteCompoundExample />,
            code: `<CommandPalette open={open} onClose={() => setOpen(false)}>
  <CommandPalette.Header>
    <CommandPalette.Input placeholder="Type a command or search..." />
  </CommandPalette.Header>
  <CommandPalette.List>
    <CommandPalette.Group heading="Navigation">
      <CommandPalette.Item value="docs" onSelect={() => setOpen(false)}>
        <CommandPalette.ItemLabel>Documentation</CommandPalette.ItemLabel>
        <CommandPalette.ItemDescription>Browse guides and components</CommandPalette.ItemDescription>
        <CommandPalette.Shortcut>Ctrl+D</CommandPalette.Shortcut>
      </CommandPalette.Item>
      <CommandPalette.Item value="moodboard" onSelect={() => setOpen(false)}>
        <CommandPalette.ItemLabel>Moodboard Studio</CommandPalette.ItemLabel>
        <CommandPalette.ItemDescription>Customization and themes</CommandPalette.ItemDescription>
        <CommandPalette.Shortcut>Ctrl+M</CommandPalette.Shortcut>
      </CommandPalette.Item>
    </CommandPalette.Group>
    <CommandPalette.Separator />
    <CommandPalette.Group heading="Actions">
      <CommandPalette.Item value="theme" onSelect={() => setOpen(false)}>
        <CommandPalette.ItemLabel>Switch theme</CommandPalette.ItemLabel>
        <CommandPalette.ItemDescription>Quick toggle between light and dark themes</CommandPalette.ItemDescription>
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
    keyboardNavigation: [
        {
            key: ['Control', 'k'],
            action: 'Opens the command palette from anywhere.',
            context: 'Global shortcut',
        },
        {
            key: 'ArrowDown',
            action: 'Moves focus and highlight to the next command.',
            context: 'Palette open',
        },
        {
            key: 'ArrowUp',
            action: 'Moves focus and highlight to the previous command.',
            context: 'Palette open',
        },
        {
            key: 'Enter',
            action: 'Runs the action associated with the highlighted command and closes the palette.',
            context: 'Active command',
        },
        {
            key: 'Escape',
            action: 'Closes the command palette immediately and restores focus.',
            context: 'Palette open',
        },
        {
            key: 'Tab',
            action: 'Cycles focus inside the modal focus trap.',
            context: 'Palette open',
        },
    ],
    a11y: [
        'The palette is presented as a modal dialog.',
        'Results expose listbox and option roles for keyboard selection.',
        'Arrow keys move the active item, Enter selects it, and Escape closes the palette.',
    ],
    i18n: commandPaletteI18n,
}

export function CommandPaletteDocs() {
    return <DocPage doc={docData} />
}
