import { Tooltip, Button } from '@monority/ui'

export function TooltipBasicExample() {
  return (
    <Tooltip content="Simple tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  )
}

export function TooltipWithRichContentExample() {
  return (
    <Tooltip content={<div style={{ padding: '4px' }}><strong>Rich tooltip</strong><br />With multiple lines</div>}>
      <Button variant="secondary">Rich content</Button>
    </Tooltip>
  )
}

export function TooltipOnIconButtonExample() {
  return (
    <Tooltip content="Delete item">
      <Button iconOnly aria-label="Delete" variant="danger"><span>{'\u2715'}</span></Button>
    </Tooltip>
  )
}
