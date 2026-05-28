import { DocPage, type DocPageData } from '../DocPage'
import {
  InlineAlertBasicExample,
  InlineAlertTonesExample,
  InlineAlertWithActionExample,
} from './InlineAlert.examples'

const docData: DocPageData = {
  title: 'InlineAlert',
  description: "Inline contextual message with tone and optional action.",
  importCode: "import { InlineAlert } from '@monority/ui'",
  usageCode: `<InlineAlert tone="warning" title="Storage almost full" description="Delete unused files." />`,
  preview: () => <InlineAlertBasicExample />,
  examples: [
    { title: 'Tones', content: <InlineAlertTonesExample /> },
    { title: 'With action', content: <InlineAlertWithActionExample /> },
  ],
  props: [
    { name: 'tone', type: `'info' | 'success' | 'warning' | 'danger'`, defaultValue: "-", description: "Visual tone." },
    { name: 'title', type: `string`, defaultValue: "-", description: "Alert title." },
    { name: 'description', type: `string`, defaultValue: "-", description: "Alert description." },
    { name: 'actionLabel', type: `string`, defaultValue: "-", description: "Action button label." },
    { name: 'onAction', type: `() => void`, defaultValue: "-", description: "Action callback." }
  ],
  cssHooks: [
    '.mr-inline-alert', '.mr-inline-alert--info', '.mr-inline-alert--success',
    '.mr-inline-alert--warning', '.mr-inline-alert--danger', '[data-variant]',
  ],
  tokens: [
    '--mr-accent', '--mr-success', '--mr-warning', '--mr-danger',
    '--mr-bg-accent-soft', '--mr-bg-success-soft', '--mr-bg-warning-soft',
    '--mr-bg-danger-soft', '--mr-text-sm',
  ],
  a11y: [
    'Inline notification pattern.',
    'aria-live="polite" for dynamic updates.',
  ],
}

export function InlineAlertDocs() {
  return <DocPage doc={docData} />
}
