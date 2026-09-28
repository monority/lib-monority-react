import { PreCode } from '@monority/ui/pre-code'

export function PreCodeBasicExample() {
    return <PreCode language="tsx">const value = 1</PreCode>
}

export function PreCodeSizesExample() {
    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-4)' }}>
            <PreCode size="sm">pnpm add @monority/ui</PreCode>
            <PreCode size="md">pnpm add @monority/ui</PreCode>
        </div>
    )
}

export function PreCodeScrollExample() {
    const longLine =
        'const result = await client.query.execute({ query: "select activeWorkspaces, totalSeats, renewalRate, supportPriority, accountOwner from workspaceAnalytics where billingStatus = active order by renewalRate desc" })'
    return (
        <PreCode data-testid="pre-code-scroll" language="tsx">
            {longLine}
        </PreCode>
    )
}

export function PreCodeWrapExample() {
    return (
        <PreCode wrap>
            This is a very long line that wraps instead of scrolling horizontally on narrow screens.
        </PreCode>
    )
}
