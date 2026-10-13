export const comboboxMeta = {
    title: 'Combobox',
    status: 'stable',
    package: '@monority/ui/combobox',
    import: "import { Combobox } from '@monority/ui'",
    category: 'forms',
    anatomy: ['root', 'input', 'trigger', 'popover', 'list', 'option', 'group', 'empty'],
    accessibility: [
        'role="combobox" with aria-expanded, aria-controls, aria-autocomplete="list"',
        'role="listbox" on popup with role="option" items',
        'Roving focus via aria-activedescendant',
        'Arrow keys, Enter, and Escape keyboard navigation',
    ],
}
