export const inlineAlertMeta = {
    title: 'InlineAlert',
    status: 'stable',
    package: '@monority/ui/inline-alert',
    import: "import { InlineAlert } from '@monority/ui'",
    category: 'feedback',
    anatomy: ['root', 'icon', 'content', 'title', 'description', 'actions', 'closeButton'],
    accessibility: [
        'role="status" for neutral, info, success; role="alert" for warning, danger',
        'Live regions ensure screen reader announcement upon mounting',
        'Close button includes accessible label',
    ],
}
