export const menubarMeta = {
    title: 'Menubar',
    status: 'stable',
    package: '@monority/ui/menubar',
    import: "import { Menubar } from '@monority/ui'",
    category: 'navigation',
    anatomy: [
        'root',
        'menu-wrapper',
        'trigger',
        'menu',
        'item',
        'item-icon',
        'item-label',
        'shortcut',
        'separator',
    ],
    accessibility: [
        'role="menubar" with menuitem triggers',
        'Arrow keys traverse top-level menus and submenus',
        'Keyboard shortcuts announced with aria-keyshortcuts',
    ],
}
