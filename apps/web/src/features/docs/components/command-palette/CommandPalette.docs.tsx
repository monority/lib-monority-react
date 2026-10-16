import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { CommandPalette } from '@monority/ui/command-palette'
import { DocPage, type DocPageData } from '../DocPage'
import { ComponentPlayground } from '../ComponentPlayground'
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
            label: 'Consulter la documentation',
            description: 'Parcourir les 75 composants et guides WAI-ARIA',
            shortcut: 'Ctrl+D',
            onSelect: () => setOpen(false),
        },
        {
            value: 'tokens',
            label: 'Inspecter les tokens CSS',
            description: 'Couleurs, espaces, rayons, transitions et focus rings',
            shortcut: 'Ctrl+T',
            onSelect: () => setOpen(false),
        },
        {
            value: 'a11y',
            label: 'Audit accessibilite WCAG 2.1 AA',
            description: 'Verifications axe-core et navigation clavier',
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
                Ouvrir la palette de commandes
            </Button>
            <span style={{ fontSize: 'var(--mr-font-size-xs)', color: 'var(--mr-text-secondary)' }}>
                Raccourci clavier de demonstration disponible a tout moment
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
            return `import { useState } from 'react'\nimport { Button } from '@monority/ui/button'\nimport { CommandPalette } from '@monority/ui/command-palette'\n\nconst [open, setOpen] = useState(false)\nconst items = [\n  {\n    value: 'docs',\n    label: 'Consulter la documentation',\n    description: 'Parcourir les 75 composants et guides WAI-ARIA',\n    shortcut: 'Ctrl+D',\n    onSelect: () => setOpen(false),\n  },\n  {\n    value: 'tokens',\n    label: 'Inspecter les tokens CSS',\n    description: 'Couleurs, espaces, rayons, transitions et focus rings',\n    shortcut: 'Ctrl+T',\n    onSelect: () => setOpen(false),\n  },\n]\n\n<>\n  <Button onClick={() => setOpen(true)}>Ouvrir la palette de commandes</Button>\n  <CommandPalette\n    open={open}\n    onClose={() => setOpen(false)}\n    items={items}\n    title="${p.title}"\n    placeholder="${p.placeholder}"\n    emptyLabel="${p.emptyLabel}"\n  />\n</>`
        }}
        controls={[
            {
                name: 'title',
                type: 'text',
                label: 'Titre de la palette',
                defaultValue: 'Navigation rapide',
            },
            {
                name: 'placeholder',
                type: 'text',
                label: 'Placeholder de recherche',
                defaultValue: 'Rechercher une action ou une page...',
            },
            {
                name: 'emptyLabel',
                type: 'text',
                label: 'Message aucun resultat',
                defaultValue: 'Aucune commande correspondante.',
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
    keyboardNavigation: [
        {
            key: ['Control', 'k'],
            action: 'Ouvre la palette de commandes depuis n importe quel endroit.',
            context: 'Raccourci global',
        },
        {
            key: 'ArrowDown',
            action: 'Deplace le focus et la surbrillance sur la commande suivante.',
            context: 'Palette ouverte',
        },
        {
            key: 'ArrowUp',
            action: 'Deplace le focus et la surbrillance sur la commande precedente.',
            context: 'Palette ouverte',
        },
        {
            key: 'Enter',
            action: 'Execute l action associee a la commande surlignee et referme la palette.',
            context: 'Commande active',
        },
        {
            key: 'Escape',
            action: 'Ferme immediatement la palette de commandes et restaure le focus.',
            context: 'Palette ouverte',
        },
        {
            key: 'Tab',
            action: 'Fait circuler le focus a l interieur du piege de focus du modal.',
            context: 'Palette ouverte',
        },
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
