import { Spinner } from '@monority/ui/spinner'

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
                    background: 'var(--mr-fg-base)',
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
            <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)' }}>
                Publishing updated component docs
            </span>
        </div>
    )
}
