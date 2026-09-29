import { useState } from 'react'
import { Calendar } from '@monority/ui/calendar'

export function CalendarBasicPreview() {
    const [date, setDate] = useState<Date | null>(null)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-spacing-2)' }}>
            <Calendar value={date} onChange={setDate} />
            <span style={{ fontSize: 'var(--mr-fs-14)', color: 'var(--mr-text-secondary)' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-spacing-2)' }}>
            <Calendar value={date} onChange={setDate} minDate={minDate} maxDate={maxDate} />
            <span style={{ fontSize: 'var(--mr-fs-14)', color: 'var(--mr-text-secondary)' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-spacing-2)' }}>
            <Calendar value={date} onChange={setDate} disabledDates={disabledWeekends} />
            <span style={{ fontSize: 'var(--mr-fs-14)', color: 'var(--mr-text-secondary)' }}>
                Weekends are disabled
            </span>
        </div>
    )
}

export function CalendarMultipleMonthsExample() {
    const [date, setDate] = useState<Date | null>(null)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-spacing-2)' }}>
            <Calendar value={date} onChange={setDate} numberOfMonths={2} />
            <span style={{ fontSize: 'var(--mr-fs-14)', color: 'var(--mr-text-secondary)' }}>
                Two months displayed side by side
            </span>
        </div>
    )
}

export function CalendarControlledExample() {
    const [date, setDate] = useState<Date | null>(new Date())
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-spacing-2)' }}>
            <Calendar value={date} onChange={setDate} />
            <div style={{ display: 'flex', gap: 'var(--mr-spacing-1-5)' }}>
                <button
                    type="button"
                    onClick={() => setDate(new Date())}
                    style={{
                        padding: 'var(--mr-spacing-1) var(--mr-spacing-2)',
                        borderRadius: 'var(--mr-radius-sm)',
                        border: '1px solid var(--mr-border-subtle)',
                        background: 'var(--mr-bg-sunken)',
                        cursor: 'pointer',
                    }}
                >
                    Today
                </button>
                <button
                    type="button"
                    onClick={() => setDate(null)}
                    style={{
                        padding: 'var(--mr-spacing-1) var(--mr-spacing-2)',
                        borderRadius: 'var(--mr-radius-sm)',
                        border: '1px solid var(--mr-border-subtle)',
                        background: 'var(--mr-bg-sunken)',
                        cursor: 'pointer',
                    }}
                >
                    Clear
                </button>
            </div>
        </div>
    )
}
