import { Button } from '@monority/ui/button'
import { Calendar } from '@monority/ui/calendar'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { useState } from 'react'

export function CalendarBasicPreview() {
    const [date, setDate] = useState<Date | null>(null)
    return (
        <Stack gap="md">
            <Calendar value={date} onChange={setDate} />
            <Text.Small>Selected: {date ? date.toLocaleDateString() : 'none'}</Text.Small>
        </Stack>
    )
}

export function CalendarPickersExample() {
    const [date, setDate] = useState<Date | null>(new Date())
    return (
        <Stack gap="md">
            <Calendar value={date} onChange={setDate} showPickers />
            <Text.Small>Selected: {date ? date.toLocaleDateString() : 'none'}</Text.Small>
        </Stack>
    )
}

export function CalendarMinMaxExample() {
    const [date, setDate] = useState<Date | null>(null)
    const today = new Date()
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1)
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    return (
        <Stack gap="md">
            <Calendar value={date} onChange={setDate} minDate={minDate} maxDate={maxDate} />
            <Text.Small>Only current month selectable</Text.Small>
        </Stack>
    )
}

export function CalendarDisabledDatesExample() {
    const [date, setDate] = useState<Date | null>(null)
    const disabledWeekends = (d: Date) => d.getDay() === 0 || d.getDay() === 6

    return (
        <Stack gap="md">
            <Calendar value={date} onChange={setDate} disabledDates={disabledWeekends} />
            <Text.Small>Weekends are disabled</Text.Small>
        </Stack>
    )
}

export function CalendarMultipleMonthsExample() {
    const [date, setDate] = useState<Date | null>(null)
    return (
        <Stack gap="md">
            <Calendar value={date} onChange={setDate} numberOfMonths={2} />
            <Text.Small>Two months displayed side by side</Text.Small>
        </Stack>
    )
}

export function CalendarControlledExample() {
    const [date, setDate] = useState<Date | null>(new Date())
    return (
        <Stack gap="md">
            <Calendar value={date} onChange={setDate} />
            <Stack direction="horizontal" gap="sm">
                <Button size="sm" variant="secondary" onClick={() => setDate(new Date())}>
                    Today
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setDate(null)}>
                    Clear
                </Button>
            </Stack>
        </Stack>
    )
}
