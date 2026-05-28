import { Toolbar } from '@monority/ui'
import { Button } from '@monority/ui'

export function ToolbarBasicExample() {
  return (
    <>
      <Toolbar>Example</Toolbar>
    </>
  )
}

export function ToolbarWithButtonsExample() {
  return (
    <Toolbar>
      <Button size="sm">Save</Button>
      <Button size="sm" variant="secondary">Cancel</Button>
      <Button size="sm" variant="ghost">More</Button>
    </Toolbar>
  )
}

export function ToolbarWithDividerExample() {
  return (
    <Toolbar>
      <Button size="sm" variant="ghost">Bold</Button>
      <Button size="sm" variant="ghost">Italic</Button>
      <div style={{ width: 1, height: 20, background: 'var(--mr-border-subtle)' }} />
      <Button size="sm" variant="ghost">Align left</Button>
      <Button size="sm" variant="ghost">Align center</Button>
    </Toolbar>
  )
}
