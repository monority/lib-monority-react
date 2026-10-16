import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { CommandPalette } from '@monority/ui/command-palette'

export function CommandPaletteBasicExample() {
    const [open, setOpen] = useState(false)

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
    )
}

export function CommandPaletteWithGroupsExample() {
    const [open, setOpen] = useState(false)

    const items = [
        {
            value: 'home',
            label: 'Go to docs home',
            group: 'Navigation',
            description: 'Return to the entry page for foundations and components.',
            onSelect: () => setOpen(false),
        },
        {
            value: 'layout',
            label: 'Open layout recipes',
            group: 'Navigation',
            description: 'Review stack, grid, section, and shell building blocks.',
            onSelect: () => setOpen(false),
        },
        {
            value: 'publish',
            label: 'Publish release notes',
            group: 'Actions',
            description: 'Send the current changelog draft to the docs site.',
            onSelect: () => setOpen(false),
        },
        {
            value: 'audit',
            label: 'Run UI audit',
            group: 'Actions',
            description: 'Check surface consistency, spacing rhythm, and docs coverage.',
            onSelect: () => setOpen(false),
        },
    ]

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open grouped palette</Button>
            <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />
        </>
    )
}

export function CommandPaletteWithShortcutsExample() {
    const [open, setOpen] = useState(false)

    const items = [
        {
            value: 'search',
            label: 'Search all docs',
            description: 'Find APIs, examples, and token references.',
            shortcut: 'Ctrl+K',
            onSelect: () => setOpen(false),
        },
        {
            value: 'copy',
            label: 'Copy install command',
            description: 'Grab the package command for quick onboarding.',
            shortcut: 'Ctrl+C',
            onSelect: () => setOpen(false),
        },
        {
            value: 'undo',
            label: 'Undo last style pass',
            description: 'Return to the previous design iteration.',
            shortcut: 'Ctrl+Z',
            onSelect: () => setOpen(false),
        },
    ]

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open with shortcuts</Button>
            <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />
        </>
    )
}

export function CommandPaletteCompoundExample() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open compound palette</Button>
            <CommandPalette open={open} onClose={() => setOpen(false)}>
                <CommandPalette.Header>
                    <CommandPalette.Input placeholder="Tapez une commande ou recherchez..." />
                </CommandPalette.Header>
                <CommandPalette.List>
                    <CommandPalette.Group heading="Navigation">
                        <CommandPalette.Item value="docs" onSelect={() => setOpen(false)}>
                            <CommandPalette.ItemLabel>Documentation</CommandPalette.ItemLabel>
                            <CommandPalette.ItemDescription>
                                Consulter les guides et composants
                            </CommandPalette.ItemDescription>
                            <CommandPalette.Shortcut>Ctrl+D</CommandPalette.Shortcut>
                        </CommandPalette.Item>
                        <CommandPalette.Item value="moodboard" onSelect={() => setOpen(false)}>
                            <CommandPalette.ItemLabel>Moodboard Studio</CommandPalette.ItemLabel>
                            <CommandPalette.ItemDescription>
                                Personnalisation et thèmes
                            </CommandPalette.ItemDescription>
                            <CommandPalette.Shortcut>Ctrl+M</CommandPalette.Shortcut>
                        </CommandPalette.Item>
                    </CommandPalette.Group>
                    <CommandPalette.Separator />
                    <CommandPalette.Group heading="Actions">
                        <CommandPalette.Item value="theme" onSelect={() => setOpen(false)}>
                            <CommandPalette.ItemLabel>Changer de thème</CommandPalette.ItemLabel>
                            <CommandPalette.ItemDescription>
                                Bascule rapide entre thèmes clair et sombre
                            </CommandPalette.ItemDescription>
                            <CommandPalette.Shortcut>Ctrl+T</CommandPalette.Shortcut>
                        </CommandPalette.Item>
                    </CommandPalette.Group>
                </CommandPalette.List>
            </CommandPalette>
        </>
    )
}
