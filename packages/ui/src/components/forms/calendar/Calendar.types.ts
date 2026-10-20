import type {
    ButtonHTMLAttributes,
    HTMLAttributes,
    ReactNode,
    Ref,
    SelectHTMLAttributes,
} from 'react'

export interface CalendarProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    ref?: Ref<HTMLDivElement>
    value?: Date | null
    defaultValue?: Date | null
    onChange?: (date: Date | null) => void
    minDate?: Date
    maxDate?: Date
    disabledDates?: Date[] | ((date: Date) => boolean)
    locale?: string
    showOutsideDays?: boolean
    fixedWeeks?: boolean
    numberOfMonths?: number
    showPickers?: boolean
    classPrefix?: string
    autoFocus?: boolean
    children?: ReactNode
}

export interface CalendarHeaderProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface CalendarPickersProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface CalendarNavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    direction?: 'prev' | 'next'
}

export interface CalendarSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    ref?: Ref<HTMLSelectElement>
}

export interface CalendarGridProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface CalendarMonthProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface CalendarDayNamesProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface CalendarDayProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    date?: Date
    isCurrentMonth?: boolean
    isSelected?: boolean
    isToday?: boolean
    isDisabled?: boolean
}
