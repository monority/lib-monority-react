import { useState } from 'react'
import { Calendar } from '@monority/ui/calendar'
import { Button } from '@monority/ui/button'
import { Text } from '@monority/ui/text'

export function CalendarBasicPreview() {
    const [date, setDate] = useState<Date | null>(null)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
            <Calendar value={date} onChange={setDate} />
            <Text.Small>Selected: {date ? date.toLocaleDateString() : 'none'}</Text.Small>
        </div>
    )
}

export function CalendarMinMaxExample() {
    const [date, setDate] = useState<Date | null>(null)
    const today = new Date()
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1)
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
            <Calendar value={date} onChange={setDate} minDate={minDate} maxDate={maxDate} />
            <Text.Small>Only current month selectable</Text.Small>
        </div>
    )
}

export function CalendarDisabledDatesExample() {
    const [date, setDate] = useState<Date | null>(null)
    const disabledWeekends = (d: Date) => d.getDay() === 0 || d.getDay() === 6

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
            <Calendar value={date} onChange={setDate} disabledDates={disabledWeekends} />
            <Text.Small>Weekends are disabled</Text.Small>
        </div>
    )
}

export function CalendarMultipleMonthsExample() {
    const [date, setDate] = useState<Date | null>(null)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
            <Calendar value={date} onChange={setDate} numberOfMonths={2} />
            <Text.Small>Two months displayed side by side</Text.Small>
        </div>
    )
}

export function CalendarControlledExample() {
    const [date, setDate] = useState<Date | null>(new Date())
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
            <Calendar value={date} onChange={setDate} />
            <div style={{ display: 'flex', gap: 'var(--mr-space-2)' }}>
                <Button size="sm" variant="secondary" onClick={() => setDate(new Date())}>
                    Today
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setDate(null)}>
                    Clear
                </Button>
            </div>
        </div>
    )
}
