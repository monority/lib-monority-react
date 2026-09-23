import { DocPage, type DocPageData } from '../DocPage'
import { Badge } from '@monority/ui/badge'
import {
    BadgeDefaultExample,
    BadgePrimaryExample,
    BadgeSuccessExample,
    BadgeDangerExample,
    BadgeWarningExample,
    BadgeVariantsExample,
} from './Badge.examples'

const docData: DocPageData = {
    title: 'Badge',
    description: 'Compact status label for metadata, lifecycle states, and small categorization.',
    importCode: "import { Badge } from '@monority/ui/badge'",
    usageCode: '<Badge>Draft</Badge>',
    preview: () => <BadgeDefaultExample />,
    examples: [
        { title: 'Primary', content: <BadgePrimaryExample /> },
        { title: 'Success', content: <BadgeSuccessExample /> },
        { title: 'Warning', content: <BadgeWarningExample /> },
        { title: 'Danger', content: <BadgeDangerExample /> },
        { title: 'All variants', content: <BadgeVariantsExample /> },
    ],
    props: [
        {
            name: 'variant',
            type: `'default' | 'primary' | 'success' | 'warning' | 'danger'`,
            defaultValue: "'default'",
            description: 'Visual variant.',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Short label text.',
        },
    ],
    cssHooks: [
        '.mr-badge',
        '.mr-badge--primary',
        '.mr-badge--success',
        '.mr-badge--warning',
        '.mr-badge--danger',
        '[data-variant]',
    ],
    tokens: [
        '--mr-radius-xs',
        '--mr-text-xs',
        '--mr-bg-accent-soft',
        '--mr-success-soft',
        '--mr-warning-soft',
        '--mr-danger-soft',
    ],
    a11y: ['Use concise text.', 'Avoid color-only meaning for critical states.'],
}

export function BadgeDocs() {
    return <DocPage doc={docData} />
}
