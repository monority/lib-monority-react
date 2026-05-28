import { Avatar } from '@monority/ui'

export function AvatarBasicExample() {
  return (
    <>
      <Avatar>Example</Avatar>
    </>
  )
}

export function AvatarSizesExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar size="sm" name="Alice B">AB</Avatar>
      <Avatar size="md" name="Alice B">AB</Avatar>
      <Avatar size="lg" name="Alice B">AB</Avatar>
    </div>
  )
}

export function AvatarWithImageExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar size="md" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Felix" />
      <Avatar size="md" name="John Doe">JD</Avatar>
    </div>
  )
}

export function AvatarGroupExample() {
  return (
    <div style={{ display: 'flex' }}>
      <Avatar size="sm" name="Alice">A</Avatar>
      <Avatar size="sm" name="Bob" style={{ marginLeft: '-0.5rem' }}>B</Avatar>
      <Avatar size="sm" name="Charlie" style={{ marginLeft: '-0.5rem' }}>C</Avatar>
      <Avatar size="sm" style={{ marginLeft: '-0.5rem', background: 'var(--mr-bg-surface-strong)' }}>+3</Avatar>
    </div>
  )
}
