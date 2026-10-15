import { Callout } from '@monority/ui/callout'
import { Kbd } from '@monority/ui/kbd'
import { Text } from '@monority/ui/text'

export function CalloutBasicExample() {
    return <Callout>API keys created before May 1 will rotate automatically this weekend.</Callout>
}

export function CalloutTonesExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Callout title="Note" tone="neutral">
                This workspace inherits billing settings from the parent account.
            </Callout>
            <Callout title="Info" tone="info">
                New docs search is rolling out gradually across teams.
            </Callout>
            <Callout title="Success" tone="success">
                The migration finished and all datasets are now indexed.
            </Callout>
            <Callout title="Warning" tone="warning">
                Review redirect rules before publishing the new navigation.
            </Callout>
            <Callout title="Error" tone="danger">
                Webhook delivery is failing for the production endpoint.
            </Callout>
        </div>
    )
}

export function CalloutWithChildrenExample() {
    return (
        <Callout title="Tip" tone="info">
            <Text>
                You can use <Text.Strong>keyboard shortcuts</Text.Strong> to navigate faster.
            </Text>
            <Text style={{ marginTop: '0.5rem' }}>
                Press <Kbd>Ctrl+K</Kbd> to open the command palette.
            </Text>
        </Callout>
    )
}
