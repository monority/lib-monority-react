import { DocPage, type DocPageData } from '../DocPage'
import {
  CalloutBasicExample,
  CalloutTonesExample,
  CalloutWithChildrenExample,
} from './Callout.examples'

const docData: DocPageData = {
  title: 'Callout',
  description: "Styled callout box for notes, tips, and contextual highlights.",
  importCode: "import { Callout } from '@monority/ui'",
  usageCode: `<Callout title="Note" tone="info">
  <p>This is an informational callout.</p>
</Callout>`,
  preview: () => <CalloutBasicExample />,
  examples: [
    { title: 'Tones', content: <CalloutTonesExample /> },
    { title: 'With children', content: <CalloutWithChildrenExample /> },
  ],
  props: [
    { name: 'title', type: `string`, defaultValue: "-", description: "Callout title." },
    { name: 'description', type: `string`, defaultValue: "-", description: "Callout description." },
    { name: 'tone', type: `'neutral' | 'info' | 'success' | 'warning' | 'danger'`, defaultValue: "'neutral'", description: "Visual tone." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Custom content." }
  ],
  cssHooks: [
    '.mr-callout', '.mr-callout--info', '.mr-callout--success', '.mr-callout--danger',
    '[data-variant]',
  ],
  tokens: [
    '--mr-accent', '--mr-success', '--mr-danger',
    '--mr-bg-accent-soft', '--mr-bg-success-soft', '--mr-bg-danger-soft',
    '--mr-text-sm', '--mr-radius-md',
  ],
  a11y: [
    'Use role="alert" for time-sensitive content.',
    'Color is not the only visual indicator.',
  ],
}

export function CalloutDocs() {
  return <DocPage doc={docData} />
}
