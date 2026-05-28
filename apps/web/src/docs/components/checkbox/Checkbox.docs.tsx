import { DocPage, type DocPageData } from '../DocPage'
import {
  CheckboxBasicExample,
  CheckboxDisabledExample,
  CheckboxWithErrorExample,
  CheckboxWithDescriptionExample,
  CheckboxIndeterminateExample,
} from './Checkbox.examples'

const docData: DocPageData = {
  title: 'Checkbox',
  description: "A control that allows users to select one or more options from a set.",
  importCode: "import { Checkbox } from '@monority/ui'",
  usageCode: `<Checkbox label="Option 1" />
<Checkbox label="Option 2" defaultChecked />`,
  preview: () => <CheckboxBasicExample />,
  examples: [
    { title: 'Disabled', content: <CheckboxDisabledExample /> },
    { title: 'Error state', content: <CheckboxWithErrorExample /> },
    { title: 'With description', content: <CheckboxWithDescriptionExample /> },
    { title: 'Indeterminate', content: <CheckboxIndeterminateExample /> },
  ],
  props: [
    { name: 'label', type: `string`, defaultValue: "-", description: "Checkbox label" },
    { name: 'checked', type: `boolean`, defaultValue: "false", description: "Checked state" },
    { name: 'onChange', type: `function`, defaultValue: "-", description: "Change callback" }
  ],
  cssHooks: [
    '.mr-checkbox', '.mr-checkbox__control', '.mr-checkbox__dot', '.mr-checkbox__label', '.mr-checkbox__description',
    '[data-size]', '[data-disabled]', '[data-invalid]', '[data-checked]', '[data-indeterminate]',
  ],
  tokens: [
    '--mr-accent', '--mr-accent-contrast', '--mr-border-subtle',
    '--mr-bg-control', '--mr-fg-base', '--mr-text-sm', '--mr-checkbox-size',
  ],
  a11y: [
    'Native checkbox input.',
    'Supports aria-checked (mixed mode).',
    'Associated label for screen readers.',
    'Visible focus ring.',
  ],
}

export function CheckboxDocs() {
  return <DocPage doc={docData} />
}
