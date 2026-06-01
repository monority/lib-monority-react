import { DocPage, type DocPageData } from '../DocPage'
import {
  ProgressBasicExample,
  ProgressValuesExample,
  ProgressTonesExample,
  ProgressWithoutValueExample,
  ProgressIndeterminateExample,
  ProgressSliderExample,
} from './Progress.examples'

const docData: DocPageData = {
  title: 'Progress',
  description: "Horizontal progress bar with value display, indeterminate mode, and interactive slider.",
  importCode: "import { Progress } from '@monority/ui'",
  usageCode: `<Progress value={75} label="Upload progress" />`,
  preview: () => <ProgressBasicExample />,
  examples: [
    { title: 'Values', content: <ProgressValuesExample /> },
    { title: 'Tones', content: <ProgressTonesExample /> },
    { title: 'Without value', content: <ProgressWithoutValueExample /> },
    { title: 'Indeterminate', content: <ProgressIndeterminateExample /> },
    { title: 'Interactive slider', content: <ProgressSliderExample /> },
  ],
  props: [
    { name: 'value', type: `number`, defaultValue: "0", description: "Progress value (0–100)." },
    { name: 'label', type: `string`, defaultValue: "-", description: "Accessible label." },
    { name: 'showValue', type: `boolean`, defaultValue: "true", description: "Show percentage text." },
    { name: 'tone', type: `'neutral' | 'success' | 'warning' | 'danger'`, defaultValue: "-", description: "Progress bar tone." },
    { name: 'mode', type: `'determinate' | 'indeterminate'`, defaultValue: "'determinate'", description: "Display mode. Indeterminate shows animated bar." },
    { name: 'onChange', type: `(value: number) => void`, defaultValue: "-", description: "Click handler on track for interactive slider mode." },
    { name: 'barClassName', type: `string`, defaultValue: "-", description: "Class for the bar element." }
  ],
  cssHooks: [
    '.mr-progress', '.mr-progress__bar', '.mr-progress__label',
    '.mr-progress__bar--indeterminate', '.mr-progress--slidable',
    '[data-tone]', '[data-mode]',
  ],
  tokens: [
    '--mr-accent', '--mr-success', '--mr-bg-surface-strong',
    '--mr-radius-full', '--mr-text-xs',
  ],
  a11y: [
    'role="progressbar" on the track.',
    'aria-valuenow, aria-valuemin, aria-valuemax.',
    'Label for context.',
    'Indeterminate mode omits aria-valuenow.',
  ],
}

export function ProgressDocs() {
  return <DocPage doc={docData} />
}
