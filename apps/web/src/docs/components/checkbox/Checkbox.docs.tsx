import { DocPage, type DocPageData } from '../DocPage'
import { Checkbox } from '@monority/ui'
import { CheckboxBasicExample } from './Checkbox.examples'

const docData: DocPageData = {
  title: 'Checkbox',
  description: "A control that allows users to select one or more options from a set.",
  importCode: "import { Checkbox } from '@monority/ui'",
  usageCode: `<Checkbox label="Option 1" />
<Checkbox label="Option 2" defaultChecked />`,
  preview: () => <CheckboxBasicExample />,
  props: [
    { name: 'label', type: `string`, defaultValue: "-", description: "Checkbox label" },
    { name: 'checked', type: `boolean`, defaultValue: "false", description: "Checked state" },
    { name: 'onChange', type: `function`, defaultValue: "-", description: "Change callback" }
  ],
}

export function CheckboxDocs() {
  return <DocPage doc={docData} />
}
