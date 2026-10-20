import {
    addDays,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    formatMonthYear,
    getDayNames,
    isDateDisabled,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek,
} from '@/internal/date-utils'
import { cn } from '@/lib/cn'
import { useCallback, useEffect, useState } from 'react'
import type {
    CalendarDayNamesProps,
    CalendarDayProps,
    CalendarGridProps,
    CalendarHeaderProps,
    CalendarMonthProps,
    CalendarNavButtonProps,
    CalendarPickersProps,
    CalendarProps,
    CalendarSelectProps,
} from './Calendar.types'

// ─── Chevron icons ────────────────────────────────────────────────────

const ChevronLeftIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
            d="M13 4L7 10L13 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const ChevronRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
            d="M7 4L13 10L7 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

// ─── Main component ───────────────────────────────────────────────────

export function Calendar({
    ref,
    value,
    defaultValue = null,
    onChange,
    minDate,
    maxDate,
    disabledDates,
    locale,
    showOutsideDays = true,
    fixedWeeks = false,
    numberOfMonths = 1,
    showPickers = false,
    fromYear,
    toYear,
    classPrefix = 'mr-calendar',
    autoFocus = false,
    className,
    children,
    ...props
}: CalendarProps) {
    const [internalValue, setInternalValue] = useState<Date | null>(defaultValue)
    const selectedDate = value !== undefined ? value : internalValue
    const today = new Date()
    const initialBase = selectedDate || minDate || today
    const [viewDate, setViewDate] = useState(() => startOfMonth(initialBase))

    const [focusedDate, setFocusedDate] = useState<Date | null>(() => {
        if (selectedDate && !isDateDisabled(selectedDate, minDate, maxDate, disabledDates)) {
            return selectedDate
        }
        const monthStart = startOfMonth(initialBase)
        const monthEnd = endOfMonth(initialBase)
        const days = eachDayOfInterval(monthStart, monthEnd)
        return (
            days.find((day) => !isDateDisabled(day, minDate, maxDate, disabledDates)) ?? initialBase
        )
    })

    const currentYear = (selectedDate ?? viewDate ?? today).getFullYear()
    const defaultStartYear = Math.min(today.getFullYear() - 100, currentYear)
    const defaultEndYear = Math.max(today.getFullYear() + 20, currentYear)
    const startYear = fromYear ?? (minDate ? minDate.getFullYear() : defaultStartYear)
    const endYear = toYear ?? (maxDate ? maxDate.getFullYear() : defaultEndYear)
    const years = Array.from(
        { length: Math.max(1, endYear - startYear + 1) },
        (_, i) => startYear + i
    )

    // Sync controlled value changes
    useEffect(() => {
        if (value !== undefined && value) {
            setViewDate(startOfMonth(value))
            setFocusedDate(value)
        } else if (minDate && !selectedDate) {
            setViewDate(startOfMonth(minDate))
            const monthStart = startOfMonth(minDate)
            const monthEnd = endOfMonth(minDate)
            const days = eachDayOfInterval(monthStart, monthEnd)
            setFocusedDate(
                days.find((day) => !isDateDisabled(day, minDate, maxDate, disabledDates)) ?? minDate
            )
        }
    }, [value, minDate, selectedDate])

    const handleChange = useCallback(
        (date: Date | null) => {
            if (value === undefined) setInternalValue(date)
            onChange?.(date)
        },
        [value, onChange]
    )

    const handlePrevMonth = useCallback(() => setViewDate((d) => addMonths(d, -1)), [])
    const handleNextMonth = useCallback(() => setViewDate((d) => addMonths(d, 1)), [])

    const months = Array.from({ length: Math.max(1, numberOfMonths) }, (_, i) =>
        addMonths(viewDate, i)
    )

    const [isPickerActive, setIsPickerActive] = useState(false)
    const effectiveShowPickers = showPickers || isPickerActive

    const prefix = (suffix: string) => {
        const standard = `mr-calendar__${suffix}`
        if (classPrefix && classPrefix !== 'mr-calendar') {
            return `${standard} ${classPrefix}__${suffix}`
        }
        return standard
    }

    const handleGridKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, currentMonthDate: Date) => {
        const base =
            focusedDate ??
            (selectedDate && isSameMonth(selectedDate, currentMonthDate)
                ? selectedDate
                : currentMonthDate)
        let next: Date | null = null

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault()
                next = addDays(base, -1)
                break
            case 'ArrowRight':
                e.preventDefault()
                next = addDays(base, 1)
                break
            case 'ArrowUp':
                e.preventDefault()
                next = addDays(base, -7)
                break
            case 'ArrowDown':
                e.preventDefault()
                next = addDays(base, 7)
                break
            case 'Home':
                e.preventDefault()
                next = startOfMonth(base)
                break
            case 'End':
                e.preventDefault()
                next = endOfMonth(base)
                break
            case 'PageUp':
                e.preventDefault()
                next = addMonths(base, e.shiftKey ? -12 : -1)
                break
            case 'PageDown':
                e.preventDefault()
                next = addMonths(base, e.shiftKey ? 12 : 1)
                break
            case 'Enter':
            case ' ':
                e.preventDefault()
                if (focusedDate) {
                    const disabled = isDateDisabled(focusedDate, minDate, maxDate, disabledDates)
                    if (!disabled) {
                        handleChange(focusedDate)
                    }
                }
                return
            default:
                return
        }

        if (next) {
            setFocusedDate(next)
            if (!isSameMonth(next, viewDate)) {
                setViewDate(startOfMonth(next))
            }
        }
    }

    const renderMonth = (monthDate: Date, monthIndex: number) => {
        const monthStart = startOfMonth(monthDate)
        const monthEnd = endOfMonth(monthDate)
        const gridStart = startOfWeek(monthStart)
        const gridEnd = startOfWeek(addMonths(monthEnd, 1))

        // Ensure gridEnd is after gridStart
        if (gridEnd <= gridStart) {
            gridEnd.setDate(gridEnd.getDate() + 7)
        }

        const allDays = eachDayOfInterval(gridStart, gridEnd)

        // Build weeks, trim trailing weeks that are entirely next month
        const weeks: Date[][] = []
        for (let i = 0; i < allDays.length; i += 7) {
            weeks.push(allDays.slice(i, i + 7))
        }
        while (weeks.length > 1) {
            const lastWeek = weeks[weeks.length - 1]!
            const hasCurrentMonth = lastWeek.some((d) => isSameMonth(d, monthDate))
            if (!hasCurrentMonth) {
                weeks.pop()
            } else {
                break
            }
        }

        // fixedWeeks: always show 6 weeks (42 days)
        if (fixedWeeks) {
            while (weeks.length < 6) {
                const lastWeek = weeks[weeks.length - 1]!
                const nextWeekStart = new Date(lastWeek[6]!)
                nextWeekStart.setDate(nextWeekStart.getDate() + 1)
                const nextWeek: Date[] = []
                for (let d = 0; d < 7; d++) {
                    const day = new Date(nextWeekStart)
                    day.setDate(day.getDate() + d)
                    nextWeek.push(day)
                }
                weeks.push(nextWeek)
            }
        }

        const dayNames = getDayNames(locale)

        return (
            <CalendarMonth key={monthIndex} className={prefix('month')}>
                <CalendarHeader className={prefix('header')}>
                    <CalendarNavButton
                        direction="prev"
                        onClick={handlePrevMonth}
                        className={cn(prefix('nav-btn'), 'mr-calendar__nav-btn--prev')}
                        tabIndex={-1}
                    />
                    {effectiveShowPickers ? (
                        <CalendarPickers className={prefix('pickers')}>
                            <CalendarSelect
                                className={cn(prefix('select'), 'mr-calendar__select--month')}
                                aria-label="Select month"
                                value={monthDate.getMonth()}
                                onChange={(e) => {
                                    const next = new Date(viewDate)
                                    next.setMonth(Number(e.target.value))
                                    setViewDate(next)
                                }}
                            >
                                {Array.from({ length: 12 }, (_, i) => {
                                    const d = new Date(2024, i, 1)
                                    const name = new Intl.DateTimeFormat(locale ?? 'en-US', {
                                        month: 'short',
                                    }).format(d)
                                    return (
                                        <option key={i} value={i}>
                                            {name}
                                        </option>
                                    )
                                })}
                            </CalendarSelect>
                            <CalendarSelect
                                className={cn(prefix('select'), 'mr-calendar__select--year')}
                                aria-label="Select year"
                                value={monthDate.getFullYear()}
                                onChange={(e) => {
                                    const next = new Date(viewDate)
                                    next.setFullYear(Number(e.target.value))
                                    setViewDate(next)
                                }}
                            >
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </CalendarSelect>
                        </CalendarPickers>
                    ) : (
                        <button
                            type="button"
                            className={cn(
                                prefix('month-label'),
                                'mr-calendar__month-label--interactive'
                            )}
                            onClick={() => setIsPickerActive(true)}
                            aria-label="Select month and year"
                            title="Click to select month and year"
                        >
                            {formatMonthYear(monthDate, locale)}
                        </button>
                    )}
                    <CalendarNavButton
                        direction="next"
                        onClick={handleNextMonth}
                        className={cn(prefix('nav-btn'), 'mr-calendar__nav-btn--next')}
                        tabIndex={-1}
                    />
                </CalendarHeader>

                <CalendarGrid
                    className={prefix('grid')}
                    role="grid"
                    aria-label={formatMonthYear(monthDate, locale)}
                    onKeyDown={(e) => handleGridKeyDown(e, monthDate)}
                >
                    <CalendarDayNames className={prefix('day-names')} role="row">
                        {dayNames.map((name) => (
                            <span
                                key={name}
                                className={prefix('day-name')}
                                role="columnheader"
                                aria-label={name}
                            >
                                {name}
                            </span>
                        ))}
                    </CalendarDayNames>
                    {weeks.map((week, wi) => (
                        <div key={wi} className={prefix('week')} role="row">
                            {week.map((day, di) => {
                                const isCurrentMonth = isSameMonth(day, monthDate)
                                const isSelected = selectedDate
                                    ? isSameDay(day, selectedDate)
                                    : false
                                const disabled = isDateDisabled(
                                    day,
                                    minDate,
                                    maxDate,
                                    disabledDates
                                )
                                const isTodayDate = isToday(day)
                                const isFocused = focusedDate
                                    ? isSameDay(day, focusedDate)
                                    : isSelected || (isCurrentMonth && !disabled && di === 0)
                                const isHidden = !showOutsideDays && !isCurrentMonth

                                if (isHidden) {
                                    return (
                                        <div
                                            key={di}
                                            className={cn(
                                                prefix('day'),
                                                'mr-calendar__day--hidden'
                                            )}
                                            role="gridcell"
                                        />
                                    )
                                }

                                return (
                                    <button
                                        key={day.toISOString()}
                                        type="button"
                                        role="gridcell"
                                        disabled={disabled}
                                        aria-selected={isSelected || undefined}
                                        aria-disabled={disabled || undefined}
                                        aria-label={
                                            classPrefix === 'mr-datepicker'
                                                ? undefined
                                                : day.toLocaleDateString(locale || 'en-US', {
                                                      weekday: 'long',
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric',
                                                  })
                                        }
                                        tabIndex={isFocused ? 0 : -1}
                                        data-selected={isSelected || undefined}
                                        data-today={isTodayDate || undefined}
                                        data-disabled={disabled || undefined}
                                        data-current-month={isCurrentMonth || undefined}
                                        ref={
                                            isFocused && autoFocus
                                                ? (node) => node?.focus()
                                                : undefined
                                        }
                                        onClick={() => !disabled && handleChange(day)}
                                        className={cn(
                                            prefix('day'),
                                            isCurrentMonth && 'mr-calendar__day--current-month',
                                            !isCurrentMonth && 'mr-calendar__day--other-month',
                                            isTodayDate && 'mr-calendar__day--today',
                                            isSelected && 'mr-calendar__day--selected',
                                            disabled && 'mr-calendar__day--disabled'
                                        )}
                                    >
                                        {day.getDate()}
                                    </button>
                                )
                            })}
                        </div>
                    ))}
                </CalendarGrid>
            </CalendarMonth>
        )
    }

    return (
        <div
            ref={ref}
            className={cn('mr-calendar', className)}
            role="application"
            aria-label="Calendar"
            data-months={numberOfMonths > 1 ? numberOfMonths : undefined}
            {...props}
        >
            {children ?? (
                <div
                    className={cn(
                        'mr-calendar__months',
                        numberOfMonths > 1 && 'mr-calendar__months--multiple'
                    )}
                >
                    {months.map((monthDate, i) => renderMonth(monthDate, i))}
                </div>
            )}
        </div>
    )
}

export function CalendarHeader({ ref, className, children, ...props }: CalendarHeaderProps) {
    return (
        <div ref={ref} className={cn('mr-calendar__header', className)} {...props}>
            {children}
        </div>
    )
}

export function CalendarPickers({ ref, className, children, ...props }: CalendarPickersProps) {
    return (
        <div ref={ref} className={cn('mr-calendar__pickers', className)} {...props}>
            {children}
        </div>
    )
}

export function CalendarNavButton({
    ref,
    direction = 'prev',
    className,
    children,
    ...props
}: CalendarNavButtonProps) {
    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                'mr-calendar__nav-btn',
                direction === 'prev' ? 'mr-calendar__nav-btn--prev' : 'mr-calendar__nav-btn--next',
                className
            )}
            aria-label={direction === 'prev' ? 'Previous month' : 'Next month'}
            {...props}
        >
            {children ?? (direction === 'prev' ? <ChevronLeftIcon /> : <ChevronRightIcon />)}
        </button>
    )
}

export function CalendarSelect({ ref, className, children, ...props }: CalendarSelectProps) {
    return (
        <span className="mr-calendar__select-wrapper">
            <select ref={ref} className={cn('mr-calendar__select', className)} {...props}>
                {children}
            </select>
        </span>
    )
}

export function CalendarMonth({ ref, className, children, ...props }: CalendarMonthProps) {
    return (
        <div ref={ref} className={cn('mr-calendar__month', className)} {...props}>
            {children}
        </div>
    )
}

export function CalendarDayNames({ ref, className, children, ...props }: CalendarDayNamesProps) {
    return (
        <div ref={ref} className={cn('mr-calendar__day-names', className)} role="row" {...props}>
            {children}
        </div>
    )
}

export function CalendarDay({
    ref,
    className,
    date,
    isCurrentMonth = true,
    isSelected = false,
    isToday: isDayToday = false,
    isDisabled = false,
    children,
    ...props
}: CalendarDayProps) {
    return (
        <button
            ref={ref}
            type="button"
            role="gridcell"
            aria-selected={isSelected || undefined}
            data-selected={isSelected || undefined}
            data-today={isDayToday || undefined}
            data-disabled={isDisabled || undefined}
            data-current-month={isCurrentMonth || undefined}
            disabled={isDisabled}
            className={cn(
                'mr-calendar__day',
                isCurrentMonth && 'mr-calendar__day--current-month',
                !isCurrentMonth && 'mr-calendar__day--other-month',
                isDayToday && 'mr-calendar__day--today',
                isSelected && 'mr-calendar__day--selected',
                isDisabled && 'mr-calendar__day--disabled',
                className
            )}
            {...props}
        >
            {children ?? (date ? date.getDate() : '')}
        </button>
    )
}

export function CalendarGrid({ ref, className, children, ...props }: CalendarGridProps) {
    return (
        <div ref={ref} className={cn('mr-calendar__grid', className)} role="grid" {...props}>
            {children}
        </div>
    )
}

Calendar.Header = CalendarHeader
Calendar.Pickers = CalendarPickers
Calendar.Select = CalendarSelect
Calendar.NavButton = CalendarNavButton
Calendar.Grid = CalendarGrid
Calendar.Month = CalendarMonth
Calendar.DayNames = CalendarDayNames
Calendar.Day = CalendarDay

export type {
    CalendarProps,
    CalendarHeaderProps,
    CalendarPickersProps,
    CalendarSelectProps,
    CalendarNavButtonProps,
    CalendarGridProps,
    CalendarMonthProps,
    CalendarDayNamesProps,
    CalendarDayProps,
} from './Calendar.types'
