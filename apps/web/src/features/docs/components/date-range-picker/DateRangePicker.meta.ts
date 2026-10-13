export const dateRangePickerMeta = {
    title: 'DateRangePicker',
    status: 'stable',
    package: '@monority/ui/date-range-picker',
    import: "import { DateRangePicker } from '@monority/ui'",
    category: 'forms',
    anatomy: ['root', 'trigger', 'popover', 'calendar', 'startInput', 'endInput'],
    accessibility: [
        'role="dialog" on popover container',
        'Start and end date inputs with clear accessible labels',
        'Keyboard calendar navigation and Escape to close',
    ],
}
