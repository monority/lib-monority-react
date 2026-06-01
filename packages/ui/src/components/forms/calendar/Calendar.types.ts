import type { HTMLAttributes } from 'react'

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
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
}
