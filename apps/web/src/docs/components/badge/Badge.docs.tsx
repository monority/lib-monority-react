import { DocPage, type DocPageData } from '../DocPage'
import { Badge } from '@monority/ui/badge'
import {
  BadgeDefaultExample,
  BadgePrimaryExample,
  BadgeSuccessExample,
  BadgeDangerExample,
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
    { title: 'Danger', content: <BadgeDangerExample /> },
    { title: 'All variants', content: <BadgeVariantsExample /> },
  ],
  props: [
    { name: 'variant', type: `'default' | 'primary' | 'success' | 'danger'`, defaultValue: "'default'", description: 'Semantic tone.' },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: 'Short label text.' },
  ],
  cssHooks: ['.mr-badge', '.mr-badge--primary', '.mr-badge--success', '.mr-badge--danger', '[data-variant]'],
  tokens: ['--mr-radius-sm', '--mr-text-xs', '--mr-accent', '--mr-success', '--mr-danger'],
  a11y: ['Use concise text.', 'Avoid color-only meaning for critical states.'],
}

export function BadgeDocs() {
  return <DocPage doc={docData} />
}
