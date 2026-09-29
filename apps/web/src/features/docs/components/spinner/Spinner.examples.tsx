import { Spinner } from '@monority/ui/spinner'

export function SpinnerBasicExample() {
    return <Spinner />
}

export function SpinnerSizesExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-spacing-5)', alignItems: 'center' }}>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
        </div>
    )
}

export function SpinnerTonesExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-spacing-5)', alignItems: 'center' }}>
            <Spinner tone="base" />
            <Spinner tone="muted" />
            <div
                style={{
                    background: 'var(--mr-text-primary)',
                    padding: 'var(--mr-spacing-2)',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--mr-spacing-2)' }}>
            <Spinner size="sm" />
            <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-text-secondary)' }}>
                Publishing updated component docs
            </span>
        </div>
    )
}
