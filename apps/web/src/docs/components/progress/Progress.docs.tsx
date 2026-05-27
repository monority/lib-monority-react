import { DocPage, type DocPageData } from '../DocPage'
import { Progress } from '@monority/ui'
import { ProgressBasicExample } from './Progress.examples'

const docData: DocPageData = {
  title: 'Progress',
  description: "Horizontal progress bar with value display and semantic tones.",
  importCode: "import { Progress } from '@monority/ui'",
  usageCode: `<Progress value={75} label="Upload progress" />`,
  preview: () => <ProgressBasicExample />,
  props: [
    { name: 'value', type: `number`, defaultValue: "0", description: "Progress value (0–100)." },
    { name: 'label', type: `string`, defaultValue: "-", description: "Accessible label." },
    { name: 'showValue', type: `boolean`, defaultValue: "true", description: "Show percentage text." },
    { name: 'tone', type: `'neutral' | 'success' | 'warning' | 'danger'`, defaultValue: "-", description: "Progress bar tone." },
    { name: 'barClassName', type: `string`, defaultValue: "-", description: "Class for the bar element." }
  ],
}

export function ProgressDocs() {
  return <DocPage doc={docData} />
}
