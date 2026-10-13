export const contextMenuMeta = {
    title: 'ContextMenu',
    status: 'stable',
    package: '@monority/ui/context-menu',
    import: "import { ContextMenu } from '@monority/ui'",
    category: 'overlays',
    anatomy: [
        'root',
        'trigger',
        'content',
        'item',
        'separator',
        'shortcut',
        'subTrigger',
        'subContent',
    ],
    accessibility: [
        'WAI-ARIA context menu pattern',
        'Activated via right-click or Shift+F10',
        'Arrow keys navigate items, Escape closes menu',
    ],
}
