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
