import { PreCode } from '@monority/ui/pre-code'

export function PreCodeBasicExample() {
    return <PreCode language="tsx">const value = 1</PreCode>
}

export function PreCodeSizesExample() {
    return (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
            <PreCode size="sm">pnpm add @monority/ui</PreCode>
            <PreCode size="md">pnpm add @monority/ui</PreCode>
        </div>
    )
}

export function PreCodeWrapExample() {
    return (
        <PreCode wrap>
            This is a very long line that wraps instead of scrolling horizontally on narrow screens.
        </PreCode>
    )
}
