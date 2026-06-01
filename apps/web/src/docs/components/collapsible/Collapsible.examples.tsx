import { useState } from 'react'
import { Collapsible } from '@monority/ui'

export function CollapsibleBasicExample() {
  return (
    <Collapsible title="What is Monority?">
      <p>Monority is a design system for building consistent interfaces.</p>
    </Collapsible>
  )
}

export function CollapsibleDefaultOpenExample() {
  return (
    <Collapsible title="Pre-opened section" defaultOpen>
      <p>This section is open by default using the <code>defaultOpen</code> prop.</p>
    </Collapsible>
  )
}

export function CollapsibleControlledExample() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Collapsible title="Controlled section" open={open} onOpenChange={setOpen}>
        <p>This section is controlled by external state.</p>
      </Collapsible>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{ marginTop: '0.5rem' }}
      >
        {open ? 'Close' : 'Open'} externally
      </button>
    </div>
  )
}

export function CollapsibleSizesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Collapsible title="Small" size="sm">
        <p>Small size collapsible panel.</p>
      </Collapsible>
      <Collapsible title="Medium (default)" size="md">
        <p>Medium size collapsible panel.</p>
      </Collapsible>
      <Collapsible title="Large" size="lg">
        <p>Large size collapsible panel.</p>
      </Collapsible>
    </div>
  )
}
