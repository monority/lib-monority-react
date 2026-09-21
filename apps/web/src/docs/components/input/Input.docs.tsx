import { DocPage, type DocPageData } from '../DocPage'
import { Input } from '@monority/ui/input'
import {
    InputBasicExample,
    InputSearchExample,
    InputNumberExample,
    InputPasswordExample,
} from './Input.examples'

const docData: DocPageData = {
    title: 'Input',
    description:
        'Form field primitive with label, hint, error, required, and disabled state hooks. Includes search, number and password variants.',
    importCode: "import { Input } from '@monority/ui/input'",
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
        {
            name: 'tone',
            type: `'neutral' | 'accent' | 'danger'`,
            defaultValue: `'neutral'`,
            description: 'Visual tone for border and focus styling.',
        },
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: `'md'`,
            description: 'Density variant controlling padding and font size.',
        },
        {
            name: 'invalid',
            type: `boolean`,
            defaultValue: `'false'`,
            description: 'Force invalid visual state independent of error.',
        },
        {
            name: 'id',
            type: `string`,
            defaultValue: `'auto-generated'`,
            description: 'Stable ID for label association and aria hooks.',
        },
        {
            name: 'label',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Visible label rendered through Field.',
        },
        {
            name: 'hint',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Helpful description linked with aria-describedby.',
        },
        {
            name: 'error',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Invalid message and visual error state.',
        },
        {
            name: 'className',
            type: `string`,
            defaultValue: `'-'`,
            description: 'Class hook for the Field wrapper.',
        },
        {
            name: 'inputClassName',
            type: `string`,
            defaultValue: `'-'`,
            description: 'Class hook for input element.',
        },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: `'false'`,
            description: 'Marks field as required.',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: `'false'`,
            description: 'Disables the input and applies muted styling.',
        },
        {
            name: 'placeholder',
            type: `string`,
            defaultValue: `'-'`,
            description: 'Native placeholder text.',
        },
        {
            name: 'value',
            type: `string`,
            defaultValue: `'-'`,
            description: 'Controlled value.',
        },
        {
            name: 'defaultValue',
            type: `string`,
            defaultValue: `"''"`,
            description: 'Uncontrolled initial value.',
        },
    ],
    cssHooks: [
        '.mr-input',
        '.mr-input-base',
        '.mr-input--neutral',
        '.mr-input--accent',
        '.mr-input--danger',
        '.mr-input--sm',
        '.mr-input--md',
        '.mr-input--lg',
        '.mr-input--disabled',
        '.mr-input--invalid',
        '.mr-input--error',
        '[data-size]',
        '[data-tone]',
        '[data-invalid]',
        '[data-required]',
        '[data-disabled]',
    ],
    tokens: [
        '--mr-text-md',
        '--mr-text-xs',
        '--mr-accent',
        '--mr-input-width',
        '--mr-input-height',
        '--mr-input-radius',
        '--mr-border-subtle',
        '--mr-border-strong',
        '--mr-bg-control',
        '--mr-fg-base',
        '--mr-fg-muted',
        '--mr-shadow-xs',
        '--mr-shadow-focus',
        '--mr-duration-fast',
        '--mr-ease-standard',
        '--mr-danger',
    ],
    a11y: [
        'Label uses htmlFor.',
        'Hint/error IDs feed aria-describedby.',
        'Errors set aria-invalid.',
        'Search inputs use type="search".',
        'data-size and data-tone attributes enable variant styling.',
        'data-invalid, data-required, data-disabled as helper hooks.',
    ],
}

export function InputDocs() {
    return <DocPage doc={docData} />
}
