import { DocPage, type DocPageData } from '../DocPage'
import {
  BannerBasicExample,
  BannerTonesExample,
  BannerWithActionsExample,
  BannerWithEyebrowExample,
} from './Banner.examples'

const docData: DocPageData = {
  title: 'Banner',
  description: "Top-of-page notification with eyebrow, title, description, and optional actions.",
  importCode: "import { Banner } from '@monority/ui'",
  usageCode: `<Banner tone="info" title="Scheduled maintenance" description="Service may be briefly unavailable." />`,
  preview: () => <BannerBasicExample />,
  examples: [
    { title: 'Tones', content: <BannerTonesExample /> },
    { title: 'With actions', content: <BannerWithActionsExample /> },
    { title: 'With eyebrow', content: <BannerWithEyebrowExample /> },
  ],
  props: [
    { name: 'tone', type: `'info' | 'success' | 'warning' | 'danger'`, defaultValue: "'info'", description: "Visual tone." },
    { name: 'eyebrow', type: `string`, defaultValue: "-", description: "Small text above title." },
    { name: 'title', type: `string`, defaultValue: "-", description: "Banner title." },
    { name: 'description', type: `string`, defaultValue: "-", description: "Banner description." },
    { name: 'actions', type: `ReactNode`, defaultValue: "-", description: "Action buttons." }
  ],
  cssHooks: [
    '.mr-banner', '.mr-banner--info', '.mr-banner--success', '.mr-banner--danger',
    '[data-variant]',
  ],
  tokens: [
    '--mr-accent', '--mr-success', '--mr-danger',
    '--mr-bg-accent-soft', '--mr-bg-success-soft', '--mr-bg-danger-soft',
    '--mr-text-sm',
  ],
  a11y: [
    'role="alert" for important messages.',
    'Dismiss button with aria-label.',
  ],
}

export function BannerDocs() {
  return <DocPage doc={docData} />
}
