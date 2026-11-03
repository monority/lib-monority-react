import { Combobox } from '@monority/ui/combobox'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { comboboxI18n } from './Combobox.messages'
import {
    ComboboxAsyncAndClearableExample,
    ComboboxBasicExample,
    ComboboxDisabledExample,
    ComboboxSizesExample,
    ComboboxWithDescriptionsExample,
    ComboboxWithErrorExample,
} from './Combobox.examples'

function ComboboxPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    clearable: boolean
    loading: boolean
    disabled: boolean
    placeholder: string
    label: string
}) {
    const [val, setVal] = useState('react')
    const items = [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'solid', label: 'Solid' },
        { value: 'angular', label: 'Angular' },
    ]
    return (
        <div style={{ width: '100%', maxWidth: '20rem' }}>
            <Combobox
                items={items}
                value={val}
                onChange={setVal}
                size={props.size}
                clearable={props.clearable}
                loading={props.loading}
                disabled={props.disabled}
                placeholder={props.placeholder}
                label={props.label}
            />
        </div>
    )
}

const comboboxPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        clearable: boolean
        loading: boolean
        disabled: boolean
        placeholder: string
        label: string
    }>
        componentName="Combobox"
        importCode="import { Combobox } from '@monority/ui/combobox'"
        getCode={(p) => {
            const props: string[] = ['items={items}', 'value={value}', 'onChange={setValue}']
            if (p.size && p.size !== 'md') props.push(`size="${p.size}"`)
            if (p.clearable) props.push('clearable')
            if (p.loading) props.push('loading')
            if (p.disabled) props.push('disabled')
            if (p.placeholder) props.push(`placeholder="${p.placeholder}"`)
            if (p.label) props.push(`label="${p.label}"`)
            return `import { useState } from 'react'\nimport { Combobox } from '@monority/ui/combobox'\n\nconst [value, setValue] = useState('react')\nconst items = [\n  { value: 'react', label: 'React' },\n  { value: 'vue', label: 'Vue' },\n  { value: 'svelte', label: 'Svelte' },\n]\n\n<Combobox\n  ${props.join('\n  ')}\n/>`
        }}
        controls={[
            {
                name: 'size',
                type: 'select',
                label: 'Size',
                options: ['sm', 'md', 'lg'],
                defaultValue: 'md',
            },
            {
                name: 'clearable',
                type: 'boolean',
                label: 'Clearable (clearable)',
                defaultValue: true,
            },
            {
                name: 'loading',
                type: 'boolean',
                label: 'Async loading',
                defaultValue: false,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Disabled',
                defaultValue: false,
            },
            {
                name: 'placeholder',
                type: 'text',
                label: 'Placeholder',
                defaultValue: 'Search a framework...',
            },
            {
                name: 'label',
                type: 'text',
                label: 'Field label',
                defaultValue: 'Framework',
            },
        ]}
        render={(props) => <ComboboxPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Combobox',
    description:
        'Autocomplete select with portal dropdown, keyboard navigation, and client-side filtering.',
    importCode: "import { Combobox } from '@monority/ui/combobox'",
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
    playground: comboboxPlayground,
    examples: [
        { title: 'With descriptions', content: <ComboboxWithDescriptionsExample /> },
        { title: 'Async loading & clearable', content: <ComboboxAsyncAndClearableExample /> },
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
        {
            name: 'loading',
            type: `boolean`,
            defaultValue: 'false',
            description:
                'Async loading indicator that replaces the chevron with a spinner and sets aria-busy.',
        },
        {
            name: 'clearable',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Shows a quick clear button when the field contains a selection or input.',
        },
        {
            name: 'clearAriaLabel',
            type: `string`,
            defaultValue: `'Clear selection'`,
            description: 'Accessible label (aria-label) for the clear button.',
        },
        {
            name: 'onClear',
            type: `() => void`,
            defaultValue: `'-'`,
            description: 'Callback fired when the clear button is clicked.',
        },
    ],
    cssHooks: [
        '.mr-combobox',
        '.mr-combobox__input',
        '.mr-combobox__clear',
        '.mr-combobox__spinner',
        '.mr-combobox__list',
        '.mr-combobox__item',
        '[data-tone]',
        '[data-size]',
        '[data-disabled]',
        '[data-loading]',
        '[data-has-clear]',
        '[data-invalid]',
        '[data-open]',
        '[data-selected]',
    ],
    tokens: [
        '--mr-bg-raised',
        '--mr-bg-surface',
        '--mr-border-subtle',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-shadow-overlay',
        '--mr-radius-md',
        '--mr-font-size-sm',
    ],
    keyboardNavigation: [
        {
            key: 'ArrowDown',
            action: 'Opens the dropdown or moves the highlight to the next option.',
            context: 'Focus on the field or open menu',
        },
        {
            key: 'ArrowUp',
            action: 'Moves the highlight to the previous option.',
            context: 'Open dropdown',
        },
        {
            key: 'Enter',
            action: 'Confirms the currently highlighted option and closes the menu.',
            context: 'Active option',
        },
        {
            key: 'Escape',
            action: 'Closes the dropdown and keeps the current value.',
            context: 'Open dropdown',
        },
        {
            key: 'Home',
            action: 'Jumps directly to the first option in the list.',
            context: 'Open dropdown',
        },
        {
            key: 'End',
            action: 'Jumps directly to the last option in the list.',
            context: 'Open dropdown',
        },
        {
            key: 'Tab',
            action: 'Closes the dropdown and moves focus to the next interactive field.',
            context: 'Global navigation',
        },
    ],
    a11y: [
        'Combobox ARIA pattern (role="combobox", aria-expanded, aria-activedescendant).',
        'Keyboard navigation (arrows, enter, escape).',
        'Listbox role for options menu.',
        'Visible focus ring.',
    ],
    i18n: comboboxI18n,
}

export function ComboboxDocs() {
    return <DocPage doc={docData} />
}
