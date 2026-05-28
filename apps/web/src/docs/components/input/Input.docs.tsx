import { DocPage, type DocPageData } from '../DocPage'
import { Input } from '@monority/ui/input'
import { InputBasicExample, InputSearchExample, InputNumberExample, InputPasswordExample } from './Input.examples'

const docData: DocPageData = {
  title: 'Input',
  description: 'Form field primitive with label, hint, error, required, and disabled state hooks. Includes search, number and password variants.',
  importCode: "import { Input, NumberInput, PasswordInput } from '@monority/ui'",
  usageCode: `<Input
  label="Email"
  hint="Use your work email."
  placeholder="you@company.com"
/>`,
  preview: () => <InputBasicExample />,
  examples: [
    { title: 'Search', content: <InputSearchExample /> },
    { title: 'Number', content: <InputNumberExample /> },
    { title: 'Password', content: <InputPasswordExample /> },
  ],
  props: [
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: 'Visible label rendered through Field.' },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: 'Helpful description linked with aria-describedby.' },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: 'Invalid message and visual error state.' },
    { name: 'inputClassName', type: `string`, defaultValue: "-", description: 'Class hook for input element.' },
  ],
  cssHooks: ['.mr-input', '.mr-input--error', '[data-invalid]', '[data-required]', '[data-disabled]'],
  tokens: [
    '--mr-input-width', '--mr-input-height', '--mr-input-radius',
    '--mr-border-subtle', '--mr-border-strong',
    '--mr-bg-control', '--mr-fg-base', '--mr-fg-muted',
    '--mr-shadow-xs', '--mr-shadow-focus',
    '--mr-duration-fast', '--mr-ease-standard',
    '--mr-danger',
  ],
  a11y: ['Label uses htmlFor.', 'Hint/error IDs feed aria-describedby.', 'Errors set aria-invalid.', 'Search inputs use type="search".'],
}

export function InputDocs() {
  return <DocPage doc={docData} />
}