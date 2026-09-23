import { DocPage, type DocPageData } from '../DocPage'
import { ToastBasicExample, ToastProviderExample, ToastTonesExample } from './Toast.examples'

const docData: DocPageData = {
    title: 'Toast',
    description:
        'Transient notification surface for background status, success confirmation, and failure feedback. Render one <Toast> directly, or push queued toasts through ToastProvider with useToast().',
    importCode: `import { Toast } from '@monority/ui/toast'
import { useToast } from '@monority/ui'`,
    usageCode: `<Toast title="Release draft saved" description="Your docs changes are ready for review." tone="neutral" />`,
    preview: () => <ToastBasicExample />,
    examples: [
        { title: 'Tones', content: <ToastTonesExample /> },
        { title: 'Provider queue', content: <ToastProviderExample /> },
    ],
    props: [
        { name: 'title', type: `ReactNode`, defaultValue: '-', description: 'Toast title' },
        {
            name: 'description',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Optional secondary text.',
        },
        {
            name: 'tone',
            type: `'neutral' | 'success' | 'danger'`,
            defaultValue: "'neutral'",
            description: 'Visual tone of the toast',
        },
        {
            name: 'onClose',
            type: `() => void`,
            defaultValue: '-',
            description: 'Close button callback.',
        },
        {
            name: 'duration',
            type: `number`,
            defaultValue: '3600',
            description: 'ToastProvider queue only (pushToast): ms before auto-dismiss, Infinity stays.',
        },
    ],
    cssHooks: [
        '.mr-toast',
        '.mr-toast__body',
        '.mr-toast__header',
        '.mr-toast__heading',
        '.mr-toast__title',
        '.mr-toast__description',
        '.mr-toast__close',
        '.mr-toast-viewport',
        '.mr-toast--success',
        '.mr-toast--danger',
    ],
    tokens: [
        '--mr-bg-surface-elevated',
        '--mr-border-subtle',
        '--mr-shadow-sm',
        '--mr-radius-md',
        '--mr-success',
        '--mr-danger',
    ],
    a11y: [
        'Neutral and success toasts use role="status" with polite announcements.',
        'Danger toasts use role="alert" with assertive announcements.',
        'Dismiss buttons expose an explicit aria-label.',
        'Queued toasts auto-dismiss after duration (default 3600ms); duration Infinity stays until dismissed.',
    ],
}

export function ToastDocs() {
    return <DocPage doc={docData} />
}
