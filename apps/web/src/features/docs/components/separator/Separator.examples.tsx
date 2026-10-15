import { Separator } from '@monority/ui/separator'
import { Text } from '@monority/ui/text'

export function SeparatorBasicExample() {
    return (
        <div style={{ maxWidth: 360 }}>
            <Text>Account details</Text>
            <Separator />
            <Text.Muted>Billing contact and invoice defaults</Text.Muted>
        </div>
    )
}

export function SeparatorVerticalExample() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: 40 }}>
            <Text.Span>Open</Text.Span>
            <Separator orientation="vertical" />
            <Text.Span>Assigned</Text.Span>
            <Separator orientation="vertical" />
            <Text.Span>Due today</Text.Span>
        </div>
    )
}

export function SeparatorDecorativeExample() {
    return (
        <div style={{ maxWidth: 360 }}>
            <Text>Visual grouping only</Text>
            <Separator decorative />
            <Text.Muted>
                Use decorative separators when nearby headings already describe the structure.
            </Text.Muted>
        </div>
    )
}
