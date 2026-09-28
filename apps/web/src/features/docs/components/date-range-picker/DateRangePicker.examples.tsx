import { DateRangePicker } from '@monority/ui/date-range-picker'

export function DateRangePickerBasicExample() {
    return <DateRangePicker fromLabel="Start" toLabel="End" />
}

export function DateRangePickerWithErrorExample() {
    return <DateRangePicker fromLabel="Start" toLabel="End" error="Please select a date range" />
}

export function DateRangePickerWithHintExample() {
    return (
        <DateRangePicker fromLabel="Check-in" toLabel="Check-out" hint="Select your stay dates" />
    )
}

export function DateRangePickerDisabledExample() {
    return <DateRangePicker fromLabel="Start" toLabel="End" disabled />
}
