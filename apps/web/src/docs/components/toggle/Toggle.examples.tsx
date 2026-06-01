import { useState } from 'react'
import { Toggle } from '@monority/ui/toggle'

export function ToggleBasicPreview() {
  return <Toggle>Toggle</Toggle>
}

export function ToggleVariantsExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
      <Toggle>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
    </div>
  )
}

export function ToggleSizesExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--mr-space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  )
}

export function ToggleControlledExample() {
  const [pressed, setPressed] = useState(false)
  return (
    <div style={{ display: 'flex', gap: 'var(--mr-space-2)', alignItems: 'center' }}>
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        {pressed ? 'On' : 'Off'}
      </Toggle>
      <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)' }}>
        State: {pressed ? 'pressed' : 'not pressed'}
      </span>
    </div>
  )
}

export function ToggleDisabledExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
      <Toggle disabled>Disabled</Toggle>
      <Toggle disabled defaultPressed>Disabled On</Toggle>
    </div>
  )
}
