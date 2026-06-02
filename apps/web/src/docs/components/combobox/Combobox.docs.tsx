import { DocPage, type DocPageData } from '../DocPage'
import {
    ComboboxBasicExample,
    ComboboxWithDescriptionsExample,
    ComboboxDisabledExample,
    ComboboxWithErrorExample,
    ComboboxSizesExample,
} from './Combobox.examples'

const docData: DocPageData = {
    title: 'Combobox',
    description:
        'Autocomplete select with portal dropdown, keyboard navigation, and client-side filtering.',
    importCode: "import { Combobox } from '@monority/ui'",
    usageCode: `const [value, setValue] = useState('')
const items = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]

<Combobox
  items={items}
  value={value}
  onChange={setValue}
  placeholder="Search..."
  label="Framework"
/>`,
    preview: () => <ComboboxBasicExample />,
    examples: [
        { title: 'With descriptions', content: <ComboboxWithDescriptionsExample /> },
        { title: 'Disabled', content: <ComboboxDisabledExample /> },
        { title: 'Error state', content: <ComboboxWithErrorExample /> },
        { title: 'Sizes', content: <ComboboxSizesExample /> },
    ],
    props: [
        {
            name: 'items',
            type: `{ value: string; label: string; description?: string; keywords?: string }[]`,
            defaultValue: '[]',
            description: 'Items for the dropdown.',
        },
        {
            name: 'value',
            type: `string`,
            defaultValue: '-',
            description: 'Controlled selected value.',
        },
        {
            name: 'defaultValue',
            type: `string`,
            defaultValue: '-',
            description: 'Default selected value.',
        },
        {
            name: 'onChange',
            type: `(value: string) => void`,
            defaultValue: '-',
            description: 'Selection callback.',
        },
        {
            name: 'placeholder',
            type: `string`,
            defaultValue: '-',
            description: 'Input placeholder.',
        },
        {
            name: 'emptyLabel',
            type: `string`,
            defaultValue: '-',
            description: 'Label when no results match.',
        },
        { name: 'label', type: `ReactNode`, defaultValue: '-', description: 'Field label.' },
        { name: 'hint', type: `ReactNode`, defaultValue: '-', description: 'Helpful description.' },
        { name: 'error', type: `ReactNode`, defaultValue: '-', description: 'Error message.' },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Required field indicator.',
        },
    ],
    cssHooks: [
        '.mr-combobox',
        '.mr-combobox__trigger',
        '.mr-combobox__menu',
        '.mr-combobox__option',
        '[data-size]',
        '[data-disabled]',
        '[data-invalid]',
        '[data-open]',
        '[data-selected]',
    ],
    tokens: [
        '--mr-bg-surface-elevated',
        '--mr-bg-control',
        '--mr-border-subtle',
        '--mr-fg-base',
        '--mr-fg-muted',
        '--mr-shadow-lg',
        '--mr-radius-md',
        '--mr-text-sm',
    ],
    a11y: [
        'Combobox ARIA pattern (role="combobox", aria-expanded, aria-activedescendant).',
        'Keyboard navigation (arrows, enter, escape).',
        'Listbox role for options menu.',
        'Visible focus ring.',
    ],
}

export function ComboboxDocs() {
    return <DocPage doc={docData} />
}
