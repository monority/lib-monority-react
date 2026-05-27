import { DocPage, type DocPageData } from '../DocPage'
import { Banner } from '@monority/ui'
import { BannerBasicExample } from './Banner.examples'

const docData: DocPageData = {
  title: 'Banner',
  description: "Top-of-page notification with eyebrow, title, description, and optional actions.",
  importCode: "import { Banner } from '@monority/ui'",
  usageCode: `<Banner tone="info" title="Scheduled maintenance" description="Service may be briefly unavailable." />`,
  preview: () => <BannerBasicExample />,
  props: [
    { name: 'tone', type: `'info' | 'success' | 'warning' | 'danger'`, defaultValue: "'info'", description: "Visual tone." },
    { name: 'eyebrow', type: `string`, defaultValue: "-", description: "Small text above title." },
    { name: 'title', type: `string`, defaultValue: "-", description: "Banner title." },
    { name: 'description', type: `string`, defaultValue: "-", description: "Banner description." },
    { name: 'actions', type: `ReactNode`, defaultValue: "-", description: "Action buttons." }
  ],
}

export function BannerDocs() {
  return <DocPage doc={docData} />
}
