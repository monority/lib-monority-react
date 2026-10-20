import { Calendar } from '@/components/forms/calendar/Calendar'
import { Field } from '@/components/forms/field/Field'
import { formatDate, parseDate, toISODateString } from '@/internal/date-utils'
import { useFloatingPosition } from '@/internal/use-floating-position'
import { usePortalTarget } from '@/internal/use-portal-target'
import { usePresence } from '@/internal/use-presence'
import { cn } from '@/lib/cn'
import { DATEPICKER_MIN_WIDTH, OVERLAY_OFFSET } from '@/lib/constants'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { DatePickerProps } from './DatePicker.types'

const CalendarIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8.5H17" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6.5 2.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13.5 2.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

export function DatePicker({
    ref,
    size = 'md',
    tone = 'neutral',
    label,
    hint,
    error,
    invalid = false,
    fullWidth = false,
    theme,
    brand,
    density,
    value,
    defaultValue,
    onChange,
    minDate,
    maxDate,
    disabledDates,
    placeholder,
    showPickers,
    fromYear,
    toYear,
    inputClassName,
    popoverClassName,
    className,
    style,
    id,
    disabled = false,
    required = false,
    ...props
}: DatePickerProps) {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState<Date | null>(() =>
        parseDate(value ?? defaultValue)
    )
    const selectedDate = isControlled ? parseDate(value) : internalValue
    const [open, setOpen] = useState(false)

    const rootRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLInputElement>(null)
    const popoverRef = useRef<HTMLDivElement>(null)

    const portalTarget = usePortalTarget()
    const { isMounted, presenceProps, ref: presenceRef } = usePresence(open, { durationMs: 200 })

    const { position, actualSide, actualAlign, positioned } = useFloatingPosition(
        triggerRef,
        popoverRef,
        {
            side: 'bottom',
            align: 'start',
            sideOffset: OVERLAY_OFFSET,
            enabled: isMounted,
        }
    )

    // Sync controlled value
    useEffect(() => {
        if (isControlled) {
            setInternalValue(parseDate(value))
        }
    }, [isControlled, value])

    // Outside click & Escape handlers
    useEffect(() => {
        if (!open) return

        function onPointerDown(e: PointerEvent | MouseEvent) {
            const target = e.target as Node
            if (!rootRef.current?.contains(target) && !popoverRef.current?.contains(target)) {
                setOpen(false)
            }
        }

        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                e.preventDefault()
                setOpen(false)
                triggerRef.current?.focus()
            }
        }

        document.addEventListener('pointerdown', onPointerDown)
        window.addEventListener('keydown', onKey)

        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('keydown', onKey)
        }
    }, [open])

    useEffect(() => {
        if (open && positioned) {
            const focusedEl = popoverRef.current?.querySelector<HTMLElement>(
                '.mr-datepicker__day[tabindex="0"]'
            )
            focusedEl?.focus()
        }
    }, [open, positioned])

    const handleSelect = useCallback(
        (date: Date | null) => {
            if (!isControlled) setInternalValue(date)
            onChange?.(date)
            setOpen(false)
            triggerRef.current?.focus()
        },
        [isControlled, onChange]
    )

    const handleTriggerClick = useCallback(() => {
        if (!disabled) setOpen((prev) => !prev)
    }, [disabled])

    const handleTriggerKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault()
                if (!disabled) setOpen(true)
            }
        },
        [disabled]
    )

    const displayValue = selectedDate ? formatDate(selectedDate) : ''
    const isInvalid = Boolean(invalid || error)
    const resolvedSize = size ?? 'md'
    const resolvedTone = tone ?? 'neutral'

    const hiddenInputRef = useCallback(
        (node: HTMLInputElement | null) => {
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref && typeof ref === 'object' && 'current' in ref) {
                ;(ref as { current: HTMLInputElement | null }).current = node
            }
        },
        [ref]
    )

    const triggerWidth = triggerRef.current?.getBoundingClientRect().width

    return (
        <FormControl
            id={id}
            hint={!!hint}
            error={!!error}
            size={resolvedSize}
            tone={resolvedTone}
            invalid={isInvalid}
            disabled={disabled}
            required={required}
        >
            <div
                className={cn('mr-datepicker-wrapper', className)}
                data-full-width={fullWidth ? 'true' : undefined}
                style={{
                    maxWidth: fullWidth ? undefined : `${DATEPICKER_MIN_WIDTH}px`,
                    ...style,
                }}
            >
                <Field label={label} hint={hint} error={error}>
                    <div
                        ref={rootRef}
                        className="mr-datepicker"
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
                            className={cn('mr-datepicker__trigger', inputClassName)}
                            data-invalid={isInvalid ? true : undefined}
                            data-disabled={disabled ? true : undefined}
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

                {isMounted && portalTarget
                    ? createPortal(
                          <div
                              ref={(node) => {
                                  popoverRef.current = node
                                  presenceRef(node)
                              }}
                              className={cn('mr-datepicker__popover', popoverClassName)}
                              data-size={resolvedSize}
                              data-tone={resolvedTone}
                              data-theme={theme}
                              data-brand={brand}
                              data-density={density}
                              data-side={actualSide}
                              data-align={actualAlign}
                              data-state={presenceProps['data-state']}
                              data-closing={presenceProps['data-closing']}
                              data-positioned={positioned ? '' : undefined}
                              role="dialog"
                              aria-modal="false"
                              aria-label="Choose date"
                              aria-hidden={!open ? 'true' : undefined}
                              tabIndex={-1}
                              style={{
                                  position: 'fixed',
                                  top: `${position.top}px`,
                                  left: `${position.left}px`,
                                  width:
                                      fullWidth && triggerWidth
                                          ? `${Math.max(triggerWidth, DATEPICKER_MIN_WIDTH)}px`
                                          : undefined,
                                  visibility: positioned ? undefined : 'hidden',
                              }}
                          >
                              <Calendar
                                  classPrefix="mr-datepicker"
                                  value={selectedDate}
                                  onChange={handleSelect}
                                  minDate={minDate}
                                  maxDate={maxDate}
                                  disabledDates={disabledDates}
                                  showPickers={showPickers}
                                  fromYear={fromYear}
                                  toYear={toYear}
                                  autoFocus
                              />
                          </div>,
                          portalTarget
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
}

export type { DatePickerProps, DatePickerSize, DatePickerTone } from './DatePicker.types'
