import { Popover, Button } from '@monority/ui'

export function PopoverBasicExample() {
  return (
    <Popover trigger={<Button>Open popover</Button>}>
      <div style={{ padding: 16 }}>
        <p>Popover content here.</p>
      </div>
    </Popover>
  )
}
