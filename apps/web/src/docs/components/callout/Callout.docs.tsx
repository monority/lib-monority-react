import { DocPage, type DocPageData } from '../DocPage'
import { Callout } from '@monority/ui'
import { CalloutBasicExample } from './Callout.examples'

const docData: DocPageData = {
  title: 'Callout',
  description: "Styled callout box for notes, tips, and contextual highlights.",
  importCode: "import { Callout } from '@monority/ui'",
  usageCode: `<Callout title="Note" tone="info">
  <p>This is an informational callout.</p>
</Callout>`,
  preview: () => <CalloutBasicExample />,
  props: [
    { name: 'title', type: `string`, defaultValue: "-", description: "Callout title." },
    { name: 'description', type: `string`, defaultValue: "-", description: "Callout description." },
    { name: 'tone', type: `'neutral' | 'info' | 'success' | 'warning' | 'danger'`, defaultValue: "'neutral'", description: "Visual tone." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Custom content." }
  ],
}

export function CalloutDocs() {
  return <DocPage doc={docData} />
}
