import { Combobox } from '@monority/ui'
import { useState } from 'react'

export function ComboboxBasicExample() {
  const [value, setValue] = useState('')
  const items = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]
  return <Combobox items={items} value={value} onChange={setValue} placeholder="Search..." label="Framework" />
}

export function ComboboxWithDescriptionsExample() {
  const [value, setValue] = useState('')
  const items = [
    { value: 'react', label: 'React', description: 'A JavaScript library for building user interfaces' },
    { value: 'vue', label: 'Vue', description: 'The progressive JavaScript framework' },
    { value: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop web applications' },
  ]
  return <Combobox items={items} value={value} onChange={setValue} placeholder="Select framework..." label="Framework" />
}

export function ComboboxDisabledExample() {
  const items = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]
  return <Combobox items={items} disabled label="Framework" placeholder="Disabled" />
}

export function ComboboxWithErrorExample() {
  const [value, setValue] = useState('')
  const items = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]
  return <Combobox items={items} value={value} onChange={setValue} label="Framework" error="Please select a framework" />
}

export function ComboboxSizesExample() {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const items = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Combobox items={items} value={value1} onChange={setValue1} label="Small" size="sm" />
      <Combobox items={items} value={value2} onChange={setValue2} label="Medium" size="md" />
      <Combobox items={items} value={value3} onChange={setValue3} label="Large" size="lg" />
    </div>
  )
}
