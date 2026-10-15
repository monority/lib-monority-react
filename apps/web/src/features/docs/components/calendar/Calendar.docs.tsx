import {
    CalendarBasicPreview,
    CalendarPickersExample,
    CalendarMinMaxExample,
    CalendarDisabledDatesExample,
    CalendarMultipleMonthsExample,
    CalendarControlledExample,
} from './Calendar.examples'
import { DocPage, type DocPageData } from '../DocPage'

const docData: DocPageData = {
    title: 'Calendar',
    description:
        'A standalone date picker calendar grid with month navigation, month and year selectors, and day selection.',
    importCode: "import { Calendar } from '@monority/ui/calendar'",
    usageCode: '<Calendar onChange={(date) => console.log(date)} />',
    preview: () => <CalendarBasicPreview />,
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
