import { Tabs } from '@monority/ui'
import { useState } from 'react'

export function TabsBasicExample() {
  const [value, setValue] = useState('tab1')
  const items = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
  ]
  return <Tabs items={items} value={value} onChange={setValue} />
}
