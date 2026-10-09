import { CopyButton } from '@monority/ui/copy-button'

export function CopyButtonBasicPreview() {
    return <CopyButton value="pnpm add @monority/ui" label="Copy Command" />
}

export function CopyButtonVariantsExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
            <CopyButton value="npm i @monority/ui" variant="subtle" label="Subtle" />
            <CopyButton value="npm i @monority/ui" variant="outline" label="Outline" />
            <CopyButton value="npm i @monority/ui" variant="solid" label="Solid" />
        </div>
    )
}

export function CopyButtonSizesExample() {
    return (
        <div
            style={{
                display: 'flex',
                gap: 'var(--mr-space-2)',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <CopyButton value="token-sm" size="sm" label="Small" />
            <CopyButton value="token-md" size="md" label="Medium" />
            <CopyButton value="token-lg" size="lg" label="Large" />
        </div>
    )
}

export function CopyButtonCustomFeedbackExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
            <CopyButton
                value="secret-api-key-12345"
                label="Copy API Key"
                copiedLabel="Key copied to clipboard!"
                duration={3000}
            />
        </div>
    )
}

export function CopyButtonDisabledExample() {
    return <CopyButton value="read-only-data" label="Disabled Copy" disabled />
}
