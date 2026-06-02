import { useState } from 'react'
import { Button } from '@/components/actions/button/Button'
import { Collapsible } from '@monority/ui/collapsible'

export function CollapsibleBasicExample() {
    return (
        <Collapsible title="Release notes summary" defaultOpen>
            <p>
                This release tightens dashboard surfaces, reduces decorative backgrounds, and
                updates docs imports so lazy routes resolve through component subpaths.
            </p>
        </Collapsible>
    )
}

export function CollapsibleDefaultOpenExample() {
    return (
        <Collapsible title="Migration checklist" defaultOpen>
            <ul>
                <li>Update shared surfaces and border tokens.</li>
                <li>Review display primitives in compact layouts.</li>
                <li>Refresh docs examples after runtime imports are stable.</li>
            </ul>
        </Collapsible>
    )
}

export function CollapsibleControlledExample() {
    const [open, setOpen] = useState(false)

    return (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
            <Collapsible title="Controlled delivery notes" open={open} onOpenChange={setOpen}>
                <p>
                    Controlled mode is useful when the panel follows a route, validation step, or
                    saved preference instead of owning local state.
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
                <p>Use small for terse supporting details in dense panels.</p>
            </Collapsible>
            <Collapsible title="Default note" size="md" defaultOpen>
                <p>Medium fits most inline explanations, settings notes, and docs callouts.</p>
            </Collapsible>
            <Collapsible title="Expanded narrative" size="lg">
                <p>
                    Large works when the panel carries multiple sentences or status-heavy
                    instructions that need more breathing room.
                </p>
            </Collapsible>
        </div>
    )
}
