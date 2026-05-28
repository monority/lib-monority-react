import { Stack } from '@monority/ui'

export function StackBasicExample() {
  return (
    <>
      <Stack>Example</Stack>
    </>
  )
}

export function StackGapExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Stack gap="xs" style={{ background: 'var(--mr-bg-control)', padding: '0.5rem' }}>
        <div>xs gap</div><div>Item 2</div><div>Item 3</div>
      </Stack>
      <Stack gap="md" style={{ background: 'var(--mr-bg-control)', padding: '0.5rem' }}>
        <div>md gap</div><div>Item 2</div><div>Item 3</div>
      </Stack>
      <Stack gap="xl" style={{ background: 'var(--mr-bg-control)', padding: '0.5rem' }}>
        <div>xl gap</div><div>Item 2</div><div>Item 3</div>
      </Stack>
    </div>
  )
}

export function StackHorizontalExample() {
  return (
    <Stack direction="horizontal" gap="md" style={{ background: 'var(--mr-bg-control)', padding: '0.5rem' }}>
      <div style={{ background: 'var(--mr-accent)', color: 'var(--mr-accent-contrast)', padding: '0.5rem 1rem' }}>Item 1</div>
      <div style={{ background: 'var(--mr-accent)', color: 'var(--mr-accent-contrast)', padding: '0.5rem 1rem' }}>Item 2</div>
      <div style={{ background: 'var(--mr-accent)', color: 'var(--mr-accent-contrast)', padding: '0.5rem 1rem' }}>Item 3</div>
    </Stack>
  )
}
