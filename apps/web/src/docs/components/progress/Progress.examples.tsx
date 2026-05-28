import { Progress } from '@monority/ui'

export function ProgressBasicExample() {
  return <Progress value={60} />
}

export function ProgressValuesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Progress value={0} label="Not started" />
      <Progress value={25} label="In progress" />
      <Progress value={75} label="Almost done" />
      <Progress value={100} label="Complete" />
    </div>
  )
}

export function ProgressTonesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Progress value={50} tone="neutral" label="Neutral" />
      <Progress value={50} tone="success" label="Success" />
      <Progress value={50} tone="warning" label="Warning" />
      <Progress value={50} tone="danger" label="Danger" />
    </div>
  )
}

export function ProgressWithoutValueExample() {
  return <Progress value={65} showValue={false} label="Upload progress" />
}
