import { DocPage, type DocPageData } from '../DocPage'
import {
  ToastBasicExample,
  ToastTonesExample,
} from './Toast.examples'

const docData: DocPageData = {
  title: 'Toast',
  description: "A notification that appears temporarily to inform users of important events.",
  importCode: "import { Toast, useToast } from '@monority/ui'",
  usageCode: `<Toast title="Example" description="Toast notification" tone="neutral" />`,
  preview: () => <ToastBasicExample />,
  examples: [
    { title: 'Tones', content: <ToastTonesExample /> },
  ],
  props: [
    { name: 'title', type: `string`, defaultValue: "-", description: "Toast title" },
    { name: 'description', type: `string`, defaultValue: "-", description: "Toast description" },
    { name: 'tone', type: `'neutral' | 'success' | 'danger'`, defaultValue: "'neutral'", description: "Visual tone of the toast" },
    { name: 'onClose', type: `() => void`, defaultValue: "-", description: "Close button callback." }
  ],
  cssHooks: [
    '.mr-toast', '.mr-toast__title', '.mr-toast__description',
    '.mr-toast--success', '.mr-toast--danger', '.mr-toast--info',
  ],
  tokens: [
    '--mr-bg-surface-elevated', '--mr-shadow-lg', '--mr-radius-md',
    '--mr-text-sm', '--mr-success', '--mr-danger', '--mr-accent',
  ],
  a11y: [
    'role="status" or role="alert".',
    'aria-live="polite" for non-critical.',
    'Dismiss button with aria-label.',
  ],
}

export function ToastDocs() {
  return <DocPage doc={docData} />
}
