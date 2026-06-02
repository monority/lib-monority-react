import { useState } from 'react'
import { Progress } from '@monority/ui'

export function ProgressBasicExample() {
  return <Progress value={68} label="Release migration" />
}

export function ProgressValuesExample() {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Progress value={0} label="Planning" />
      <Progress value={28} label="Shell alignment" />
      <Progress value={74} label="Docs rewrite" />
      <Progress value={100} label="Component pass complete" tone="success" />
    </div>
  )
}

export function ProgressTonesExample() {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Progress value={46} tone="neutral" label="Queued" />
      <Progress value={82} tone="success" label="Synced" />
      <Progress value={58} tone="warning" label="Needs review" />
      <Progress value={21} tone="danger" label="Blocked" />
    </div>
  )
}

export function ProgressWithoutValueExample() {
  return <Progress value={65} showValue={false} label="Upload progress" />
}

export function ProgressIndeterminateExample() {
  return <Progress mode="indeterminate" label="Rebuilding documentation bundle" />
}

export function ProgressSliderExample() {
  const [value, setValue] = useState(40)

  return (
    <Progress
      value={value}
      label={`Review threshold: ${value}%`}
      onChange={setValue}
    />
  )
}
