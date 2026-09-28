import { Separator } from '@monority/ui/separator'

export function SeparatorBasicExample() {
    return (
        <div style={{ maxWidth: 360 }}>
            <p style={{ margin: 0 }}>Account details</p>
            <Separator />
            <p style={{ margin: 0, color: 'var(--mr-fg-muted)' }}>
                Billing contact and invoice defaults
            </p>
        </div>
    )
}

export function SeparatorVerticalExample() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: 40 }}>
            <span>Open</span>
            <Separator orientation="vertical" />
            <span>Assigned</span>
            <Separator orientation="vertical" />
            <span>Due today</span>
        </div>
    )
}

export function SeparatorDecorativeExample() {
    return (
        <div style={{ maxWidth: 360 }}>
            <p style={{ margin: 0 }}>Visual grouping only</p>
            <Separator decorative />
            <p style={{ margin: 0, color: 'var(--mr-fg-muted)' }}>
                Use decorative separators when nearby headings already describe the structure.
            </p>
        </div>
    )
}
