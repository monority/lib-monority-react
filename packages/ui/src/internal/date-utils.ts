/**
 * Utilitaires de manipulation et formatage de dates (sans dependance externe).
 * Partages entre Calendar, DatePicker et DateRangePicker.
 */

export function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export function startOfWeek(date: Date, weekStartsOn = 0): Date {
    const d = new Date(date)
    const day = d.getDay()
    const diff = (day - weekStartsOn + 7) % 7
    d.setDate(d.getDate() - diff)
    d.setHours(0, 0, 0, 0)
    return d
}

export function addDays(date: Date, amount: number): Date {
    const next = new Date(date)
    next.setDate(next.getDate() + amount)
    return next
}

export function addMonths(date: Date, n: number): Date {
    const d = new Date(date)
    d.setMonth(d.getMonth() + n)
    return d
}

export function subMonths(date: Date, n: number): Date {
    return addMonths(date, -n)
}

export function eachDayOfInterval(start: Date, end: Date): Date[] {
    const days: Date[] = []
    const current = new Date(start)
    while (current <= end) {
        days.push(new Date(current))
        current.setDate(current.getDate() + 1)
    }
    return days
}

export function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

export function isToday(date: Date): boolean {
    return isSameDay(date, new Date())
}

export function isSameMonth(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

export function isOnOrBefore(date: Date, boundary: Date): boolean {
    return startOfDay(date).getTime() <= startOfDay(boundary).getTime()
}

export function isDateDisabled(
    date: Date,
    minDate?: Date,
    maxDate?: Date,
    disabledDates?: Date[] | ((date: Date) => boolean)
): boolean {
    if (minDate && startOfDay(date).getTime() < startOfDay(minDate).getTime()) return true
    if (maxDate && startOfDay(date).getTime() > startOfDay(maxDate).getTime()) return true
    if (Array.isArray(disabledDates)) {
        return disabledDates.some((d) => isSameDay(d, date))
    }
    if (typeof disabledDates === 'function') {
        return disabledDates(date)
    }
    return false
}

export function parseDate(value: Date | string | undefined | null): Date | null {
    if (!value) return null
    if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? null : d
}

export function formatDate(date: Date, locale?: string): string {
    const loc = locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US')
    return new Intl.DateTimeFormat(loc || 'en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date)
}

export function formatMonthYear(date: Date, locale?: string): string {
    const loc = locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US')
    return new Intl.DateTimeFormat(loc || 'en-US', {
        month: 'long',
        year: 'numeric',
    }).format(date)
}

export function getDayNames(locale?: string): string[] {
    const loc = locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US')
    const formatter = new Intl.DateTimeFormat(loc || 'en-US', {
        weekday: 'short',
    })
    const baseDate = new Date(2024, 0, 0) // Sunday
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(baseDate)
        d.setDate(d.getDate() + i)
        return formatter.format(d)
    })
}

export function toISODateString(date: Date | null): string {
    if (!date) return ''
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}
