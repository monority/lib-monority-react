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

export function TabsTonesExample() {
  const [v1, setV1] = useState('a')
  const [v2, setV2] = useState('a')
  const [v3, setV3] = useState('a')
  const items = [
    { value: 'a', label: 'Active' },
    { value: 'b', label: 'Inactive' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Tabs items={items} value={v1} onChange={setV1} tone="neutral" />
      <Tabs items={items} value={v2} onChange={setV2} tone="accent" />
      <Tabs items={items} value={v3} onChange={setV3} tone="danger" />
    </div>
  )
}

export function TabsSizesExample() {
  const [v1, setV1] = useState('a')
  const [v2, setV2] = useState('a')
  const [v3, setV3] = useState('a')
  const items = [
    { value: 'a', label: 'Small' },
    { value: 'b', label: 'Tab' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Tabs items={items} value={v1} onChange={setV1} size="sm" />
      <Tabs items={items} value={v2} onChange={setV2} size="md" />
      <Tabs items={items} value={v3} onChange={setV3} size="lg" />
    </div>
  )
}

export function TabsDisabledExample() {
  const [value, setValue] = useState('tab1')
  const items = [
    { value: 'tab1', label: 'Enabled' },
    { value: 'tab2', label: 'Disabled' },
  ]
  return <Tabs items={items} value={value} onChange={setValue} disabled />
}

export function TabsFullWidthExample() {
  const [value, setValue] = useState('tab1')
  const items = [
    { value: 'tab1', label: 'Overview' },
    { value: 'tab2', label: 'Details' },
    { value: 'tab3', label: 'Settings' },
  ]
  return <Tabs items={items} value={value} onChange={setValue} fullWidth />
}
