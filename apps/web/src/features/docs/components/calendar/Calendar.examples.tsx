import { useState } from 'react'
import { Calendar } from '@monority/ui/calendar'

export function CalendarBasicPreview() {
    const [date, setDate] = useState<Date | null>(null)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
            <Calendar value={date} onChange={setDate} />
            <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)' }}>
                Selected: {date ? date.toLocaleDateString() : 'none'}
            </span>
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
            <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)' }}>
                Only current month selectable
            </span>
        </div>
    )
}

export function CalendarDisabledDatesExample() {
    const [date, setDate] = useState<Date | null>(null)
    // Disable weekends
    const disabledWeekends = (d: Date) => d.getDay() === 0 || d.getDay() === 6

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
            <Calendar value={date} onChange={setDate} disabledDates={disabledWeekends} />
            <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)' }}>
                Weekends are disabled
            </span>
        </div>
    )
}

export function CalendarMultipleMonthsExample() {
    const [date, setDate] = useState<Date | null>(null)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
            <Calendar value={date} onChange={setDate} numberOfMonths={2} />
            <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)' }}>
                Two months displayed side by side
            </span>
        </div>
    )
}

export function CalendarControlledExample() {
    const [date, setDate] = useState<Date | null>(new Date())
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
            <Calendar value={date} onChange={setDate} />
            <div style={{ display: 'flex', gap: 'var(--mr-space-2)' }}>
                <button
                    type="button"
                    onClick={() => setDate(new Date())}
                    style={{
                        padding: 'var(--mr-space-1) var(--mr-space-3)',
                        borderRadius: 'var(--mr-radius-sm)',
                        border: '1px solid var(--mr-border-subtle)',
                        background: 'var(--mr-bg-control)',
                        cursor: 'pointer',
                    }}
                >
                    Today
                </button>
                <button
                    type="button"
                    onClick={() => setDate(null)}
                    style={{
                        padding: 'var(--mr-space-1) var(--mr-space-3)',
                        borderRadius: 'var(--mr-radius-sm)',
                        border: '1px solid var(--mr-border-subtle)',
                        background: 'var(--mr-bg-control)',
                        cursor: 'pointer',
                    }}
                >
                    Clear
                </button>
            </div>
        </div>
    )
}
