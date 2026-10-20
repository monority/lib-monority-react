import { describe, expect, it } from 'vitest'
import {
    addDays,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    formatDate,
    formatMonthYear,
    getDayNames,
    isDateDisabled,
    isOnOrBefore,
    isSameDay,
    isSameMonth,
    isToday,
    parseDate,
    startOfDay,
    startOfMonth,
    startOfWeek,
    subMonths,
    toISODateString,
} from './date-utils'

describe('date-utils', () => {
    it('startOfDay clears time component', () => {
        const d = new Date(2025, 5, 15, 14, 30, 45, 123)
        const start = startOfDay(d)
        expect(start.getHours()).toBe(0)
        expect(start.getMinutes()).toBe(0)
        expect(start.getSeconds()).toBe(0)
        expect(start.getMilliseconds()).toBe(0)
        expect(start.getDate()).toBe(15)
    })

    it('startOfMonth and endOfMonth compute month boundaries', () => {
        const feb = new Date(2024, 1, 15) // leap year
        expect(startOfMonth(feb).getDate()).toBe(1)
        expect(endOfMonth(feb).getDate()).toBe(29)
    })

    it('startOfWeek starts on specified day', () => {
        const wednesday = new Date(2025, 0, 8) // Jan 8 2025 is Wednesday
        const sunday = startOfWeek(wednesday, 0)
        expect(sunday.getDay()).toBe(0)
        expect(sunday.getDate()).toBe(5)
    })

    it('addDays and addMonths / subMonths', () => {
        const base = new Date(2025, 0, 10)
        expect(addDays(base, 5).getDate()).toBe(15)
        expect(addMonths(base, 2).getMonth()).toBe(2)
        expect(subMonths(base, 1).getMonth()).toBe(11)
    })

    it('eachDayOfInterval returns all days in range', () => {
        const start = new Date(2025, 0, 1)
        const end = new Date(2025, 0, 5)
        const days = eachDayOfInterval(start, end)
        expect(days.length).toBe(5)
        expect(days[0]?.getDate()).toBe(1)
        expect(days[4]?.getDate()).toBe(5)
    })

    it('isSameDay, isToday, isSameMonth', () => {
        const a = new Date(2025, 4, 12, 10)
        const b = new Date(2025, 4, 12, 18)
        const c = new Date(2025, 4, 13)
        expect(isSameDay(a, b)).toBe(true)
        expect(isSameDay(a, c)).toBe(false)
        expect(isSameMonth(a, c)).toBe(true)
        expect(isToday(new Date())).toBe(true)
    })

    it('isOnOrBefore checks day timestamps', () => {
        const d1 = new Date(2025, 0, 10, 23)
        const d2 = new Date(2025, 0, 10, 2)
        const d3 = new Date(2025, 0, 11)
        expect(isOnOrBefore(d1, d2)).toBe(true)
        expect(isOnOrBefore(d2, d1)).toBe(true)
        expect(isOnOrBefore(d1, d3)).toBe(true)
        expect(isOnOrBefore(d3, d1)).toBe(false)
    })

    it('isDateDisabled respects minDate, maxDate and custom predicates', () => {
        const min = new Date(2025, 0, 5)
        const max = new Date(2025, 0, 20)
        const before = new Date(2025, 0, 4)
        const inside = new Date(2025, 0, 10)
        const after = new Date(2025, 0, 21)

        expect(isDateDisabled(before, min, max)).toBe(true)
        expect(isDateDisabled(inside, min, max)).toBe(false)
        expect(isDateDisabled(after, min, max)).toBe(true)

        expect(isDateDisabled(inside, undefined, undefined, [inside])).toBe(true)
        expect(isDateDisabled(inside, undefined, undefined, (d) => d.getDate() === 10)).toBe(true)
    })

    it('parseDate handles Date instances, strings, nullish', () => {
        expect(parseDate(null)).toBeNull()
        expect(parseDate(undefined)).toBeNull()
        expect(parseDate('invalid-date')).toBeNull()
        const parsed = parseDate('2025-06-15')
        expect(parsed).toBeInstanceOf(Date)
        expect(parsed?.getFullYear()).toBe(2025)
    })

    it('toISODateString formats YYYY-MM-DD', () => {
        expect(toISODateString(null)).toBe('')
        expect(toISODateString(new Date(2025, 4, 9))).toBe('2025-05-09')
    })

    it('getDayNames returns 7 days', () => {
        const names = getDayNames('en-US')
        expect(names.length).toBe(7)
    })

    it('formatDate and formatMonthYear', () => {
        const d = new Date(2025, 0, 15)
        expect(formatDate(d, 'en-US')).toMatch(/\d{2}\/\d{2}\/2025/)
        expect(formatMonthYear(d, 'en-US')).toContain('January 2025')
    })
})
