import { useState } from 'react'
import { Combobox } from '@monority/ui/combobox'
import { DocPage, type DocPageData } from '../DocPage'
import { ComponentPlayground } from '../ComponentPlayground'
import {
    ComboboxBasicExample,
    ComboboxAsyncAndClearableExample,
    ComboboxWithDescriptionsExample,
    ComboboxDisabledExample,
    ComboboxWithErrorExample,
    ComboboxSizesExample,
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
                label: 'Taille',
                options: ['sm', 'md', 'lg'],
                defaultValue: 'md',
            },
            {
                name: 'clearable',
                type: 'boolean',
                label: 'Effacable (clearable)',
                defaultValue: true,
            },
            {
                name: 'loading',
                type: 'boolean',
                label: 'Chargement asynchrone',
                defaultValue: false,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Desactive',
                defaultValue: false,
            },
            {
                name: 'placeholder',
                type: 'text',
                label: 'Placeholder',
                defaultValue: 'Rechercher un framework...',
            },
            {
                name: 'label',
                type: 'text',
                label: 'Libelle du champ',
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
                'Indicateur de chargement asynchrone qui remplace le chevron par un spinner et active aria-busy.',
        },
        {
            name: 'clearable',
            type: `boolean`,
            defaultValue: 'false',
            description:
                "Affiche un bouton d'effacement rapide lorsque le champ contient une sélection ou une saisie.",
        },
        {
            name: 'clearAriaLabel',
            type: `string`,
            defaultValue: `'Effacer la sélection'`,
            description: "Libellé accessible (aria-label) pour le bouton d'effacement.",
        },
        {
            name: 'onClear',
            type: `() => void`,
            defaultValue: `'-'`,
            description: "Rappel déclenché lors du clic sur le bouton d'effacement.",
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
            action: "Ouvre le menu deroulant ou deplace la surbrillance sur l'option suivante.",
            context: 'Focus sur le champ ou menu ouvert',
        },
        {
            key: 'ArrowUp',
            action: "Deplace la surbrillance sur l'option precedente.",
            context: 'Menu deroulant ouvert',
        },
        {
            key: 'Enter',
            action: "Valide l'option actuellement mise en surbrillance et referme le menu.",
            context: 'Option active',
        },
        {
            key: 'Escape',
            action: 'Referme le menu deroulant et conserve la valeur actuelle.',
            context: 'Menu deroulant ouvert',
        },
        {
            key: 'Home',
            action: 'Navigue directement vers la premiere option de la liste.',
            context: 'Menu deroulant ouvert',
        },
        {
            key: 'End',
            action: 'Navigue directement vers la derniere option de la liste.',
            context: 'Menu deroulant ouvert',
        },
        {
            key: 'Tab',
            action: 'Ferme la liste deroulante et deplace le focus vers le champ interactif suivant.',
            context: 'Navigation globale',
        },
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
