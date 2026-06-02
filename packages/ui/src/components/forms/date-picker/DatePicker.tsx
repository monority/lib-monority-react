import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { FormControl, useFormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { Field } from '@/components/forms/field/Field'
import { usePortalTarget } from '@/internal/use-portal-target'
import type { DatePickerProps } from './DatePicker.types'

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

function subMonths(date: Date, n: number): Date {
  return addMonths(date, -n)
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

function parseDate(value: Date | string | undefined | null): Date | null {
  if (!value) return null
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value
  const d = new Date(value)
  return isNaN(d.getTime()) ? null : d
}

function formatDate(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale ?? navigator.language ?? 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function formatMonthYear(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale ?? navigator.language ?? 'en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)
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

function toISODateString(date: Date | null): string {
  if (!date) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// ─── Variant ──────────────────────────────────────────────────────────

const datePickerVariants = cva({
  base: 'mr-datepicker',
  variants: {
    size: {
      sm: 'mr-datepicker--sm',
      md: 'mr-datepicker--md',
      lg: 'mr-datepicker--lg',
    },
    tone: {
      neutral: 'mr-datepicker--neutral',
      accent: 'mr-datepicker--accent',
      danger: 'mr-datepicker--danger',
    },
  },
  defaultVariants: { size: 'md', tone: 'neutral' },
})

// ─── Sub-components ───────────────────────────────────────────────────

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

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="1.5" y="2.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1.5 6.5H16.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5.5 1.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12.5 1.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

interface CalendarHeaderProps {
  viewDate: Date
  onPrev: () => void
  onNext: () => void
}

function CalendarHeader({ viewDate, onPrev, onNext }: CalendarHeaderProps) {
  return (
    <div className="mr-datepicker__header">
      <button
        type="button"
        className="mr-datepicker__nav-btn"
        onClick={onPrev}
        aria-label="Previous month"
        tabIndex={-1}
      >
        <ChevronLeftIcon />
      </button>
      <span className="mr-datepicker__month-label">{formatMonthYear(viewDate)}</span>
      <button
        type="button"
        className="mr-datepicker__nav-btn"
        onClick={onNext}
        aria-label="Next month"
        tabIndex={-1}
      >
        <ChevronRightIcon />
      </button>
    </div>
  )
}

interface CalendarGridProps {
  viewDate: Date
  selectedDate: Date | null
  onSelect: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[] | ((date: Date) => boolean)
}

function CalendarGrid({ viewDate, selectedDate, onSelect, minDate, maxDate, disabledDates }: CalendarGridProps) {
  const monthStart = startOfMonth(viewDate)
  const monthEnd = endOfMonth(viewDate)
  const gridStart = startOfWeek(monthStart)
  const gridEnd = startOfWeek(addMonths(monthEnd, 1))
  // Ensure gridEnd is after gridStart
  if (gridEnd <= gridStart) {
    gridEnd.setDate(gridEnd.getDate() + 7)
  }
  const days = eachDayOfInterval(gridStart, gridEnd)

  // Trim trailing weeks that are entirely next month
  const weeks: Date[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  while (weeks.length > 1) {
    const lastWeek = weeks[weeks.length - 1]
    const hasCurrentMonth = lastWeek?.some((d) => isSameMonth(d, viewDate)) ?? false
    if (!hasCurrentMonth) {
      weeks.pop()
    } else {
      break
    }
  }
  const trimmedDays = weeks.flat()
  const dayNames = getDayNames()

  const [focusedDate, setFocusedDate] = useState<Date | null>(selectedDate)

  const handleGridKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const base = focusedDate ?? selectedDate ?? new Date()
      let next: Date | null = null

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          next = new Date(base.getFullYear(), base.getMonth(), base.getDate() - 1)
          break
        case 'ArrowRight':
          e.preventDefault()
          next = new Date(base.getFullYear(), base.getMonth(), base.getDate() + 1)
          break
        case 'ArrowUp':
          e.preventDefault()
          next = new Date(base.getFullYear(), base.getMonth(), base.getDate() - 7)
          break
        case 'ArrowDown':
          e.preventDefault()
          next = new Date(base.getFullYear(), base.getMonth(), base.getDate() + 7)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (focusedDate) {
            const disabled = isDateDisabled(focusedDate, minDate, maxDate, disabledDates)
            if (!disabled) onSelect(focusedDate)
          }
          return
        default:
          return
      }

      if (next) {
        setFocusedDate(next)
      }
    },
    [focusedDate, selectedDate, minDate, maxDate, disabledDates, onSelect],
  )

  return (
    <>
      <div className="mr-datepicker__day-names" role="row">
        {dayNames.map((name) => (
          <span key={name} className="mr-datepicker__day-name" role="columnheader">
            {name}
          </span>
        ))}
      </div>
      <div className="mr-datepicker__grid" role="grid" onKeyDown={handleGridKeyDown}>
        {trimmedDays.map((day) => {
          const disabled = isDateDisabled(day, minDate, maxDate, disabledDates)
          const selected = selectedDate ? isSameDay(day, selectedDate) : false
          const today = isToday(day)
          const currentMonth = isSameMonth(day, viewDate)
          const isFocused = focusedDate ? isSameDay(day, focusedDate) : false

          return (
            <button
              key={day.toISOString()}
              type="button"
              className="mr-datepicker__day"
              disabled={disabled}
              role="gridcell"
              tabIndex={isFocused || (selected && !disabled) ? 0 : -1}
              data-selected={selected ? true : undefined}
              data-today={today ? true : undefined}
              data-disabled={disabled ? true : undefined}
              data-current-month={currentMonth ? true : undefined}
              aria-selected={selected ? true : undefined}
              onClick={disabled ? undefined : () => onSelect(day)}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </>
  )
}

// ─── Main component ───────────────────────────────────────────────────

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  {
    size,
    tone,
    label,
    hint,
    error,
    id,
    className,
    inputClassName,
    disabled = false,
    required = false,
    value,
    defaultValue,
    onChange,
    minDate,
    maxDate,
    disabledDates,
    placeholder = 'Select a date',
    popoverClassName,
    ...props
  },
  ref,
) {
  const ctx = useFormControl()

  const isControlled = value !== undefined
  const initialDate = parseDate(isControlled ? value : defaultValue)

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate)
  const [viewDate, setViewDate] = useState<Date>(initialDate ? startOfMonth(initialDate) : startOfMonth(new Date()))
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const portalTarget = usePortalTarget()

  const resolvedSize = size ?? 'md'
  const resolvedTone = tone ?? 'neutral'
  const isInvalid = Boolean(error)

  // Sync controlled value
  useEffect(() => {
    if (isControlled) {
      const parsed = parseDate(value)
      setSelectedDate(parsed)
      if (parsed) setViewDate(startOfMonth(parsed))
    }
  }, [isControlled, value])

  // Update view when selected date changes (uncontrolled)
  useEffect(() => {
    if (!isControlled && selectedDate) {
      setViewDate(startOfMonth(selectedDate))
    }
  }, [isControlled, selectedDate])

  // Popover positioning + outside click + escape
  useEffect(() => {
    if (!open) return

    const frameId = window.requestAnimationFrame(() => {
      const r = triggerRef.current?.getBoundingClientRect()
      if (r) {
        setPosition({ top: r.bottom + 8, left: r.left, width: Math.max(r.width, 280) })
      }
    })

    function onPointerDown(e: PointerEvent) {
      if (
        !rootRef.current?.contains(e.target as Node) &&
        !popoverRef.current?.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
      }
    }

    function onResize() {
      const r = triggerRef.current?.getBoundingClientRect()
      if (r) setPosition({ top: r.bottom + 8, left: r.left, width: Math.max(r.width, 280) })
    }

    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onResize, true)

    return () => {
      window.cancelAnimationFrame(frameId)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onResize, true)
    }
  }, [open])

  const handleSelect = useCallback(
    (date: Date) => {
      if (!isControlled) setSelectedDate(date)
      onChange?.(date)
      setOpen(false)
    },
    [isControlled, onChange],
  )

  const handlePrevMonth = useCallback(() => setViewDate((d) => subMonths(d, 1)), [])
  const handleNextMonth = useCallback(() => setViewDate((d) => addMonths(d, 1)), [])

  const handleTriggerClick = useCallback(() => {
    if (!disabled) setOpen((o) => !o)
  }, [disabled])

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (!disabled) setOpen((o) => !o)
      }
    },
    [disabled],
  )

  const displayValue = selectedDate ? formatDate(selectedDate) : ''

  // Forward ref to hidden input
  const hiddenInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
    },
    [ref],
  )

  return (
    <FormControl id={id} hint={!!hint} error={!!error} disabled={disabled} required={required}>
      <div className={cn('mr-datepicker-wrapper', className)}>
        <Field label={label} hint={hint} error={error}>
          <div
            ref={rootRef}
            className={datePickerVariants({ size: resolvedSize, tone: resolvedTone })}
            data-size={resolvedSize}
            data-tone={resolvedTone}
            data-open={open ? true : undefined}
            data-invalid={isInvalid ? true : undefined}
            data-disabled={disabled ? true : undefined}
            data-required={required ? true : undefined}
          >
            <InputBase
              as="input"
              ref={triggerRef}
              type="text"
              readOnly
              className={cn(
                'mr-datepicker__trigger',
                isInvalid && 'mr-datepicker__trigger--invalid',
                disabled && 'mr-datepicker__trigger--disabled',
                inputClassName,
              )}
              value={displayValue}
              placeholder={placeholder}
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-label={typeof label === 'string' ? label : undefined}
              onClick={handleTriggerClick}
              onKeyDown={handleTriggerKeyDown}
              tabIndex={disabled ? -1 : 0}
              {...props}
            />
            <span className="mr-datepicker__icon" aria-hidden="true">
              <CalendarIcon />
            </span>
          </div>
        </Field>

        {open && portalTarget
          ? createPortal(
              <div
                ref={popoverRef}
                className={cn('mr-datepicker__popover', popoverClassName)}
                data-size={resolvedSize}
                role="dialog"
                aria-label="Choose date"
                style={{
                  position: 'fixed',
                  top: `${position.top}px`,
                  left: `${position.left}px`,
                  minWidth: `${position.width}px`,
                }}
              >
                <CalendarHeader viewDate={viewDate} onPrev={handlePrevMonth} onNext={handleNextMonth} />
                <CalendarGrid
                  viewDate={viewDate}
                  selectedDate={selectedDate}
                  onSelect={handleSelect}
                  minDate={minDate}
                  maxDate={maxDate}
                  disabledDates={disabledDates}
                />
              </div>,
              portalTarget,
            )
          : null}

        {/* Hidden input for form submission */}
        <input
          ref={hiddenInputRef}
          type="hidden"
          name={props.name}
          value={toISODateString(selectedDate)}
          disabled={disabled}
        />
      </div>
    </FormControl>
  )
})

export type { DatePickerProps, DatePickerSize, DatePickerTone } from './DatePicker.types'
