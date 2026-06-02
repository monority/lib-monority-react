import { useState } from 'react'
import { Button, Collapsible } from '@monority/ui'

export function CollapsibleBasicExample() {
  return (
    <Collapsible title="Release notes summary">
      <p>
        This week focuses on UI system cleanup: calmer surfaces, tighter
        hierarchy, and more consistent overlay behavior across docs and app
        shells.
      </p>
    </Collapsible>
  )
}

export function CollapsibleDefaultOpenExample() {
  return (
    <Collapsible title="Migration checklist" defaultOpen>
      <p>
        Update shared layout surfaces first, then control components, then docs
        examples. That sequence keeps the visual language stable while the
        system evolves.
      </p>
    </Collapsible>
  )
}

export function CollapsibleControlledExample() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Collapsible
        title="Controlled delivery notes"
        open={open}
        onOpenChange={setOpen}
      >
        <p>
          This panel is driven by external state, which is useful when the open
          state should follow a filter, route, or validation step.
        </p>
      </Collapsible>
      <div>
        <Button size="sm" variant="secondary" onClick={() => setOpen(!open)}>
          {open ? 'Hide details' : 'Show details'}
        </Button>
      </div>
    </div>
  )
}

export function CollapsibleSizesExample() {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Collapsible title="Compact note" size="sm">
        <p>Use the small size for terse supporting details inside dense screens.</p>
      </Collapsible>
      <Collapsible title="Default note" size="md" defaultOpen>
        <p>The medium size fits most inline product explanations and doc callouts.</p>
      </Collapsible>
      <Collapsible title="Expanded narrative" size="lg">
        <p>Large works better when the panel carries more instructional or status-heavy copy.</p>
      </Collapsible>
    </div>
  )
}
