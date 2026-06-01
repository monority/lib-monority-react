export const calendarMeta = {
  title: 'Calendar',
  status: 'draft',
  package: '@monority/ui/calendar',
  import: "import { Calendar } from '@monority/ui/calendar'",
  category: 'forms',
  anatomy: ['root', 'month', 'header', 'nav-btn', 'day-names', 'week', 'day'],
  accessibility: [
    'role="application" on root',
    'role="grid" on day grid',
    'role="row" on weeks and day names',
    'role="gridcell" on days',
    'aria-selected on selected day',
    'aria-disabled on disabled days',
    'aria-label on navigation buttons',
  ],
}
