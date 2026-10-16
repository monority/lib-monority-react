import { DateRangePicker } from '@monority/ui/date-range-picker'
import { DocPage, type DocPageData } from '../DocPage'
import {
    DateRangePickerBasicExample,
    DateRangePickerWithErrorExample,
    DateRangePickerWithHintExample,
    DateRangePickerDisabledExample,
} from './DateRangePicker.examples'

const docData: DocPageData = {
    title: 'DateRangePicker',
    description:
        'Two custom DatePicker components with calendar popovers. End must be strictly after Start; invalid controlled ends clear once through onChange.',
    importCode: "import { DateRangePicker } from '@monority/ui/date-range-picker'",
    usageCode: `<DateRangePicker fromLabel="Début" toLabel="Fin" />`,
    preview: () => <DateRangePickerBasicExample />,
    playgroundConfig: {
        controls: [
            {
                name: 'fromLabel',
                type: 'text',
                label: 'Libellé départ',
                defaultValue: 'Date d’arrivée',
            },
            {
                name: 'toLabel',
                type: 'text',
                label: 'Libellé retour',
                defaultValue: 'Date de départ',
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Désactivé (disabled)',
                defaultValue: false,
            },
        ],
        getCode: (p) => `<DateRangePicker
  fromLabel="${p.fromLabel}"
  toLabel="${p.toLabel}"${p.disabled ? '\n  disabled' : ''}
/>`,
        render: (props) => (
            <div style={{ width: '100%', maxWidth: 540 }}>
                <DateRangePicker
                    fromLabel={props.fromLabel as string}
                    toLabel={props.toLabel as string}
                    disabled={props.disabled as boolean}
                />
            </div>
        ),
    },
    examples: [
        {
            title: 'With error',
            content: <DateRangePickerWithErrorExample />,
            code: `<DateRangePicker fromLabel="Start" toLabel="End" error="Please select a date range" />`,
        },
        {
            title: 'With hint',
            content: <DateRangePickerWithHintExample />,
            code: `<DateRangePicker fromLabel="Check-in" toLabel="Check-out" hint="Select your stay dates" />`,
        },
        {
            title: 'Disabled',
            content: <DateRangePickerDisabledExample />,
            code: `<DateRangePicker fromLabel="Start" toLabel="End" disabled />`,
        },
    ],
    props: [
        {
            name: 'fromLabel',
            type: `string`,
            defaultValue: "'From'",
            description: 'Label for the start DatePicker.',
        },
        {
            name: 'toLabel',
            type: `string`,
            defaultValue: "'To'",
            description: 'Label for the end DatePicker.',
        },
        {
            name: 'fromProps',
            type: `Partial<DatePickerProps>`,
            defaultValue: '-',
            description: 'Props forwarded to the start DatePicker (except label).',
        },
        {
            name: 'toProps',
            type: `Partial<DatePickerProps>`,
            defaultValue: '-',
            description: 'Props forwarded to the end DatePicker (except label).',
        },
        {
            name: 'error',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Error message shown on both date pickers.',
        },
        {
            name: 'hint',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Hint text shown on both date pickers.',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Disables both date pickers.',
        },
    ],
    keyboardNavigation: [
        {
            key: 'Tab / Shift + Tab',
            action: 'Navigue entre les champs de date début et fin et leurs déclencheurs.',
            context: 'Formulaire de plage',
        },
        {
            key: 'Enter / Espace',
            action: 'Ouvre le popover du calendrier pour le champ ciblé.',
            context: 'Champs de saisie',
        },
        {
            key: 'Flèches directionnelles',
            action: 'Navigue entre les jours de la grille du calendrier.',
            context: 'Calendrier popover',
        },
        {
            key: 'Escape',
            action: 'Ferme le calendrier et retourne le focus sur le champ actif.',
            context: 'Calendrier popover',
        },
    ],
    cssHooks: ['.mr-date-range-picker', '.mr-date-range-picker__separator', '.mr-datepicker'],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-input-height',
        '--mr-input-radius',
        '--mr-font-size-sm',
        '--mr-space-*',
    ],
    a11y: [
        'Native form element semantics.',
        'Supports disabled/required/aria-invalid.',
        'Visible focus ring.',
        'Associated labels for screen readers.',
    ],
}

export function DateRangePickerDocs() {
    return <DocPage doc={docData} />
}
