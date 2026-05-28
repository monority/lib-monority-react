import { useState } from 'react'
import { DatePicker } from '@monority/ui'

export function DatePickerBasicExample() {
  return <DatePicker label="Date" />
}

export function DatePickerWithErrorExample() {
  return <DatePicker label="Date" error="This field is required" />
}

export function DatePickerWithHintExample() {
  return <DatePicker label="Date" hint="Select your preferred date" />
}

export function DatePickerWithMinMaxExample() {
  const today = new Date()
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())
  return (
    <DatePicker
      label="Booking date"
      hint="Select a date within the next 3 months"
      minDate={minDate}
      maxDate={maxDate}
    />
  )
}

export function DatePickerDisabledExample() {
  return <DatePicker label="Date" disabled />
}

export function DatePickerControlledExample() {
  const [date, setDate] = useState<Date | null>(null)
  return (
    <div>
      <DatePicker
        label="Controlled date"
        value={date ?? undefined}
        onChange={(d) => setDate(d)}
      />
      {date && <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--mr-fg-muted)' }}>
        Selected: {date.toLocaleDateString()}
      </p>}
    </div>
  )
}

export function DatePickerSizesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DatePicker label="Small" size="sm" />
      <DatePicker label="Medium" size="md" />
      <DatePicker label="Large" size="lg" />
    </div>
  )
}

export function DatePickerDisabledDatesExample() {
  const weekends = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }
  return (
    <DatePicker
      label="Weekday only"
      hint="Weekends are disabled"
      defaultValue={new Date()}
      disabledDates={weekends}
    />
  )
}
