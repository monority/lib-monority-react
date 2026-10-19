import { DatePicker, type DatePickerSize, type DatePickerTone } from '@monority/ui/date-picker'
import { DocPage, type DocPageData } from '../DocPage'
import {
    DatePickerBasicExample,
    DatePickerControlledExample,
    DatePickerDisabledDatesExample,
    DatePickerDisabledExample,
    DatePickerSizesExample,
    DatePickerWithErrorExample,
    DatePickerWithHintExample,
    DatePickerWithMinMaxExample,
} from './DatePicker.examples'

const docData: DocPageData = {
    title: 'DatePicker',
    description:
        'Date input with integrated popover calendar, format validation, and accessible keyboard navigation.',
    importCode: "import { DatePicker } from '@monority/ui/date-picker'",
    usageCode: `<DatePicker label="Date de livraison" placeholder="JJ/MM/AAAA" />`,
    preview: () => <DatePickerBasicExample />,
    playgroundConfig: {
        controls: [
            {
                name: 'size',
                type: 'select',
                label: 'Taille (size)',
                defaultValue: 'md',
                options: [
                    { value: 'sm', label: 'Petite (sm)' },
                    { value: 'md', label: 'Moyenne (md)' },
                    { value: 'lg', label: 'Grande (lg)' },
                ],
            },
            {
                name: 'tone',
                type: 'select',
                label: 'Nuance (tone)',
                defaultValue: 'neutral',
                options: [
                    { value: 'neutral', label: 'Neutre (neutral)' },
                    { value: 'accent', label: 'Accent (accent)' },
                    { value: 'danger', label: 'Danger (danger)' },
                ],
            },
            {
                name: 'label',
                type: 'text',
                label: 'Libellé',
                defaultValue: 'Date d’échéance',
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Désactivé (disabled)',
                defaultValue: false,
            },
            {
                name: 'showPickers',
                type: 'boolean',
                label: 'Sélecteurs mois/année',
                defaultValue: true,
            },
        ],
        getCode: (p) => `<DatePicker
  size="${p.size}"
  tone="${p.tone}"
  label="${p.label}"${p.disabled ? '\n  disabled' : ''}${p.showPickers ? '\n  showPickers' : ''}
  placeholder="JJ/MM/AAAA"
/>`,
        render: (props) => (
            <div style={{ width: '100%', maxWidth: 320 }}>
                <DatePicker
                    size={props.size as DatePickerSize}
                    tone={props.tone as DatePickerTone}
                    label={props.label as string}
                    disabled={props.disabled as boolean}
                    showPickers={props.showPickers as boolean}
                    placeholder="JJ/MM/AAAA"
                />
            </div>
        ),
    },
    examples: [
        { title: 'With error', content: <DatePickerWithErrorExample /> },
        { title: 'With hint', content: <DatePickerWithHintExample /> },
        { title: 'Min/Max dates', content: <DatePickerWithMinMaxExample /> },
        { title: 'Disabled', content: <DatePickerDisabledExample /> },
        { title: 'Controlled', content: <DatePickerControlledExample /> },
        { title: 'Sizes', content: <DatePickerSizesExample /> },
        { title: 'Disabled dates', content: <DatePickerDisabledDatesExample /> },
    ],
    props: [
        {
            name: 'type',
            type: `'date' | 'datetime-local' | 'time' | 'month' | 'week'`,
            defaultValue: "'date'",
            description: 'Native input type.',
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
    keyboardNavigation: [
        {
            key: 'Tab / Shift + Tab',
            action: 'Atteint le champ de date ou navigue entre les boutons du calendrier.',
            context: 'Formulaire / Calendrier',
        },
        {
            key: 'Enter / Espace',
            action: 'Ouvre le popover du calendrier ou valide la date sélectionnée.',
            context: 'Champ de saisie / Boutons',
        },
        {
            key: 'Flèches directionnelles',
            action: 'Navigue entre les jours de la grille lorsque le calendrier est ouvert.',
            context: 'Calendrier popover',
        },
        {
            key: 'PageUp / PageDown',
            action: 'Recule ou avance d’un mois.',
            context: 'Calendrier popover',
        },
        {
            key: 'Escape',
            action: 'Ferme le popover du calendrier et restitue le focus au champ d’entrée.',
            context: 'Calendrier popover',
        },
    ],
    cssHooks: ['.mr-datepicker', '[data-tone]', '[data-size]', '[data-disabled]', '[data-invalid]'],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-input-height',
        '--mr-radius-md',
        '--mr-font-size-sm',
    ],
    a11y: [
        'Native form element semantics.',
        'Supports disabled/required/aria-invalid.',
        'Visible focus ring.',
        'Associated label for screen readers.',
    ],
}

export function DatePickerDocs() {
    return <DocPage doc={docData} />
}
