import { DocPage, type DocPageData } from '../DocPage'
import { Slider } from '@monority/ui'
import { SliderBasicExample } from './Slider.examples'

const docData: DocPageData = {
  title: 'Slider',
  description: "Range slider with optional value display.",
  importCode: "import { Slider } from '@monority/ui'",
  usageCode: `<Slider label="Brightness" value={value} onChange={setValue} />`,
  preview: () => <SliderBasicExample />,
  props: [
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Field label." },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description." },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message." },
    { name: 'value', type: `number`, defaultValue: "-", description: "Controlled value." },
    { name: 'defaultValue', type: `number`, defaultValue: "50", description: "Default value." },
    { name: 'min', type: `number`, defaultValue: "0", description: "Minimum value." },
    { name: 'max', type: `number`, defaultValue: "100", description: "Maximum value." },
    { name: 'step', type: `number`, defaultValue: "1", description: "Step increment." },
    { name: 'showValue', type: `boolean`, defaultValue: "true", description: "Show current value display." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required field indicator." }
  ],
}

export function SliderDocs() {
  return <DocPage doc={docData} />
}
