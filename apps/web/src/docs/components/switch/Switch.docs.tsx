import { DocPage, type DocPageData } from '../DocPage'
import { Switch } from '@monority/ui'
import { SwitchBasicExample } from './Switch.examples'

const docData: DocPageData = {
  title: 'Switch',
  description: "A toggle control that allows users to switch between two states (on/off).",
  importCode: "import { Switch } from '@monority/ui'",
  usageCode: `const [checked, setChecked] = useState(false)

<Switch
  label="Enable notifications"
  checked={checked}
  onChange={() => setChecked(!checked)}
/>`,
  preview: () => <SwitchBasicExample />,
  props: [
    { name: 'checked', type: `boolean`, defaultValue: "false", description: "Controlled checked state." },
    { name: 'defaultChecked', type: `boolean`, defaultValue: "false", description: "Default checked state." },
    { name: 'onChange', type: `function`, defaultValue: "-", description: "Change callback." },
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Switch label." },
    { name: 'tone', type: `'accent' | 'neutral' | 'danger'`, defaultValue: "'accent'", description: "Visual tone." },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: "'md'", description: "Switch size." },
    { name: 'disabled', type: `boolean`, defaultValue: "false", description: "Disabled state." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required field indicator." },
    { name: 'invalid', type: `boolean`, defaultValue: "false", description: "Invalid state." },
    { name: 'className', type: `string`, defaultValue: "-", description: "Additional class name." }
  ],
}

export function SwitchDocs() {
  return <DocPage doc={docData} />
}
