import { Switch } from '@monority/ui'
import { useState } from 'react'

export function SwitchBasicExample() {
  const [checked, setChecked] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Switch label="Enable notifications" checked={checked} onChange={() => setChecked(!checked)} />
      <Switch label="Disabled option" disabled />
    </div>
  )
}

export function SwitchSizesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Switch label="Small" size="sm" defaultChecked />
      <Switch label="Medium" size="md" defaultChecked />
      <Switch label="Large" size="lg" defaultChecked />
    </div>
  )
}

export function SwitchTonesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Switch label="Accent" tone="accent" defaultChecked />
      <Switch label="Neutral" tone="neutral" defaultChecked />
      <Switch label="Danger" tone="danger" defaultChecked />
    </div>
  )
}

export function SwitchWithErrorExample() {
  return <Switch label="Accept terms" invalid />
}
