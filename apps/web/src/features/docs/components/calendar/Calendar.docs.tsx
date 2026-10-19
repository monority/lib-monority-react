import { Calendar } from '@monority/ui/calendar'
import { useState } from 'react'
import { DocPage, type DocPageData } from '../DocPage'
import {
    CalendarBasicPreview,
    CalendarControlledExample,
    CalendarDisabledDatesExample,
    CalendarMinMaxExample,
    CalendarMultipleMonthsExample,
    CalendarPickersExample,
} from './Calendar.examples'

function CalendarInteractivePlayground(props: {
    showPickers: boolean
    showOutsideDays: boolean
    fixedWeeks: boolean
    numberOfMonths: number
}) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                showPickers={props.showPickers}
                showOutsideDays={props.showOutsideDays}
                fixedWeeks={props.fixedWeeks}
                numberOfMonths={props.numberOfMonths}
            />
            <div style={{ fontSize: '0.875rem', color: 'var(--mr-text-secondary)' }}>
                Date sélectionnée :{' '}
                {selectedDate ? selectedDate.toLocaleDateString('fr-FR') : 'aucune'}
            </div>
        </div>
    )
}

const docData: DocPageData = {
    title: 'Calendar',
    description:
        'A standalone date picker calendar grid with month navigation, month and year selectors, and day selection.',
    importCode: "import { Calendar } from '@monority/ui/calendar'",
    usageCode: '<Calendar onChange={(date) => console.log(date)} />',
    preview: () => <CalendarBasicPreview />,
    playgroundConfig: {
        controls: [
            {
                name: 'showPickers',
                type: 'boolean',
                label: 'Sélecteurs mois/année (showPickers)',
                defaultValue: true,
            },
            {
                name: 'showOutsideDays',
                type: 'boolean',
                label: 'Jours hors mois (showOutsideDays)',
                defaultValue: true,
            },
            {
                name: 'fixedWeeks',
                type: 'boolean',
                label: '6 semaines fixes (fixedWeeks)',
                defaultValue: false,
            },
            {
                name: 'numberOfMonths',
                type: 'select',
                label: 'Nombre de mois',
                defaultValue: '1',
                options: [
                    { value: '1', label: '1 mois' },
                    { value: '2', label: '2 mois (côte à côte)' },
                ],
            },
        ],
        getCode: (p) => `<Calendar
  value={selectedDate}
  onChange={setSelectedDate}${p.showPickers ? '\n  showPickers' : ''}${!p.showOutsideDays ? '\n  showOutsideDays={false}' : ''}${p.fixedWeeks ? '\n  fixedWeeks' : ''}${Number(p.numberOfMonths) > 1 ? `\n  numberOfMonths={${p.numberOfMonths}}` : ''}
/>`,
        render: (props) => (
            <CalendarInteractivePlayground
                showPickers={props.showPickers as boolean}
                showOutsideDays={props.showOutsideDays as boolean}
                fixedWeeks={props.fixedWeeks as boolean}
                numberOfMonths={Number(props.numberOfMonths) || 1}
            />
        ),
    },
    examples: [
        {
            title: 'Basic',
            content: <CalendarBasicPreview />,
            code: `<Stack gap="md">
  <Calendar value={date} onChange={setDate} />
  <Text.Small>Selected: {date ? date.toLocaleDateString() : 'none'}</Text.Small>
</Stack>`,
        },
        {
            title: 'Month & Year Selectors',
            content: <CalendarPickersExample />,
            code: `<Stack gap="md">
  <Calendar value={date} onChange={setDate} showPickers />
  <Text.Small>Selected: {date ? date.toLocaleDateString() : 'none'}</Text.Small>
</Stack>`,
        },
        {
            title: 'Min/Max Dates',
            content: <CalendarMinMaxExample />,
            code: `<Stack gap="md">
  <Calendar value={date} onChange={setDate} minDate={minDate} maxDate={maxDate} />
  <Text.Small>Only current month selectable</Text.Small>
</Stack>`,
        },
        {
            title: 'Disabled Dates',
            content: <CalendarDisabledDatesExample />,
            code: `<Stack gap="md">
  <Calendar value={date} onChange={setDate} disabledDates={disabledWeekends} />
  <Text.Small>Weekends are disabled</Text.Small>
</Stack>`,
        },
        {
            title: 'Multiple Months',
            content: <CalendarMultipleMonthsExample />,
            code: `<Stack gap="md">
  <Calendar value={date} onChange={setDate} numberOfMonths={2} />
  <Text.Small>Two months displayed side by side</Text.Small>
</Stack>`,
        },
        {
            title: 'Controlled',
            content: <CalendarControlledExample />,
            code: `<Stack gap="md">
  <Calendar value={date} onChange={setDate} />
  <Stack direction="horizontal" gap="sm">
    <Button size="sm" variant="secondary" onClick={() => setDate(new Date())}>
      Today
    </Button>
    <Button size="sm" variant="ghost" onClick={() => setDate(null)}>
      Clear
    </Button>
  </Stack>
</Stack>`,
        },
    ],
    props: [
        {
            name: 'value',
            type: 'Date | null',
            defaultValue: '-',
            description: 'Controlled selected date.',
        },
        {
            name: 'defaultValue',
            type: 'Date | null',
            defaultValue: 'null',
            description: 'Initial selected date (uncontrolled).',
        },
        {
            name: 'onChange',
            type: '(date: Date | null) => void',
            defaultValue: '-',
            description: 'Callback when a day is selected.',
        },
        {
            name: 'showPickers',
            type: 'boolean',
            defaultValue: 'false',
            description:
                'Always display month and year selectors at the top. When false, clicking the month label toggles them.',
        },
        {
            name: 'minDate',
            type: 'Date',
            defaultValue: '-',
            description: 'Earliest selectable date.',
        },
        {
            name: 'maxDate',
            type: 'Date',
            defaultValue: '-',
            description: 'Latest selectable date.',
        },
        {
            name: 'disabledDates',
            type: 'Date[] | ((date: Date) => boolean)',
            defaultValue: '-',
            description:
                'Specific dates to disable, or a function that returns true for disabled dates.',
        },
        {
            name: 'locale',
            type: 'string',
            defaultValue: 'navigator.language',
            description: 'Locale for date formatting (Intl.DateTimeFormat).',
        },
        {
            name: 'showOutsideDays',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Show days from previous/next month in the grid.',
        },
        {
            name: 'fixedWeeks',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Always show 6 weeks (42 days) regardless of month.',
        },
        {
            name: 'numberOfMonths',
            type: 'number',
            defaultValue: '1',
            description: 'Number of months to display side by side.',
        },
    ],
    keyboardNavigation: [
        {
            key: 'Flèche Gauche / Flèche Droite',
            action: 'Déplace le focus vers le jour précédent ou suivant.',
            context: 'Grille des jours',
        },
        {
            key: 'Flèche Haut / Flèche Bas',
            action: 'Déplace le focus vers le même jour de la semaine précédente ou suivante.',
            context: 'Grille des jours',
        },
        {
            key: 'PageUp / PageDown',
            action: 'Recule ou avance d’un mois.',
            context: 'Grille des jours',
        },
        {
            key: ['Shift', 'PageUp / PageDown'],
            action: 'Recule ou avance d’une année complète.',
            context: 'Grille des jours',
        },
        {
            key: 'Origine (Home) / Fin (End)',
            action: 'Déplace le focus vers le premier ou dernier jour du mois en cours.',
            context: 'Grille des jours',
        },
        {
            key: 'Enter / Espace',
            action: 'Sélectionne la date ciblée.',
            context: 'Grille des jours',
        },
    ],
    cssHooks: [
        '.mr-calendar',
        '.mr-calendar__months',
        '.mr-calendar__months--multiple',
        '.mr-calendar__month',
        '.mr-calendar__header',
        '.mr-calendar__month-label',
        '.mr-calendar__pickers',
        '.mr-calendar__select',
        '.mr-calendar__select--month',
        '.mr-calendar__select--year',
        '.mr-calendar__nav-btn',
        '.mr-calendar__day-names',
        '.mr-calendar__day-name',
        '.mr-calendar__grid',
        '.mr-calendar__week',
        '.mr-calendar__day',
        '.mr-calendar__day--other-month',
        '[data-today]',
        '[data-selected]',
        '[data-disabled]',
    ],
    tokens: [
        '--mr-space-1',
        '--mr-space-3',
        '--mr-space-4',
        '--mr-radius-sm',
        '--mr-font-size-xs',
        '--mr-font-size-sm',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-bg-canvas',
        '--mr-accent-solid',
        '--mr-accent-contrast',
        '--mr-accent-strong',
        '--mr-duration-fast',
        '--mr-ease-standard',
    ],
    a11y: [
        'role="application" on root with aria-label="Calendar".',
        'role="grid" on the day grid with aria-label for the month.',
        'role="row" on day name header and each week row.',
        'role="columnheader" on day name cells with aria-label.',
        'role="gridcell" on each day button.',
        'aria-selected on selected day.',
        'aria-disabled on disabled days.',
        'aria-label on each day with full date (weekday, month, day, year).',
        'Navigation buttons have aria-label="Previous month" / "Next month".',
    ],
}

export function CalendarDocs() {
    return <DocPage doc={docData} />
}
