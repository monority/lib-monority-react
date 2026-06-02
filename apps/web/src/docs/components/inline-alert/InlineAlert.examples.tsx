import { InlineAlert } from '@monority/ui/inline-alert'

export function InlineAlertBasicExample() {
    return (
        <InlineAlert
            title="Draft restored"
            description="Your unsaved documentation edits were recovered from the previous session."
        />
    )
}

export function InlineAlertTonesExample() {
    return (
        <div style={{ display: 'grid', gap: '1rem' }}>
            <InlineAlert
                tone="info"
                title="Review window opened"
                description="You can now inspect the latest component updates before publishing."
            />
            <InlineAlert
                tone="success"
                title="Tokens synced"
                description="Theme values were rebuilt and applied across docs and package styles."
            />
            <InlineAlert
                tone="warning"
                title="Accessibility check pending"
                description="A few examples still need keyboard and contrast verification."
            />
            <InlineAlert
                tone="danger"
                title="Build blocked"
                description="A missing export is preventing the docs bundle from completing."
            />
        </div>
    )
}

export function InlineAlertWithActionExample() {
    return (
        <InlineAlert
            tone="warning"
            title="Docs review expires soon"
            description="Only one approval is still missing before the release window closes."
            actionLabel="Open review"
            onAction={() => {}}
        />
    )
}
