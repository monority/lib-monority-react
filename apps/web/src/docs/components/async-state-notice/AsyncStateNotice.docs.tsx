import { DocPage, type DocPageData } from '../DocPage'
import {
    AsyncStateNoticeBasicPreview,
    AsyncStateNoticeErrorExample,
    AsyncStateNoticeCustomMessageExample,
    AsyncStateNoticeToggleExample,
} from './AsyncStateNotice.examples'

const docData: DocPageData = {
    title: 'AsyncStateNotice',
    description: 'Displays loading or error state notices for async operations.',
    importCode: "import { AsyncStateNotice } from '@monority/ui/async-state-notice'",
    usageCode: `<AsyncStateNotice isLoading={loading} isError={error} />`,
    preview: () => <AsyncStateNoticeBasicPreview />,
    examples: [
        { title: 'Error State', content: <AsyncStateNoticeErrorExample /> },
        { title: 'Custom Message', content: <AsyncStateNoticeCustomMessageExample /> },
        { title: 'Interactive', content: <AsyncStateNoticeToggleExample /> },
    ],
    cssHooks: [
        '.mr-async-state-notice',
        '.mr-async-state-notice--loading',
        '.mr-async-state-notice--error',
        '[data-state]',
    ],
    tokens: [
        '--mr-accent',
        '--mr-danger',
        '--mr-bg-accent-soft',
        '--mr-danger-soft',
        '--mr-text-sm',
        '--mr-radius-md',
        '--mr-space-*',
    ],
    a11y: [
        'aria-live="polite" for state announcements.',
        'Loading spinner is aria-hidden.',
        'Error state uses role="alert".',
    ],
    props: [
        {
            name: 'isLoading',
            type: `boolean`,
            defaultValue: '-',
            description: 'Show loading state.',
        },
        { name: 'isError', type: `boolean`, defaultValue: '-', description: 'Show error state.' },
        {
            name: 'loadingMessage',
            type: `string`,
            defaultValue: '-',
            description: 'Loading message text.',
        },
        {
            name: 'errorMessage',
            type: `string`,
            defaultValue: '-',
            description: 'Error message text.',
        },
        {
            name: 'loadingContent',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Custom loading content.',
        },
    ],
}

export function AsyncStateNoticeDocs() {
    return <DocPage doc={docData} />
}
