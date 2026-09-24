import { DocPage, type DocPageData } from '../DocPage'
import { RadioGroup } from '@monority/ui/radio-group'
import {
    RadioGroupBasicExample,
    RadioGroupInvalidExample,
    RadioGroupWithDescriptionExample,
    RadioGroupChoiceCardExample,
    RadioGroupFieldsetExample,
} from './RadioGroup.examples'

const docData: DocPageData = {
    title: 'RadioGroup',
    description:
        'Radio button group with label, hint, error, descriptions, and accessible keyboard navigation.',
    importCode: "import { RadioGroup } from '@monority/ui/radio-group'",
    usageCode: `const items = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large', disabled: true },
]

<RadioGroup label="Size" size="md" items={items} />`,
    preview: () => <RadioGroupBasicExample />,
    examples: [
        { title: 'Invalid', content: <RadioGroupInvalidExample /> },
        { title: 'With descriptions', content: <RadioGroupWithDescriptionExample /> },
        { title: 'Choice card style', content: <RadioGroupChoiceCardExample /> },
        { title: 'With Field wrapper', content: <RadioGroupFieldsetExample /> },
    ],
    props: [
        { name: 'label', type: `ReactNode`, defaultValue: '-', description: 'Group label.' },
        {
            name: 'hint',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Helpful description linked via aria-describedby.',
        },
        { name: 'error', type: `ReactNode`, defaultValue: '-', description: 'Error message.' },
        {
            name: 'items',
            type: `RadioItem[]`,
            defaultValue: '[]',
            description: 'Radio options. Each item: { value, label, description?, disabled? }.',
        },
        { name: 'value', type: `string`, defaultValue: '-', description: 'Controlled value.' },
        {
            name: 'defaultValue',
            type: `string`,
            defaultValue: '-',
            description: 'Default value (uncontrolled).',
        },
        {
            name: 'onChange',
            type: `(value: string) => void`,
            defaultValue: '-',
            description: 'Change callback receiving the selected value.',
        },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Required field indicator.',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Disables the entire group.',
        },
        {
            name: 'invalid',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Manually marks as invalid.',
        },
        {
            name: 'name',
            type: `string`,
            defaultValue: '-',
            description: 'HTML name attribute for the radio inputs.',
        },
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: `'md'`,
            description: 'Radio indicator and label density.',
        },
        {
            name: 'tone',
            type: `'accent' | 'neutral' | 'danger'`,
            defaultValue: `'accent'`,
            description: "Visual tone. Use 'danger' alongside error.",
        },
    ],
    cssHooks: [
        '.mr-radio-group',
        '.mr-radio-group--disabled',
        '.mr-radio-group--invalid',
        '.mr-radio',
        '.mr-radio--checked',
        '.mr-radio--disabled',
        '.mr-radio__input',
        '.mr-radio__control',
        '.mr-radio__dot',
        '.mr-radio__body',
        '.mr-radio__label',
        '.mr-radio__description',
        '[data-tone]',
        '[data-size]',
        '[data-disabled]',
        '[data-invalid]',
        '[data-checked]',
        '[data-required]',
    ],
    tokens: [
        '--mr-accent',
        '--mr-accent-contrast',
        '--mr-danger',
        '--mr-border-subtle',
        '--mr-border-strong',
        '--mr-bg-control',
        '--mr-bg-surface',
        '--mr-fg-base',
        '--mr-fg-muted',
        '--mr-fg-strong',
        '--mr-radius-full',
        '--mr-text-xs',
        '--mr-text-sm',
        '--mr-text-md',
        '--mr-space-1',
        '--mr-space-2',
        '--mr-space-3',
        '--mr-duration-fast',
        '--mr-ease-standard',
    ],
    a11y: [
        'Native <input type="radio"> semantics.',
        'role="radiogroup" on the container.',
        'Arrow keys navigate between options.',
        'Visible focus ring via focus-visible.',
        'Associated label for screen readers.',
        'Descriptions linked via aria-describedby.',
        'aria-invalid and data-invalid set on radiogroup when invalid prop is applied.',
    ],
}

export function RadioGroupDocs() {
    return <DocPage doc={docData} />
}
