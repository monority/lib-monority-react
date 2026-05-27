import { Switch } from '@monority/ui'
import { useState } from 'react'

export function SwitchBasicExample() {
  const [checked, setChecked] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Switch label="Enable notifications" checked={checked} onChange={() => setChecked(!checked)} />
      <Switch label="Dark mode" defaultChecked />
      <Switch label="Disabled option" disabled />
    </div>
  )
}
