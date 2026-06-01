import { Popover, Button, Input } from '@monority/ui'

export function PopoverBasicExample() {
  return (
    <Popover trigger={<Button>Open popover</Button>}>
      <div style={{ padding: 16 }}>
        <p>Popover content here.</p>
      </div>
    </Popover>
  )
}

export function PopoverWithFormExample() {
  return (
    <Popover trigger={<Button variant="secondary">Quick edit</Button>}>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: 200 }}>
        <label style={{ fontSize: '0.875rem' }}>
          Name
          <Input style={{ marginTop: '0.25rem' }} placeholder="Enter name" />
        </label>
        <Button size="sm">Save</Button>
      </div>
    </Popover>
  )
}

export function PopoverAlignmentExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Popover trigger={<Button>Start</Button>} align="start">
        <div style={{ padding: 12 }}>Aligned start</div>
      </Popover>
      <Popover trigger={<Button>Center</Button>} align="center">
        <div style={{ padding: 12 }}>Aligned center</div>
      </Popover>
      <Popover trigger={<Button>End</Button>} align="end">
        <div style={{ padding: 12 }}>Aligned end</div>
      </Popover>
    </div>
  )
}
