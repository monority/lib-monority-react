import { forwardRef, useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/cn'
import type { CalendarProps } from './Calendar.types'

// ─── Date math utilities (no external deps) ───────────────────────────

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function startOfWeek(date: Date, weekStartsOn = 0): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day - weekStartsOn + 7) % 7
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function addMonths(date: Date, n: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + n)
  return d
}

function eachDayOfInterval(start: Date, end: Date): Date[] {
  const days: Date[] = []
  const current = new Date(start)
  while (current <= end) {
    days.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return days
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

function isDateDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[] | ((date: Date) => boolean),
): boolean {
  if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true
  if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true
  if (Array.isArray(disabledDates)) {
    return disabledDates.some((d) => isSameDay(d, date))
  }
  if (typeof disabledDates === 'function') {
    return disabledDates(date)
  }
  return false
}

function getDayNames(locale?: string): string[] {
  const formatter = new Intl.DateTimeFormat(locale ?? navigator.language ?? 'en-US', { weekday: 'short' })
  const baseDate = new Date(2024, 0, 0) // Sunday
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(baseDate)
    d.setDate(d.getDate() + i)
    return formatter.format(d)
  })
}

function formatMonthYear(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale ?? navigator.language ?? 'en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

// ─── Chevron icons ────────────────────────────────────────────────────

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Main component ───────────────────────────────────────────────────

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
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
    className,
    ...props
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue)
  const selectedDate = value !== undefined ? value : internalValue
  const today = new Date()
  const [viewDate, setViewDate] = useState(() => startOfMonth(selectedDate || today))

  // Sync controlled value changes
  useEffect(() => {
    if (value !== undefined && value) {
      setViewDate(startOfMonth(value))
    }
  }, [value])

  const handleChange = useCallback(
    (date: Date | null) => {
      if (value === undefined) setInternalValue(date)
      onChange?.(date)
    },
    [value, onChange],
  )

  const handlePrevMonth = useCallback(() => setViewDate((d) => addMonths(d, -1)), [])
  const handleNextMonth = useCallback(() => setViewDate((d) => addMonths(d, 1)), [])

  const months = Array.from({ length: Math.max(1, numberOfMonths) }, (_, i) => addMonths(viewDate, i))

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
      <div key={monthIndex} className="mr-calendar__month">
        <div className="mr-calendar__header">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="mr-calendar__nav-btn mr-calendar__nav-btn--prev"
            aria-label="Previous month"
            tabIndex={-1}
          >
            <ChevronLeftIcon />
          </button>
          <span className="mr-calendar__month-label">{formatMonthYear(monthDate, locale)}</span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="mr-calendar__nav-btn mr-calendar__nav-btn--next"
            aria-label="Next month"
            tabIndex={-1}
          >
            <ChevronRightIcon />
          </button>
        </div>

        <div className="mr-calendar__grid" role="grid" aria-label={formatMonthYear(monthDate, locale)}>
          <div className="mr-calendar__day-names" role="row">
            {dayNames.map((name) => (
              <span key={name} className="mr-calendar__day-name" role="columnheader" aria-label={name}>
                {name}
              </span>
            ))}
          </div>
          {weeks.map((week, wi) => (
            <div key={wi} className="mr-calendar__week" role="row">
              {week.map((day, di) => {
                const isCurrentMonth = isSameMonth(day, monthDate)
                const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
                const disabled = isDateDisabled(day, minDate, maxDate, disabledDates)
                const isTodayDate = isToday(day)
                const isHidden = !showOutsideDays && !isCurrentMonth

                if (isHidden) {
                  return <div key={di} className="mr-calendar__day mr-calendar__day--hidden" role="gridcell" />
                }

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    role="gridcell"
                    disabled={disabled}
                    aria-selected={isSelected || undefined}
                    aria-disabled={disabled || undefined}
                    aria-label={day.toLocaleDateString(locale || 'en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    tabIndex={isSelected ? 0 : -1}
                    data-selected={isSelected || undefined}
                    data-today={isTodayDate || undefined}
                    data-disabled={disabled || undefined}
                    data-current-month={isCurrentMonth || undefined}
                    onClick={() => !disabled && handleChange(day)}
                    className={cn(
                      'mr-calendar__day',
                      isCurrentMonth && 'mr-calendar__day--current-month',
                      !isCurrentMonth && 'mr-calendar__day--other-month',
                      isTodayDate && 'mr-calendar__day--today',
                      isSelected && 'mr-calendar__day--selected',
                      disabled && 'mr-calendar__day--disabled',
                    )}
                  >
                    {day.getDate()}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
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
      <div className={cn('mr-calendar__months', numberOfMonths > 1 && 'mr-calendar__months--multiple')}>
        {months.map((monthDate, i) => renderMonth(monthDate, i))}
      </div>
    </div>
  )
})

export type { CalendarProps } from './Calendar.types'
