import { Tabs } from '@monority/ui'
import { useState } from 'react'

export function TabsBasicExample() {
  const [value, setValue] = useState('overview')
  const items = [
    { value: 'overview', label: 'Overview' },
    { value: 'activity', label: 'Activity' },
    { value: 'releases', label: 'Releases' },
  ]

  return <Tabs items={items} value={value} onChange={setValue} />
}

export function TabsTonesExample() {
  const [neutral, setNeutral] = useState('summary')
  const [accent, setAccent] = useState('summary')
  const [danger, setDanger] = useState('summary')
  const items = [
    { value: 'summary', label: 'Summary' },
    { value: 'history', label: 'History' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Tabs items={items} value={neutral} onChange={setNeutral} tone="neutral" />
      <Tabs items={items} value={accent} onChange={setAccent} tone="accent" />
      <Tabs items={items} value={danger} onChange={setDanger} tone="danger" />
    </div>
  )
}

export function TabsSizesExample() {
  const [small, setSmall] = useState('api')
  const [medium, setMedium] = useState('api')
  const [large, setLarge] = useState('api')
  const items = [
    { value: 'api', label: 'API' },
    { value: 'examples', label: 'Examples' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Tabs items={items} value={small} onChange={setSmall} size="sm" />
      <Tabs items={items} value={medium} onChange={setMedium} size="md" />
      <Tabs items={items} value={large} onChange={setLarge} size="lg" />
    </div>
  )
}

export function TabsDisabledExample() {
  const [value, setValue] = useState('members')
  const items = [
    { value: 'members', label: 'Members' },
    { value: 'guests', label: 'Guests' },
  ]

  return <Tabs items={items} value={value} onChange={setValue} disabled />
}

export function TabsFullWidthExample() {
  const [value, setValue] = useState('overview')
  const items = [
    { value: 'overview', label: 'Overview' },
    { value: 'details', label: 'Details' },
    { value: 'settings', label: 'Settings' },
  ]

  return <Tabs items={items} value={value} onChange={setValue} fullWidth />
}
