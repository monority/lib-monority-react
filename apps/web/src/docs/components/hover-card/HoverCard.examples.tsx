import { HoverCard, Button, Text } from '@monority/ui'

export function HoverCardBasicExample() {
  return (
    <HoverCard content={<Text>HoverCard content appears on hover.</Text>}>
      <Button>Hover me</Button>
    </HoverCard>
  )
}

export function HoverCardCustomDelayExample() {
  return (
    <HoverCard content={<Text>Opens after 1s, closes after 500ms.</Text>} openDelay={1000} closeDelay={500}>
      <Button variant="secondary">Slow hover</Button>
    </HoverCard>
  )
}

export function HoverCardSidesExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <HoverCard content={<Text>Top</Text>} side="top">
        <Button variant="outline">Top</Button>
      </HoverCard>
      <HoverCard content={<Text>Bottom</Text>} side="bottom">
        <Button variant="outline">Bottom</Button>
      </HoverCard>
      <HoverCard content={<Text>Left</Text>} side="left">
        <Button variant="outline">Left</Button>
      </HoverCard>
      <HoverCard content={<Text>Right</Text>} side="right">
        <Button variant="outline">Right</Button>
      </HoverCard>
    </div>
  )
}

export function HoverCardControlledExample() {
  return (
    <HoverCard content={<Text>Controlled open state.</Text>} defaultOpen>
      <Button variant="ghost">Always open</Button>
    </HoverCard>
  )
}
