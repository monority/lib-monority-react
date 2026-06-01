import {
  CalendarBasicPreview,
  CalendarMinMaxExample,
  CalendarDisabledDatesExample,
  CalendarMultipleMonthsExample,
  CalendarControlledExample,
} from './Calendar.examples'
import { DocPage, type DocPageData } from '../DocPage'

const docData: DocPageData = {
  title: 'Calendar',
  description: 'A standalone date picker calendar grid with month navigation and day selection.',
  importCode: "import { Calendar } from '@monority/ui/calendar'",
  usageCode: '<Calendar onChange={(date) => console.log(date)} />',
  preview: () => <CalendarBasicPreview />,
  examples: [
    { title: 'Basic', content: <CalendarBasicPreview /> },
    { title: 'Min/Max Dates', content: <CalendarMinMaxExample /> },
    { title: 'Disabled Dates', content: <CalendarDisabledDatesExample /> },
    { title: 'Multiple Months', content: <CalendarMultipleMonthsExample /> },
    { title: 'Controlled', content: <CalendarControlledExample /> },
  ],
  props: [
    { name: 'value', type: 'Date | null', defaultValue: '-', description: 'Controlled selected date.' },
    { name: 'defaultValue', type: 'Date | null', defaultValue: 'null', description: 'Initial selected date (uncontrolled).' },
    { name: 'onChange', type: '(date: Date | null) => void', defaultValue: '-', description: 'Callback when a day is selected.' },
    { name: 'minDate', type: 'Date', defaultValue: '-', description: 'Earliest selectable date.' },
    { name: 'maxDate', type: 'Date', defaultValue: '-', description: 'Latest selectable date.' },
    { name: 'disabledDates', type: 'Date[] | ((date: Date) => boolean)', defaultValue: '-', description: 'Specific dates to disable, or a function that returns true for disabled dates.' },
    { name: 'locale', type: 'string', defaultValue: 'navigator.language', description: 'Locale for date formatting (Intl.DateTimeFormat).' },
    { name: 'showOutsideDays', type: 'boolean', defaultValue: 'true', description: 'Show days from previous/next month in the grid.' },
    { name: 'fixedWeeks', type: 'boolean', defaultValue: 'false', description: 'Always show 6 weeks (42 days) regardless of month.' },
    { name: 'numberOfMonths', type: 'number', defaultValue: '1', description: 'Number of months to display side by side.' },
  ],
  cssHooks: [
    '.mr-calendar', '.mr-calendar__months', '.mr-calendar__months--multiple',
    '.mr-calendar__month', '.mr-calendar__header', '.mr-calendar__month-label',
    '.mr-calendar__nav-btn', '.mr-calendar__day-names', '.mr-calendar__day-name',
    '.mr-calendar__grid', '.mr-calendar__week', '.mr-calendar__day',
    '.mr-calendar__day--other-month', '.mr-calendar__day--today',
    '.mr-calendar__day--selected', '.mr-calendar__day--disabled',
    '.mr-calendar__day--hidden',
  ],
  tokens: [
    '--mr-space-1', '--mr-space-3', '--mr-space-4',
    '--mr-radius-sm',
    '--mr-text-xs', '--mr-text-sm',
    '--mr-fg-base', '--mr-fg-muted', '--mr-fg-strong',
    '--mr-bg-subtle',
    '--mr-accent', '--mr-accent-contrast', '--mr-accent-strong',
    '--mr-duration-fast', '--mr-ease-standard',
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
