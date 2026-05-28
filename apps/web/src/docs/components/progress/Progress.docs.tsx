import { DocPage, type DocPageData } from '../DocPage'
import {
  ProgressBasicExample,
  ProgressValuesExample,
  ProgressTonesExample,
  ProgressWithoutValueExample,
} from './Progress.examples'

const docData: DocPageData = {
  title: 'Progress',
  description: "Horizontal progress bar with value display and semantic tones.",
  importCode: "import { Progress } from '@monority/ui'",
  usageCode: `<Progress value={75} label="Upload progress" />`,
  preview: () => <ProgressBasicExample />,
  examples: [
    { title: 'Values', content: <ProgressValuesExample /> },
    { title: 'Tones', content: <ProgressTonesExample /> },
    { title: 'Without value', content: <ProgressWithoutValueExample /> },
  ],
  props: [
    { name: 'value', type: `number`, defaultValue: "0", description: "Progress value (0–100)." },
    { name: 'label', type: `string`, defaultValue: "-", description: "Accessible label." },
    { name: 'showValue', type: `boolean`, defaultValue: "true", description: "Show percentage text." },
    { name: 'tone', type: `'neutral' | 'success' | 'warning' | 'danger'`, defaultValue: "-", description: "Progress bar tone." },
    { name: 'barClassName', type: `string`, defaultValue: "-", description: "Class for the bar element." }
  ],
  cssHooks: [
    '.mr-progress', '.mr-progress__bar', '.mr-progress__label',
    '[data-size]', '[data-variant]',
  ],
  tokens: [
    '--mr-accent', '--mr-success', '--mr-bg-surface-strong',
    '--mr-radius-full', '--mr-text-xs',
  ],
  a11y: [
    'Native <progress> element.',
    'aria-valuenow, aria-valuemin, aria-valuemax.',
    'Label for context.',
  ],
}

export function ProgressDocs() {
  return <DocPage doc={docData} />
}
