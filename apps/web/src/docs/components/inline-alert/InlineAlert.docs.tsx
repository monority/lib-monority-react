import { DocPage, type DocPageData } from '../DocPage'
import { InlineAlert } from '@monority/ui'
import { InlineAlertBasicExample } from './InlineAlert.examples'

const docData: DocPageData = {
  title: 'InlineAlert',
  description: "Inline contextual message with tone and optional action.",
  importCode: "import { InlineAlert } from '@monority/ui'",
  usageCode: `<InlineAlert tone="warning" title="Storage almost full" description="Delete unused files." />`,
  preview: () => <InlineAlertBasicExample />,
  props: [
    { name: 'tone', type: `'info' | 'success' | 'warning' | 'danger'`, defaultValue: "-", description: "Visual tone." },
    { name: 'title', type: `string`, defaultValue: "-", description: "Alert title." },
    { name: 'description', type: `string`, defaultValue: "-", description: "Alert description." },
    { name: 'actionLabel', type: `string`, defaultValue: "-", description: "Action button label." },
    { name: 'onAction', type: `() => void`, defaultValue: "-", description: "Action callback." }
  ],
}

export function InlineAlertDocs() {
  return <DocPage doc={docData} />
}
