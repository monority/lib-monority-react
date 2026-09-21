export const toastMeta = {
    title: 'Toast',
    status: 'stable',
    package: '@monority/ui/toast',
    import: "import { useToast } from '@monority/ui'",
    category: 'feedback',
    anatomy: ['root'],
    accessibility: ['role="status" (polite) for neutral/success, role="alert" (assertive) for danger', 'Viewport announces through aria-live="polite"', 'Close button exposes an explicit aria-label'],
}
