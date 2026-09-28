export const resizableMeta = {
    title: 'Resizable',
    status: 'draft',
    package: '@monority/ui/resizable',
    import: "import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@monority/ui'",
    category: 'layout',
    anatomy: ['panel-group', 'panel', 'handle'],
    accessibility: [
        'Handles use role="separator" with aria-orientation.',
        'Handles are keyboard-focusable (tabIndex=0).',
        'Arrow keys resize panels (Shift+Arrow for larger steps).',
        'aria-valuenow reflects current panel size percentage.',
    ],
}
