export const commandPaletteMeta = {
    title: 'CommandPalette',
    status: 'stable',
    package: '@monority/ui/command-palette',
    import: "import { CommandPalette } from '@monority/ui'",
    category: 'overlays',
    anatomy: ['root', 'backdrop', 'dialog', 'search', 'list', 'group', 'item', 'shortcut', 'empty'],
    accessibility: [
        'role="dialog" with aria-modal="true"',
        'Search input with aria-autocomplete and aria-controls',
        'Focus trap inside dialog',
        'Escape closes palette and returns focus',
    ],
}
