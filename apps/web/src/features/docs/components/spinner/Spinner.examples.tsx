import { Spinner } from '@monority/ui/spinner'
import { Text } from '@monority/ui/text'

export function SpinnerBasicExample() {
    return <Spinner />
}

export function SpinnerSizesExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-5)', alignItems: 'center' }}>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
        </div>
    )
}

export function SpinnerTonesExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-5)', alignItems: 'center' }}>
            <Spinner tone="base" />
            <Spinner tone="muted" />
            <div
                style={{
                    background: 'var(--mr-bg-inverse)',
                    padding: 'var(--mr-space-3)',
                    borderRadius: 'var(--mr-radius-md)',
                }}
            >
                <Spinner tone="inverse" />
            </div>
        </div>
    )
}

export function SpinnerWithTextExample() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--mr-space-3)' }}>
            <Spinner size="sm" />
            <Text.Small>Publishing updated component docs</Text.Small>
        </div>
    )
}
