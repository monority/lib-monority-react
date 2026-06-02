import { DocPage, type DocPageData } from '../DocPage'
import {
  InlineAlertBasicExample,
  InlineAlertTonesExample,
  InlineAlertWithActionExample,
} from './InlineAlert.examples'

const docData: DocPageData = {
  title: 'InlineAlert',
  description: 'Inline status surface for contextual messaging inside forms, settings, and content workflows.',
  importCode: "import { InlineAlert } from '@monority/ui'",
  usageCode: `<InlineAlert tone="warning" title="Docs review expires soon" description="Only one approval is still missing." />`,
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
    '.mr-inline-alert',
    '.mr-inline-alert__marker',
    '.mr-inline-alert__body',
    '.mr-inline-alert__title',
    '.mr-inline-alert__description',
    '.mr-inline-alert__content',
    '.mr-inline-alert__action',
    '.mr-inline-alert--info',
    '.mr-inline-alert--success',
    '.mr-inline-alert--warning',
    '.mr-inline-alert--danger',
    '[data-tone]',
  ],
  tokens: [
    '--mr-bg-surface-elevated',
    '--mr-border-subtle',
    '--mr-shadow-xs',
    '--mr-accent',
    '--mr-success',
    '--mr-warning',
    '--mr-danger',
  ],
  a11y: [
    'Informational alerts use role="status".',
    'Warning and danger alerts use role="alert".',
    'Optional actions remain regular buttons inside the alert body.',
  ],
}

export function InlineAlertDocs() {
  return <DocPage doc={docData} />
}
