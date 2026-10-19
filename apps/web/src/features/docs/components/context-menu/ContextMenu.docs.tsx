import { ContextMenu } from '@monority/ui/context-menu'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    ContextMenuWithDangerExample,
    ContextMenuWithDisabledExample,
    ContextMenuWithSeparatorExample,
} from './ContextMenu.examples'

function ContextMenuPlayground() {
    const [hasDanger, setHasDanger] = useState(true)
    const [hasDisabled, setHasDisabled] = useState(true)

    const items = [
        { value: 'view', label: 'Afficher les détails' },
        { value: 'edit', label: 'Modifier les propriétés' },
        { value: 'duplicate', label: 'Dupliquer l’élément' },
        ...(hasDisabled
            ? [{ value: 'archive', label: 'Archiver (accès restreint)', disabled: true }]
            : []),
        { value: 'sep-1', label: '', type: 'separator' as const },
        ...(hasDanger
            ? [{ value: 'delete', label: 'Supprimer définitivement', danger: true }]
            : []),
    ]

    const snippet = `<ContextMenu
  trigger={
    <div style={{ padding: '32px 16px', textAlign: 'center', border: '2px dashed var(--mr-border-default)', borderRadius: 8 }}>
      Faites un clic droit sur cette zone
    </div>
  }
  items={[
    { value: 'view', label: 'Afficher les détails' },
    { value: 'edit', label: 'Modifier les propriétés' },
    { value: 'duplicate', label: 'Dupliquer l’élément' },
${hasDisabled ? "    { value: 'archive', label: 'Archiver (accès restreint)', disabled: true },\n" : ''}    { value: 'sep-1', label: '', type: 'separator' },
${hasDanger ? "    { value: 'delete', label: 'Supprimer définitivement', danger: true },\n" : ''}  ]}
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'boolean',
                    label: 'Action destructrice (danger)',
                    value: hasDanger,
                    onChange: setHasDanger,
                },
                {
                    type: 'boolean',
                    label: 'Action désactivée (disabled)',
                    value: hasDisabled,
                    onChange: setHasDisabled,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    width: '100%',
                    minHeight: 160,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ContextMenu
                    trigger={
                        <div
                            tabIndex={0}
                            style={{
                                padding: '24px 32px',
                                textAlign: 'center',
                                border: '1px dashed var(--mr-border-strong, #94a3b8)',
                                borderRadius: 8,
                                background: 'var(--mr-bg-sunken, #f8fafc)',
                                cursor: 'context-menu',
                                fontSize: '0.875rem',
                                color: 'var(--mr-text-secondary, #64748b)',
                                userSelect: 'none',
                            }}
                        >
                            Faites un clic droit ici (ou Shift + F10)
                        </div>
                    }
                    items={items}
                />
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'ContextMenu',
    description:
        'A cursor-positioned action menu for contextual commands, quick edits, and destructive actions.',
    importCode: "import { ContextMenu } from '@monority/ui'",
    usageCode: `<ContextMenu
  trigger={<div>Right-click this canvas</div>}
  items={[
    { value: 'open', label: 'Open record' },
    { value: 'separator-1', label: '', type: 'separator' as const },
    { value: 'delete', label: 'Delete', danger: true },
  ]}
/>`,
    preview: () => <ContextMenuPlayground />,
    examples: [
        { title: 'With danger item', content: <ContextMenuWithDangerExample /> },
        { title: 'With disabled item', content: <ContextMenuWithDisabledExample /> },
        { title: 'With separator', content: <ContextMenuWithSeparatorExample /> },
    ],
    props: [
        {
            name: 'trigger',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Element that opens the menu on right-click.',
        },
        {
            name: 'items',
            type: `{ value: string; label: ReactNode; type?: 'item' | 'separator'; disabled?: boolean; danger?: boolean; onSelect?: (value: string) => void }[]`,
            defaultValue: '[]',
            description: 'Menu items.',
        },
        { name: 'open', type: 'boolean', defaultValue: '-', description: 'Controlled open state.' },
        {
            name: 'defaultOpen',
            type: 'boolean',
            defaultValue: '-',
            description: 'Default open state.',
        },
        {
            name: 'onOpenChange',
            type: '(open: boolean) => void',
            defaultValue: '-',
            description: 'Open state change callback.',
        },
        {
            name: 'contentClassName',
            type: 'string',
            defaultValue: '-',
            description: 'Additional class for the content panel.',
        },
    ],
    cssHooks: [
        '.mr-context-menu',
        '.mr-context-menu__trigger',
        '.mr-context-menu__content',
        '.mr-context-menu__item',
        '.mr-context-menu__item.is-danger',
        '.mr-context-menu__separator',
        '[data-open]',
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
        '--mr-text-primary',
        '--mr-danger',
    ],
    keyboardNavigation: [
        { key: 'Shift + F10', action: 'Ouvre le menu contextuel sur le déclencheur' },
        { key: 'Flèche Bas / Flèche Haut', action: 'Navigue entre les actions du menu' },
        { key: 'Entrée / Espace', action: 'Exécute l’action sélectionnée' },
        { key: 'Échap', action: 'Ferme le menu contextuel et replace le focus sur la zone' },
    ],
    a11y: [
        'Trigger sets role="button", tabindex="0", aria-expanded, and aria-haspopup="menu".',
        'Menu content uses role="menu" with aria-orientation="vertical".',
        'Items use role="menuitem", separators use role="separator".',
        'ArrowDown/ArrowUp navigates between menu items.',
        'Home focuses the first item, End focuses the last item.',
        'Escape closes the menu and returns focus to the trigger.',
        'Clicking outside closes the menu.',
        'Menu is positioned at cursor coordinates on right-click.',
    ],
}

export function ContextMenuDocs() {
    return <DocPage doc={docData} />
}
