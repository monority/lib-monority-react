import { DocPage, type DocPageData } from '../DocPage'
import { ToastBasicExample, ToastTonesExample } from './Toast.examples'

const docData: DocPageData = {
    title: 'Toast',
    description:
        'Transient notification surface for background status, success confirmation, and failure feedback.',
    importCode: "import { Toast, useToast } from '@monority/ui'",
    usageCode: `<Toast title="Release draft saved" description="Your docs changes are ready for review." tone="neutral" />`,
    preview: () => <ToastBasicExample />,
    examples: [{ title: 'Tones', content: <ToastTonesExample /> }],
    props: [
        { name: 'title', type: `string`, defaultValue: '-', description: 'Toast title' },
        {
            name: 'description',
            type: `string`,
            defaultValue: '-',
            description: 'Toast description',
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
    ],
}

export function ToastDocs() {
    return <DocPage doc={docData} />
}
