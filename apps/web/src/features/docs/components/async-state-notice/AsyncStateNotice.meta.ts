export const asyncStateNoticeMeta = {
    title: 'AsyncStateNotice',
    status: 'stable',
    package: '@monority/ui/async-state-notice',
    import: "import { AsyncStateNotice } from '@monority/ui'",
    category: 'feedback',
    anatomy: ['root', 'spinner', 'icon', 'title', 'description', 'actions'],
    accessibility: [
        'aria-live="polite" for dynamic loading state updates',
        'role="status" or role="alert" according to message severity',
        'Actionable retry buttons maintain logical tab order',
    ],
}
